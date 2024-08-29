"use client";

import React, { useState, useEffect } from "react";
import { Badge, Button, Table, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DriverModal from "@/components/DriverModal";
import {
  createDriver,
  fetchDrivers,
  updateDriver,
  deleteDriver,
} from "@/lib/deliveryDriverActions";

const Drivers = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [editingDriver, setEditingDriver] = useState(null);

  useEffect(() => {
    loadDrivers();
  }, []);

  const loadDrivers = async () => {
    const result = await fetchDrivers();
    if (result.success) {
      setDrivers(result.drivers);
    } else {
      message.error(result.error);
    }
  };

  const handleCreateDriver = async (values) => {
    const result = await createDriver(values);
    if (result.success) {
      message.success("Driver created successfully");
      setIsModalVisible(false);
      loadDrivers();
    } else {
      message.error(result.error);
    }
  };

  const handleUpdateDriver = async (values) => {
    const result = await updateDriver(editingDriver.id, values);
    if (result.success) {
      message.success("Driver updated successfully");
      setIsModalVisible(false);
      setEditingDriver(null);
      loadDrivers();
    } else {
      message.error(result.error);
    }
  };

  const handleDeleteDriver = async (id) => {
    const result = await deleteDriver(id);
    if (result.success) {
      message.success("Driver deleted successfully");
      loadDrivers();
    } else {
      message.error(result.error);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <span className="flex gap-2">
          <Button
            onClick={() => {
              setEditingDriver(record);
              setIsModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Button danger onClick={() => handleDeleteDriver(record.id)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-black">Delivery drivers</h1>
            <Badge
              count={drivers.length}
              style={{ backgroundColor: "#52c41a" }}
            />
          </div>
          <p className="text-sm text-gray-500 pl-3">
            Manage your delivery drivers here.
          </p>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
          className="custom-button !rounded-3xl"
        >
          Add Driver
        </Button>
      </div>
      <Table columns={columns} dataSource={drivers} rowKey="id" />
      <DriverModal
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setEditingDriver(null);
        }}
        onSubmit={editingDriver ? handleUpdateDriver : handleCreateDriver}
        initialValues={editingDriver}
      />
    </div>
  );
};

export default Drivers;
