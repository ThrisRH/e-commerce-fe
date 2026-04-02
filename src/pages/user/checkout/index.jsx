import React, { useState } from "react";
import {
  Breadcrumb,
  Typography,
  Form,
  Input,
  Radio,
  Divider,
  Button,
  Tag,
  Space,
  Tooltip,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
  BankOutlined,
  WalletOutlined,
  ShoppingOutlined,
  SafetyCertificateOutlined,
  TruckOutlined,
  GiftOutlined,
  InfoCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/components/utils/format-currency";
import { enqueueSnackbar } from "notistack";
import AddressPickerModal from "./address-picker-modal";

const { Title, Text } = Typography;

// TODO: Thay bằng dữ liệu thật từ cart state / context / API
const MOCK_CART_ITEMS = [
  {
    id: 1,
    name: "Intel Core i9-13900K",
    image_url: "https://via.placeholder.com/72x72?text=CPU",
    price: 13990000,
    quantity: 1,
    category: "CPU",
  },
  {
    id: 2,
    name: "ASUS ROG STRIX B760-F Gaming WiFi",
    image_url: "https://via.placeholder.com/72x72?text=MB",
    price: 6490000,
    quantity: 1,
    category: "Mainboard",
  },
  {
    id: 3,
    name: "Kingston Fury Beast 32GB DDR5",
    image_url: "https://via.placeholder.com/72x72?text=RAM",
    price: 3290000,
    quantity: 2,
    category: "RAM",
  },
];

// TODO: tính phí vận chuyển từ API hoặc logic giỏ hàng (miễn phí nếu >= 500k)
let SHIPPING_FEE = 30000;

const DISCOUNT_AMOUNT = 0; // TODO: áp dụng coupon logic ở đây

const PAYMENT_METHODS = [
  {
    value: "cod",
    label: "Thanh toán khi nhận hàng (COD)",
    icon: <WalletOutlined />,
    desc: "Trả tiền mặt khi nhận được hàng",
  },
  {
    value: "bank_transfer",
    label: "Chuyển khoản ngân hàng",
    icon: <BankOutlined />,
    desc: "VCB · TPBank · MB Bank · Techcombank",
  },
  {
    value: "momo",
    label: "Ví MoMo",
    icon: <CreditCardOutlined />,
    desc: "Thanh toán qua ví điện tử MoMo",
  },
];

const SectionCard = ({ title, icon, children }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 12,
      border: "1px solid var(--neutral-200)",
      overflow: "hidden",
      marginBottom: 16,
    }}
  >
    <div
      style={{
        padding: "14px 20px",
        borderBottom: "1px solid var(--neutral-200)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "var(--neutral-50)",
      }}
    >
      <span style={{ color: "var(--primary-main)", fontSize: 16 }}>{icon}</span>
      <Text strong style={{ fontSize: 15 }}>
        {title}
      </Text>
    </div>
    <div style={{ padding: "20px" }}>{children}</div>
  </div>
);

const CartItem = ({ item }) => {
  const subtotal = item.price * item.quantity;
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: "12px 0",
        borderBottom: "1px solid var(--neutral-100)",
      }}
    >
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: 8,
          overflow: "hidden",
          border: "1px solid var(--neutral-200)",
          flexShrink: 0,
          background: "var(--neutral-50)",
        }}
      >
        <img
          src={item.image_url}
          alt={item.name}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <Text
          strong
          style={{
            display: "block",
            fontSize: 13,
            lineHeight: 1.4,
            marginBottom: 4,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.name}
        </Text>
        <Tag
          color="default"
          style={{ fontSize: 11, marginBottom: 6, borderRadius: 4 }}
        >
          {item.category}
        </Tag>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text type="secondary" style={{ fontSize: 12 }}>
            x{item.quantity}
          </Text>
          <Text strong style={{ color: "var(--primary-main)", fontSize: 14 }}>
            {formatCurrency(subtotal)}
          </Text>
        </div>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [coupon, setCoupon] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const handleAddressConfirm = ({ province, district }) => {
    setSelectedAddress({ province, district });
    form.setFieldsValue({
      city: province.name,
      district: district.name,
    });
  };

  const subtotal = MOCK_CART_ITEMS.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + SHIPPING_FEE - DISCOUNT_AMOUNT;

  const handleApplyCoupon = () => {
    // TODO: gọi API kiểm tra mã giảm giá và áp dụng discount
    enqueueSnackbar("Chức năng coupon đang phát triển", { variant: "info" });
  };

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      setSubmitting(true);

      // TODO: gọi API tạo đơn hàng
      // const payload = {
      //   customer_name: values.name,
      //   customer_phone: values.phone,
      //   shipping_address: `${values.address}, ${values.district}, ${values.city}`,
      //   note: values.note,
      //   payment_method: paymentMethod,
      //   items: MOCK_CART_ITEMS.map(i => ({ product_id: i.id, quantity: i.quantity })),
      // };
      // await createOrder(payload);

      enqueueSnackbar("Đặt hàng thành công!", { variant: "success" });
      navigate("/"); // TODO: chuyển sang trang xác nhận đơn hàng
    } catch (err) {
      if (err?.errorFields) return;
      enqueueSnackbar(err?.message || "Có lỗi xảy ra", { variant: "error" });
    } finally {
      setSubmitting(false);
    }
  };

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
        {/* ── LEFT: Customer info + Payment method ───────────────────── */}
        <div style={{ flex: "1 1 0", minWidth: 320 }}>
          <Form form={form} layout="vertical" requiredMark={false}>
            <SectionCard
              title="Thông tin người nhận"
              icon={<UserOutlined />}
            >
              <div style={{ display: "flex", gap: 16 }}>
                <Form.Item
                  name="name"
                  label="Họ và tên"
                  style={{ flex: 1 }}
                  rules={[{ required: true, message: "Vui lòng nhập họ tên" }]}
                >
                  <Input
                    prefix={<UserOutlined style={{ color: "var(--neutral-400)" }} />}
                    placeholder="Nguyễn Văn A"
                    size="large"
                    style={{ borderRadius: 8 }}
                  />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Số điện thoại"
                  style={{ flex: 1 }}
                  rules={[
                    { required: true, message: "Vui lòng nhập số điện thoại" },
                    {
                      pattern: /^[0-9]{9,11}$/,
                      message: "Số điện thoại không hợp lệ",
                    },
                  ]}
                >
                  <Input
                    prefix={<PhoneOutlined style={{ color: "var(--neutral-400)" }} />}
                    placeholder="0912 345 678"
                    size="large"
                    style={{ borderRadius: 8 }}
                  />
                </Form.Item>
              </div>

              <Form.Item
                name="email"
                label="Email"
                rules={[{ type: "email", message: "Email không hợp lệ" }]}
              >
                <Input
                  placeholder="email@example.com"
                  size="large"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>
            </SectionCard>

            <SectionCard
              title="Địa chỉ giao hàng"
              icon={<EnvironmentOutlined />}
            >
              {/* Hidden form fields for validation */}
              <Form.Item name="city" hidden rules={[{ required: true }]}><Input /></Form.Item>
              <Form.Item name="district" hidden rules={[{ required: true }]}><Input /></Form.Item>

              <div
                onClick={() => setAddressModalOpen(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "1px solid var(--neutral-200)",
                  cursor: "pointer",
                  marginBottom: 16,
                  background: selectedAddress ? "var(--primary-50, #fff5f5)" : "var(--neutral-50)",
                  transition: "border-color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--primary-main)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--neutral-200)")}
              >
                <EnvironmentOutlined
                  style={{
                    fontSize: 18,
                    color: selectedAddress ? "var(--primary-main)" : "var(--neutral-400)",
                  }}
                />
                <div style={{ flex: 1 }}>
                  {selectedAddress ? (
                    <>
                      <div style={{ fontWeight: 600, fontSize: 14, color: "var(--neutral-800)" }}>
                        {selectedAddress.district.name}
                      </div>
                      <div style={{ fontSize: 12, color: "var(--neutral-500)", marginTop: 2 }}>
                        {selectedAddress.province.name}
                      </div>
                    </>
                  ) : (
                    <span style={{ color: "var(--neutral-400)", fontSize: 14 }}>
                      Chọn Tỉnh / Thành phố và Quận / Huyện...
                    </span>
                  )}
                </div>
                <EditOutlined style={{ color: "var(--neutral-400)", fontSize: 14 }} />
              </div>

              <Form.Item
                name="address"
                label="Địa chỉ cụ thể"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              >
                <Input
                  prefix={<EnvironmentOutlined style={{ color: "var(--neutral-400)" }} />}
                  placeholder="Số nhà, tên đường, phường..."
                  size="large"
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>

              <Form.Item name="note" label="Ghi chú (tuỳ chọn)">
                <Input.TextArea
                  placeholder="Giao giờ hành chính, gọi trước khi giao..."
                  rows={3}
                  style={{ borderRadius: 8 }}
                />
              </Form.Item>
            </SectionCard>

            <AddressPickerModal
              open={addressModalOpen}
              onClose={() => setAddressModalOpen(false)}
              onConfirm={handleAddressConfirm}
              initialValue={selectedAddress}
            />

            <SectionCard
              title="Phương thức thanh toán"
              icon={<CreditCardOutlined />}
            >
              <Radio.Group
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}
              >
                {PAYMENT_METHODS.map((method) => (
                  <Radio
                    key={method.value}
                    value={method.value}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      border: `1.5px solid ${
                        paymentMethod === method.value
                          ? "var(--primary-main)"
                          : "var(--neutral-200)"
                      }`,
                      borderRadius: 10,
                      background:
                        paymentMethod === method.value
                          ? "var(--primary-50)"
                          : "#fff",
                      transition: "all 0.2s ease",
                      margin: 0,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span
                        style={{
                          fontSize: 18,
                          color:
                            paymentMethod === method.value
                              ? "var(--primary-main)"
                              : "var(--neutral-500)",
                        }}
                      >
                        {method.icon}
                      </span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>
                          {method.label}
                        </div>
                        <div style={{ fontSize: 12, color: "var(--neutral-500)" }}>
                          {method.desc}
                        </div>
                      </div>
                    </div>
                  </Radio>
                ))}
              </Radio.Group>
            </SectionCard>
          </Form>
        </div>

        {/* ── RIGHT: Order summary ────────────────────────────────────── */}
        <div style={{ flex: "1 1 0", minWidth: 320 }}>
          <SectionCard
            title={`Sản phẩm đã chọn (${MOCK_CART_ITEMS.length})`}
            icon={<ShoppingOutlined />}
          >
            <div>
              {MOCK_CART_ITEMS.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ display: "flex", gap: 8 }}>
                <Input
                  placeholder="Nhập mã giảm giá..."
                  prefix={<GiftOutlined style={{ color: "var(--neutral-400)" }} />}
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  style={{ borderRadius: 8, flex: 1 }}
                />
                <Button
                  onClick={handleApplyCoupon}
                  style={{
                    borderColor: "var(--primary-main)",
                    color: "var(--primary-main)",
                    borderRadius: 8,
                    fontWeight: 600,
                  }}
                >
                  Áp dụng
                </Button>
              </div>
            </div>
          </SectionCard>

          <div
            style={{
              background: "#fff",
              borderRadius: 12,
              border: "1px solid var(--neutral-200)",
              overflow: "hidden",
              position: "sticky",
              top: 80,
            }}
          >
            <div
              style={{
                padding: "14px 20px",
                borderBottom: "1px solid var(--neutral-200)",
                background: "var(--neutral-50)",
              }}
            >
              <Text strong style={{ fontSize: 15 }}>
                Chi tiết thanh toán
              </Text>
            </div>

            <div style={{ padding: 20 }}>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text type="secondary">Tạm tính</Text>
                  <Text>{formatCurrency(subtotal)}</Text>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Space>
                    <Text type="secondary">Phí vận chuyển</Text>
                    <Tooltip title="Miễn phí đơn từ 500.000đ">
                      <InfoCircleOutlined
                        style={{
                          fontSize: 12,
                          color: "var(--neutral-400)",
                          cursor: "pointer",
                        }}
                      />
                    </Tooltip>
                  </Space>
                  <Text>
                    {SHIPPING_FEE === 0 ? (
                      <Tag color="success" style={{ margin: 0 }}>Miễn phí</Tag>
                    ) : (
                      formatCurrency(SHIPPING_FEE)
                    )}
                  </Text>
                </div>

                {DISCOUNT_AMOUNT > 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text type="secondary">Giảm giá</Text>
                    <Text style={{ color: "#52c41a" }}>
                      -{formatCurrency(DISCOUNT_AMOUNT)}
                    </Text>
                  </div>
                )}
              </div>

              <Divider style={{ margin: "16px 0" }} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 20,
                }}
              >
                <Text strong style={{ fontSize: 16 }}>
                  Tổng cộng
                </Text>
                <Title
                  level={3}
                  style={{ margin: 0, color: "var(--primary-main)" }}
                >
                  {formatCurrency(total)}
                </Title>
              </div>

              <Text
                type="secondary"
                style={{ fontSize: 11, display: "block", marginBottom: 14 }}
              >
                Giá đã bao gồm VAT. Bằng cách đặt hàng, bạn đồng ý với{" "}
                <a href="#" style={{ color: "var(--primary-main)" }}>
                  điều khoản dịch vụ
                </a>{" "}
                của chúng tôi.
              </Text>

              <Button
                type="primary"
                size="large"
                block
                loading={submitting}
                onClick={handleSubmit}
                style={{
                  height: 50,
                  borderRadius: 10,
                  background: "var(--primary-main)",
                  borderColor: "var(--primary-main)",
                  fontWeight: 700,
                  fontSize: 15,
                  boxShadow: "0 4px 14px rgba(229,57,53,0.4)",
                  letterSpacing: 0.3,
                }}
              >
                Đặt hàng ngay
              </Button>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 20,
                  marginTop: 16,
                  flexWrap: "wrap",
                }}
              >
                <Space style={{ fontSize: 12, color: "var(--neutral-500)" }}>
                  <SafetyCertificateOutlined />
                  Bảo mật SSL
                </Space>
                <Space style={{ fontSize: 12, color: "var(--neutral-500)" }}>
                  <TruckOutlined />
                  Giao hàng toàn quốc
                </Space>
                <Space style={{ fontSize: 12, color: "var(--neutral-500)" }}>
                  <WalletOutlined />
                  Thanh toán an toàn
                </Space>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .checkout-container { flex-direction: column !important; }
        }
      `}</style>
    </div>
  );
};

export default CheckoutPage;
