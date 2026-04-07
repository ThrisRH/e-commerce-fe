import { Row, Col } from "antd";
import { Box, Typography } from "@mui/material";
import ProductCard from "../../components/ui/products/product-card";

const LatestProInCateSection = ({ latestProducts = [], cateName }) => {
  if (latestProducts.length === 0) {
    return null;
  }

  return (
    <Box sx={{ overflow: "hidden" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "left",
          alignContent: "center",
          width: "100%",
          backgroundColor: "white",
          borderBottom: "1px solid #c4c4c447",
          px: 2,
          py: 3,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, color: "#1c1c1c" }}>
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
