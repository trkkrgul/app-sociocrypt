import useTokenList from "@/hooks/useTokenList";
import { Card, Space } from "antd";
import React from "react";
import TokenList from "./TokenList";
import TopTokenWidget from "./TopTokenWidget";

const RightTab = () => {
  return (
    <>
      <Space direction="vertical" style={{ display: "flex" }}>
        <TokenList />
      </Space>
    </>
  );
};

export default RightTab;
