import React, { useEffect, useState } from "react";
import { Card, Avatar, Space, Tag, Divider, Typography } from "antd";
import { fetchCustomers } from "@/api/users/user-api";
import { User } from "@/models/user";

const { Text } = Typography;

const NewCustomers = ({ customers = [], loading }) => {
  return (
    <Card 
      title="Khách hàng mới"
      bordered={false}
      className="shadow-sm"
      style={{ borderRadius: 12, height: "100%" }}
      loading={loading}
    >
      <Space direction="vertical" style={{ width: "100%" }} size={20}>
        {customers.map((user, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Space size={12}>
              <Avatar
                style={{
                  backgroundColor: "var(--primary-50)",
                  color: "var(--primary-main)",
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                  {user.name}
                </div>
                <div style={{ fontSize: 12, color: "var(--neutral-500)" }}>
                  {user.email}
                </div>
              </div>
            </Space>
            <Tag bordered={false} color="blue">
              Khách mới
            </Tag>
          </div>
        ))}
        {customers.length === 0 && (
          <Text type="secondary">Chưa có khách hàng mới</Text>
        )}
        <Divider style={{ margin: "4px 0" }} />
        <div style={{ textAlign: "center" }}>
          <a href="/admin/users">Xem thêm khách hàng</a>
        </div>
      </Space>
    </Card>
  );
};

export default NewCustomers;
