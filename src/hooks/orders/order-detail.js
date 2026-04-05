import { useState, useCallback } from "react";
import { fetchOrderById } from "@/api/orders/order-api";
import { enqueueSnackbar } from "notistack";

const useOrderDetail = (id) => {
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [originData, setOriginData] = useState(null);

  const loadData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const data = await fetchOrderById(id);
      setOrder(data);
      setOriginData(data);
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    } finally {
      setLoading(false);
    }
  }, [id]);

  return {
    loading,
    order,
    setOrder,
    originData,
    loadData,
  };
};

export default useOrderDetail;
