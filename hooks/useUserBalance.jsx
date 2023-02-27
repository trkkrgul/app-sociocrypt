import React, { useState } from "react";
import { useAccount, useBalance, useProvider, useSigner } from "wagmi";
import { ethers } from "ethers";
import ADDRESSES from "../contracts/addresses.json";

const useUserBalance = ({ tokenA, userWallet }) => {
  const { address, isConnecting, isDisconnected } = useAccount();

  const [userBalance, setUserBalance] = useState(0);
  const balance = useBalance({
    address: Boolean(userWallet) ? userWallet : address,
    token: tokenA === ADDRESSES.MAINNET.WBNB ? null : tokenA,
    chain: 56,
    onSuccess(data) {
      setUserBalance(parseFloat(data.formatted));
    },
  });

  return { userBalance };
};

export default useUserBalance;
