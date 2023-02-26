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
import { Avatar, Button, Divider, Row, Space, Tooltip, Typography } from "antd";
import React from "react";

const MobileMenu = () => {
  const isMobileDevice = useMediaQuery("(max-width: 1000px)");
  return (
    isMobileDevice && (
      <Box
        sx={{
          height: "60px",
          borderTop: "1px solid #ffffff40",
          position: "fixed",
          zIndex: "999",
          bottom: 0,
          display: "flex",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          background: "#000",
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
          <Tooltip title="Home">
            <Button shape="square" icon={<Home />} size="middle" />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Home">
            <Button shape="square" icon={<MonetizationOn />} size="middle" />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Home">
            <Button
              shape="square"
              icon={<Explore className="gradient-text" />}
              size="large"
            />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Home">
            <Button shape="square" icon={<AccessTimeFilled />} size="middle" />
          </Tooltip>
          <Divider type="vertical" />
          <Tooltip title="Profile">
            <Button shape="square" icon={<Person2 />} size="middle" />
          </Tooltip>
        </Space>
      </Box>
    )
  );
};

export default MobileMenu;
