import React, { useState, useEffect } from "react";
import { Table, DatePicker, Input } from "antd";
import { fetchP2PTransactionHistory } from "@/lib/historyActions";

const { RangePicker } = DatePicker;

const P2PTransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    loadTransactions();
  }, [dateRange, userId]);

  const loadTransactions = async () => {
    setLoading(true);
    const result = await fetchP2PTransactionHistory(dateRange, userId);
    setTransactions(result);
    setLoading(false);
  };

  const columns = [
    { title: "Transaction ID", dataIndex: "id", key: "id" },
    { title: "Sender", dataIndex: "sender", key: "sender" },
    { title: "Receiver", dataIndex: "receiver", key: "receiver" },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => `$${amount.toFixed(2)}`,
    },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">P2P Transaction History</h2>
      <div className="mb-4">
        <RangePicker onChange={(dates) => setDateRange(dates)} />
        <Input
          placeholder="User ID (Sender or Receiver)"
          style={{ width: 250, marginLeft: 8 }}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <Table
        columns={columns}
        dataSource={transactions}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default P2PTransactionHistory;
