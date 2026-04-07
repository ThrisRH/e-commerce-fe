import React from "react";
import { Input, Button, Typography } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const { Title } = Typography;

const SearchOrder = ({ searchValue, setSearchValue, handleSearch, loading }) => {
  return (
    <div style={{ textAlign: "center", marginBottom: 40 }}>
      <Title level={2}>Tra cứu đơn hàng</Title>
      <div
        style={{
          maxWidth: 600,
          margin: "24px auto auto",
          display: "flex",
          gap: 12,
        }}
      >
        <Input
          size="large"
          placeholder="Số điện thoại"
          prefix={<SearchOutlined />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onPressEnter={handleSearch}
        />
        <Button
          type="primary"
          size="large"
          onClick={handleSearch}
          loading={loading}
        >
          Tra cứu
        </Button>
      </div>
    </div>
  );
};

export default SearchOrder;
