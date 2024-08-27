"use client";
import React from "react";
import { useSession } from "../(main)/SessionProvider";
import {
  Radar,
  Package,
  Truck,
  WalletMinimal,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const Dashboard = () => {
  const { user } = useSession();
  return (
    <div>
      <div>
        <p className="">Hello {user.name},</p>
        <h2 className="font-medium text-5xl">Good Morning</h2>
      </div>
      <div className="mt-10">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="p-4 rounded-full bg-white">
              <WalletMinimal size={24} />
            </div>
            <div>
              <p className="text-2xl flex items-end">
                120{" "}
                <span className="text-green-500 flex ml-2 text-xs pb-1">
                  +1,92% <ArrowUpRight size={14} />
                </span>
              </p>
              <h3 className="">Revenue</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-4 rounded-full bg-white">
              <Package size={24} />
            </div>
            <div>
              <p className="text-2xl flex items-end">
                100{" "}
                <span className="text-green-500 flex ml-2 text-xs pb-1">
                  +1,89% <ArrowUpRight size={14} />
                </span>
              </p>
              <h3 className="">Total Orders</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-4 rounded-full bg-white">
              <Truck size={24} />
            </div>
            <div>
              <p className="text-2xl flex items-end">
                20{" "}
                <span className="text-red-500 flex ml-2 text-xs pb-1">
                  -0,03% <ArrowDownRight size={14} />
                </span>
              </p>
              <h3 className="">Active Drivers</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-4 rounded-full bg-white">
              <Radar size={24} />
            </div>
            <div>
              <p className="text-2xl flex items-end">
                20{" "}
                <span className="text-red-500 flex ml-2 text-xs pb-1">
                  -0,03% <ArrowDownRight size={14} />
                </span>
              </p>
              <h3 className="">Low Stock items</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
