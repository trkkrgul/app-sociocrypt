import {
  DownloadOutlined,
  HomeFilled,
  SearchOutlined,
} from "@ant-design/icons";
import {
  AccessTimeFilled,
  Explore,
  Home,
  MonetizationOn,
  Person2,
} from "@mui/icons-material";
import { Box, IconButton, useMediaQuery } from "@mui/material";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Row,
  Space,
  Tooltip,
  Typography,
} from "antd";
import { useRouter } from "next/router";
import React from "react";

const MobileMenu = () => {
  const isMobileDevice = useMediaQuery("(max-width: 1000px)");
  const router = useRouter();
  return (
    isMobileDevice && (
      <>
        <Card
          style={{
            height: "60px",
            borderTop: "1px solid #ffffff40",
            position: "fixed",
            zIndex: "999",
            bottom: 0,
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0px -20px 20px 0px #00000030",
          }}
        >
          <Space
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Button
              shape="square"
              icon={<Home />}
              size="middle"
              onClick={() => router.push("/")}
              style={{
                color: router.pathname === "/" ? "#ff564e" : null,
              }}
            />
            <Divider type="vertical" />
            <Button
              shape="square"
              icon={<MonetizationOn />}
              onClick={() => router.push("/tokens")}
              size="middle"
              style={{
                color: router.pathname === "/tokens" ? "#ff564e" : null,
              }}
            />
            <Divider type="vertical" />
            <Button
              shape="square"
              icon={<Explore className="gradient-text" />}
              onClick={() => router.push("/explore")}
              style={{
                color: router.pathname === "/explore" ? "#ff564e" : null,
              }}
              size="large"
            />
            <Divider type="vertical" />
            <Button
              shape="square"
              icon={<AccessTimeFilled />}
              size="middle"
              onClick={() => router.push("/listings")}
              style={{
                color: router.pathname === "/listings" ? "#ff564e" : null,
              }}
            />
            <Divider type="vertical" />
            <Button
              shape="square"
              icon={<Person2 />}
              size="middle"
              onClick={() => router.push("/profile")}
              style={{
                color: router.pathname === "/profile" ? "#ff564e" : null,
              }}
            />
          </Space>
        </Card>
      </>
    )
  );
};

export default MobileMenu;
