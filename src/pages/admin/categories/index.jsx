import React, { useEffect, useState, useCallback } from "react";
import { Typography, Breadcrumb, Card, Button, Space, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchCategories, deleteCategory, searchCategories } from "@/api/categories/category-api";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import CreateCategoryModal from "./sections/create-form";
import { getCategoryColumns } from "./sections/grid-columns/setup";
import { Meta } from "@/models/MetaData/meta";
import AppButton from "@/components/common/buttons/button";

const { Title } = Typography;
const { Search } = Input;

const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [meta, setMeta] = useState(new Meta());
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [searchKeyword, setSearchKeyword] = useState("");
  const navigate = useNavigate();

  const loadCategories = useCallback(() => {
    setIsLoading(true);
    const fetchFunc = searchKeyword 
      ? searchCategories({
          keyword: searchKeyword,
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize,
        })
      : fetchCategories({
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize,
        });

    fetchFunc
      .then((data) => {
        setCategories(data.data);
        setMeta(data.meta);
      })
      .catch((error) => {
        enqueueSnackbar("Error fetching categories: " + error.message, {
          variant: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [paginationModel, searchKeyword]);

  const handleDelete = (id) => {
    deleteCategory(id)
      .then(() => {
        enqueueSnackbar("Xóa danh mục thành công", { variant: "success" });
        loadCategories();
      })
      .catch((error) => {
        enqueueSnackbar("Xóa danh mục thất bại: " + error.message, {
          variant: "error",
        });
      });
  };

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

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
            items={[{ title: "Admin" }, { title: "Quản Lý Danh Mục" }]}
          />
          <Title level={2} style={{ margin: "8px 0 0" }}>
            Quản Lý Danh Mục
          </Title>
        </div>
        <div style={{ width: 200 }}>
          <AppButton
            label={"Thêm Danh Mục"}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <Search
          placeholder="Tìm kiếm danh mục theo tên..."
          onSearch={handleSearch}
          allowClear
          enterButton
          style={{ width: 400 }}
        />
      </div>

      <CreateCategoryModal
        visible={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={loadCategories}
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
            rows={categories}
            columns={getCategoryColumns(handleDelete)}
            rowCount={meta.total}
            loading={isLoading}
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            onRowClick={(params) =>
              navigate(`/admin/categories/${params.row.id}`)
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

export default CategoriesManagement;
