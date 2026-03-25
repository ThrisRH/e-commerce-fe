import React, { useEffect, useState } from "react";
import { Typography, Breadcrumb, Card, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchCategories } from "@/api/categories/CategoryApi";

const { Title } = Typography;

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "name", headerName: "Name", width: 250 },
  { field: "slug", headerName: "Slug", width: 250 },
  { field: "description", headerName: "Description", width: 300 },
  {
    field: "parent_category",
    headerName: "Parent",
    width: 200,
    valueGetter: (value, row) => row?.parent_category?.name || "N/A",
  },
  {
    field: "is_active",
    headerName: "Active",
    width: 120,
    valueGetter: (value, row) => (row?.is_active == 1 ? "Bật" : "Tắt"),
  },
];

const CategoriesManagement = () => {
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

  return (
    <Space direction="vertical" style={{ width: "100%" }} size="large">
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <Breadcrumb
            items={[{ title: "Admin" }, { title: "Quản Lý Danh Mục" }]}
          />
          <Title level={2} style={{ margin: "8px 0 0" }}>
            Quản Lý Danh Mục
          </Title>
        </div>
        <Button type="primary" icon={<PlusOutlined />} size="large">
          Thêm Danh Mục
        </Button>
      </div>

      <Card
        style={{
          borderRadius: 8,
          boxShadow:
            "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Box sx={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={categories}
            columns={columns}
            loading={isLoading}
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            sx={{
              border: "none",
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
            }}
          />
        </Box>
      </Card>
    </Space>
  );
};

export default CategoriesManagement;
