import React, { useState } from "react";
import { Table, Button, Space, Spin, message } from "antd";
import { Edit2, Trash2, DollarSign } from "lucide-react";

const InvoiceTable = ({
  invoices,
  loading,
  onEdit,
  onDelete,
  onRequestPayment,
}) => {
  const [status, setStatus] = useState("All");

  const columns = [
    {
      title: "",
      dataIndex: "select",
      key: "select",
      render: () => <input type="checkbox" className="mr-2" />,
    },
    {
      title: "Invoice ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Created On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Expected Payment Date",
      dataIndex: "expectedPaymentDate",
      key: "expectedPaymentDate",
      render: (date) => (date ? new Date(date).toLocaleDateString() : "N/A"),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) =>
        amount != null ? `$${Number(amount).toFixed(2)}` : "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`px-2 py-1 rounded-full ${
            status === "PAID"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<Edit2 size={16} />}
            className="text-blue-500"
            onClick={() => onEdit(record)}
          />
          <Button
            icon={<Trash2 size={16} />}
            className="text-red-500"
            onClick={() => onDelete(record.id)}
          />
          {record.status === "PENDING" && (
            <Button
              icon={<DollarSign size={16} />}
              className="text-green-500"
              onClick={() => handleRequestPayment(record)}
            >
              Request Payment
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const filteredInvoices =
    status === "All"
      ? invoices
      : invoices.filter((invoice) => invoice.status === status.toUpperCase());

  const handleRequestPayment = async (invoice) => {
    console.log("Handling payment request in InvoiceTable:", invoice);
    try {
      await onRequestPayment(invoice);
      message.success(`Payment request sent for invoice #${invoice.id}`);
    } catch (error) {
      console.error("Error in handleRequestPayment:", error);
      message.error(`Failed to request payment for invoice #${invoice.id}`);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Transactions</h2>
          <p className="text-sm text-gray-500">
            Keep track of all your transaction invoices here
          </p>
        </div>
        <div className="rounded-3xl border-[2px] flex gap-2">
          {["All", "Pending", "Paid"].map((btn) => (
            <Button
              key={btn}
              className={`rounded-3xl ${
                status === btn ? "bg-primary text-white" : "border-none"
              }`}
              onClick={() => setStatus(btn)}
            >
              {btn}
            </Button>
          ))}
        </div>
      </div>
      <Spin spinning={loading}>
        <Table columns={columns} dataSource={filteredInvoices} rowKey="id" />
      </Spin>
    </div>
  );
};

export default InvoiceTable;
