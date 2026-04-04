import {
  AppstoreOutlined,
  DashboardOutlined,
  LogoutOutlined,
  OrderedListOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const menuItems = [
  {
    key: "/admin",
    icon: <DashboardOutlined />,
    label: "Dashboard",
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
    key: "/",
    icon: <LogoutOutlined />,
    label: "Quay lại Store",
    danger: true,
  },
];
