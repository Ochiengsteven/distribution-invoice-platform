import React, { useState } from "react";
import { Layout, Menu, Button, Drawer, message, Spin } from "antd";
import {
  MenuOutlined,
  LogoutOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { logOut } from "@/app/(auth)/actions";

const { Header } = Layout;

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const handleLogout = async () => {
    setLoggingOut(true);
    const key = "logoutMessage";
    message.loading({
      content: (
        <span>
          Logging out <Spin size="small" />
        </span>
      ),
      key,
      duration: 0,
    });

    try {
      await logOut();
      message.success({ content: "Logged out successfully", key, duration: 2 });
    } catch (error) {
      message.error({
        content: "Failed to log out. Please try again.",
        key,
        duration: 2,
      });
    } finally {
      setLoggingOut(false);
    }
  };

  const menuItems = [
    { key: "1", icon: <HomeOutlined />, label: "Home", link: "/" },
    { key: "2", icon: <UserOutlined />, label: "Profile", link: "/profile" },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: "Settings",
      link: "/settings",
    },
  ];

  const NavLinks = () => (
    <>
      {menuItems.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link href={item.link}>{item.label}</Link>
        </Menu.Item>
      ))}
      <Menu.Item
        key="4"
        icon={<LogoutOutlined />}
        onClick={handleLogout}
        className="text-red-500"
        disabled={loggingOut}
      >
        {loggingOut ? "Logging out..." : "Logout"}
      </Menu.Item>
    </>
  );

  return (
    <Header className="flex justify-between items-center px-5 bg-gray-800">
      <div className="logo" />
      {/* Desktop Menu */}
      <div className="hidden md:block">
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
          <NavLinks />
        </Menu>
      </div>
      {/* Mobile Menu */}
      <div className="block md:hidden">
        <Button type="primary" onClick={showDrawer}>
          <MenuOutlined />
        </Button>
        <Drawer
          title="Menu"
          placement="right"
          onClose={onClose}
          open={visible} // Use `open` instead of `visible`
        >
          <Menu mode="vertical">
            <NavLinks />
          </Menu>
        </Drawer>
      </div>
    </Header>
  );
};

export default Navbar;
