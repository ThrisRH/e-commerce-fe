import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { ArrowBack as ArrowLeftIcon } from "@mui/icons-material";
import { Breadcrumb, Typography as AntdTypography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title: AntdTitle } = AntdTypography;

const PageHeader = ({ title, subtitle, extra, onBack, breadcrumbItems }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mb: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        {onBack && (
          <IconButton
            onClick={onBack === true ? () => navigate(-1) : onBack}
            sx={{ bgcolor: "background.paper", boxShadow: 1 }}
          >
            <ArrowLeftIcon />
          </IconButton>
        )}
        <Box>
          {breadcrumbItems && (
            <Breadcrumb items={breadcrumbItems} style={{ marginBottom: 4 }} />
          )}
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      {extra && <Box sx={{ display: "flex", gap: 2 }}>{extra}</Box>}
    </Box>
  );
};

export default PageHeader;
