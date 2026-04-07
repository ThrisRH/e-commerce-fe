import React, { useState } from "react";
import { Card, Divider, Empty } from "antd";
import { trackOrder } from "@/api/orders/order-api";
import { enqueueSnackbar } from "notistack";
import Order from "@/models/order";

// Sections
import SearchOrder from "./sections/search-order";
import OrderStatus from "./sections/order-status";
import ReceiverInfo from "./sections/receiver-info";
import ProductDetails from "./sections/product-details";
import { STATUS_MAP } from "./constants";

const OrderTracking = () => {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  /**@type {[Order, function]} */
  const [order, setOrder] = useState(null);

  const handleSearch = async () => {
    if (!searchValue) {
      enqueueSnackbar("Vui lòng nhập số điện thoại", {
        variant: "warning",
      });
      return;
    }

    setLoading(true);
    try {
      const data = await trackOrder(searchValue);
      setOrder(data[0]);
    } catch (err) {
      setOrder(null);
      enqueueSnackbar(err.message || "Không tìm thấy đơn hàng", {
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px 20px", maxWidth: 1000, margin: "0 auto" }}>
      <SearchOrder
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
        loading={loading}
      />

      {order ? (
        <Card
          bordered={false}
          style={{
            borderRadius: 16,
            boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
          }}
        >
          <OrderStatus order={order} statusMap={STATUS_MAP} />

          <Divider />

          <ReceiverInfo order={order} />

          <Divider />

          <ProductDetails order={order} />
        </Card>
      ) : (
        !loading &&
        searchValue && (
          <Empty description="Không tìm thấy thông tin đơn hàng của bạn. Vui lòng kiểm tra lại thông tin." />
        )
      )}
    </div>
  );
};

export default OrderTracking;
