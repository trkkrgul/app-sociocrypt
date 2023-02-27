import {
  setAuthState,
  setAuthUser,
  setToken,
  setWalletAddress,
} from "@/store/slices/authSlice";
import { Web3Button } from "@web3modal/react";
import { Button, Card, message, Space, Typography } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAccount, useSignMessage } from "wagmi";
const LoginWidget = () => {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.auth.walletAddress);
  const token = useSelector((state) => state.auth.token);

  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data) {
      message.success("Signed successfully");
      dispatch(setToken(data));
      if (Boolean(token)) {
        setSignatured(true);
      }
    },
  });

  const account = useAccount({
    onConnect({ address, isReconnected }) {
      if (!walletAddress) {
        message.success("Sign message to login");
        dispatch(setWalletAddress(address));
        dispatch(setToken(null));
      } else {
        message.success("Connected out");
      }
    },
    onDisconnect() {
      dispatch(setToken(null));
      dispatch(setWalletAddress(null));
      dispatch(setAuthState(false));
      dispatch(setAuthUser(null));
      message.success("Disconnected");
    },
  });
  return (
    <Card
      size="small"
      style={{ boxShadow: "0px 12px 20px 1px rgba(0, 0, 0, .5)" }}
    >
      {Boolean(walletAddress) && !Boolean(token) ? (
        <Space
          direction="horizontal"
          size="middle"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>Please sign the message to login.</Typography>

          <Button
            onClick={() =>
              signMessage({
                message: `Login sociocrypt.com with your address`,
              })
            }
          >
            Signature
          </Button>
        </Space>
      ) : (
        <Space
          direction="horizontal"
          size="middle"
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography>Connect your wallet to be able to login</Typography>
          <Web3Button icon="hide" />
        </Space>
      )}
    </Card>
  );
};

export default LoginWidget;
