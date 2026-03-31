import { Box, Grid, Typography } from "@mui/material";
import ProductCard from "../../components/ui/products/product-card";

const LatestProInCateSection = ({ latestProducts = [], cateName }) => {
  if (latestProducts.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mb: 6, borderRadius: 1, overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignContent: "center",
          width: "100%",
          backgroundColor: "#d32f2f",
          px: 2,
          py: 1.5,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 700, color: "white" }}>
          {cateName}
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          background: "white",
          px: 2,
          py: 4,
        }}
      >
        {latestProducts.map((product) => (
          <Grid key={product.id} size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
            <ProductCard key={product.id} product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default LatestProInCateSection;
