import React, { useState } from "react";
import { Table, DatePicker, Select } from "antd";
import { fetchDeliveryHistory } from "@/lib/historyActions";

const { RangePicker } = DatePicker;

const DeliveryHistory = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDeliveries = async (dateRange, status) => {
    setLoading(true);
    const result = await fetchDeliveryHistory(dateRange, status);
    setDeliveries(result);
    setLoading(false);
  };

  const columns = [
    { title: "Delivery ID", dataIndex: "id", key: "id" },
    { title: "Order ID", dataIndex: "orderId", key: "orderId" },
    { title: "Driver", dataIndex: "driverName", key: "driver" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  return (
    <div>
      <div className="mb-4">
        <RangePicker onChange={(dates) => loadDeliveries(dates, null)} />
        <Select
          defaultValue="ALL"
          style={{ width: 120, marginLeft: 8 }}
          onChange={(value) => loadDeliveries(null, value)}
        >
          <Select.Option value="ALL">All</Select.Option>
          <Select.Option value="IN_TRANSIT">In Transit</Select.Option>
          <Select.Option value="DELIVERED">Delivered</Select.Option>
          <Select.Option value="FAILED">Failed</Select.Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={deliveries}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default DeliveryHistory;
