import { useState, useEffect } from "react";
import { useWeb3 } from "./web3";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

export enum CHAIN_STATE {
  CONNECTING = "connecting",
  CONNECTED = "connected",
  WRONG_CHAIN = "wrongChain",
  CHAIN_UNKNOWN = "chainUnknown",
  DISCONNECTED = "disconnected",
}

export function useChainState(): CHAIN_STATE {
  const [chainState, setChainState] = useState<CHAIN_STATE>(
    CHAIN_STATE.CONNECTING
  );
  const web3 = useWeb3();
  const { chainId } = useWeb3ModalAccount();
  useEffect(() => {
    interface Environment {
      chainCheckIntervalId: number;
    }

    const env: Environment = {
      chainCheckIntervalId: 0,
    };

    async function connect(): Promise<void> {
      try {
        if (web3) {
          async function checkChain(): Promise<void> {
            try {
              if (
                chainId &&
                BigInt(chainId) ===
                  BigInt(process.env.REACT_APP_CHAIN_ID as unknown as string)
              ) {
                setChainState(CHAIN_STATE.CONNECTED);
              } else {
                setChainState(CHAIN_STATE.WRONG_CHAIN);
              }
            } catch (e) {
              console.error(e);
              clearInterval(env.chainCheckIntervalId);
              setChainState(CHAIN_STATE.CHAIN_UNKNOWN);
            }
          }

          env.chainCheckIntervalId = window.setInterval(checkChain, 500);
          checkChain();
        } else {
          setChainState(CHAIN_STATE.DISCONNECTED);
        }
      } catch (error) {
        console.log(error);
        setChainState(CHAIN_STATE.DISCONNECTED);
      }
    }

    connect();
    return () => window.clearInterval(env.chainCheckIntervalId);
  }, []);

  return chainState;
}
