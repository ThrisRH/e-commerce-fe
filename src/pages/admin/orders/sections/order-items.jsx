import {
  Box,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { formatCurrency } from "@/utils/format-currency";

export default function OrderItems({ order }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
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
                  <TableCell align="center">{item.product_name}</TableCell>
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
                  <TableCell colSpan={6} align="center">
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
            Tạm tính: {formatCurrency(order.total_amount - order.shipping_fee)}
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
  );
}
