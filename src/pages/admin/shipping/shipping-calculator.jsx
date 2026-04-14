import React, { useState } from "react";
import {
  Card,
  Form,
  InputNumber,
  Button,
  Typography,
  Space,
  Divider,
  Row,
  Col,
  Statistic,
} from "antd";
import { CalculatorOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { TextField } from "@/components/common/input/ant-custom-input";
import AddressPickerModal from "@/pages/user/checkout/sections/address-picker-modal";

import { calculateShippingFee } from "@/api/shipping/shipping-api";

const { Title, Text } = Typography;

const ShippingCalculator = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState({
    time: 0,
    time_coeff: 0,
    distance: 0,
    distance_coeff: 0,
    base_fee: 0,
    total_fee: 0,
  });

  const [modalType, setModalType] = useState(null); // 'pickup' | 'delivery'
  const [addressData, setAddressData] = useState({
    pickup: null,
    delivery: null,
  });

  const onCalculate = async (values) => {
    setLoading(true);
    try {
      const payload = {
        from: addressData.pickup ? {
          province: addressData.pickup.province.name,
          district: addressData.pickup.district.name,
          ward: "", // Optional
        } : {
          province: "Hồ Chí Minh",
          district: "Quận 1",
          ward: "Phường Bến Nghé",
        },
        to: {
          province: addressData.delivery.province.name,
          district: addressData.delivery.district.name,
          ward: "", // Optional
        },
        shipping_method_id: 1, // Default method
      };

      const result = await calculateShippingFee(payload);
      if (result) {
        setResults({
          time: result.shipping_info.expected_time,
          time_coeff: result.shipping_info.time_coefficient,
          distance: result.shipping_info.distance,
          distance_coeff: result.shipping_info.distance_coefficient,
          base_fee: result.shipping_info.base_fee,
          total_fee: result.fee,
        });
      }
    } catch (err) {
      console.error("Failed to calculate shipping fee", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressConfirm = (data) => {
    setAddressData((prev) => ({
      ...prev,
      [modalType]: data,
    }));
    form.setFieldsValue({
      [modalType]: `${data.district.name}, ${data.province.name}`,
    });
  };

  return (
    <div style={{ padding: "24px" }}>
      <Title level={2}>Công cụ tính phí vận chuyển</Title>

      <Row gutter={24}>
        <Col span={10}>
          <Card title="Thông tin đơn hàng" bordered={false} className="shadow-sm">
            <Form form={form} layout="vertical" onFinish={onCalculate}>
              <div
                onClick={() => setModalType("pickup")}
                style={{ cursor: "pointer" }}
              >
                <TextField
                  label="Điểm nhận (Pickup Point)"
                  name="pickup"
                  readOnly
                  placeholder="Để trống để lấy mặc định (HCM, Q1)"
                  prefix={<EnvironmentOutlined style={{ color: "var(--primary-main)" }} />}
                  rules={[]}
                />
              </div>

              <div
                onClick={() => setModalType("delivery")}
                style={{ cursor: "pointer" }}
              >
                <TextField
                  label="Điểm giao (Delivery Point)"
                  name="delivery"
                  readOnly
                  placeholder="Chọn địa chỉ giao hàng"
                  prefix={<EnvironmentOutlined style={{ color: "var(--primary-main)" }} />}
                  rules={[{ required: true, message: "Vui lòng chọn điểm giao" }]}
                />
              </div>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label={<Text className="text-sm font-medium">Khối lượng (kg)</Text>} name="weight" initialValue={1}>
                    <InputNumber style={{ width: "100%", height: "45px", display: 'flex', alignItems: 'center' }} min={0.1} step={0.1} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={<Text className="text-sm font-medium">Thể tích (m³)</Text>} name="volume" initialValue={0.01}>
                    <InputNumber style={{ width: "100%", height: "45px", display: 'flex', alignItems: 'center'  }} min={0.001} step={0.001} />
                  </Form.Item>
                </Col>
              </Row>

              <Divider style={{ margin: '12px 0' }}>Kích thước đóng gói (cm)</Divider>
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Dài" name="length">
                    <InputNumber style={{ width: "100%", height: "45px" }} min={1} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Rộng" name="width">
                    <InputNumber style={{ width: "100%", height: "45px" }} min={1} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Cao" name="height">
                    <InputNumber style={{ width: "100%", height: "45px" }} min={1} />
                  </Form.Item>
                </Col>
              </Row>

              <Button
                type="primary"
                block
                icon={<CalculatorOutlined />}
                htmlType="submit"
                size="large"
                loading={loading}
                style={{ marginTop: "12px", height: "45px" }}
              >
                Tính toán phí ship
              </Button>
            </Form>
          </Card>
        </Col>

        <Col span={14}>
          <Card title="Kết quả tính toán (Ước tính)" bordered={false} className="shadow-sm">
            <Row gutter={[16, 24]}>
              <Col span={12}>
                <Statistic
                  title="Thời gian ước tính (T)"
                  value={results.time}
                  suffix="giờ"
                  precision={1}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Hệ số thời gian (t)"
                  value={results.time_coeff}
                  suffix="VNĐ/h"
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Quãng đường (D)"
                  value={results.distance}
                  suffix="km"
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Hệ số quãng đường (d)"
                  value={results.distance_coeff}
                  suffix="VNĐ/km"
                  valueStyle={{ color: "#3f8600" }}
                />
              </Col>
            </Row>

            <Divider />

            <div style={{ background: "#f5f5f5", padding: "20px", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <Text>Phí cơ bản:</Text>
                <Text strong>{results.base_fee.toLocaleString()} VNĐ</Text>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <Text>Phí theo quãng đường (D * d):</Text>
                <Text strong>{(results.distance * results.distance_coeff).toLocaleString()} VNĐ</Text>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <Text>Phí theo thời gian (T * t):</Text>
                <Text strong>{(results.time * results.time_coeff).toLocaleString()} VNĐ</Text>
              </div>
              <Divider style={{ margin: "12px 0" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Title level={4} style={{ margin: 0 }}>Tổng phí vận chuyển:</Title>
                <Title level={4} style={{ margin: 0, color: "#1890ff" }}>
                  {results.total_fee.toLocaleString()} VNĐ
                </Title>
              </div>
            </div>

            <Text type="secondary" style={{ display: "block", marginTop: "16px", fontStyle: "italic" }}>
              * Lưu ý: Đây là phí ước tính dựa trên các hệ số cấu hình. Phí thực tế có thể thay đổi tùy theo đơn vị vận chuyển.
            </Text>
          </Card>
        </Col>
      </Row>

      <AddressPickerModal
        open={modalType !== null}
        onClose={() => setModalType(null)}
        onConfirm={handleAddressConfirm}
        initialValue={addressData[modalType]}
      />
    </div>
  );
};

export default ShippingCalculator;
