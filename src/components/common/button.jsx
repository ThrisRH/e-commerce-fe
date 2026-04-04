import { Button } from "antd/es/radio";

const AppButton = ({ label, onClick, disabled = false, width = "100%" }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: width,
        height: "48px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: disabled ? "var(--neutral-200)" : "var(--primary-main)",
        color: "white",
        padding: "8px",
      }}
    >
      {label}
    </Button>
  );
};

export default AppButton;
