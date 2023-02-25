import { Card, Space } from "antd";
import React from "react";
import TopTokenWidget from "./TopTokenWidget";

const RightTab = () => {
  return (
    <>
      <Space style={{ display: "flex" }} direction="vertical">
        <TopTokenWidget />
      </Space>
    </>
  );
};

export default RightTab;
