import React, { useEffect, useState } from "react";
import { Typography, Breadcrumb, Card, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchProducts } from "@/api/products/ProductApi";
import { ProductResponse } from "@/models/product";
import { enqueueSnackbar } from "notistack";
import { formatCurrency } from "@/components/utils/FormatCurrency";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

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
  { field: "created_at", headerName: "Created At", width: 150 },
  { field: "updated_at", headerName: "Updated At", width: 150 },
];

const ProductsManagement = () => {
  const navigate = useNavigate();

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
            items={[{ title: "Admin" }, { title: "Quản Lý Sản Phẩm" }]}
          />
          <Title level={2} style={{ margin: "8px 0 0" }}>
            Quản Lý Sản Phẩm
          </Title>
        </div>
        <Button type="primary" icon={<PlusOutlined />} size="large">
          Thêm Sản Phẩm
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
            rows={products.data}
            columns={columns}
            loading={isLoading}
            rowCount={products.meta.total}
            pageSizeOptions={[10, 25, 50]}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 10,
                },
              },
            }}
            onRowClick={(params) =>
              navigate(`/admin/products/${params.row.id}`)
            }
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

export default ProductsManagement;
