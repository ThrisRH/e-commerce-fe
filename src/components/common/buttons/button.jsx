import { Button } from "antd";

const AppButton = ({
  label,
  onClick,
  disabled = false,
  loading = false,
  width = "100%",
  type = "primary",
}) => {
  return (
    <Button
      // @ts-ignore
      type={type}
      onClick={onClick}
      disabled={disabled}
      loading={loading}
      style={{
        width: width,
        height: "48px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontWeight: 600,
        borderRadius: "4px",
      }}
    >
      {label}
    </Button>
  );
};

export default AppButton;
