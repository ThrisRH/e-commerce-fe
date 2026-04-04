export const formatStatus = (status) => {
  switch (status) {
    // Case order status
    case "pending":
      return "Chờ xử lý";
    case "confirmed":
      return "Đã xác nhận";
    case "shipping":
      return "Đang giao hàng";
    case "delivered":
      return "Đã giao hàng";
    case "cancelled":
      return "Đã hủy";

    // Case payment method
    case "paid":
      return "Đã thanh toán";
    case "failed":
      return "Thanh toán thất bại";
    case "refund":
      return "Đã hoàn tiền";

    default:
      return "Không xác định";
  }
};
