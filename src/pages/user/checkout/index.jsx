import React, { useEffect, useState, useCallback } from "react";
import { Breadcrumb, Typography, Form } from "antd";
import { useLocation } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

// API
import { getCartFromSession } from "@/components/ui/cart/cart-drawer";
import { fetchProductById } from "@/api/products/product-api";
import { createOrder } from "@/api/orders/order-api";
import { fetchMe } from "@/api/auth/auth-api";

// Components
import AddressPickerModal from "./sections/address-picker-modal";
import CheckoutForm from "./sections/checkout-form";
import CheckoutSummary from "./sections/checkout-summary";
import SuccessInvoice from "./sections/invoice";

const { Title } = Typography;
const SHIPPING_FEE = 30000;

const CheckoutPage = () => {
  const location = useLocation();
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submitting, setSubmitting] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [items, setItems] = useState([]);
  const [orderResult, setOrderResult] = useState(null);

  const isBuyNow = !!location.state?.buyNowItem;

  const loadUserInfo = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const user = await fetchMe(token);
      console.log(user);
      if (user) {
        const nameParts = user.name.trim().split(" ");
        let fname = "";
        let lname = "";

        if (nameParts.length > 1) {
          fname = nameParts.pop();
          lname = nameParts.join(" ");
        } else {
          fname = user.name;
        }

        form.setFieldsValue({
          lname: lname,
          fname: fname,
          phone: user.phone,
        });
      }
    } catch (err) {
      console.error("Failed to fetch user info", err);
    }
  }, [form]);

  const loadCart = useCallback(async () => {
    if (isBuyNow) {
      const { id, quantity } = location.state.buyNowItem;
      try {
        const product = await fetchProductById(id);
        setItems([{ product, quantity }]);
      } catch {
        enqueueSnackbar("Không thể tải thông tin sản phẩm", {
          variant: "error",
        });
      }
      return;
    }

    const stored = getCartFromSession();
    if (!stored.length) {
      setItems([]);
      return;
    }

    try {
      const results = await Promise.allSettled(
        stored.map((entry) => fetchProductById(entry.id)),
      );

      const merged = stored.reduce((acc, entry, idx) => {
        const result = results[idx];
        if (result.status === "fulfilled") {
          acc.push({ product: result.value, quantity: entry.quantity });
        }
        return acc;
      }, []);

      setItems(merged);
    } catch {
      enqueueSnackbar("Không thể tải giỏ hàng", { variant: "error" });
    }
  }, [isBuyNow, location.state]);

  useEffect(() => {
    loadCart();
    loadUserInfo();
  }, [loadCart, loadUserInfo]);

  const handleAddressConfirm = ({ province, district }) => {
    setSelectedAddress({ province, district });
    form.setFieldsValue({
      city: province.name,
      district: district.name,
    });
  };

  const subtotal = items.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0,
  );
  const total = subtotal + SHIPPING_FEE;

  const clearCart = () => {
    if (isBuyNow) return;
    sessionStorage.removeItem("cart");
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      setSubmitting(true);

      const payload = {
        shipping_name: `${values.lname} ${values.fname}`.trim(),
        shipping_phone: values.phone,
        shipping_address: `${values.address}, ${values.district}, ${values.city}`,
        note: values.note,
        payment_method: paymentMethod,
        shipping_fee: SHIPPING_FEE,
        items: items.map((i) => ({
          product_id: i.product.id,
          quantity: i.quantity,
        })),
      };

      const response = await createOrder(payload);

      enqueueSnackbar("Đặt hàng thành công!", { variant: "success" });
      clearCart();

      setOrderResult({
        ...payload,
        id: response?.data?.id || null,
        tracking_code: response?.data?.tracking_code || null,
      });
    } catch (err) {
      if (err?.errorFields) return;
      enqueueSnackbar(err?.message || "Có lỗi xảy ra", { variant: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  if (orderResult) {
    return (
      <SuccessInvoice
        order={orderResult}
        items={items}
        total={total}
        subtotal={subtotal}
        shippingFee={SHIPPING_FEE}
      />
    );
  }

  return (
    <div style={{ padding: "28px 50px", margin: "0 auto", maxWidth: 1440 }}>
      <Breadcrumb
        style={{ marginBottom: 20 }}
        items={[
          { title: "Trang chủ", href: "/" },
          { title: "Giỏ hàng", href: "#" },
          { title: "Thanh toán" },
        ]}
      />

      <Title level={3} style={{ marginBottom: 24 }}>
        Thanh toán
      </Title>

      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 0", minWidth: 320 }}>
          <CheckoutForm
            form={form}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            setAddressModalOpen={setAddressModalOpen}
            selectedAddress={selectedAddress}
          />
        </div>

        <div style={{ flex: "1 1 0", minWidth: 320 }}>
          <CheckoutSummary
            items={items}
            subtotal={subtotal}
            total={total}
            shippingFee={SHIPPING_FEE}
            submitting={submitting}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>

      <AddressPickerModal
        open={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        onConfirm={handleAddressConfirm}
        initialValue={selectedAddress}
      />

      <style>{`
        @media (max-width: 900px) {
          .checkout-container { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;
