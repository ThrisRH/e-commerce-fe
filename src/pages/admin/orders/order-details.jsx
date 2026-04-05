import { fetchOrderById, updateOrder } from "@/api/orders/order-api";
import {
  Box,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import { Breadcrumb, Typography as AntdTypography } from "antd";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppButton from "@/components/common/button";
import AppInput from "@/components/common/input";
import useOrderDetail from "@/hooks/orders/order-detail";
import Loading from "@/components/ui/state/loading";
import { formatCurrency } from "@/components/utils/format-currency";
import { formatStatus } from "@/components/utils/format-status";
import { formatPaymentMethod } from "@/components/utils/payment-method";

const { Title: AntdTitle } = AntdTypography;

const ORDER_STATUSES = [
  { value: "pending", label: "Chờ xử lý" },
  { value: "confirmed", label: "Đã xác nhận" },
  { value: "shipping", label: "Đang giao hàng" },
  { value: "delivered", label: "Đã giao hàng" },
  { value: "cancelled", label: "Đã hủy" },
];

const PAYMENT_STATUSES = [
  { value: "pending", label: "Chờ thanh toán" },
  { value: "paid", label: "Đã thanh toán" },
  { value: "failed", label: "Thanh toán thất bại" },
  { value: "refund", label: "Đã hoàn tiền" },
];

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
          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              mb: 3,
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Thông Tin Giao Hàng
              </Typography>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <AppInput
                    label="Người nhận"
                    name="shipping_name"
                    value={order.shipping_name || ""}
                    onChange={() => {}}
                    readOnly
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <AppInput
                    label="Số điện thoại"
                    name="shipping_phone"
                    value={order.shipping_phone || ""}
                    onChange={() => {}}
                    readOnly
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Địa chỉ giao hàng"
                    name="shipping_address"
                    value={order.shipping_address || ""}
                    slotProps={{
                      htmlInput: {
                        readOnly: true,
                      },
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Ghi chú đơn hàng"
                    name="note"
                    value={order.note || ""}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card
            sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Chi Tiết Sản Phẩm
              </Typography>
              <TableContainer component={Paper} elevation={0}>
                <Table>
                  <TableHead sx={{ bgcolor: "grey.50" }}>
                    <TableRow>
                      <TableCell>Sản phẩm</TableCell>
                      <TableCell align="center">Tên sản phẩm</TableCell>
                      <TableCell align="center">Hình ảnh</TableCell>
                      <TableCell align="center">Giá</TableCell>
                      <TableCell align="center">Số lượng</TableCell>
                      <TableCell align="right">Thành tiền</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>#{item.product_id}</TableCell>
                        <TableCell align="center">
                          <img
                            src={item.product_image}
                            style={{ width: 50, height: 50 }}
                            alt={item.product_name}
                          />
                        </TableCell>
                        <TableCell align="center">
                          {item.product_name}
                        </TableCell>
                        <TableCell align="right">
                          {formatCurrency(item.price || 0)}
                        </TableCell>
                        <TableCell align="center">{item.quantity}</TableCell>
                        <TableCell align="right">
                          {formatCurrency(item.total || 0)}
                        </TableCell>
                      </TableRow>
                    ))}
                    {order.items.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} align="center">
                          Không có sản phẩm trong đơn hàng
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 1,
                }}
              >
                <Typography variant="body2">
                  Tạm tính:{" "}
                  {formatCurrency(order.total_amount - order.shipping_fee)}
                </Typography>
                <Typography variant="body2">
                  Phí ship: {formatCurrency(order.shipping_fee)}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Tổng cộng: {formatCurrency(order.total_amount)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card
            sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                Trạng Thái & Thanh Toán
              </Typography>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Trạng thái đơn hàng</InputLabel>
                <Select
                  name="status"
                  label="Trạng thái đơn hàng"
                  value={order.status || ""}
                  onChange={handleChange}
                >
                  {ORDER_STATUSES.map((stat) => (
                    <MenuItem key={stat.value} value={stat.value}>
                      {stat.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel>Trạng thái thanh toán</InputLabel>
                <Select
                  name="payment_status"
                  label="Trạng thái thanh toán"
                  value={order.payment_status || ""}
                  onChange={handleChange}
                >
                  {PAYMENT_STATUSES.map((stat) => (
                    <MenuItem key={stat.value} value={stat.value}>
                      {stat.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Divider sx={{ my: 3 }} />

              <TextField
                fullWidth
                label="Mã vận đơn (nếu có)"
                name="tracking_code"
                placeholder="VD: GHN123456"
                value={order.tracking_code || ""}
                onChange={handleChange}
                sx={{ mb: 3 }}
              />

              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Phương thức: {formatPaymentMethod(order.payment_method)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ngày đặt: {new Date(order.created_at).toLocaleString("vi-VN")}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
