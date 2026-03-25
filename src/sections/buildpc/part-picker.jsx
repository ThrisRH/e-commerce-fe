import React from "react";
import {
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Space,
  Card as AntdCard,
} from "antd";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button as MuiButton,
  Chip as MuiChip,
  Tooltip as MuiTooltip,
  Typography as MuiTypography,
  Box as MuiBox,
} from "@mui/material";
import { AddCircleOutline, CheckCircle } from "@mui/icons-material";
import { formatCurrency } from "../../components/utils/FormatCurrency";

const { Title, Text } = Typography;

const PartPicker = ({
  category,
  title,
  parts,
  selected,
  onSelect,
  onRemove,
}) => {
  const filtered = parts.filter((p) => p.category === category);

  return (
    <div id={`part-picker-${category}`} style={{ marginBottom: 48 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#fafafa",
          padding: "12px 24px",
          borderRadius: 8,
          marginBottom: 24,
          border: "1px solid #f0f0f0",
        }}
      >
        <Title level={4} style={{ margin: 0, fontWeight: 700 }}>
          {title}
        </Title>
        {selected && (
          <Tag
            color="red"
            closable
            onClose={(e) => {
              e.preventDefault();
              onRemove();
            }}
            style={{
              height: 32,
              display: "flex",
              alignItems: "center",
              borderRadius: 16,
              padding: "0 12px",
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            Đã chọn: {selected.name}
          </Tag>
        )}
      </div>

      <Row gutter={[16, 16]}>
        {filtered.map((part) => {
          const isSelected = selected?.id === part.id;
          return (
            <Col key={part.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                elevation={0}
                sx={{
                  border: isSelected
                    ? "2px solid #e53935"
                    : "1px solid #f0f0f0",
                  borderRadius: 2,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    borderColor: isSelected ? "#e53935" : "#e5393580",
                  },
                  position: "relative",
                  overflow: "visible",
                  bgcolor: isSelected ? "#fff8f7" : "#fff",
                }}
              >
                {isSelected && (
                  <CheckCircle
                    sx={{
                      position: "absolute",
                      top: -12,
                      right: -12,
                      color: "#e53935",
                      fontSize: 28,
                      bgcolor: "white",
                      borderRadius: "50%",
                      zIndex: 1,
                    }}
                  />
                )}
                <CardMedia
                  component="img"
                  image={part.image_url}
                  alt={part.name}
                  sx={{
                    height: 160,
                    objectFit: "contain",
                    p: 2,
                    bgcolor: "#f9f9f9",
                  }}
                />
                <CardContent sx={{ flexGrow: 1, px: 2, py: 1.5 }}>
                  <MuiChip
                    label={part.brand}
                    size="small"
                    sx={{
                      mb: 0.5,
                      fontSize: 10,
                      height: 20,
                      bgcolor: "#e53935",
                      color: "white",
                      fontWeight: 700,
                    }}
                  />
                  <MuiTooltip title={part.name} placement="top">
                    <MuiTypography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: 1.4,
                        mb: 0.5,
                        fontSize: 13,
                        color: "#262626",
                      }}
                    >
                      {part.name}
                    </MuiTypography>
                  </MuiTooltip>
                  <MuiTypography
                    variant="caption"
                    sx={{
                      color: "#8c8c8c",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      lineHeight: 1.3,
                    }}
                  >
                    {part.specs}
                  </MuiTypography>
                  <MuiTypography
                    variant="body1"
                    sx={{ color: "#e53935", fontWeight: 700, mt: 1 }}
                  >
                    {formatCurrency(part.price)}
                  </MuiTypography>
                </CardContent>
                <CardActions sx={{ px: 2, pb: 2 }}>
                  <MuiButton
                    fullWidth
                    variant={isSelected ? "contained" : "outlined"}
                    sx={{
                      fontWeight: 600,
                      textTransform: "none",
                      bgcolor: isSelected ? "#e53935" : "transparent",
                      borderColor: "#e53935",
                      color: isSelected ? "white" : "#e53935",
                      "&:hover": {
                        bgcolor: isSelected ? "#d32f2f" : "#e5393510",
                        borderColor: "#d32f2f",
                      },
                    }}
                    startIcon={
                      isSelected ? <CheckCircle /> : <AddCircleOutline />
                    }
                    onClick={() => (isSelected ? onRemove() : onSelect(part))}
                  >
                    {isSelected ? "Đã chọn" : "Chọn linh kiện"}
                  </MuiButton>
                </CardActions>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default PartPicker;
