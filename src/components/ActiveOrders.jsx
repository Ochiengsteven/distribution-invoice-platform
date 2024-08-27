import { Card, Typography, Dropdown, Button } from "antd";
import React from "react";
import { MoreOutlined } from "@ant-design/icons";
import { ArrowUpRight } from "lucide-react";

const { Title, Paragraph } = Typography;

const items = [
  { key: "1", label: "Weekly" },
  { key: "2", label: "Monthly" },
  { key: "3", label: "Yearly" },
];

const ActiveOrders = () => {
  return (
    <Card className="w-full bg-white rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <div>
          <Title level={2} style={{ marginBottom: 0 }}>
            Active Orders
          </Title>
          <Paragraph type="secondary">Currently open orders</Paragraph>
        </div>
        <Dropdown menu={{ items }} placement="bottomRight" arrow>
          <Button
            shape="circle"
            icon={<MoreOutlined />}
            style={{ background: "#F1F5F8", border: "none" }}
          />
        </Dropdown>
      </div>
      <div>
        <p className="text-2xl flex items-end">
          89{" "}
          <span className={`flex mx-2 text-xs pb-1 text-green-500`}>
            +3,45% <ArrowUpRight size={14} />
          </span>
          from last month
        </p>
      </div>
    </Card>
  );
};

export default ActiveOrders;
