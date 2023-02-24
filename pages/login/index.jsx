import { Box, Typography } from "@mui/material";
import { Web3Button } from "@web3modal/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount, useBalance } from "wagmi";
import {
  setWalletAddress,
  setUserBalance,
  setAuthState,
} from "@/store/slices/authSlice";
import { useRouter } from "next/router";
import { Button, Card, Space, Steps } from "antd";

const Auth = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.authState);
  const walletAddress = useSelector((state) => state.auth.walletAddress);
  const userBalance = useSelector((state) => state.auth.userBalance);
  const [steps, setSteps] = useState(0);
  const { address } = useAccount();
  const balance = useBalance({
    address: address,
    token: "0x7035d3b1cb1ced246e3bce35b1c7073a97530787",
    chainId: 56,
    onSuccess(data) {
      console.log(data);
      dispatch(setUserBalance(data.formatted));
    },
  });

  return (
    <Space
      direction="vertical"
      style={{
        marginTop: "2rem",
        width: "100%",
        display: "flex",
      }}
      align="center"
    >
      <Steps
        style={{ width: "100%", maxWidth: "1190px" }}
        current={Boolean(address) ? 1 : 0}
        items={[
          {
            title: Boolean(address) ? "Connected" : "Connect Wallet",
            description: Boolean(address) ? "Wallet connection is done!" : "",
          },
          {
            title:
              Boolean(address) && Boolean(isAuth)
                ? "You are ready to go!"
                : "Login",
            description: "",
          },
          {
            title: "Done",
            description: "",
          },
        ]}
      />

      <Box sx={{ mt: 5 }} width="100%" justifyContent={"center"} display="flex">
        {!Boolean(address) && <Web3Button />}{" "}
        {Boolean(address) && (
          <Button
            onClick={() => {
              dispatch(setWalletAddress(address));
              dispatch(setUserBalance(balance?.data.formatted));
              dispatch(setAuthState(true));
              router.push("/");
            }}
          >
            Login
          </Button>
        )}
      </Box>
    </Space>
  );
};

export default Auth;
