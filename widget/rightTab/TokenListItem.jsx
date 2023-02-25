import useTokenJSON from "@/hooks/useTokenJSON";
import React from "react";
import { List, Typography, Avatar, Space, Card, Row } from "antd";
import { Box } from "@mui/material";

const TokenListItem = ({ tokenA }) => {
  const { tokenJSON } = useTokenJSON({ tokenA: tokenA });
  const tokenPrice =
    parseFloat(tokenJSON?.wBNBPrice) * parseFloat(tokenJSON?.priceInBNB);
  const tokenLog = parseInt(Math.log10(tokenPrice) * -1 + 2);

  return (
    Boolean(tokenJSON.TokenNameInfo) && (
      <Space
        direction="horizontal"
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
        <Box display="flex" flexDirection={"column"}>
          <Typography style={{ fontWeight: "700" }}>
            {tokenJSON.TokenNameInfo}
          </Typography>
          <Typography>
            Price:
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
        </Box>
      </Space>
    )
  );
};

export default TokenListItem;
