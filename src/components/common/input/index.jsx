
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
      onInput={(e) => {
        if (type === "number" && maxLength) {
          if (e.target.value.length > maxLength) {
            e.target.value = e.target.value.slice(0, maxLength);
          }
        }
      }}
      slotProps={{
        htmlInput: {
          maxLength: maxLength,
          readOnly: readOnly,
          min: type === "number" ? 0 : undefined,
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
