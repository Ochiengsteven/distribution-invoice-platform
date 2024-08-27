import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { MoreOutlined } from "@ant-design/icons";
import { Card, Typography, Dropdown, Button } from "antd";
import { ArrowUpRight } from "lucide-react";

const { Title, Paragraph } = Typography;

// Assuming 70% achievement for this example
const data = [
  { name: "Achieved", value: 70 },
  { name: "Remaining", value: 30 },
];

const COLORS = ["#CBDBEA", "#F1F5F8"];

const items = [
  { key: "1", label: "Weekly" },
  { key: "2", label: "Monthly" },
  { key: "3", label: "Yearly" },
];

const RevenueChart = () => {
  return (
    <Card className="w-full h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <Title level={2} style={{ marginBottom: 0 }}>
            Analytic view
          </Title>
          <Paragraph type="secondary">Total sales revenue overview</Paragraph>
        </div>
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <Button
            shape="circle"
            icon={<MoreOutlined />}
            style={{ background: "#F1F5F8", border: "none" }}
          />
        </Dropdown>
      </div>
      <div className="relative" style={{ height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              startAngle={180}
              endAngle={0}
              innerRadius="70%"
              outerRadius="90%"
              paddingAngle={0}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ paddingBottom: "30px" }}
        >
          <Title level={3} style={{ marginBottom: 0 }}>
            $ 272,980.19
          </Title>
          <Paragraph
            style={{
              color: "#52c41a",
              marginBottom: 0,
              display: "flex",
              alignItems: "baseline",
            }}
          >
            +2.67% <ArrowUpRight size={14} className="mx-1" /> than last week
          </Paragraph>
        </div>
      </div>
    </Card>
  );
};

export default RevenueChart;
