import React from "react";
import { Card, Typography, Table } from "antd";

const { Title } = Typography;

const columns = [
  {
    title: "Order ID",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status) => (
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          status === "Delivered"
            ? "bg-green-100 text-green-800"
            : status === "In Transit"
            ? "bg-blue-100 text-blue-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {status}
      </span>
    ),
  },
  {
    title: "Estimated Delivery",
    dataIndex: "estimatedDelivery",
    key: "estimatedDelivery",
  },
];

const data = [
  {
    key: "1",
    orderId: "ORD-001",
    status: "Delivered",
    estimatedDelivery: "2:30 PM",
  },
  {
    key: "2",
    orderId: "ORD-002",
    status: "In Transit",
    estimatedDelivery: "4:15 PM",
  },
  {
    key: "3",
    orderId: "ORD-003",
    status: "Pending",
    estimatedDelivery: "5:45 PM",
  },
];

const DeliveryStatusCard = () => {
  return (
    <Card className="bg-white rounded-lg">
      <Title level={4} className="text-primary mb-4">
        Delivery Status
      </Title>
      <Table columns={columns} dataSource={data} pagination={false} />
    </Card>
  );
};

export default DeliveryStatusCard;
