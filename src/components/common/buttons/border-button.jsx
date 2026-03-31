import { Button } from "antd/es/radio";

const BorderButton = ({ label, onClick }) => {
  return (
    <Button
      onClick={onClick}
      style={{
        width: "100%",
        height: "48px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid var(--primary-main)",
        color: "var(--primary-main)",
        padding: "8px",
      }}
    >
      {label}
    </Button>
  );
};

export default BorderButton;
