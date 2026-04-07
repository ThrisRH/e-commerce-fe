export const STATUS_MAP = {
  pending: {
    title: "Chờ xử lý",
    color: "yellow",
    step: 0,
  },
  confirmed: {
    title: "Đã xác nhận",
    color: "blue",
    step: 1,
  },
  shipping: {
    title: "Đang giao hàng",
    color: "processing",
    step: 2,
  },
  delivered: {
    title: "Đã giao hàng",
    color: "green",
    step: 3,
  },
  cancelled: {
    title: "Đã hủy",
    color: "red",
    step: -1,
  },
};
