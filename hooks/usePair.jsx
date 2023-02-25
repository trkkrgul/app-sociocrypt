import React, { useEffect, useState } from "react";
import FACTORY_ABI from "../contracts/PancakeFactory.json";
import { useContractRead } from "wagmi";
import ADDRESSES from "../contracts/addresses.json";

const usePair = ({ tokenA, tokenB }) => {
  const [tokenC, setTokenC] = useState(tokenA);
  const [tokenD, setTokenD] = useState(tokenB);
  useEffect(() => {
    setTokenC(tokenA);
    setTokenD(tokenB);
  }, [tokenA, tokenB]);
  const FACTORY_ADDRESS = ADDRESSES.MAINNET.FactoryAddress;
  const { data, isError, isLoading } = useContractRead({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: "getPair",
    args: [tokenC, tokenD],
    chainId: 56,
  });

  return { pairAddress: data };
};

export default usePair;
