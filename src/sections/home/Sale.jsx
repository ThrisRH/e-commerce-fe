import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "../../components/ui/products/product-card";

const SaleSection = ({ saleProducts }) => {
  return (
    <Box sx={{ mb: 6, borderRadius: 1, overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          width: "100%",
          backgroundColor: "primary.main",
          py: 1.5,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700, color: "white" }}>
          Đang Khuyến Mãi
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          background: "linear-gradient(180deg, #ff7e5f 0%, #ffc9a0 100%)",
          px: 2,
          py: 4,
        }}
      >
        {saleProducts.map((product) => (
          <Grid key={product.id} size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
            <ProductCard key={product.id} product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SaleSection;
