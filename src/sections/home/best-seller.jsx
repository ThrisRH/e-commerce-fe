import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "../../components/ui/products/product-card";

const BestSellerSection = ({ bestSellers }) => {
  return (
    <Box sx={{ mb: 6, borderRadius: 1, overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
          backgroundColor: "#d32f2f",
          py: 1.5,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700, color: "white" }}>
          Bán Chạy Nhất
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          background: "linear-gradient(180deg, #ff7e70 0%, #ffd478 100%)",
          px: 2,
          py: 4,
        }}
      >
        {bestSellers.map((product) => (
          <Grid key={product.id} size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
            <ProductCard key={product.id} product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BestSellerSection;
