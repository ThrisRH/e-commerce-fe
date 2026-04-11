import { Card, Tag, Typography, Tooltip, Flex } from "antd";
import { useNavigate } from "react-router-dom";
import "./style.css";
import AppButton from "@/components/common/buttons/button";
import BorderButton from "@/components/common/buttons/border-button";
import { handleAddToCart } from "@/utils/add-to-cart";
import { formatCurrency } from "@/utils/format-currency";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const goToDetail = () => {
    const sku =
      product.sku || (product.variants && product.variants[0]?.sku) || "";
    navigate(`/products/${product.slug}?sku=${sku}`);
  };

  const displayPrice = () => {
    if (product.price_min && product.price_max && product.price_min !== product.price_max) {
      return `${formatCurrency(product.price_min)} - ${formatCurrency(product.price_max)}`;
    }
    return formatCurrency(product.price_min || product.variants?.[0]?.price || 0);
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
          <Typography.Text className="text-lg price">
            {displayPrice()}
          </Typography.Text>

          <Flex gap="small">
            <AppButton
              label="Mua ngay"
              onClick={() => {
                navigate("/checkout", {
                  state: { buyNowItem: { id: product.id, quantity: 1 } },
                });
              }}
            />
            <BorderButton
              label="Thêm giỏ hàng"
              onClick={(e) =>
                handleAddToCart([{ productId: product.id, quantity: 1 }], e)
              }
            />
          </Flex>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
