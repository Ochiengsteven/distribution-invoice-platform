import React, { useState, useEffect } from "react";
import { Table, DatePicker, Input } from "antd";
import { fetchProductMovementHistory } from "@/lib/historyActions";

const { RangePicker } = DatePicker;

const ProductMovementHistory = () => {
  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(null);
  const [productId, setProductId] = useState("");

  useEffect(() => {
    loadMovements();
  }, [dateRange, productId]);

  const loadMovements = async () => {
    setLoading(true);
    const result = await fetchProductMovementHistory(dateRange, productId);
    setMovements(result);
    setLoading(false);
  };

  const columns = [
    { title: "Movement ID", dataIndex: "id", key: "id" },
    { title: "Product Name", dataIndex: "productName", key: "productName" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Status", dataIndex: "status", key: "status" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Product Movement History</h2>
      <div className="mb-4">
        <RangePicker onChange={(dates) => setDateRange(dates)} />
        <Input
          placeholder="Product ID"
          style={{ width: 200, marginLeft: 8 }}
          onChange={(e) => setProductId(e.target.value)}
        />
      </div>
      <Table
        columns={columns}
        dataSource={movements}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default ProductMovementHistory;
