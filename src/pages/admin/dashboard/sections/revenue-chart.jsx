import React, { useEffect, useState } from "react";
import { Card, Space } from "antd";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchWeeklyRevenue } from "@/api/orders/order-api";
import { enqueueSnackbar } from "notistack";
import Loading from "@/components/ui/state/loading";

const RevenueChart = ({ loading }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [revenue, setRevenue] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchWeeklyRevenue()
      .then((data) => {
        setRevenue(data);
      })
      .catch((error) => {
        enqueueSnackbar("error.message", { variant: "error" });
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  console.log(revenue);

  return (
    <Card
      title={
        <Space>
          <div
            style={{
              width: 8,
              height: 24,
              borderRadius: 4,
              background: "var(--primary-main)",
            }}
          />
          <span>Thống kê doanh thu tuần</span>
        </Space>
      }
      bordered={false}
      className="shadow-sm"
      style={{ borderRadius: 12, height: "100%" }}
      loading={loading}
    >
      <div style={{ height: 350, width: "100%", marginTop: 16 }}>
        <ResponsiveContainer width="100%" height="100%">
          {isLoading ? (
            <Loading />
          ) : (
            <AreaChart
              data={revenue}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--primary-main)"
                    stopOpacity={0.1}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--primary-main)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis
                dataKey="day_name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8c8c8c", fontSize: 12 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#8c8c8c", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 8,
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                formatter={(value) => [
                  `${value.toLocaleString()}₫`,
                  "Doanh thu",
                ]}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--primary-main)"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RevenueChart;
