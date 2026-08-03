import React, { useMemo } from "react";
import {
  Typography,
  Tag,
  Rate,
  Divider,
  InputNumber,
  Button,
  Space,
} from "antd";
import {
  ThunderboltOutlined,
  TruckOutlined,
  SafetyCertificateOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { formatCurrency } from "@/utils/format-currency";
import BorderButton from "@/components/common/buttons/border-button";
import PolicyBadge from "./policy-badge";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const ProductInfo = ({
  product,
  avgRating,
  mockReviewsCount,
  quantity,
  setQuantity,
  handleBuyNow,
  handleAddToCart,
}) => {
  const navigate = useNavigate();

  const flattenedVariants = useMemo(() => {
    const results = [];
    (product.others_variant || []).forEach((group) => {
      (group.variants || []).forEach((v) => {
        results.push({
          ...v,
          slug: group.slug,
        });
      });
    });
    return results;
  }, [product.others_variant]);

  const currentAttributes = useMemo(() => {
    const currentVariant = flattenedVariants.find((v) => v.sku === product.sku);
    return currentVariant?.attribute_value || [];
  }, [flattenedVariants, product.sku]);

  const dynamicAttributes = useMemo(() => {
    const attributeMap = new Map();

    flattenedVariants.forEach((v) => {
      (v.attribute_value || []).forEach((attr) => {
        if (!attributeMap.has(attr.attribute_id)) {
          attributeMap.set(attr.attribute_id, {
            id: attr.attribute_id,
            name: attr.attribute_name,
            values: new Set(),
            unit: attr.attribute_unit,
          });
        }
        attributeMap
          .get(attr.attribute_id)
          .values.add(attr.attribute_value_name);
      });
    });

    return Array.from(attributeMap.values())
      .filter((attr) => attr.values.size > 1)
      .map((attr) => ({
        ...attr,
        values: Array.from(attr.values).sort(),
      }));
  }, [flattenedVariants]);

  const currentSelections = useMemo(() => {
    const map = {};
    currentAttributes.forEach((attr) => {
      map[attr.attribute_id] = attr.attribute_value_name;
    });
    return map;
  }, [currentAttributes]);

  const checkVariantExists = (targetAttrId, targetValue) => {
    return flattenedVariants.some((v) => {
      const hasTargetValue = v.attribute_value.some(
        (a) =>
          a.attribute_id === targetAttrId &&
          a.attribute_value_name === targetValue,
      );
      if (!hasTargetValue) return false;

      return Object.entries(currentSelections).every(([attrId, value]) => {
        if (Number(attrId) === targetAttrId) return true;
        return v.attribute_value.some(
          (a) =>
            a.attribute_id === Number(attrId) &&
            a.attribute_value_name === value,
        );
      });
    });
  };

  const handleVariantChange = (targetAttrId, targetValue) => {
    const targetVariant =
      flattenedVariants.find((v) => {
        const hasTargetValue = v.attribute_value.some(
          (a) =>
            a.attribute_id === targetAttrId &&
            a.attribute_value_name === targetValue,
        );
        if (!hasTargetValue) return false;

        return Object.entries(currentSelections).every(([attrId, value]) => {
          if (Number(attrId) === targetAttrId) return true;
          return v.attribute_value.some(
            (a) =>
              a.attribute_id === Number(attrId) &&
              a.attribute_value_name === value,
          );
        });
      }) ||
      flattenedVariants.find((v) =>
        v.attribute_value.some(
          (a) =>
            a.attribute_id === targetAttrId &&
            a.attribute_value_name === targetValue,
        ),
      );

    if (targetVariant) {
      navigate(`/products/${targetVariant.slug}?sku=${targetVariant.sku}`);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {product.basic_info?.brand?.name && (
          <Tag color="blue" style={{ borderRadius: 4 }}>
            {product.basic_info.brand.name}
          </Tag>
        )}
        {product.basic_info?.category?.name && (
          <Tag color="default" style={{ borderRadius: 4 }}>
            {product.basic_info.category.name}
          </Tag>
        )}
        {product.stock > 0 ? (
          <Tag color="success">Còn hàng ({product.stock})</Tag>
        ) : (
          <Tag color="error">Hết hàng</Tag>
        )}
      </div>

      <Title level={3} style={{ margin: 0 }}>
        {product.name}
      </Title>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <Rate value={avgRating} allowHalf disabled style={{ fontSize: 14 }} />
        <Text type="secondary" style={{ fontSize: 13 }}>
          {avgRating}/5 · {mockReviewsCount} đánh giá
        </Text>
      </div>

      <Title level={2} style={{ color: "var(--primary-main)", margin: 0 }}>
        {formatCurrency(product.price)}
      </Title>
      <Text style={{ fontSize: 12, color: "var(--neutral-600)" }}>
        Giá đã bao gồm VAT
      </Text>

      <Divider style={{ margin: "4px 0" }} />

      {dynamicAttributes.map((attr) => {
        const availableValues = attr.values.filter((val) =>
          checkVariantExists(attr.id, val),
        );

        if (availableValues.length === 0) return null;

        return (
          <div key={attr.id}>
            <Text
              strong
              style={{
                fontSize: "14px",
                display: "block",
                marginBottom: 8,
                color: "var(--neutral-600)",
              }}
            >
              {attr.name}
            </Text>
            <Space wrap>
              {availableValues.map((val) => (
                <Button
                  key={val}
                  type={
                    currentSelections[attr.id] === val ? "primary" : "default"
                  }
                  onClick={() => handleVariantChange(attr.id, val)}
                  style={{ borderRadius: 4 }}
                >
                  {val} {attr.unit || ""}
                </Button>
              ))}
            </Space>
          </div>
        );
      })}

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Text style={{ fontWeight: 500 }}>Số lượng:</Text>
        <InputNumber
          min={1}
          max={product.stock || 99}
          value={quantity}
          disabled={product.stock <= 0}
          onChange={(val) => setQuantity(val)}
          style={{ width: 100 }}
        />
        <Text type="secondary" style={{ fontSize: 12 }}>
          ({product.stock || 0} sản phẩm có sẵn)
        </Text>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <Button
          type="primary"
          size="large"
          icon={<ThunderboltOutlined />}
          onClick={handleBuyNow}
          disabled={product.stock <= 0}
          style={{
            flex: 1,
            minWidth: 140,
            height: 48,
            background: product.stock > 0 ? "var(--primary-main)" : "#d9d9d9",
            borderColor: product.stock > 0 ? "var(--primary-main)" : "#d9d9d9",
            fontWeight: 600,
            boxShadow:
              product.stock > 0 ? "0 4px 12px rgba(229,57,53,0.4)" : "none",
          }}
        >
          {product.stock > 0 ? "Mua ngay" : "Hết hàng"}
        </Button>
        <BorderButton
          disabled={product.stock <= 0}
          label={"Thêm vào giỏ hàng"}
          onClick={(e) => handleAddToCart(e, product, quantity)}
        />
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <PolicyBadge
          icon={<TruckOutlined />}
          title="Miễn phí vận chuyển"
          subtitle="Đơn từ 4.000.000đ"
        />
        <PolicyBadge
          icon={<SafetyCertificateOutlined />}
          title="Bảo hành chính hãng"
          subtitle="12 tháng"
        />
        <PolicyBadge
          icon={<ReloadOutlined />}
          title="Đổi trả miễn phí"
          subtitle="Trong 30 ngày"
        />
      </div>
    </div>
  );
};

export default ProductInfo;
