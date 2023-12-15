import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useAccount } from "../../../common/hooks/account";
import { requestPermission } from "../../../common/api/web3";

export const WarningAccount = ({
  vestingAccount,
  children,
}: {
  vestingAccount: string;
  children?: React.ReactNode;
}) => {
  const account = useAccount();

  const connect = async () => {
    await requestPermission();
  };

  if (!account) {
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

  return children as React.ReactElement;
};
