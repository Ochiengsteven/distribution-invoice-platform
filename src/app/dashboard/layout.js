// src/app/dashboard/layout.jsx
"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Nav";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-secondary p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
