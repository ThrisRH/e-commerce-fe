import { Button } from "antd";

const BorderButton = ({
  label,
  onClick,
  disabled = false,
  loading = false,
  width = "100%",
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      style={{
        width: width,
        height: "48px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid var(--primary-main)",
        color: "var(--primary-main)",
        padding: "8px",
        borderRadius: "4px",
      }}
    >
      {label}
    </Button>
  );
};

export default BorderButton;
