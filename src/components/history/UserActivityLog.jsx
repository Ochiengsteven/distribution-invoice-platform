import React, { useState, useEffect } from "react";
import { Table, DatePicker, Input } from "antd";
import { fetchUserActivityLog } from "@/lib/historyActions";

const { RangePicker } = DatePicker;

const UserActivityLog = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState(null);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    loadActivities();
  }, [dateRange, userId]);

  const loadActivities = async () => {
    setLoading(true);
    const result = await fetchUserActivityLog(dateRange, userId);
    setActivities(result);
    setLoading(false);
  };

  const columns = [
    { title: "Activity ID", dataIndex: "id", key: "id" },
    { title: "User ID", dataIndex: "userId", key: "userId" },
    { title: "Activity", dataIndex: "activity", key: "activity" },
    { title: "Date", dataIndex: "date", key: "date" },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">User Activity Log</h2>
      <div className="mb-4">
        <RangePicker onChange={(dates) => setDateRange(dates)} />
        <Input
          placeholder="User ID"
          style={{ width: 200, marginLeft: 8 }}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>
      <Table
        columns={columns}
        dataSource={activities}
        loading={loading}
        rowKey="id"
      />
    </div>
  );
};

export default UserActivityLog;
