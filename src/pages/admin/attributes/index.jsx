import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Breadcrumb,
  Card,
  Button,
  Space,
  Input,
  Tabs,
  Popconfirm,
  Modal,
  Form,
  Select,
} from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Box, IconButton, Tooltip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  fetchAttributes,
  createAttribute,
  updateAttribute,
  deleteAttribute,
  fetchAttributeValues,
  createAttributeValue,
  updateAttributeValue,
  deleteAttributeValue,
} from "@/api/attributes/attribute-api";
import { enqueueSnackbar } from "notistack";
import AppButton from "@/components/common/buttons/button";

import { sortAttributeValues } from "@/utils/attribute-utils";

const { Title } = Typography;
const { Search } = Input;

const AttributeManagement = () => {
  const [activeTab, setActiveTab] = useState("attributes");
  const [attributes, setAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form] = Form.useForm();

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [attrData, valuesData] = await Promise.all([
        fetchAttributes(),
        fetchAttributeValues(),
      ]);

      setAttributes(attrData || []);
      setAttributeValues(sortAttributeValues(valuesData));
    } catch (error) {
      enqueueSnackbar("Lỗi khi tải dữ liệu: " + error.message, {
        variant: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    if (item) {
      form.setFieldsValue(item);
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setIsLoading(true);

      if (activeTab === "attributes") {
        if (editingItem) {
          await updateAttribute(editingItem.id, values);
          enqueueSnackbar("Cập nhật thuộc tính thành công", {
            variant: "success",
          });
        } else {
          await createAttribute(values);
          enqueueSnackbar("Tạo thuộc tính mới thành công", {
            variant: "success",
          });
        }
      } else {
        if (editingItem) {
          await updateAttributeValue(editingItem.id, values);
          enqueueSnackbar("Cập nhật giá trị thuộc tính thành công", {
            variant: "success",
          });
        } else {
          await createAttributeValue(values);
          enqueueSnackbar("Tạo giá trị mới thành công", { variant: "success" });
        }
      }

      setIsModalOpen(false);
      loadData();
    } catch (error) {
      enqueueSnackbar("Vui lòng kiểm tra lại thông tin", { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      if (activeTab === "attributes") {
        await deleteAttribute(id);
      } else {
        await deleteAttributeValue(id);
      }
      enqueueSnackbar("Đã xóa!", { variant: "success" });
      loadData();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  const attributeColumns = [
    { field: "name", headerName: "Tên thuộc tính", flex: 1 },
    { field: "slug", headerName: "Slug", flex: 1 },
    {
      field: "actions",
      headerName: "Thao tác",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Space>
          <Tooltip title="Sửa">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal(params.row);
              }}
            >
              <EditOutlined style={{ color: "#1890ff" }} />
            </IconButton>
          </Tooltip>
          <Popconfirm
            title="Xóa thuộc tính?"
            onConfirm={(e) => {
              e.stopPropagation();
              handleDelete(params.row.id);
            }}
            onCancel={(e) => e.stopPropagation()}
          >
            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
              <DeleteOutlined style={{ color: "#ff4d4f" }} />
            </IconButton>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const valueColumns = [
    { field: "attribute_name", headerName: "Tên thông số", flex: 1 },
    { field: "value", headerName: "Giá trị", flex: 1 },
    { field: "unit", headerName: "Đơn vị", width: 120 },
    {
      field: "actions",
      headerName: "Thao tác",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <Space>
          <Tooltip title="Sửa">
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                handleOpenModal(params.row);
              }}
            >
              <EditOutlined style={{ color: "#1890ff" }} />
            </IconButton>
          </Tooltip>
          <Popconfirm
            title="Xóa giá trị này?"
            onConfirm={(e) => {
              e.stopPropagation();
              handleDelete(params.row.id);
            }}
            onCancel={(e) => e.stopPropagation()}
          >
            <IconButton size="small" onClick={(e) => e.stopPropagation()}>
              <DeleteOutlined style={{ color: "#ff4d4f" }} />
            </IconButton>
          </Popconfirm>
        </Space>
      ),
    },
  ];

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
            items={[{ title: "Admin" }, { title: "Cấu Hình Thuộc Tính" }]}
          />
          <Title level={2} style={{ margin: "8px 0 0" }}>
            Quản Lý Thuộc Tính & Thông Số
          </Title>
        </div>
        <div style={{ width: 220 }}>
          <AppButton
            label={
              activeTab === "attributes" ? "Thêm Thuộc Tính" : "Thêm Giá Trị"
            }
            onClick={() => handleOpenModal()}
          />
        </div>
      </div>

      <Card
        style={{
          borderRadius: 8,
          boxShadow:
            "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
        }}
        bodyStyle={{ padding: 0 }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          style={{ padding: "0 20px" }}
          items={[
            {
              key: "attributes",
              label: "Tên Thuộc Tính",
              children: (
                <Box sx={{ height: 600, width: "100%" }}>
                  <DataGrid
                    rows={attributes}
                    columns={attributeColumns}
                    loading={isLoading}
                    sx={{ border: "none" }}
                    hideFooterSelectedRowCount
                  />
                </Box>
              ),
            },
            {
              key: "values",
              label: "Giá Trị Định Sẵn",
              children: (
                <Box sx={{ height: 600, width: "100%" }}>
                  <DataGrid
                    rows={attributeValues}
                    columns={valueColumns}
                    loading={isLoading}
                    sx={{ border: "none" }}
                    hideFooterSelectedRowCount
                  />
                </Box>
              ),
            },
          ]}
        />
      </Card>

      <Modal
        title={
          <Typography>
            {editingItem ? "Cập Nhật" : "Thêm Mới"}{" "}
            {activeTab === "attributes" ? "Thuộc Tính" : "Giá Trị"}
          </Typography>
        }
        open={isModalOpen}
        onOk={handleSubmit}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={isLoading}
        okText="Lưu lại"
        cancelText="Hủy"
        width={500}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 20 }}>
          {activeTab === "attributes" ? (
            <>
              <Form.Item
                name="name"
                label="Tên thuộc tính"
                rules={[
                  { required: true, message: "Vui lòng nhập tên thuộc tính" },
                ]}
              >
                <Input placeholder="VD: Dung lượng, Màu sắc, CPU..." />
              </Form.Item>
              <Form.Item name="slug" label="Slug (Đường dẫn)">
                <Input placeholder="VD: dung-luong (để trống sẽ tự tạo)" />
              </Form.Item>
            </>
          ) : (
            <>
              <Form.Item
                name="attribute_id"
                label="Thuộc tính gốc"
                rules={[
                  { required: true, message: "Vui lòng chọn thuộc tính" },
                ]}
              >
                <Select
                  placeholder="Chọn thuộc tính"
                  options={attributes.map((a) => ({
                    label: a.name,
                    value: a.id,
                  }))}
                />
              </Form.Item>
              <Form.Item
                name="value"
                label="Giá trị"
                rules={[{ required: true, message: "Vui lòng nhập giá trị" }]}
              >
                <Input placeholder="VD: 256, Đen, Intel Core i7..." />
              </Form.Item>
              <Form.Item name="unit" label="Đơn vị (nếu có)">
                <Input placeholder="VD: GB, MHz, cm..." />
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
    </Space>
  );
};

export default AttributeManagement;
