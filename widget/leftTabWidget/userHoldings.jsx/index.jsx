import useTokenJSON from "@/hooks/useTokenJSON";
import { Description } from "@mui/icons-material";
import { Avatar, Card, Descriptions, Divider, Space, Typography } from "antd";
import Link from "next/link";
import React from "react";

const UserPortfolio = () => {
  const { tokenJSON } = useTokenJSON({
    tokenA: "0x7035d3b1cb1ced246e3bce35b1c7073a97530787",
  });
  const tokenPrice =
    parseFloat(tokenJSON?.wBNBPrice) * parseFloat(tokenJSON?.priceInBNB);
  const tokenLog = parseInt(Math.log10(tokenPrice) * -1 + 2);
  return (
    Boolean(tokenJSON?.TokenAddressInfo) && (
      <Card bodyStyle={{ margin: "0", padding: "0" }}>
        <Descriptions bordered size="small" layout="vertical" column={1}>
          <Descriptions.Item label="Token">
            <Space>
              <Avatar
                shape="circle"
                src="https://firebasestorage.googleapis.com/v0/b/socio-378818.appspot.com/o/img%2Fsocio.pngda7debde-c60b-41c3-9376-1558e0454dd5?alt=media&token=a69f9a52-4776-49ee-a8bc-47beeb7b301c"
                style={{
                  border: "1px solid #ff564e",
                  backgroundColor: "#000",
                }}
              ></Avatar>
              <Typography.Text strong ellipsis className="gradient-text">
                {tokenJSON?.TokenNameInfo}
              </Typography.Text>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Contract">
            <Typography.Text strong copyable>
              {tokenJSON.TokenAddressInfo}
            </Typography.Text>
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
                <Typography.Text strong>DexTools</Typography.Text>
              </Link>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Price">
            <Typography.Text strong ellipsis>
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
          <Descriptions.Item label="User Balance">
            <Typography.Text strong ellipsis>
              {tokenJSON.userBalance?.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              {tokenJSON.TokenSymbolInfo}
            </Typography.Text>
            <Divider type="vertical" />
            <Typography.Text strong ellipsis>
              {(tokenJSON.userBalance * tokenJSON.priceInUSD)?.toLocaleString(
                "en-US",
                {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }
              )}
            </Typography.Text>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    )
  );
};

export default UserPortfolio;
