import { Button } from "@mui/material";

const AppButton = ({ label, onClick, disabled = false }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      sx={{
        width: "100%",
        backgroundColor: disabled ? "neutral.200" : "primary.main",
        color: "white",
        borderRadius: 1,
        p: 1,
      }}
    >
      {label}
    </Button>
  );
};

export default AppButton;
