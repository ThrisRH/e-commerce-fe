import React, { useEffect, useState, useCallback } from "react";
import { Typography, Breadcrumb, Card, Button, Space, Tabs } from "antd";
import {
  PlusOutlined,
  UserOutlined,
  TeamOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  fetchCustomers,
  fetchEmployees,
  fetchRoles,
  deleteUser,
  deleteRole,
} from "@/api/users/user-api";
import { Meta } from "@/models/MetaData/meta";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { getUserColumns } from "./sections/grid-columns/setup-user";
import { getRoleColumns } from "./sections/grid-columns/setup-role";
import CreateUserModal from "./sections/create-user-modal";
import CreateRoleModal from "./sections/create-role-modal";

const { Title } = Typography;

const UsersManagement = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("customer");

  const [isLoading, setIsLoading] = useState(true);
  const [dataList, setDataList] = useState([]);
  const [meta, setMeta] = useState(new Meta());
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const loadData = useCallback(() => {
    setIsLoading(true);
    let apiCall;
    if (activeTab === "customer") {
      apiCall = fetchCustomers(
        paginationModel.page + 1,
        paginationModel.pageSize,
      );
    } else if (activeTab === "staff") {
      apiCall = fetchEmployees(
        paginationModel.page + 1,
        paginationModel.pageSize,
      );
    } else {
      apiCall = fetchRoles(paginationModel.page + 1, paginationModel.pageSize);
    }

    apiCall
      .then((data) => {
        setDataList(Array.isArray(data.data) ? data.data : [data.data]);
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
    if (activeTab === "role") {
      deleteRole(id)
        .then(() => {
          enqueueSnackbar("Xóa thành công", { variant: "success" });
          loadData();
        })
        .catch((error) => {
          enqueueSnackbar("Xóa thất bại: " + error.message, {
            variant: "error",
          });
        });
    } else {
      deleteUser(id)
        .then(() => {
          enqueueSnackbar("Xóa thành công", { variant: "success" });
          loadData();
        })
        .catch((error) => {
          enqueueSnackbar("Xóa thất bại: " + error.message, {
            variant: "error",
          });
        });
    }
  };

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onTabChange = (key) => {
    setActiveTab(key);
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
  };

  const renderDataGrid = () => (
    <Box sx={{ height: 600, width: "100%" }}>
      <DataGrid
        rows={dataList}
        columns={
          activeTab === "role"
            ? getRoleColumns(handleDelete)
            : getUserColumns(handleDelete)
        }
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
        onRowClick={(params) =>
          navigate(
            activeTab === "role"
              ? `/admin/roles/${params.row.id}`
              : `/admin/users/${params.row.id}`,
          )
        }
        sx={{
          border: "none",
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
        }}
      />
    </Box>
  );

  const handleCreateButtonClick = () => {
    if (activeTab === "role") {
      setIsRoleModalOpen(true);
    } else {
      setIsUserModalOpen(true);
    }
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
            items={[{ title: "Admin" }, { title: "Quản Lý Người Dùng" }]}
          />
          <Title level={2} style={{ margin: "8px 0 0" }}>
            Quản Lý Người Dùng
          </Title>
        </div>
        {activeTab !== "customer" && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleCreateButtonClick}
          >
            {activeTab === "role" ? "Thêm Vai Trò" : "Thêm Tài Khoản"}
          </Button>
        )}
      </div>

      <CreateUserModal
        visible={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSuccess={loadData}
      />

      <CreateRoleModal
        visible={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onSuccess={loadData}
      />

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
            {
              key: "role",
              label: (
                <Space>
                  <KeyOutlined />
                  Vai trò
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
