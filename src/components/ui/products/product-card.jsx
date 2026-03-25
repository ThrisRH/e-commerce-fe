import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Tooltip,
  Typography,
} from "@mui/material";
import { formatCurrency } from "../../utils/FormatCurrency";
import AppButton from "../../common/button";

const ProductCard = ({ product }) => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s, border-color 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
        },
        position: "relative",
        overflow: "visible",
        py: 2,
      }}
    >
      <CardMedia
        component="img"
        image={product.image_url}
        alt={product.name}
        sx={{
          height: 160,
          objectFit: "contain",
          p: 2,
          bgcolor: "neutral.50",
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          px: 2,
          py: 1.5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Chip
            label={product.brand_id}
            size="small"
            sx={{
              mb: 0.5,
              fontSize: 10,
              height: 20,
              width: "fit-content",
              bgcolor: "primary.main",
              color: "white",
              fontWeight: 700,
            }}
          />
          <Tooltip title={product.name} placement="top">
            <Typography
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
              }}
            >
              {product.name}
            </Typography>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
            gap: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{ color: "primary.main", fontWeight: 700, mt: 1 }}
          >
            {formatCurrency(product.price)}
          </Typography>
          <AppButton label="Thêm vào giỏ hàng" onClick={() => {}} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
