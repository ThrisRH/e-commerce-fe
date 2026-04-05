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
}) => {
  return (
    <TextField
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
