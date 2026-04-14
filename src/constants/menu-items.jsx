import {
  AppstoreOutlined,
  DashboardOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  ShoppingOutlined,
  TagsOutlined,
  UserOutlined,
  CarOutlined,
} from "@ant-design/icons";

export const menuItems = [
  {
    key: "/admin",
    icon: <DashboardOutlined />,
    label: "Tổng Quan",
  },
  {
    key: "/admin/products",
    icon: <ShoppingOutlined />,
    label: "Sản phẩm",
  },
  {
    key: "/admin/categories",
    icon: <AppstoreOutlined />,
    label: "Danh mục",
  },
  {
    key: "/admin/attributes",
    icon: <TagsOutlined />,
    label: "Thuộc tính",
  },
  {
    key: "/admin/users",
    icon: <UserOutlined />,
    label: "Người dùng",
  },
  {
    key: "/admin/orders",
    icon: <OrderedListOutlined />,
    label: "Đơn hàng",
  },
  {
    key: "/admin/shipping",
    icon: <CarOutlined />,
    label: "Vận chuyển",
    children: [
      {
        key: "/admin/shipping/config",
        label: "Cấu hình phí ship",
      },
      {
        key: "/admin/shipping/calculator",
        label: "Tính phí vận chuyển",
      },
    ],
  },
  {
    key: "/",
    icon: <LogoutOutlined />,
    label: "Quay lại Store",
    danger: true,
  },
];
