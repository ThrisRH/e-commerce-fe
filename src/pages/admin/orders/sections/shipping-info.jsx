import { Card, CardContent, Grid, TextField, Typography } from "@mui/material";
import AppInput from "@/components/common/input";

export default function ShippingInfo({ order, handleChange }) {
  return (
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
              disabled
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <AppInput
              label="Số điện thoại"
              name="shipping_phone"
              value={order.shipping_phone || ""}
              onChange={() => {}}
              disabled
              maxLength={10}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Địa chỉ giao hàng"
              name="shipping_address"
              value={order.shipping_address || ""}
              disabled
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
              disabled
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
