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
import { ProductResponse } from "@/models/Product";
import { enqueueSnackbar } from "notistack";
import { formatCurrency } from "@/components/utils/FormatCurrency";

const columns = [
  { field: "name", headerName: "Name", width: 300 },
  { field: "description", headerName: "Description", width: 200 },
  {
    field: "price",
    headerName: "Price",
    width: 150,
    valueGetter: (value, row) => formatCurrency(row?.price),
  },
  {
    field: "stock",
    headerName: "Stock",
    width: 100,
  },
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
  {
    field: "is_active",
    headerName: "Active",
    width: 100,
    valueGetter: (value, row) =>
      row?.is_active == 1 ? "Selling" : "Stop Selling",
  },
  { field: "created_at", headerName: "Created At", width: 100 },
  { field: "updated_at", headerName: "Updated At", width: 100 },
];

const ProductsManagement = () => {
  /** @type {[ProductResponse, Function]} */
  const [products, setProducts] = useState(new ProductResponse());
  const [isLoading, setIsLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    setIsLoading(true);
    fetchProducts(paginationModel.page + 1)
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [paginationModel]);

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h2"
        sx={{ mb: 4, fontWeight: 700, color: "neutral.900" }}
      >
        Quản Lý Sản Phẩm
      </Typography>

      <DataGrid
        rows={products.data}
        columns={columns}
        loading={isLoading}
        rowCount={products.meta.total}
        pageSizeOptions={[10]}
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: products.meta.per_page,
            },
          },
          sorting: {
            sortModel: [{ field: "name", sort: "asc" }],
          },
        }}
      />
    </Container>
  );
};

export default ProductsManagement;
