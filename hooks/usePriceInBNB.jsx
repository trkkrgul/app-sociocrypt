import React, { useState } from "react";
import { ethers } from "ethers";
import { useSigner, useContract, useContractReads } from "wagmi";
import BEP20_ABI from "../contracts/Bep-20.json";
import usePair from "./usePair";
import ADDRESSES from "../contracts/addresses.json";
import useTokenInfo from "./useTokenInfo";

const WETH_ADDRESS = ADDRESSES.MAINNET.WBNB;

const BUSD_ADDRESS = ADDRESSES.MAINNET.BUSD;

const usePriceInBNB = ({ tokenA }) => {
  const { TokenDecimals } = useTokenInfo({ tokenA: tokenA });
  const [priceInBNB, setPriceInBNB] = useState(null);
  const { pairAddress } = usePair({
    tokenA: tokenA,
    tokenB: WETH_ADDRESS,
  });
  const { data, isError, isLoading } = useContractReads({
    onSuccess(data) {
      const tokenInLP = data[1];
      const bnbInLP = data[0] / Math.pow(10, 18);

      setPriceInBNB(bnbInLP / tokenInLP);
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

  return { priceInBNB };
};

export default usePriceInBNB;
