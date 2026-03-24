import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchProducts } from "@/api/products/ProductApi";
import Product from "@/models/Product";
import { enqueueSnackbar } from "notistack";

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "price", headerName: "Price", width: 100 },
  { field: "stock", headerName: "Stock", width: 100 },
  {
    field: "category",
    headerName: "Category",
    width: 120,
    valueGetter: (value, row) => row?.category?.name || "",
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 120,
    valueGetter: (value, row) => row?.brand?.name || "",
  },
  { field: "is_active", headerName: "Active", width: 100 },
  { field: "created_at", headerName: "Created At", width: 100 },
  { field: "updated_at", headerName: "Updated At", width: 100 },
];

const ProductsManagement = () => {
  /** @type {[Product[], Function]} */
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchProducts()
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  console.log(products[0]);
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h2"
        sx={{ mb: 4, fontWeight: 700, color: "neutral.900" }}
      >
        Quản Lý Sản Phẩm
      </Typography>

      <DataGrid
        rows={products}
        columns={columns}
        pageSizeOptions={[10]}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 10 },
          },
          sorting: {
            sortModel: [{ field: "id", sort: "asc" }],
          },
        }}
      />
    </Container>
  );
};

export default ProductsManagement;
