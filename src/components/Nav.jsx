import React, { useState } from "react";
import { Layout, Menu, message, Spin, Dropdown, Avatar } from "antd";
import {
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
  const [loggingOut, setLoggingOut] = useState(false);
  const { user } = useSession();

  const handleLogout = async () => {
    setLoggingOut(true);
    const key = "logoutMessage";
    message.loading({
      content: (
        <p>
          Logging out <Spin size="small" />
        </p>
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
    <Header className="flex justify-between items-center px-5 py-3 bg-secondary h-[9vh]">
      <div className="logo" />
      <Dropdown
        overlay={menu}
        trigger={["click", "hover"]}
        placement="bottomRight"
      >
        <a
          onClick={(e) => e.preventDefault()}
          className="ant-dropdown-link flex items-center bg-white py-2 pl-1 pr-3 mt-3 rounded-[55px]"
        >
          <Avatar icon={<UserOutlined />} className="mr-2" />
          <div
            className="mr-2 flex flex-col justify-center"
            style={{ lineHeight: 1 }}
          >
            <span style={{ margin: 0, padding: 0 }}>{user.name}</span>
            <span
              style={{
                margin: 0,
                padding: 0,
                fontSize: "0.8rem",
                fontWeight: 600,
              }}
            >
              {user.role}
            </span>
          </div>
          <DownOutlined />
        </a>
      </Dropdown>
    </Header>
  );
};

export default Navbar;
