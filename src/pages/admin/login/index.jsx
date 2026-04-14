import React from "react";
import LoginComponent from "@/components/common/auth/login-component";

const AdminLogin = () => {
  return <LoginComponent isAdmin={true} title="Đăng nhập Quản trị viên" />;
};

export default AdminLogin;
