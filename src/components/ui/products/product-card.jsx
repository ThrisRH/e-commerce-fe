import { Card, Tag, Typography, Button, Tooltip } from "antd";
import "./style.css";
import { formatCurrency } from "../../utils/format-currency";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  return (
    <Card
      hoverable
      className="product-card"
      cover={
        <div className="image-wrapper">
          <img
            alt={product.name}
            src={product.image_url}
            className="product-image"
          />
          <Tag className="tag">NEW</Tag>
        </div>
      }
    >
      <div className="card-content">
        <div className="card-body">
          <Tag color="blue" className="brand-tag">
            {product.brand.name}
          </Tag>

          <Tooltip title={product.name}>
            <Typography.Text className="product-name">
              {product.name}
            </Typography.Text>
          </Tooltip>
        </div>

        <div className="card-footer">
          <Typography.Text className="price">
            {formatCurrency(product.price)}
          </Typography.Text>

          <Button type="primary" block>
            Thêm vào giỏ hàng
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
