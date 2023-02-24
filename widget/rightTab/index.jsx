import { Card, Space } from "antd";
import React from "react";
import TopTokenWidget from "./TopTokenWidget";

const RightTab = () => {
  return (
    <>
      <Space style={{ display: "flex" }} direction="vertical">
        <TopTokenWidget /> <Card>asdalşasdklş</Card> <Card>asdalşasdklş</Card>
      </Space>
    </>
  );
};

export default RightTab;
