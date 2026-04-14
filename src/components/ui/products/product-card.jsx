import { Card, Tag, Typography, Tooltip, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import "./style.css";
import AppButton from "@/components/common/buttons/button";
import BorderButton from "@/components/common/buttons/border-button";
import { handleAddToCart } from "@/utils/add-to-cart";
import { formatCurrency } from "@/utils/format-currency";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const totalStock = Number(
    product.variants && product.variants.length > 0
      ? product.variants.reduce((acc, v) => acc + Number(v.stock || 0), 0)
      : product.stock || 0,
  );

  const isOutOfStock = totalStock <= 0;

  const goToDetail = () => {
    const sku =
      product.sku || (product.variants && product.variants[0]?.sku) || "";
    navigate(`/products/${product.slug}?sku=${sku}`);
  };

  const displayPrice = () => {
    if (
      product.price_min &&
      product.price_max &&
      product.price_min !== product.price_max
    ) {
      return `${formatCurrency(product.price_min)} - ${formatCurrency(product.price_max)}`;
    }
    return formatCurrency(
      product.price_min || product.variants?.[0]?.price || product.price || 0,
    );
  };

  return (
    <Card
      hoverable
      className="product-card"
      cover={
        <div
          className="image-wrapper"
          onClick={goToDetail}
          style={{ cursor: "pointer" }}
        >
          <img
            alt={product.name}
            src={product.image_url}
            className="product-image"
          />
          <Tag className="tag">MỚI</Tag>
          {isOutOfStock && (
            <div className="out-of-stock-overlay">
              <Tag color="red">HẾT HÀNG</Tag>
            </div>
          )}
        </div>
      }
    >
      <div className="card-content">
        <div className="card-body">
          <Tag color="blue" className="brand-tag">
            {product.brand?.name}
          </Tag>

          <Tooltip title={product.name}>
            <Typography.Text
              className="product-name text-sm"
              onClick={goToDetail}
              style={{ cursor: "pointer" }}
            >
              {product.name}
            </Typography.Text>
          </Tooltip>
        </div>

        <div className="card-footer">
          <Typography.Text className="text-md price">
            {displayPrice()}
          </Typography.Text>

          <Flex gap="small">
            <AppButton
              label={isOutOfStock ? "Hết hàng" : "Mua ngay"}
              disabled={isOutOfStock}
              onClick={() => {
                if (isOutOfStock) return;
                const variantId = product.variants?.[0]?.id || product.id;
                navigate("/checkout", {
                  state: {
                    buyNowItem: {
                      variantId,
                      quantity: 1,
                      slug: product.slug,
                      sku: product.sku,
                    },
                  },
                });
              }}
            />
            <BorderButton
              label="Thêm giỏ hàng"
              disabled={isOutOfStock}
              onClick={(e) => {
                if (isOutOfStock) return;
                const variantId = product.variants?.[0]?.id || product.id;
                handleAddToCart(
                  [
                    {
                      slug: product.slug,
                      variantId,
                      quantity: 1,
                      sku: product.sku,
                    },
                  ],
                  e,
                );
              }}
            />
          </Flex>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
