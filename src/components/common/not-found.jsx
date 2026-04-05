import React from "react";
import { Button, Empty, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { ShoppingOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const NotFound = ({ 
  title = "Sản phẩm không tồn tại", 
  description = "Rất tiếc, chúng tôi không tìm thấy nội dung bạn yêu cầu. Hãy thử tìm kiếm với từ khóa khác.",
  showButton = true,
  buttonText = "Tiếp tục mua sắm",
  onButtonClick = null
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    } else {
      navigate("/");
    }
  };

  return (
    <div 
      style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        padding: "80px 24px",
        textAlign: "center",
        backgroundColor: "#fff",
        borderRadius: 16,
        margin: "24px 0"
      }}
    >
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{ height: 120, marginBottom: 24 }}
        description={null}
      />
      <Title level={3} style={{ marginBottom: 8, color: "#1f1f1f" }}>
        {title}
      </Title>
      <Text type="secondary" style={{ display: "block", marginBottom: 32, maxWidth: 400, fontSize: 16 }}>
        {description}
      </Text>
      {showButton && (
        <Button 
          type="primary" 
          size="large"
          icon={<ShoppingOutlined />}
          onClick={handleButtonClick}
          style={{ 
            height: 48, 
            padding: "0 32px", 
            borderRadius: 24, 
            backgroundColor: "#e53935",
            border: "none",
            boxShadow: "0 4px 12px rgba(229, 57, 53, 0.2)"
          }}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default NotFound;
