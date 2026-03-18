import { Box, Typography } from "@mui/material";
import AppButton from "../../common/Button";
import { formatCurrency } from "../../utils/FormatCurrency";
import type { Product } from "../../../types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
        border: "1px solid #efefef",
        borderRadius: 2,
        px: 2,
        pb: 2,
        width: "100%",
        maxWidth: 240,
        backgroundColor: "white",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: 2,
        },
      }}
    >
      <Box
        component="img"
        src={
          product.image_url ||
          "https://lh3.googleusercontent.com/jn8jzpCISPJuxhVj9idFHpAJebF0QoPDfQDjebh3SxupE6DN3LcNTsxk0SDlGnce7yPg5lHR4iCFoXL-hMbdljGI6QUywVqJ=w230-rw"
        }
        alt={product.name}
        sx={{ width: "100%", height: "auto", objectFit: "contain" }}
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", flexGrow: 1, gap: 1 }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 500,
            height: "3em",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.name}
          {product.specs && (
            <>
              <br />({product.specs})
            </>
          )}
        </Typography>
        {product.sale_price !== product.price ? (
          <>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <Typography
                variant="body2"
                sx={{
                  color: "neutral.500",
                  fontWeight: 500,
                  textDecoration: "line-through",
                }}
              >
                {formatCurrency(product.price)}
              </Typography>

              <Typography
                variant="body1"
                sx={{ color: "primary.main", fontWeight: 700 }}
              >
                {formatCurrency(product.sale_price)}
              </Typography>
            </Box>
          </>
        ) : (
          <Typography
            variant="body1"
            sx={{ color: "primary.main", fontWeight: 700, mt: "auto" }}
          >
            {formatCurrency(product.price)}
          </Typography>
        )}
      </Box>
      <AppButton label="Thêm vào giỏ" onClick={() => {}} />
    </Box>
  );
};

export default ProductCard;
