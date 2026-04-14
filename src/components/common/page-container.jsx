import React from "react";
import { Container } from "@mui/material";

const PageContainer = ({ children }) => {
  return <Container sx={{ py: 4 }}>{children}</Container>;
};

export default PageContainer;
