import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useAccount } from "../../../common/hooks/account";
import { CHAIN_STATE, useChainState } from "../../../common/hooks/chain-state";
import { useWeb3Modal } from "@web3modal/ethers/react";

export const WarningAccount = ({
  vestingAccount,
  children,
  customWrongChainMessage,
}: {
  vestingAccount: string;
  children?: React.ReactNode;
  customWrongChainMessage?: string;
}) => {
  const account = useAccount();
  const chainState = useChainState();
  const { open } = useWeb3Modal();

  const connect = async () => {
    open({ view: "Connect" });
  };

  if (!account) {
    return (
      <div className="rounded-md bg-yellow-50 p-4 mt-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon
              className="h-5 w-5 text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              You are not connected to any wallet!
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Please connect your wallet to continue.
                <button
                  className="ml-2 text-sm font-bold text-yellow-800 underline"
                  onClick={connect}
                >
                  Connect
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (account !== vestingAccount) {
    return (
      <div className="rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon
              className="h-5 w-5 text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              This vesting is not for your account!
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              This allocation is for {vestingAccount} and you are currently
              connected with {account}. Switch account to continue.
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (chainState === CHAIN_STATE.WRONG_CHAIN) {
    return (
      <div className="rounded-md bg-yellow-50 mt-4 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon
              className="h-5 w-5 text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3 max-w-xs">
            <h3 className="text-sm font-bold text-yellow-800">
              Wrong network!
            </h3>
            <div className="mt-2 pr-10 text-sm text-yellow-700 overflow-x-auto">
              <p>
                {customWrongChainMessage ||
                  `You are connected to the wrong network. Switch to
                  ${process.env.REACT_APP_CHAIN_NAME} to proceed with claiming.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return children as React.ReactElement;
};
