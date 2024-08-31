"use client";

import DailyActivityDashboard from "@/components/DailyActivityDashboard";
import React from "react";

const DailyActivity = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-black">Daily Activity</h1>
      <p className="text-black">Manage your delivery Daily Activity here.</p>
      <div className="mt-6">
        <DailyActivityDashboard />
      </div>
    </div>
  );
};

export default DailyActivity;
