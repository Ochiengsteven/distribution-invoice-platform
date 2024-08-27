import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Drawer, Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Drivers", path: "/dashboard/drivers" },
  { name: "History", path: "/dashboard/history" },
  { name: "Marketplace", path: "/dashboard/marketplace" },
  { name: "Chat", path: "/dashboard/chat" },
  { name: "Daily Activity", path: "/dashboard/daily-activity" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [drawerVisible, setDrawerVisible] = useState(false);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };

  const NavContent = () => (
    <>
      <div className="p-4">
        <h2 className="text-primary text-2xl font-semibold">Distribr</h2>
      </div>
      <ul className="mt-4">
        {navItems.map((item) => (
          <li key={item.path} className="mb-2">
            <Link href={item.path}>
              <span
                className={`block p-4 text-sm font-semibold ${
                  pathname === item.path
                    ? "bg-gray-50 text-primary"
                    : "text-primary hover:bg-gray-100 hover:text-gray-400"
                }`}
                onClick={() => setDrawerVisible(false)}
              >
                {item.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );

  return (
    <>
      {/* Hamburger menu for small screens */}
      <div className="lg:hidden fixed top-4 left-4 z-20">
        <Button
          type="primary"
          className="bg-slate-500"
          onClick={showDrawer}
          icon={<MenuOutlined className="bg-slate-400" />}
        />
      </div>

      {/* Drawer for small screens */}
      <Drawer
        placement="left"
        closable={false}
        onClose={onClose}
        open={drawerVisible}
        bodyStyle={{ padding: 0 }}
        width={250}
        className="lg:hidden"
      >
        <div className="flex justify-end p-4">
          <Button type="text" onClick={onClose} icon={<CloseOutlined />} />
        </div>
        <NavContent />
      </Drawer>

      {/* Sidebar for large screens */}
      <nav className="hidden lg:block w-64 bg-white h-screen">
        <NavContent />
      </nav>
    </>
  );
}
