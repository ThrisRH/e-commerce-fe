import { formatCurrency } from "@/utils/format-currency";
import { formatStatus } from "@/utils/format-status";
import { formatPaymentMethod } from "@/utils/payment-method";
import { MenuItem, Select } from "@mui/material";

export const getOrderColumns = (onUpdateStatus) => {
  return [
    {
      field: "id",
      headerName: "ID",
      width: 70,
    },
    { field: "tracking_code", headerName: "Mã vận đơn", width: 150 },
    { field: "shipping_name", headerName: "Khách hàng", width: 150 },
    { field: "shipping_phone", headerName: "Số điện thoại", width: 150 },
    { field: "shipping_address", headerName: "Địa chỉ", width: 150 },
    {
      field: "total",
      headerName: "Tổng tiền",
      width: 130,
      valueFormatter: (value, row) => formatCurrency(row.total),
    },
    {
      field: "status",
      headerName: "Trạng thái đơn",
      width: 160,
      renderCell: (params) => (
        <Select
          value={params.row.status}
          size="small"
          fullWidth
          onClick={(e) => e.stopPropagation()}
          onChange={(e) =>
            onUpdateStatus(params.row.id, { status: e.target.value })
          }
          sx={{ fontSize: "0.875rem" }}
        >
          <MenuItem value="pending">Chờ xử lý</MenuItem>
          <MenuItem value="confirmed">Đã xác nhận</MenuItem>
          <MenuItem value="shipping">Đang giao</MenuItem>
          <MenuItem value="delivered">Đã giao</MenuItem>
          <MenuItem value="cancelled">Đã hủy</MenuItem>
        </Select>
      ),
    },
    {
      field: "payment_status",
      headerName: "Thanh toán",
      width: 160,
      renderCell: (params) => (
        <Select
          value={params.row.payment_status}
          size="small"
          fullWidth
          onClick={(e) => e.stopPropagation()}
          onChange={(e) =>
            onUpdateStatus(params.row.id, { payment_status: e.target.value })
          }
          sx={{ fontSize: "0.875rem" }}
        >
          <MenuItem value="pending">Chờ thanh toán</MenuItem>
          <MenuItem value="paid">Đã thanh toán</MenuItem>
          <MenuItem value="failed">Thất bại</MenuItem>
          <MenuItem value="refund">Đã hoàn tiền</MenuItem>
        </Select>
      ),
    },
    {
      field: "payment_method",
      headerName: "Phương thức",
      width: 150,
      valueFormatter: (value, row) => formatPaymentMethod(row.payment_method),
    },
    {
      field: "created_at",
      headerName: "Ngày tạo",
      width: 180,
      valueFormatter: (value, row) =>
        new Date(row.created_at).toLocaleString("vi-VN"),
    },
  ];
};
