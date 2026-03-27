import React from "react";
import {
  Card,
  Typography,
  List,
  Avatar,
  Button,
  Space,
  Divider,
  Progress,
  Badge,
  Tooltip,
} from "antd";
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  ThunderboltOutlined,
  WarningOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { formatCurrency } from "../../components/utils/format-currency";

const { Title, Text } = Typography;

const CATEGORY_LABELS = {
  cpu: "CPU",
  mainboard: "Mainboard",
  ram: "RAM",
  storage: "Ổ cứng",
  gpu: "Card đồ họa",
  psu: "Nguồn",
  case: "Thùng máy",
  cooler: "Tản nhiệt",
};

const BuildSummary = ({ selected, onRemove, onReset, onAddToCart }) => {
  const parts = Object.entries(selected);
  const total = parts.reduce((sum, [, part]) => sum + (part?.price ?? 0), 0);
  const totalWattage = parts.reduce(
    (sum, [, part]) => sum + (part?.wattage ?? 0),
    0,
  );
  const psuWattage = selected.psu?.wattage ?? 0;
  const wattagePercent =
    psuWattage > 0 ? Math.min((totalWattage / psuWattage) * 100, 100) : 0;
  const wattageOverload = psuWattage > 0 && totalWattage > psuWattage;

  const selectedCount = parts.filter(([, p]) => p !== null).length;
  const totalParts = parts.length;

  return (
    <Card
      bodyStyle={{ padding: 0 }}
      style={{
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        border: "1px solid #f0f0f0",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#e53935",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title level={5} style={{ color: "white", margin: 0, fontWeight: 700 }}>
          Cấu Hình Của Bạn
        </Title>
        <Badge
          count={`${selectedCount}/${totalParts}`}
          style={{
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            border: "none",
          }}
        />
      </div>

      {/* Parts list */}
      <List
        dataSource={parts}
        renderItem={([cat, part]) => (
          <List.Item
            style={{
              padding: "12px 16px",
              backgroundColor: part ? "white" : "#fafafa",
              borderBottom: "1px solid #f0f0f0",
            }}
            actions={[
              part && (
                <Tooltip title="Xóa">
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    danger
                    onClick={() => onRemove(cat)}
                  />
                </Tooltip>
              ),
            ]}
          >
            <List.Item.Meta
              avatar={
                part ? (
                  <Avatar
                    src={part.image_url}
                    shape="square"
                    size={40}
                    style={{
                      backgroundColor: "#f5f5f5",
                      padding: 4,
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Avatar
                    shape="square"
                    size={40}
                    icon={<QuestionCircleOutlined />}
                    style={{ backgroundColor: "#f0f0f0", color: "#bfbfbf" }}
                  />
                )
              }
              title={
                <Text
                  type="secondary"
                  style={{ fontSize: 11, fontWeight: 700, display: "block" }}
                >
                  {CATEGORY_LABELS[cat]}
                </Text>
              }
              description={
                part ? (
                  <Text
                    ellipsis
                    style={{ fontSize: 13, color: "#262626", fontWeight: 500 }}
                  >
                    {part.name}
                  </Text>
                ) : (
                  <Text type="secondary" italic style={{ fontSize: 13 }}>
                    Chưa chọn
                  </Text>
                )
              }
            />
          </List.Item>
        )}
      />

      {/* Wattage bar */}
      {totalWattage > 0 && (
        <div
          style={{
            padding: "16px 20px",
            backgroundColor: "#fafafa",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <Space
            style={{
              marginBottom: 8,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Space size={4}>
              <ThunderboltOutlined
                style={{ color: wattageOverload ? "#f5222d" : "#e53935" }}
              />
              <Text strong style={{ fontSize: 12 }}>
                Công suất tiêu thụ
              </Text>
            </Space>
            {wattageOverload && (
              <Tooltip title="Nguồn không đủ công suất!">
                <WarningOutlined style={{ color: "#f5222d" }} />
              </Tooltip>
            )}
          </Space>
          <Progress
            percent={wattagePercent}
            showInfo={false}
            strokeColor={
              wattageOverload
                ? "#f5222d"
                : wattagePercent > 80
                  ? "#faad14"
                  : "#e53935"
            }
            style={{ marginBottom: 4 }}
          />
          <Text type="secondary" style={{ fontSize: 11 }}>
            {totalWattage}W /{" "}
            {psuWattage > 0 ? `${psuWattage}W` : "N/A (chưa chọn nguồn)"}
          </Text>
        </div>
      )}

      {/* Total + actions */}
      <div style={{ padding: "20px", borderTop: "1px solid #f0f0f0" }}>
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <Text strong style={{ fontSize: 14 }}>
              Tổng cộng
            </Text>
            <Title
              level={4}
              style={{ margin: 0, color: "#e53935", fontWeight: 700 }}
            >
              {formatCurrency(total)}
            </Title>
          </div>

          <Space direction="vertical" style={{ width: "100%" }} size="middle">
            <Button
              type="primary"
              block
              size="large"
              icon={<ShoppingCartOutlined />}
              disabled={selectedCount === 0}
              onClick={onAddToCart}
              style={{ height: 48, fontWeight: 700 }}
            >
              Thêm vào giỏ hàng
            </Button>
            <Button
              type="link"
              block
              danger
              onClick={onReset}
              disabled={selectedCount === 0}
              style={{ fontWeight: 600 }}
            >
              Xóa tất cả
            </Button>
          </Space>
        </Space>
      </div>
    </Card>
  );
};

export default BuildSummary;
