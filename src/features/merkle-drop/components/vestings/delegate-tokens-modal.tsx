import { ExclamationTriangleIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";
import { Button } from "../../../common/components/button";

import { useCallback } from "react";
import { parseTokenAmount } from "../../../common/utils/math";
import { delegateTokens } from "../../api/web3";
import { Receipt } from "web3";
import { useStateValue } from "../../../../store/hook";
import { SpinIcon } from "../../../common/components/spin-icon";
import { isEthAddress } from "../../../common/utils/address";


function DelegateTokensModal({
  poolAddress,
  poolBalance,
  userAddress,
  onClose,
}: {
  poolAddress: string;
  userAddress: string;
  poolBalance: bigint;
  onClose: () => void;
}) {
  const [state, dispatch] = useStateValue();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [delegateTo, setDelegateTo] = useState<string>("");

  const handleSign = async (tx: any) => {
    console.log("handleSign", tx);
  };

  const onError = (err: any) => {
    setError(err.message);
  };

  const handleConfirmation = async (
    confirmations: bigint,
    receipt: Receipt
  ) => {
    dispatch({
      type: "update_pool_info",
      payload: { account: userAddress, delegatee: delegateTo },
    });

    onClose();
  };
  const delegate = useCallback(async () => {
    setIsProcessing(true);
    setError("");

    if(!isEthAddress(delegateTo)) {
      setError("Invalid address to delegate to");
      setIsProcessing(false);
      return;
    }


    await delegateTokens(
      poolAddress,
      userAddress,
      delegateTo,
      handleSign,
      handleConfirmation,
      onError
    );
    setIsProcessing(false);
  }, [delegateTo]);

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-3xl shadow-card-gray-light relative flex flex-col w-full bg-off-white outline-none focus:outline-none">
            <div className="flex-1 flex-cols items-center px-5">
              <div className="p-5">
                <h1 className="text-3xl font-semibold">Delegate tokens</h1>
              </div>
              <button
                onClick={onClose}
                className="absolute top-7 right-10 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="px-5">
              <div className="flex flex-col px-5">
                <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="delegate_from"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Delegate from:
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                        <span className="block flex select-none items-center  py-1.5 px-3 text-gray-500 sm:text-sm">
                          {poolAddress}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-1">
                  <div className="col-span-full">
                    <label
                      htmlFor="delegate_from"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Tokens to delegate:
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                        <span className="block flex select-none items-center  py-1.5 px-3 text-gray-500 sm:text-sm">
                          {parseTokenAmount(poolBalance)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-1">
                  <div className="col-span-full">
                    <label
                      htmlFor="delegate_from"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Delegate to address:
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                        <input
                          type="text"
                          value={delegateTo}
                          onChange={(e) => {
                            console.log("e.target.value", e.target.value);
                            setDelegateTo(e.target.value);
                          }}
                          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                        />
                      </div>
                      <p className="mt-1 text-sm leading-6 text-gray-600 text-right">
                        <button
                          className="underline"
                          onClick={() => {
                            setDelegateTo(userAddress);
                          }}
                        >
                          Delegate to self?
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {error && (
              <div className="rounded-md bg-yellow-50 p-4 mt-5 mx-5">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <ExclamationTriangleIcon
                      className="h-5 w-5 text-yellow-400"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="ml-3 max-w-xs">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Something went wrong!
                    </h3>
                    <div className="mt-2 pr-10 text-sm text-yellow-700 overflow-x-auto">
                      <p className="">{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="flex items-center justify-center p-5">
              <Button
                onClick={() => {
                  delegate();
                }}
                isDark
                className="rounded-md bg-indigo-500 px-2.5 py-1.5  text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 hover:text-white flex flex-row"
                disabled={isProcessing}
              >
                {isProcessing && <SpinIcon />}
                <div className="mt-1">Delegate</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}

export default DelegateTokensModal;
