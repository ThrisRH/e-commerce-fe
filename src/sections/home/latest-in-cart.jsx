import { Row, Col } from "antd";
import { Box, Typography } from "@mui/material";
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

      <div style={{ background: "white", padding: "24px 16px" }}>
        <Row gutter={[12, 12]}>
          {latestProducts.map((product) => (
            <Col key={product.id} xs={12} sm={8} md={6} lg={6} xxl={4}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      </div>
    </Box>
  );
};

export default LatestProInCateSection;
