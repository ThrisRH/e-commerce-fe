import { updateOrder } from "@/api/orders/order-api";
import { Box, Container, Grid } from "@mui/material";
import { Breadcrumb, Typography as AntdTypography } from "antd";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppButton from "@/components/common/buttons/button";
import useOrderDetail from "@/hooks/orders/order-detail";
import Loading from "@/components/ui/state/loading";

// Import sections
import ShippingInfo from "./sections/shipping-info";
import OrderItems from "./sections/order-items";
import OrderStatusPayment from "./sections/order-status-payment";

const { Title: AntdTitle } = AntdTypography;

export default function OrderDetail() {
  const { id } = useParams();
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const { loading, order, setOrder, originData, loadData } = useOrderDetail(id);

  useEffect(() => {
    if (id) loadData();
  }, [id, loadData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      const payload = {
        status: order.status,
        payment_status: order.payment_status,
        tracking_code: order.tracking_code,
        note: order.note,
      };

      await updateOrder(id, payload);
      enqueueSnackbar("Đơn hàng đã được cập nhật thành công!", {
        variant: "success",
      });
      loadData();
    } catch (err) {
      enqueueSnackbar(err.message, { variant: "error" });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;
  if (!order) return <Box sx={{ p: 4 }}>Không tìm thấy đơn hàng</Box>;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Breadcrumb
            items={[
              { title: "Admin", href: "#" },
              { title: "Quản Lý Đơn Hàng", href: "/admin/orders" },
              { title: "Chi Tiết" },
            ]}
          />
          <AntdTitle level={2} style={{ margin: "8px 0 0" }}>
            Đơn Hàng: {order.tracking_code}
          </AntdTitle>
        </Box>
        <Box sx={{ width: 220 }}>
          <AppButton
            disabled={
              saving || JSON.stringify(originData) === JSON.stringify(order)
            }
            onClick={handleSubmit}
            label={saving ? "Đang lưu..." : "Lưu Thay Đổi"}
          />
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <ShippingInfo order={order} handleChange={handleChange} />
          <OrderItems order={order} />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <OrderStatusPayment order={order} handleChange={handleChange} />
        </Grid>
      </Grid>
    </Container>
  );
}
