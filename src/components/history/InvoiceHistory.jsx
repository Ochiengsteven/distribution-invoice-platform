import React, { useState, useEffect } from "react";
import { Table, DatePicker, Select } from "antd";
import { fetchInvoiceHistory } from "@/lib/historyActions";

const { RangePicker } = DatePicker;

const InvoiceHistory = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(null);
  const [status, setStatus] = useState("ALL");

  useEffect(() => {
    loadInvoices();
  }, [dateRange, status]);

  const loadInvoices = async () => {
    setLoading(true);
    const result = await fetchInvoiceHistory(dateRange, status);
    setInvoices(result);
    setLoading(false);
  };

  const columns = [
    { title: "Invoice ID", dataIndex: "id", key: "id" },
    { title: "Customer", dataIndex: "customerName", key: "customerName" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Status", dataIndex: "status", key: "status" },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (amount) => `$${amount.toFixed(2)}`,
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Invoice History</h2>
      <div className="mb-4">
        <RangePicker onChange={(dates) => setDateRange(dates)} />
        <Select
          defaultValue="ALL"
          style={{ width: 120, marginLeft: 8 }}
          onChange={(value) => setStatus(value)}
        >
          <Select.Option value="ALL">All</Select.Option>
          <Select.Option value="PAID">Paid</Select.Option>
          <Select.Option value="UNPAID">Unpaid</Select.Option>
          <Select.Option value="PENDING">Pending</Select.Option>
        </Select>
      </div>
      <Table
        columns={columns}
        dataSource={invoices}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default InvoiceHistory;
