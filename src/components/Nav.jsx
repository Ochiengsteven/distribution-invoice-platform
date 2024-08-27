import React, { useState } from "react";
import {
  Layout,
  Menu,
  Button,
  Drawer,
  message,
  Spin,
  Dropdown,
  Avatar,
} from "antd";
import {
  MenuOutlined,
  LogoutOutlined,
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  DownOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { logOut } from "@/app/(auth)/actions";
import { useSession } from "@/app/(main)/SessionProvider";

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

  const { user } = useSession();

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
    {
      key: "1",
      icon: <HomeOutlined />,
      label: <Link href="/">Home</Link>,
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: <Link href={`/user/${user.name}`}>Profile</Link>,
    },
    {
      key: "3",
      icon: <SettingOutlined />,
      label: <Link href="/settings">Settings</Link>,
    },
    {
      key: "4",
      icon: <LogoutOutlined />,
      label: loggingOut ? "Logging out..." : "Logout",
      onClick: handleLogout,
      disabled: loggingOut,
      className: "text-red-500",
    },
  ];

  const menu = <Menu items={menuItems} />;

  return (
    <Header className="flex justify-between items-center mb-3 px-5 bg-white">
      <div className="logo" />
      {/* Desktop Menu */}
      <div className="hidden md:block">
        <Dropdown
          overlay={menu}
          trigger={["click", "hover"]}
          placement="bottomRight"
        >
          <a
            onClick={(e) => e.preventDefault()}
            className="ant-dropdown-link flex items-center"
          >
            <Avatar icon={<UserOutlined />} className="mr-2" />
            <span className="mr-2">{user.name}</span>
            <DownOutlined />
          </a>
        </Dropdown>
      </div>
      {/* Mobile Menu */}
      <div className="block md:hidden">
        <Button type="primary" onClick={showDrawer}>
          <MenuOutlined />
        </Button>
        <Drawer title="Menu" placement="right" onClose={onClose} open={visible}>
          <Menu mode="vertical" items={menuItems} />
        </Drawer>
      </div>
    </Header>
  );
};

export default Navbar;
