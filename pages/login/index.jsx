import { Box, Typography } from "@mui/material";
import { Web3Button } from "@web3modal/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount, useBalance, useSigner, useSignMessage } from "wagmi";
import {
  setWalletAddress,
  setUserBalance,
  setAuthState,
  setToken,
} from "@/store/slices/authSlice";
import { useRouter } from "next/router";
import { Button, Card, Space, Steps } from "antd";
import CryptoJS from "crypto-js";

const Auth = () => {
  const [isSignatured, setSignatured] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.authState);

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

  const token = useSelector((state) => state.auth.token);
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data) {
      console.log("root", data);
      dispatch(setToken(data));
      if (Boolean(token)) {
        setSignatured(true);
      }
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
            onClick={async () => {
              if (!isSignatured) {
                signMessage({
                  message: `Login sociocrypt.com with your address`,
                });
              }
              dispatch(setWalletAddress(address));
              dispatch(setUserBalance(balance?.data.formatted));
              dispatch(setAuthState(true));
              if (Boolean(token) && isSignatured) {
                router.push("/");
              }
            }}
          >
            {isSignatured ? "Login" : "Signature"}
          </Button>
        )}
      </Box>
    </Space>
  );
};

export default Auth;
