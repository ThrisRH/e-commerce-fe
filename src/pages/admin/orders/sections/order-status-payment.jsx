import {
  Box,
  Card,
  CardContent,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { formatPaymentMethod } from "@/utils/payment-method";

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

export default function OrderStatusPayment({ order, handleChange }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
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
          disabled
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
  );
}
