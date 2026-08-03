import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import App from "./app.jsx";
import { ConfigProvider } from "antd";
import { AuthProvider } from "./context/auth-context";

const theme = {
  token: {
    colorPrimary: "var(--primary-main)",
    colorText: "var(--neutral-900)",
    colorTextSecondary: "var(--neutral-600)",

    fontSize: 16,
    borderRadius: 8,

    
    boxShadow: "var(--shadow-sm)",
  },
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ConfigProvider theme={theme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ConfigProvider>
  </StrictMode>,
);
