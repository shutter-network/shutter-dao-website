import { useState, useEffect } from "react";
import getWeb3, { verifyChainId } from "../api/web3";

export enum CHAIN_STATE {
  CONNECTING = "connecting",
  CONNECTED = "connected",
  WRONG_CHAIN = "wrongChain",
  CHAIN_UNKNOWN = "chainUnknown",
  DISCONNECTED = "disconnected",
}

export function useChainState(): CHAIN_STATE {
  const [chainState, setChainState] = useState<CHAIN_STATE>(CHAIN_STATE.CONNECTING);

  useEffect(() => {
    interface Environment {
      chainCheckIntervalId: number;
    }

    const env: Environment = {
      chainCheckIntervalId: 0,
    };

    async function connect(): Promise<void> {
      try {
        if (getWeb3()) {
          async function checkChain(): Promise<void> {
            try {
              if (await verifyChainId(process.env.REACT_APP_CHAIN_ID)) {
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
