import useTokenJSON from "@/hooks/useTokenJSON";
import React, { useState } from "react";
import {
  List,
  Typography,
  Avatar,
  Space,
  Card,
  Row,
  Divider,
  Col,
  Popover,
  Descriptions,
} from "antd";
import { Box } from "@mui/material";
import Link from "next/link";
import { Telegram, Twitter } from "@mui/icons-material";

const TokenListItem = ({ tokenA }) => {
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const { tokenJSON } = useTokenJSON({ tokenA: tokenA });
  const tokenPrice =
    parseFloat(tokenJSON?.wBNBPrice) * parseFloat(tokenJSON?.priceInBNB);
  const tokenLog = parseInt(Math.log10(tokenPrice) * -1 + 2);

  return (
    Boolean(tokenJSON.priceInUSD) && (
      <Popover
        content={
          <Card
            style={{
              width: "300px",
              height: "300px",
              overflowY: "scroll",
              padding: "0",
              margin: "0",
            }}
          >
            <Descriptions bordered size="small" layout="vertical" column={1}>
              <Descriptions.Item label="Token">
                <Space>
                  <Avatar
                    shape="circle"
                    src={`https://static.metaswap.codefi.network/api/v1/tokenIcons/56/${
                      Boolean(tokenJSON?.TokenAddressInfo) &&
                      tokenJSON?.TokenAddressInfo.toLowerCase()
                    }.png `}
                  />
                  <Typography.Text strong>
                    {tokenJSON?.TokenSymbolInfo}
                  </Typography.Text>
                  <Divider type="vertical" />
                  <Typography.Text strong>
                    {tokenJSON?.TokenNameInfo}
                  </Typography.Text>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Charts">
                <Space>
                  <Link
                    target={"_blank"}
                    href={`https://poocoin.app/tokens/${tokenJSON.TokenAddressInfo}`}
                  >
                    <Typography.Text strong> Poocoin </Typography.Text>
                  </Link>
                  <Divider type="vertical" />
                  <Link
                    target={"_blank"}
                    rel="noreferrer"
                    href={`https://dextools.io/app/en/bnb/pair-explorer/${tokenJSON.TokenAddressInfo}`}
                  >
                    <Typography.Text strong> DexTools </Typography.Text>
                  </Link>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Contract">
                <Typography.Text strong copyable>
                  {tokenJSON.TokenAddressInfo}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="Socials">
                <Space style={{ display: "flex" }}>
                  <Telegram />
                  <Twitter />
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Price">
                <Typography.Text strong>
                  {tokenJSON.priceInUSD?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2,
                    maximumFractionDigits: Math.max(
                      tokenLog > 0 && tokenLog < 15 ? tokenLog : 0,
                      2
                    ),
                  })}
                </Typography.Text>
              </Descriptions.Item>
            </Descriptions>
          </Card>
        }
        title={tokenJSON.TokenNameInfo}
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Row
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Col span={12}>
            <Space
              style={{
                display: "flex",
                "&:hover": { backgroundColor: "#ffffff40" },
              }}
            >
              <Avatar
                shape="square"
                src={`https://static.metaswap.codefi.network/api/v1/tokenIcons/56/${
                  Boolean(tokenJSON?.TokenAddressInfo) &&
                  tokenJSON?.TokenAddressInfo.toLowerCase()
                }.png `}
              />
              <Typography style={{ fontWeight: "700" }}>
                {tokenJSON.TokenSymbolInfo}
              </Typography>
            </Space>
          </Col>
          <Col span={4}>
            <Divider type="vertical" />
          </Col>
          <Col span={8}>
            <Typography>
              {tokenJSON.priceInUSD?.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 2,
                maximumFractionDigits: Math.max(
                  tokenLog > 0 && tokenLog < 15 ? tokenLog : 0,
                  2
                ),
              })}
            </Typography>
          </Col>
        </Row>
      </Popover>
    )
  );
};

export default TokenListItem;
