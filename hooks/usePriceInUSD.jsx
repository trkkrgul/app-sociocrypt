import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useSigner, useContract, useContractReads } from "wagmi";
import BEP20_ABI from "../contracts/Bep-20.json";
import usePair from "./usePair";
import ADDRESSES from "../contracts/addresses.json";
import useTokenInfo from "./useTokenInfo";
import useNativePrice from "./useNativePrice";

const WETH_ADDRESS = ADDRESSES.MAINNET.WBNB;

const BUSD_ADDRESS = ADDRESSES.MAINNET.BUSD;

const usePriceInUSD = ({ tokenA }) => {
  const [priceInUSD, setPriceInUSD] = useState(null);
  const { WETH_PRICE } = useNativePrice();
  const { pairAddress } = usePair({
    tokenOne: tokenA,
    tokenTwo: WETH_ADDRESS,
  });
  const { data, isError, isLoading } = useContractReads({
    onSuccess(data) {
      const tokenInLP = data[1];
      const bnbInLP = data[0] / Math.pow(10, 18);
      setPriceInUSD(WETH_PRICE * (bnbInLP / tokenInLP));
    },
    contracts: [
      {
        address: ADDRESSES.MAINNET.WBNB,
        abi: BEP20_ABI,
        functionName: "balanceOf",
        args: [pairAddress],
        watch: true,
        chainId: 56,
      },
      {
        address: tokenA,
        abi: BEP20_ABI,
        functionName: "balanceOf",
        args: [pairAddress],
        watch: true,
        chainId: 56,
      },
    ],
  });

  return { priceInUSD };
};

export default usePriceInUSD;
