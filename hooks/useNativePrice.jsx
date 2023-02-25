import React, { useState } from "react";
import { ethers } from "ethers";
import { useSigner, useContract, useContractReads } from "wagmi";
import BEP20_ABI from "../contracts/Bep-20.json";
import usePair from "./usePair";
import ADDRESSES from "../contracts/addresses.json";

const WETH_ADDRESS = ADDRESSES.MAINNET.WBNB;

const BUSD_ADDRESS = ADDRESSES.MAINNET.BUSD;

const useNativePrice = () => {
  const [WETH_PRICE, setWETH_PRICE] = useState(null);
  const { pairAddress } = usePair({
    tokenA: BUSD_ADDRESS,
    tokenB: WETH_ADDRESS,
  });
  const { data, isError, isLoading } = useContractReads({
    onSuccess(data) {
      setWETH_PRICE(parseFloat(data[1] / data[0]));
    },
    contracts: [
      {
        address: WETH_ADDRESS,
        abi: BEP20_ABI,
        functionName: "balanceOf",
        args: [pairAddress],
        watch: true,
        chainId: 56,
      },
      {
        address: BUSD_ADDRESS,
        abi: BEP20_ABI,
        functionName: "balanceOf",
        args: [pairAddress],
        watch: true,
        chainId: 56,
      },
    ],
  });

  return { WETH_PRICE };
};

export default useNativePrice;
