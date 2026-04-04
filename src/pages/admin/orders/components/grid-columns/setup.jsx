import { formatCurrency } from "@/components/utils/format-currency";
import { formatStatus } from "@/components/utils/format-status";
import { formatPaymentMethod } from "@/components/utils/payment-method";

export const getOrderColumns = () => {
  return [
    { field: "tracking_code", headerName: "Mã vận đơn", width: 150 },
    { field: "shipping_name", headerName: "Khách hàng", width: 200 },
    {
      field: "total_amount",
      headerName: "Tổng tiền",
      width: 150,
      valueFormatter: (value, row) => formatCurrency(row.total_amount),
    },
    {
      field: "shipping_fee",
      headerName: "Phí ship",
      width: 150,
      valueFormatter: (value, row) => formatCurrency(row.shipping_fee),
    },
    {
      field: "status",
      headerName: "Trạng thái",
      width: 150,
      valueFormatter: (value, row) => formatStatus(row.status),
    },
    {
      field: "payment_method",
      headerName: "Phương thức thanh toán",
      width: 200,
      valueFormatter: (value, row) => formatPaymentMethod(row.payment_method),
    },
    {
      field: "payment_status",
      headerName: "Trạng thái thanh toán",
      width: 150,
      valueFormatter: (value, row) => formatStatus(row.payment_status),
    },
    {
      field: "created_at",
      headerName: "Ngày tạo",
      width: 250,
      valueFormatter: (value, row) =>
        new Date(row.created_at).toLocaleString("vi-VN"),
    },
  ];
};
