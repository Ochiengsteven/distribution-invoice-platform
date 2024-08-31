"use client";

import React, { useState } from "react";
import OrderHistory from "@/components/history/OrderHistory";
import DeliveryHistory from "@/components/history/DeliveryHistory";
import InvoiceHistory from "@/components/history/InvoiceHistory";
import ProductMovementHistory from "@/components/history/ProductMovementHistory";
import UserActivityLog from "@/components/history/UserActivityLog";
import P2PTransactionHistory from "@/components/history/P2PTransactionHistory";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const History = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <div>
      <div className="">
        <h1 className="text-2xl font-bold mb-4 text-black">History</h1>
        <p className="text-black">Manage your delivery History here.</p>
      </div>
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab="Orders" key="1">
          <OrderHistory />
        </TabPane>
        <TabPane tab="Deliveries" key="2">
          <DeliveryHistory />
        </TabPane>
        <TabPane tab="Invoices" key="3">
          <InvoiceHistory />
        </TabPane>
        <TabPane tab="Product Movement" key="4">
          <ProductMovementHistory />
        </TabPane>
        <TabPane tab="User Activity" key="5">
          <UserActivityLog />
        </TabPane>
        <TabPane tab="P2P Transactions" key="6">
          <P2PTransactionHistory />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default History;
