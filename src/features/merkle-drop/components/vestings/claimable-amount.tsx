import React, { useEffect, useState } from "react";
import { type VestingType, type VestingOnchainType } from "./vesting";
import { convertToWei, formatTokenAmount, parseTokenAmount } from "../../../common/utils/math";
import { Modal } from "../../../common/components/modal";
import {
  claimTokens as claimTokensOnPool,
  getTokensAvailableForWithdrawal,
  isTokenPaused,
} from "../../api/web3";
import { useAccount } from "../../../common/hooks/account";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { isEthAddress } from "../../../common/utils/address";
import { SpinIcon } from "../../../common/components/spin-icon";
import { Receipt } from "web3";

const tokenAddress = process.env.REACT_APP_SHU_TOKEN_CONTRACT_ADDRESS;
const ClaimableAmount = ({
  vestingOnChain,
  vestingDataFromServer,
}: {
  vestingOnChain: VestingOnchainType;
  vestingDataFromServer: VestingType;
}) => {
  const account = useAccount();

  const [claimableAmount, setClaimableAmount] = useState<bigint>(0n);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [beneficiary, setBeneficiary] = useState<string>("");
  const [tokensToClaim, setTokensToClaim] = useState<string>("");
  const [error, setError] = useState("");
  const [tokenPaused, setTokenPaused] = useState<boolean>(false);

  if (tokenAddress === undefined) {
    throw new Error("REACT_APP_SHU_TOKEN_CONTRACT_ADDRESS is undefined");
  }

  useEffect(() => {
    const getChainData = async () => {
      const amountClaimable = await getTokensAvailableForWithdrawal(
        vestingDataFromServer.account,
        vestingDataFromServer.vestingId
      );

      setClaimableAmount(amountClaimable);

      const tokenPaused = await isTokenPaused(tokenAddress);
      setTokenPaused(tokenPaused);
    };

    getChainData();
  }, [vestingOnChain]);



  const onConfirmation = (confirmations: bigint, receipt: Receipt) => {
    setIsProcessing(false);
    setShowModal(false);
  };

  const onError = (err: any) => {
    setError(err.message);
    setIsProcessing(false);
  };
  const claimTokens = async () => {
    setIsProcessing(true);
    setError("");

    if (!account) {
      return;
    }


    // verify that tokenToClaim is a valid number and it is lower than claimableAmount
    if (tokensToClaim === "") {
      setError("No amount to claim entered");
      setIsProcessing(false);
      return;
    }
    if (convertToWei(tokensToClaim) > claimableAmount) {
      setError("Amount to claim exceeds claimable amount");
      setIsProcessing(false);
      return;
    }

    // verify that beneficiary is a valid address
    if (!isEthAddress(beneficiary)) {
      setError("Invalid address to claim to");
      setIsProcessing(false);
      return;
    }

    await claimTokensOnPool(
      account,
      vestingDataFromServer.account,
      vestingDataFromServer.vestingId,
      beneficiary,
      claimableAmount,
      onConfirmation,
      onError
    );
  };

  const handleClaimButtonClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
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
              Something is wrong here!
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>You are not connected to any wallet!</p>
              <p>Please connect your wallet to continue.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const modalBody = (
    <>
      <div className="mt-2 grid grid-cols-1">
        <div className="col-span-full">
          <label
            htmlFor="delegate_from"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Tokens to claim
          </label>
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <input
              type="text"
              value={tokensToClaim}
              onChange={(e) => {
                setTokensToClaim(e.target.value);
              }}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
          <p className="mt-1 text-sm leading-6 text-gray-600 text-right">
            <button
              className="underline"
              onClick={() => {
                setTokensToClaim(parseTokenAmount(claimableAmount));
              }}
            >
              Max
            </button>
          </p>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-1">
        <div className="col-span-full">
          <label
            htmlFor="delegate_from"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Send to beneficiary:
          </label>
          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
            <input
              type="text"
              value={beneficiary}
              onChange={(e) => {
                setBeneficiary(e.target.value);
              }}
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
          <p className="mt-1 text-sm leading-6 text-gray-600 text-right">
            <button
              className="underline"
              onClick={() => {
                setBeneficiary(account);
              }}
            >
              Send to self?
            </button>
          </p>
        </div>
      </div>
      {error && (
        <div className="rounded-md bg-yellow-50 p-4 mt-5 ">
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
    </>
  );

  const actionButtons = (
    <div className="flex flex-1 justify-center">
      <button
        onClick={claimTokens}
        className="rounded-md bg-indigo-500 px-2 py-1.5 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-indigo-50 disabled:opacity-70 flex flex-row"
        //    disabled={true}
      >
        {isProcessing && <SpinIcon />}
        <div className="mt-1">Claim</div>
      </button>
    </div>
  );
  return (
    <div className={`flex ${tokenPaused ? "flex-col" : "flex-row"}`}>
      <p className="mt-1 mr-2">{formatTokenAmount(parseTokenAmount(claimableAmount))}</p>
      {tokenPaused ? (
        <>
          {tokenPaused && (
            <div
              className="mt-2 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">
                The token is currently non-transferable. Once the DAO Votes on
                making it transferable you'll be able to claim the amount here.
              </span>
            </div>
          )}
        </>
      ) : (
        <>
          <button
            onClick={handleClaimButtonClick}
            className="rounded-md bg-indigo-500 px-2 py-1.5 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-indigo-50 disabled:opacity-70"
          >
            Claim
          </button>

          {showModal && (
            <div>
              <Modal
                title="Claim Tokens"
                body={modalBody}
                actionButtons={actionButtons}
                onClose={closeModal}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClaimableAmount;
