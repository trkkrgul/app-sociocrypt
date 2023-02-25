import React from "react";
import {
  chainId,
  useAccount,
  useContract,
  useContractReads,
  useProvider,
  useSigner,
} from "wagmi";
import { ethers } from "ethers";
import ROUTER_ABI from "../contracts/PancakeRouter.json";
import useWETH from "./useWETH";
import usePair from "./usePair";
import LP_ABI from "../contracts/LP_ABI.json";
import { Token } from "@pancakeswap/sdk";
import ADDRESSES from "../contracts/addresses.json";

const WETH_DECIMALS = 18;
const UNI_DECIMALS = 18;

const useSwap = (tokenOne, tokenTwo) => {
  const { pairAddress } = usePair(tokenOne, tokenTwo);
  const ROUTER_ADDRESS = ADDRESSES.MAINNET.RouterAddress;
  const { address } = useAccount();

  const provider = useProvider();
  const { data: signer } = useSigner();

  const routerContract = useContract({
    address: ROUTER_ADDRESS,
    abi: ROUTER_ABI,
    signerOrProvider: signer,
  });
  const { approve, deposit } = useWETH();
  const poolContract = useContract({
    address: pairAddress,
    abi: LP_ABI,
    signerOrProvider: provider,
  });

  const swap = async (amount) => {
    if (!routerContract) {
      throw new Error("Router contract has not been initialized");
    }
    await deposit(amount);
    await approve(ROUTER_ADDRESS, amount);
    const immutables = await getPoolImmutables();

    const parsedAmount = ethers.utils.parseUnits(
      amount.toString(),
      UNI_DECIMALS
    );

    const params = {
      tokenIn: immutables.token1,
      tokenOut: immutables.token0,
      fee: immutables.fee,
      recipient: address,
      deadline: Math.floor(Date.now() / 1000) + 60 * 10,
      amountIn: parsedAmount,
      amountOutMinimum: 0,
      sqrtPriceLimitX96: 0,
    };

    const txn = await routerContract.exactInputSingle(params, {
      gasLimit: ethers.utils.hexlify(700000),
    });

    return txn;
  };

  const getQuote = async (amount) => {
    const [immutables, state] = await Promise.all([
      getPoolImmutables(),
      getPoolState(),
    ]);
  };

  const tokenA = new Token(56, immutables.token0, UNI_DECIMALS);
  const tokenB = new Token(56, immutables.token1, WETH_DECIMALS);

  const { data, isError, isLoading } = useContractReads({
    onSuccess(data) {},
    contracts: [
      {
        address: pairAddress,
        abi: LP_ABI,
        functionName: "token0",
        args: [pairAddress],
        watch: true,
      },
      {
        address: pairAddress,
        abi: LP_ABI,
        functionName: "token1",

        watch: true,
      },
    ],
  });

  return <div>useSwap</div>;
};

export default useSwap;
