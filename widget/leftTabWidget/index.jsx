import {
  BlockOutlined,
  BuildOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  FileOutlined,
  HomeFilled,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Layout } from "antd";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";

const { Header, Content, Sider } = Layout;
const LeftTabWidget = ({ activeKey }) => {
  const isMobileDevice = useMediaQuery("(max-width: 1000px)");
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  function getItem(label, key, icon, children, onClick, active) {
    return {
      key,
      icon,
      children,
      label,
      onClick,
    };
  }
  const items = [
    getItem("Homepage", 1, <HomeFilled />, null, () => router.push("/")),
    getItem("Your Profile", "2", <UserOutlined />, null, () =>
      router.push("/profile")
    ),
    getItem("Tokens", "sub1", <BlockOutlined />, [
      getItem("Explore", "3"),
      getItem("Hot Pairs", "4"),
      getItem("Recently Launched", "5"),
    ]),
    getItem("Ecosystem", "sub2", <BuildOutlined />),
    getItem("Files", "9", <FileOutlined />),
    getItem(
      "",
      "10",
      !collapsed ? <DoubleRightOutlined /> : <DoubleLeftOutlined />,
      null,
      () => setCollapsed((prev) => !prev)
    ),
  ];

  return (
    <>
      <Sider
        collapsible={isMobileDevice ? false : true}
        collapsed={isMobileDevice ? true : collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Menu
          selectedKeys={[activeKey || "1"]}
          style={{ border: "1px solid #ffffff20", borderRadius: "6px" }}
          mode="inline"
          items={items}
          activeKey={"3"}
          onClick={(item) => {
            () => item.onClick;
          }}
        />
      </Sider>
    </>
  );
};

export default LeftTabWidget;
