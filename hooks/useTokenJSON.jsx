import React, { useEffect, useState } from "react";
import useNativePrice from "./useNativePrice";
import usePriceInBNB from "./usePriceInBNB";
import usePriceInUSD from "./usePriceInUSD";
import useTokenInfo from "./useTokenInfo";
import ADDRESSES from "../contracts/addresses.json";
import usePair from "./usePair";
import useUserBalance from "./useUserBalance";
import { getAddress } from "ethers/lib/utils.js";
const useTokenJSON = ({ tokenA }) => {
  useEffect(() => {}, [tokenA]);
  const { priceInBNB } = usePriceInBNB({ tokenA: tokenA });
  const { pairAddress } = usePair({
    tokenA: tokenA,
    tokenB: ADDRESSES.MAINNET.WBNB,
  });
  const { WETH_PRICE } = useNativePrice({ tokenA: ADDRESSES.MAINNET.WBNB });
  const { TokenAddressInfo, TokenDecimals, TokenNameInfo, TokenSymbolInfo } =
    useTokenInfo({ tokenA: tokenA });
  const currentTim = new Date(Date.now());
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  };

  const { userBalance } = useUserBalance({ tokenA: tokenA });
  const tokenJSON = {
    priceInBNB: priceInBNB * Math.pow(10, TokenDecimals),
    priceInUSD: priceInBNB * WETH_PRICE * Math.pow(10, TokenDecimals),
    TokenAddressInfo,
    TokenDecimals,
    TokenNameInfo,
    TokenSymbolInfo,
    wBnbPair: pairAddress,
    userBalance,
    wBNBPrice: WETH_PRICE,
  };
  return { tokenJSON };
};

export default useTokenJSON;
