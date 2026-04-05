import React, { useEffect, useState, useCallback } from "react";
import { Typography, Breadcrumb, Card, Button, Space, Tabs } from "antd";
import { PlusOutlined, UserOutlined, TeamOutlined } from "@ant-design/icons";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchUsers, deleteUser } from "@/api/users/user-lapi";
import { Meta } from "@/models/MetaData/meta";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { getUserColumns } from "./components/grid-columns/setup";

const { Title } = Typography;

const UsersManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("customer");

  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState(new Meta());
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const loadUsers = useCallback(() => {
    setIsLoading(true);
    fetchUsers(paginationModel.page + 1, paginationModel.pageSize, activeTab)
      .then((data) => {
        setUsers(Array.isArray(data.data) ? data.data : [data.data]);
        setMeta(data.meta);
      })
      .catch((error) => {
        enqueueSnackbar("Lỗi tải danh sách: " + error.message, {
          variant: "error",
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [paginationModel, activeTab]);

  const handleDelete = (id) => {
    deleteUser(id)
      .then(() => {
        enqueueSnackbar("Xóa tài khoản thành công", { variant: "success" });
        loadUsers();
      })
      .catch((error) => {
        enqueueSnackbar("Xóa tài khoản thất bại: " + error.message, {
          variant: "error",
        });
      });
  };

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const onTabChange = (key) => {
    setActiveTab(key);
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  };

  const renderDataGrid = () => (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={users}
        columns={getUserColumns(handleDelete)}
        loading={isLoading}
        rowCount={meta.total}
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
        onRowClick={(params) => navigate(`/admin/users/${params.row.id}`)}
        sx={{
          border: "none",
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
        }}
      />
    </Box>
  );

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
            items={[{ title: "Admin" }, { title: "Quản Lý Người Dùng" }]}
          />
          <Title level={2} style={{ margin: "8px 0 0" }}>
            Quản Lý Người Dùng
          </Title>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          onClick={() => {}}
        >
          Thêm Tài Khoản
        </Button>
      </div>

      <Card
        style={{
          borderRadius: 8,
          boxShadow:
            "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
        }}
        bodyStyle={{ padding: "0 16px 16px 16px" }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={onTabChange}
          items={[
            {
              key: "customer",
              label: (
                <Space>
                  <TeamOutlined />
                  Khách hàng
                </Space>
              ),
              children: renderDataGrid(),
            },
            {
              key: "staff",
              label: (
                <Space>
                  <UserOutlined />
                  Nhân viên
                </Space>
              ),
              children: renderDataGrid(),
            },
          ]}
        />
      </Card>
    </Space>
  );
};

export default UsersManagement;
