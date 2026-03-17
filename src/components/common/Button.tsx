import { Button } from "@mui/material";
import React from "react";

type AppButtonProps = {
  label: string;
  onClick: () => void;
};

const AppButton = ({ label, onClick }: AppButtonProps) => {
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
