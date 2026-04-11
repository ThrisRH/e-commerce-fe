import React, { useEffect, useState, useCallback } from "react";
import { Typography, Breadcrumb, Card, Space, Input } from "antd";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchProducts, searchProducts, deleteProduct } from "@/api/products/product-api";
import { ProductResponse } from "@/models/product";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import CreateProductModal from "./sections/create-form";
import { getProductColumns } from "./sections/grid-columns/setup";
import { Meta } from "@/models/MetaData/meta";
import AppButton from "@/components/common/buttons/button";

const { Title } = Typography;
const { Search } = Input;

const ProductsManagement = () => {
  const navigate = useNavigate();

  /** @type {[ProductResponse, Function]} */
  const [products, setProducts] = useState(new ProductResponse());
  const [isLoading, setIsLoading] = useState(true);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");

  const loadProducts = useCallback(() => {
    setIsLoading(true);
    const fetchFunc = searchKeyword 
      ? searchProducts(searchKeyword, paginationModel.page + 1, paginationModel.pageSize)
      : fetchProducts({
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize,
        });

    fetchFunc
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [paginationModel, searchKeyword]);

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

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSearch = (value) => {
    setSearchKeyword(value);
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  };

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
        <div style={{ width: 200 }}>
          <AppButton
            label={"Thêm Sản Phẩm"}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <Search
          placeholder="Tìm kiếm sản phẩm theo tên..."
          onSearch={handleSearch}
          allowClear
          enterButton
          style={{ width: 400 }}
        />
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
            rows={Array.isArray(products.data) ? products.data : []}
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
              navigate(`/admin/products/${params.row.slug}`)
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
