import React, { useState } from "react";
import { Table, DatePicker, Select } from "antd";
import { fetchOrderHistory } from "@/lib/historyActions";

const { RangePicker } = DatePicker;

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrders = async (dateRange, status) => {
    setLoading(true);
    const result = await fetchOrderHistory(dateRange, status);
    setOrders(result);
    setLoading(false);
  };

  const columns = [
    { title: "Order ID", dataIndex: "id", key: "id" },
    { title: "Customer", dataIndex: "customerName", key: "customer" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Total Amount", dataIndex: "totalAmount", key: "totalAmount" },
  ];

  return (
    <div>
      <div className="mb-4">
        <RangePicker onChange={(dates) => loadOrders(dates, null)} />
        <Select
          defaultValue="ALL"
          style={{ width: 120, marginLeft: 8 }}
          onChange={(value) => loadOrders(null, value)}
        >
          <Select.Option value="ALL">All</Select.Option>
          <Select.Option value="PENDING">Pending</Select.Option>
          <Select.Option value="PROCESSING">Processing</Select.Option>
          <Select.Option value="SHIPPED">Shipped</Select.Option>
          <Select.Option value="DELIVERED">Delivered</Select.Option>
          <Select.Option value="CANCELLED">Cancelled</Select.Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={orders}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default OrderHistory;
