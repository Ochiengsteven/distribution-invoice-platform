"use client";
import React from "react";
import { useSession } from "../(main)/SessionProvider";
import {
  Radar,
  Package,
  Truck,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import MonthlySalesBarGraph from "@/components/graphs/MonthlySales";
import RevenueGraph from "@/components/graphs/RevenueGraph";
import ActiveOrders from "@/components/ActiveOrders";
import NearbyClients from "@/components/NearbyClients";

const Dashboard = () => {
  const { user } = useSession();

  const dashboardItems = [
    {
      icon: Package,
      value: 100,
      percentage: "+1,89%",
      percentageColor: "text-green-500",
      ArrowIcon: ArrowUpRight,
      label: "Total Orders",
    },
    {
      icon: Truck,
      value: 20,
      percentage: "-0,03%",
      percentageColor: "text-red-500",
      ArrowIcon: ArrowDownRight,
      label: "Active Drivers",
    },
    {
      icon: Radar,
      value: 23,
      percentage: "-0,03%",
      percentageColor: "text-red-500",
      ArrowIcon: ArrowDownRight,
      label: "Low Stock items",
    },
  ];

  return (
    <div className="w-full">
      <div>
        <p className="">Hello {user.name},</p>
        <h2 className="font-medium text-5xl">Good Morning</h2>
      </div>
      <div className="flex gap-2">
        <div className="mt-10 max-w-[600px]">
          <div className="flex items-center gap-8">
            {dashboardItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="p-4 rounded-full bg-white">
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-2xl flex items-end">
                    {item.value}{" "}
                    <span
                      className={`flex ml-2 text-xs pb-1 ${item.percentageColor}`}
                    >
                      {item.percentage} <item.ArrowIcon size={14} />
                    </span>
                  </p>
                  <h3 className="">{item.label}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <MonthlySalesBarGraph />
          </div>
        </div>
        <div className="w-[400px] mt-1">
          <div className="h-[300px]">
            <RevenueGraph />
          </div>
          <div className="mt-1">
            <ActiveOrders />
          </div>
        </div>
        <div className="flex-1 mt-1">
          <NearbyClients />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
