export const formatPaymentMethod = (method) => {
  switch (method) {
    case "cod":
      return "Thanh toán khi nhận hàng";
    case "bank_transfer":
      return "Chuyển khoản ngân hàng";
    default:
      return "Không xác định";
  }
};
