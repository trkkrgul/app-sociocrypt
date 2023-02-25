import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Divider, Space, Typography } from "antd";
import React, { useState } from "react";

const { Text, Paragraph } = Typography;
const TopTokenWidget = () => {
  const [rows, setRows] = useState(1);
  return (
    <>
      <Card>
        <Typography>Top Tokens</Typography>
        <Divider />
        <Space direction="vertical">
          <Space
            direction="horizontal"
            size="middle"
            style={{
              display: "flex",
            }}
            justify="left"
          >
            <Avatar shape="square" icon={<UserOutlined />} />
            <Typography>TokenName</Typography>
          </Space>
          <Space
            direction="horizontal"
            size="middle"
            style={{
              display: "flex",
            }}
            justify="left"
          >
            <Avatar shape="square" icon={<UserOutlined />} />
            <Typography>TokenName</Typography>
          </Space>
        </Space>
      </Card>
    </>
  );
};

export default TopTokenWidget;
