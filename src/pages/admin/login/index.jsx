import React from "react";
import LoginComponent from "@/components/common/auth/LoginComponent";

const AdminLogin = () => {
  return <LoginComponent isAdmin={true} title="Admin Portal Sign In" />;
};

export default AdminLogin;
