import React, { useEffect, useState, useCallback } from "react";
import { Breadcrumb, Typography, Form } from "antd";
import { useLocation } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

// API
import { getCartFromSession } from "@/components/ui/cart/cart-drawer";
import {
  fetchProductBySlug,
  fetchVariantById,
} from "@/api/products/product-api";
import { createOrder } from "@/api/orders/order-api";
import { fetchMe } from "@/api/auth/auth-api";

// Components
import AddressPickerModal from "./sections/address-picker-modal";
import CheckoutForm from "./sections/checkout-form";
import CheckoutSummary from "./sections/checkout-summary";
import SuccessInvoice from "./sections/invoice";

const { Title } = Typography;
import {
  calculateShippingFee,
  fetchShippingRateById,
  fetchShippingRates,
} from "@/api/shipping/shipping-api";
import normalizeAddress from "@/utils/normallize-address";

import PageContainer from "@/components/common/page-container";
import PageHeader from "@/components/common/page-header";

export default function CheckoutPage() {
  const location = useLocation();
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [submitting, setSubmitting] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [items, setItems] = useState([]);
  const [orderResult, setOrderResult] = useState(null);
  const [user, setUser] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);

  const isBuyNow = !!location.state?.buyNowItem;

  const breadcrumbItems = [
    { title: "Trang chủ", href: "/" },
    { title: "Giỏ hàng", href: "/cart" },
    { title: "Thanh toán" },
  ];

  const loadUserInfo = useCallback(async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const userData = await fetchMe(token);
      if (userData) {
        setUser(userData);
        const nameParts = userData.name.trim().split(" ");
        let fname = "";
        let lname = "";

        if (nameParts.length > 1) {
          fname = nameParts.pop();
          lname = nameParts.join(" ");
        } else {
          fname = userData.name;
        }

        form.setFieldsValue({
          lname: lname,
          fname: fname,
          phone: userData.phone,
        });
      }
    } catch (err) {
      console.error("Failed to fetch user info", err);
    }
  }, [form]);

  const loadBaseFee = useCallback(async () => {
    try {
      const data = await fetchShippingRateById(1);
      setShippingFee(data.base_fee);
    } catch (err) {
      console.error("Failed to fetch base fee", err);
    }
  }, []);

  const loadCart = useCallback(async () => {
    if (isBuyNow) {
      const { slug, sku, quantity } = location.state.buyNowItem;
      try {
        const product = await fetchProductBySlug(slug, sku);
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
        stored.map((entry) => fetchProductBySlug(entry.slug, entry.sku)),
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

  const updateShippingFee = useCallback(async () => {
    if (!selectedAddress || items.length === 0) {
      setShippingFee(0);
      return;
    }

    try {
      const payload = {
        to: {
          province: normalizeAddress(selectedAddress.province.name),
          district: normalizeAddress(selectedAddress.district.name),
          ward: normalizeAddress(form.getFieldValue("address") || ""),
        },
        items: items.map((i) => ({
          sku: i.product.sku,
          slug: i.product.basic_info?.slug || i.product.slug,
          quantity: i.quantity,
        })),
        shipping_method_id: 1,
      };

      const result = await calculateShippingFee(payload);
      if (result && result.fee) {
        setShippingFee(result.fee);
      }
    } catch (err) {
      console.error("Failed to calculate shipping fee", err);
    }
  }, [selectedAddress, items, form]);

  useEffect(() => {
    loadCart();
    loadUserInfo();
    loadBaseFee();
  }, [loadCart, loadUserInfo, loadBaseFee]);

  const subtotal = items.reduce(
    (sum, { product, quantity }) => sum + product.price * quantity,
    0,
  );
  const total = subtotal + shippingFee;

  const handleAddressConfirm = ({ province, district, ward }) => {
    setSelectedAddress({ province, district, ward });
    form.setFieldsValue({
      city: province.name,
      district: district.name,
      ward: ward.name,
    });
  };

  useEffect(() => {
    if (subtotal < 4000000) {
      updateShippingFee();
    } else {
      setShippingFee(0);
    }
  }, [updateShippingFee, subtotal]);

  const clearCart = () => {
    if (isBuyNow) return;
    sessionStorage.removeItem("cart");
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleSubmit = async () => {
    console.log(form.getFieldsValue());
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      setSubmitting(true);

      const payload = {
        user_id: user?.id || null,
        shipping_name: `${values.lname} ${values.fname}`.trim(),
        shipping_phone: values.phone,
        note: values.note,
        payment_method: paymentMethod,
        distance: 5,
        items: items.map((i) => ({
          sku: i.product.sku,
          slug: i.product.basic_info?.slug || i.product.slug,
          quantity: i.quantity,
        })),
        to: {
          province: normalizeAddress(values.city),
          district: normalizeAddress(values.district),
          ward: normalizeAddress(values.ward),
          address: values.address,
        },
        shipping_method_id: 1,
      };

      console.log(payload);

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
        shippingFee={shippingFee}
      />
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Thanh toán"
        breadcrumbItems={breadcrumbItems}
        subtitle={undefined}
        extra={undefined}
        onBack={undefined}
      />

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
            shippingFee={shippingFee}
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
    </PageContainer>
  );
}
