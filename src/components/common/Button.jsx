import { Button } from "@mui/material";

const AppButton = ({ label, onClick }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        width: "100%",
        backgroundColor: "primary.main",
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
