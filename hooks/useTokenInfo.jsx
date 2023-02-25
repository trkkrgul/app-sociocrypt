import React, { useState } from "react";
import { ethers } from "ethers";
import { useSigner, useContract, useContractReads } from "wagmi";
import BEP20_ABI from "../contracts/Bep-20.json";
import usePair from "./usePair";
import ADDRESSES from "../contracts/addresses.json";
const useTokenInfo = ({ tokenA }) => {
  const [tokenInfo, setTokenInfo] = useState({
    tokenAddress: null,
    tokenName: null,
    tokenSymbol: null,
    tokenDecimals: null,
  });
  const { data, isError, isLoading } = useContractReads({
    onSuccess(data) {
      setTokenInfo({
        tokenAddress: tokenA,
        tokenName: data[0],
        tokenSymbol: data[1],
        tokenDecimals: parseInt(data[2]),
      });
    },
    contracts: [
      {
        address: tokenA,
        abi: BEP20_ABI,
        functionName: "name",
        watch: true,
      },
      {
        address: tokenA,
        abi: BEP20_ABI,
        functionName: "symbol",
        watch: true,
      },
      {
        address: tokenA,
        abi: BEP20_ABI,
        functionName: "decimals",
        watch: true,
      },
    ],
  });

  return {
    TokenNameInfo: tokenInfo.tokenName,
    TokenAddressInfo: tokenInfo.tokenAddress,
    TokenSymbolInfo: tokenInfo.tokenSymbol,
    TokenDecimals: tokenInfo.tokenDecimals,
  };
};

export default useTokenInfo;
