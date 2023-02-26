import useTokenList from "@/hooks/useTokenList";
import React from "react";
import { List, Avatar, Card, Typography, Divider, Space } from "antd";
import TokenListItem from "./TokenListItem";
const TokenList = () => {
  const { tokenList } = useTokenList();
  const data = [
    {
      title: "Ant Design Title 1",
    },
  ];
  return (
    <Card>
      <Space direction="vertical" style={{ display: "flex" }}>
        <Typography.Text strong>Hot Tokens</Typography.Text>

        <Space direction="vertical" style={{ display: "flex" }}>
          {tokenList?.map((tokenA) => (
            <TokenListItem tokenA={tokenA} key={tokenA} />
          ))}
        </Space>
      </Space>
    </Card>
  );
};

export default TokenList;
