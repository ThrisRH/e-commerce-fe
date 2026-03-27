import React, { useEffect, useState } from "react";
import { Typography, Breadcrumb, Card, Button, Space } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchCategories, deleteCategory } from "@/api/categories/category-lapi";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { DeleteOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";
import CreateCategoryModal from "./components/create-form";


const { Title } = Typography;



const CategoriesManagement = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const loadCategories = () => {
    setIsLoading(true);
    fetchCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch((error) => {
        enqueueSnackbar("Error fetching categories: " + error.message, { variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Space size="middle" onClick={(e) => e.stopPropagation()}>
          <Popconfirm
            title="Xóa danh mục"
            description="Bạn có chắc chắn muốn xóa danh mục này không? Các sản phẩm trong danh mục này có thể bị ảnh hưởng."
            onConfirm={() => handleDelete(params.row.id)}
            okText="Yes"
            cancelText="No"
            placement="leftTop"
          >
            <Button
              danger
              icon={<DeleteOutlined />}
              type="text"
              size="small"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    loadCategories();
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
         <Button
           type="primary"
           icon={<PlusOutlined />}
           size="large"
           onClick={() => setIsModalOpen(true)}
         >
           Thêm Danh Mục
         </Button>
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
            columns={columns}
            loading={isLoading}
            pageSizeOptions={[10, 25, 50]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
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
