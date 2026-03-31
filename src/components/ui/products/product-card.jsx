import { Card, Tag, Typography, Button, Tooltip, Space, Flex } from "antd";
import "./style.css";
import { formatCurrency } from "../../utils/format-currency";
import AppButton from "@/components/common/button";
import { IconButton } from "@mui/material";
import BorderButton from "@/components/common/buttons/border-button";

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
          <Typography.Title level={4} className="price">
            {formatCurrency(product.price)}
          </Typography.Title>

          <Flex gap={"small"}>
            <AppButton label={"Mua ngay"} onClick={undefined} />
            <BorderButton label={"Thêm giỏ hàng"} onClick={undefined} />
          </Flex>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
