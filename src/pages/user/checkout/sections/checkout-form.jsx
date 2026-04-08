import React from "react";
import { Form, Radio, Input } from "antd";
import {
  UserOutlined,
  EnvironmentOutlined,
  CreditCardOutlined,
  WalletOutlined,
  BankOutlined,
  EditOutlined,
} from "@ant-design/icons";
import SectionCard from "./section-card";
import { TextField } from "@/components/common/input/ant-custom-input";

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
];

const CheckoutForm = ({
  form,
  paymentMethod,
  setPaymentMethod,
  setAddressModalOpen,
  selectedAddress,
}) => {
  return (
    <Form form={form} layout="vertical" requiredMark={false}>
      <SectionCard title="Thông tin người nhận" icon={<UserOutlined />}>
        <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
          <TextField
            label="Họ"
            placeholder="Nguyễn"
            style={{ borderRadius: 8 }}
            name="lname"
            rules={[{ required: true, message: "Vui lòng nhập họ" }]}
          />
          <TextField
            label="Tên"
            placeholder="Văn A"
            style={{ borderRadius: 8 }}
            name="fname"
            rules={[{ required: true, message: "Vui lòng nhập tên" }]}
          />
        </div>
        <TextField
          label="Số điện thoại"
          placeholder="0912 345 678"
          style={{ borderRadius: 8 }}
          name="phone"
          rules={[{ required: true, message: "Vui lòng nhập số điện thoại" }]}
          maxLength={10}
        />
      </SectionCard>

      <SectionCard title="Địa chỉ giao hàng" icon={<EnvironmentOutlined />}>
        <Form.Item name="city" hidden rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="district" hidden rules={[{ required: true }]}>
          <Input />
        </Form.Item>

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
            background: selectedAddress
              ? "var(--primary-50, #fff5f5)"
              : "var(--neutral-50)",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.borderColor = "var(--primary-main)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.borderColor = "var(--neutral-200)")
          }
        >
          <EnvironmentOutlined
            style={{
              fontSize: 18,
              color: selectedAddress
                ? "var(--primary-main)"
                : "var(--neutral-400)",
            }}
          />
          <div style={{ flex: 1 }}>
            {selectedAddress ? (
              <>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: 14,
                    color: "var(--neutral-800)",
                  }}
                >
                  {selectedAddress.district.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--neutral-500)",
                    marginTop: 2,
                  }}
                >
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

        <TextField
          label="Địa chỉ cụ thể"
          placeholder="Số nhà, tên đường, phường..."
          style={{ borderRadius: 8 }}
          name="address"
          rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
        />

        <TextField
          label="Ghi chú (tuỳ chọn)"
          placeholder="Giao giờ hành chính, gọi trước khi giao..."
          style={{ borderRadius: 8 }}
          name="note"
          rules={[{ required: false, message: "Vui lòng nhập ghi chú" }]}
        />
      </SectionCard>

      <SectionCard title="Phương thức thanh toán" icon={<CreditCardOutlined />}>
        <Radio.Group
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
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
                  paymentMethod === method.value ? "var(--primary-50)" : "#fff",
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
  );
};

export default CheckoutForm;
