import React from "react";
import { ethers } from "ethers";
import { useSigner, useContract } from "wagmi";
import BEP20_ABI from "../contracts/Bep-20.json";

import ADDRESSES from "../contracts/addresses.json";

const WETH_ADDRESS = ADDRESSES.MAINNET.WBNB;
const WETH_DECIMALS = 18;

const useWETH = () => {
  const { data: signer } = useSigner();
  const WETHContract = useContract({
    address: WETH_ADDRESS,
    abi: BEP20_ABI,
    signerOrProvider: signer,
  });
  const deposit = async (amount) => {
    if (!WETHContract)
      throw new Error("WETH contract has not been initialized");

    const parsedAmount = ethers.utils.parseUnits(
      amount.toString(),
      WETH_DECIMALS
    );

    const txn = await WETHContract.deposit({ value: parsedAmount });
    return txn;
  };
  const approve = async (address, amount) => {
    if (!WETHContract)
      throw new Error("WETH contract has not been initialized");

    const parsedAmount = ethers.utils.parseUnits(
      amount.toString(),
      WETH_DECIMALS
    );

    const txn = WETHContract.approve(address, parsedAmount);
    return txn;
  };

  return { deposit, approve };
};

export default useWETH;
