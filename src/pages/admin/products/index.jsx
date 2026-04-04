import React, { useEffect, useState } from "react";
import { Typography, Breadcrumb, Card, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchProducts } from "@/api/products/product-lapi";
import { ProductResponse } from "@/models/product";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import CreateProductModal from "./components/create-form";
import { deleteProduct } from "@/api/products/product-lapi";
import { getProductColumns } from "./components/grid-columns/setup";
import { Meta } from "@/models/MetaData/meta";

const { Title } = Typography;

const ProductsManagement = () => {
  const navigate = useNavigate();

  /** @type {[ProductResponse, Function]} */
  const [products, setProducts] = useState(new ProductResponse());
  const [isLoading, setIsLoading] = useState(true);
  const [meta, setMeta] = useState(new Meta());
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = (id) => {
    deleteProduct(id)
      .then(() => {
        enqueueSnackbar("Xóa sản phẩm thành công", { variant: "success" });
        loadProducts();
      })
      .catch((error) => {
        enqueueSnackbar("Xóa sản phẩm thất bại: " + error.message, {
          variant: "error",
        });
      });
  };

  const loadProducts = () => {
    setIsLoading(true);
    fetchProducts(paginationModel.page + 1, paginationModel.pageSize)
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    loadProducts();
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
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => setIsModalOpen(true)}
        >
          Thêm Sản Phẩm
        </Button>
      </div>

      <CreateProductModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadProducts}
      />

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
            columns={getProductColumns(handleDelete)}
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
