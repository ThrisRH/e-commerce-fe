import React, { useEffect, useState } from "react";
import { Box, Typography, Container, Paper, List } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchCategories } from "../../api/categories/CategoryApi";
import Category from "@/models/Category";

const columns = [
  { field: "id", headerName: "ID", width: 30 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "slug", headerName: "Slug", width: 200 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "image_url", headerName: "Image", flex: 1 },
  {
    field: "parent_id",
    headerName: "Parent",
    width: 150,
    valueGetter: (value, row) => row?.parent_category?.name || null,
  },
  {
    field: "is_active",
    headerName: "Active",
    width: 100,
    valueGetter: (value, row) =>
      row?.is_active == 1 ? "Đang bật" : "Đang tắt",
  },
];

const CategoriesManagement = () => {
  /** @type {[Category[], Function]} */
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    fetchCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  console.log(categories[5]);
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography
        variant="h2"
        sx={{ mb: 4, fontWeight: 700, color: "neutral.900" }}
      >
        Quản Lý Danh Mục
      </Typography>
      <Box>
        <DataGrid
          rows={categories}
          columns={columns}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
        />
      </Box>
    </Container>
  );
};

export default CategoriesManagement;
