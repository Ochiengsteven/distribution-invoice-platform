import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { MoreOutlined } from "@ant-design/icons";
import { Card, Typography, Dropdown, Button } from "antd";
import { ArrowUpRight } from "lucide-react";
import { fetchInvoiceRevenue } from "@/lib/invoiceActions";

const { Title, Paragraph } = Typography;

const COLORS = ["#CBDBEA", "#F1F5F8"];

const items = [
  { key: "Week", label: "Weekly" },
  { key: "Month", label: "Monthly" },
  { key: "Year", label: "Yearly" },
];

const RevenueChart = () => {
  const [timeFrame, setTimeFrame] = useState("Weekly");
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);

  useEffect(() => {
    const fetchRevenue = async () => {
      const result = await fetchInvoiceRevenue(timeFrame.toLowerCase());
      if (result.success) {
        setTotalRevenue(result.totalRevenue);
        setPercentageChange(result.percentageChange);
      }
    };

    fetchRevenue();
  }, [timeFrame]);

  const data = [
    { name: "Achieved", value: totalRevenue },
    { name: "Remaining", value: 1000000 - totalRevenue }, // Assuming a target of 100,000
  ];

  return (
    <Card className="w-full h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <Title level={2} style={{ marginBottom: 0 }}>
            Analytic view
          </Title>
          <Paragraph type="secondary">Total sales revenue overview</Paragraph>
        </div>
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) => setTimeFrame(key),
          }}
          placement="bottomRight"
          arrow
        >
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
            $ {totalRevenue.toFixed(2)}
          </Title>
          <Paragraph
            style={{
              color: percentageChange >= 0 ? "#52c41a" : "#f5222d",
              marginBottom: 0,
              display: "flex",
              alignItems: "baseline",
            }}
          >
            {percentageChange >= 0 ? "+" : "-"}
            {Math.abs(percentageChange).toFixed(2)}%
            <ArrowUpRight size={14} className="mx-1" />{" "}
            <span className="text-primary">
              than last {timeFrame.toLowerCase()}
            </span>
          </Paragraph>
        </div>
      </div>
    </Card>
  );
};

export default RevenueChart;
