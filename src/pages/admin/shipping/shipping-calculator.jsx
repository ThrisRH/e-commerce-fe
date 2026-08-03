import React, { useState } from "react";
import {
  Card,
  Form,
  Button,
  Typography,
  Space,
  Divider,
  Row,
  Col,
  Statistic,
  List,
  Avatar,
  InputNumber,
  Tabs,
} from "antd";
import {
  CalculatorOutlined,
  EnvironmentOutlined,
  PlusOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { TextField } from "@/components/common/input/ant-custom-input";
import AddressPickerModal from "@/pages/user/checkout/sections/address-picker-modal";
import ProductSelectionModal from "@/components/common/modal/product-selection-modal";

import {
  calculateShippingFee,
  findShippingRoute,
} from "@/api/shipping/shipping-api";

const { Title, Text } = Typography;

import PageContainer from "@/components/common/page-container";
import PageHeader from "@/components/common/page-header";
import normalizeAddress from "@/utils/normallize-address";

export default function ShippingCalculator() {
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

  const [lookupResult, setLookupResult] = useState(null);

  const [modalType, setModalType] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const [addressData, setAddressData] = useState({
    pickup: null,
    delivery: null,
  });

  const onCalculate = async () => {
    if (!addressData.delivery) {
      form.validateFields(["delivery"]);
      return;
    }

    if (selectedItems.length === 0) {
      return;
    }

    setLoading(true);
    try {
      const payload = {
        from: addressData.pickup
          ? {
              province: normalizeAddress(addressData.pickup.province.name),
              district: normalizeAddress(addressData.pickup.district.name),
              ward: normalizeAddress(addressData.pickup.ward?.name || ""),
            }
          : {
              province: "Hồ Chí Minh",
              district: "Quận 1",
              ward: "Phường Bến Nghé",
            },
        to: {
          province: normalizeAddress(addressData.delivery.province.name),
          district: normalizeAddress(addressData.delivery.district.name),
          ward: normalizeAddress(addressData.delivery.ward?.name || ""),
        },
        shipping_method_id: 1,
        items: selectedItems.map((item) => ({
          sku: item.sku,
          slug: item.slug,
          quantity: item.quantity,
        })),
      };

      const result = await calculateShippingFee(payload);
      if (result) {
        console.log(result);
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

  const onLookup = async () => {
    setLoading(true);
    try {
      const values = form.getFieldsValue();
      const payload = {
        from: {
          city: normalizeAddress(values.from_city) || "HCM",
          province: normalizeAddress(values.from_province) || null,
        },
        to: {
          city: normalizeAddress(values.to_city),
          province: normalizeAddress(values.to_province) || null,
        },
      };

      if (!payload.to.city) {
        form.validateFields(["to_city"]);
        setLoading(false);
        return;
      }

      const result = await findShippingRoute(payload);
      if (result) {
        setLookupResult(result);
      }
    } catch (err) {
      console.error("Failed to lookup shipping fee", err);
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

  const handleAddProduct = (product) => {
    setSelectedItems((prev) => {
      const existing = prev.find((item) => item.sku === product.sku);
      if (existing) {
        return prev.map((item) =>
          item.sku === product.sku
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveProduct = (sku) => {
    setSelectedItems((prev) => prev.filter((item) => item.sku !== sku));
  };

  const handleQuantityChange = (sku, value) => {
    setSelectedItems((prev) =>
      prev.map((item) =>
        item.sku === sku ? { ...item, quantity: value } : item,
      ),
    );
  };

  const items = [
    {
      key: "calculate",
      label: (
        <span>
          <CalculatorOutlined /> Tính theo hàng hóa
        </span>
      ),
      children: (
        <Row gutter={24}>
          <Col span={10}>
            <Card
              title="Thông tin địa chỉ"
              bordered={false}
              style={{ marginBottom: 24 }}
            >
              <Form form={form} layout="vertical">
                <div
                  onClick={() => setModalType("pickup")}
                  style={{ cursor: "pointer" }}
                >
                  <TextField
                    label="Điểm nhận (Pickup Point)"
                    name="pickup"
                    readOnly
                    placeholder="Để trống để lấy mặc định (HCM, Q1)"
                    prefix={
                      <EnvironmentOutlined
                        style={{ color: "var(--primary-main)" }}
                      />
                    }
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
                    prefix={
                      <EnvironmentOutlined
                        style={{ color: "var(--primary-main)" }}
                      />
                    }
                    rules={[
                      { required: true, message: "Vui lòng chọn điểm giao" },
                    ]}
                  />
                </div>
              </Form>
            </Card>

            <Card
              title="Sản phẩm vận chuyển"
              bordered={false}
              extra={
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => setIsProductModalOpen(true)}
                  style={{ height: 36, borderRadius: 4 }}
                >
                  Thêm sản phẩm
                </Button>
              }
            >
              <List
                dataSource={selectedItems}
                locale={{ emptyText: "Chưa chọn sản phẩm nào" }}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveProduct(item.sku)}
                      />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.image_url} shape="square" />}
                      title={item.display_name || item.name}
                      description={
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                          }}
                        >
                          <Text type="secondary" style={{ fontSize: 12 }}>
                            SKU: {item.sku}
                          </Text>
                          <InputNumber
                            min={1}
                            size="small"
                            value={item.quantity}
                            onChange={(val) =>
                              handleQuantityChange(item.sku, val)
                            }
                            style={{ width: 60 }}
                          />
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />

              <Button
                type="primary"
                block
                icon={<CalculatorOutlined />}
                onClick={onCalculate}
                size="large"
                loading={loading}
                disabled={selectedItems.length === 0}
                style={{ marginTop: "24px", height: "45px", borderRadius: 8 }}
              >
                Tính toán phí ship
              </Button>
            </Card>
          </Col>

          <Col span={14}>
            <Card title="Kết quả tính toán (Ước tính)" bordered={false}>
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
                    precision={2}
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

              <div
                style={{
                  background: "#f8fafc",
                  padding: "24px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={{ fontSize: 16, fontWeight: 600 }}>
                    Tổng phí vận chuyển:
                  </Text>
                  <Text
                    style={{ fontSize: 20, fontWeight: 700, color: "#2563eb" }}
                  >
                    {results.total_fee.toLocaleString()} VNĐ
                  </Text>
                </div>
              </div>

              <Text
                type="secondary"
                style={{
                  display: "block",
                  marginTop: "16px",
                  fontStyle: "italic",
                  fontSize: 12,
                }}
              >
                * Lưu ý: Đây là phí ước tính dựa trên các hệ số cấu hình. Phí
                thực tế có thể thay đổi tùy theo đơn vị vận chuyển.
              </Text>
            </Card>
          </Col>
        </Row>
      ),
    },
    {
      key: "lookup",
      label: (
        <span>
          <SearchOutlined /> Tra cứu phí ship
        </span>
      ),
      children: (
        <Row gutter={24}>
          <Col span={10}>
            <Card title="Tra cứu theo khu vực" bordered={false}>
              <Form form={form} layout="vertical">
                <Title level={5} style={{ marginBottom: 16 }}>
                  Điểm đi
                </Title>
                <Row gutter={12}>
                  <Col span={12}>
                    <TextField
                      label="Tỉnh/Thành"
                      name="from_city"
                      placeholder="VD: HCM"
                    />
                  </Col>
                  <Col span={12}>
                    <TextField
                      label="Quận/Huyện"
                      name="from_province"
                      placeholder="VD: Q1"
                    />
                  </Col>
                </Row>

                <Divider style={{ margin: "12px 0" }} />

                <Title level={5} style={{ marginBottom: 16 }}>
                  Điểm đến
                </Title>
                <Row gutter={12}>
                  <Col span={12}>
                    <TextField
                      label="Tỉnh/Thành"
                      name="to_city"
                      placeholder="VD: HCM"
                      rules={[{ required: true, message: "Nhập tỉnh/thành" }]}
                    />
                  </Col>
                  <Col span={12}>
                    <TextField
                      label="Quận/Huyện"
                      name="to_province"
                      placeholder="VD: Nhà Bè"
                    />
                  </Col>
                </Row>

                <Button
                  type="primary"
                  block
                  icon={<SearchOutlined />}
                  onClick={onLookup}
                  size="large"
                  loading={loading}
                  style={{ marginTop: "24px", height: "45px", borderRadius: 8 }}
                >
                  Tra cứu ngay
                </Button>
              </Form>
            </Card>
          </Col>
          <Col span={14}>
            <Card title="Kết quả tra cứu" bordered={false}>
              {lookupResult ? (
                <div
                  style={{
                    padding: "32px",
                    borderRadius: "16px",
                    textAlign: "center",
                  }}
                >
                  <Statistic
                    title="Phí vận chuyển cố định"
                    value={lookupResult.cost}
                    suffix="VNĐ"
                  />
                </div>
              ) : (
                <div
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#94a3b8",
                  }}
                >
                  <SearchOutlined style={{ fontSize: 48, marginBottom: 16 }} />
                  <p>Nhập địa chỉ và nhấn tra cứu để xem kết quả</p>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Công cụ tính phí vận chuyển"
        subtitle="Tính toán và tra cứu phí vận chuyển nhanh chóng"
        extra={undefined}
        onBack={undefined}
        breadcrumbItems={undefined}
      />

      <Tabs
        defaultActiveKey="calculate"
        items={items}
        type="card"
        style={{ marginBottom: 32 }}
      />

      <AddressPickerModal
        open={modalType !== null}
        onClose={() => setModalType(null)}
        onConfirm={handleAddressConfirm}
        initialValue={addressData[modalType]}
      />

      <ProductSelectionModal
        visible={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSelect={handleAddProduct}
      />
    </PageContainer>
  );
}
