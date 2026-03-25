import { TextField } from "@mui/material";
import React from "react";

const AppInput = ({
  label,
  name,
  value,
  onChange,
  maxLength = 250,
  type = "text",
}) => {
  return (
    <TextField
      fullWidth
      slotProps={{
        htmlInput: {
          maxLength: maxLength,
        },
      }}
      type={type}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default AppInput;
