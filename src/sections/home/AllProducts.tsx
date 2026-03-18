import {
  Box,
  Grid,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ProductCard from "../../components/ui/products/ProductCard";
import type { Product } from "../../types/product";

interface AllProductsSectionProps {
  products: Product[];
  sortOrder: "latest" | "oldest";
  onSortChange: (order: "latest" | "oldest") => void;
}

const AllProductsSection = ({
  products,
  sortOrder,
  onSortChange,
}: AllProductsSectionProps) => {
  return (
    <Box id="all-products">
      <Box sx={{ mb: 6, borderRadius: 1, overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            backgroundColor: "neutral.100",
            px: 3,
            py: 1.5,
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: 700, color: "neutral.900" }}>
            Tất Cả Sản Phẩm
          </Typography>
          <FormControl
            sx={{
              minWidth: 200,
              "& .MuiOutlinedInput-root": {
                color: "neutral.900",
                "& fieldset": { borderColor: "neutral.400" },
                "&:hover fieldset": { borderColor: "primary.main" },
              },
              "& .MuiInputLabel-root": { color: "neutral-600" },
              "& .MuiSelect-icon": { color: "neutral.900" },
            }}
          >
            <InputLabel id="sort-label">Sắp xếp theo</InputLabel>
            <Select
              labelId="sort-label"
              value={sortOrder}
              label="Sắp xếp theo"
              size="small"
              onChange={(e) =>
                onSortChange(e.target.value as "latest" | "oldest")
              }
            >
              <MenuItem value="latest">Mới nhất</MenuItem>
              <MenuItem value="oldest">Cũ nhất</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Grid
          container
          spacing={2}
          sx={{
            background: "linear-gradient(180deg, #ece9e6 0%, #ffffff 100%)",
            px: 2,
            py: 4,
          }}
        >
          {products.map((product) => (
            <Grid key={product.id} size={{ xs: 6, sm: 4, md: 3, lg: 2.4 }}>
              <ProductCard key={product.id} product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default AllProductsSection;
