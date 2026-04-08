import { TextField } from "@mui/material";
import React from "react";

const AppInput = ({
  label,
  name,
  value,
  onChange,
  maxLength = 250,
  type = "text",
  readOnly = false,
  disabled = false,
}) => {
  return (
    <TextField
      disabled={disabled}
      fullWidth
      slotProps={{
        htmlInput: {
          maxLength: maxLength,
          readOnly: readOnly,
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
