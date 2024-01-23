import React, { useCallback, useState } from "react";
import { VestingType } from "./vesting";
import { redeem } from "../../api/web3";
import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { SpinIcon } from "../../../common/components/spin-icon";
import TermsAndConditions from "../claim-components/terms-modal";
import { useWeb3 } from "../../../common/hooks/web3";

export const ActivateVesting = ({
  vesting,
  onSuccess,
}: {
  vesting: VestingType;
  onSuccess: () => void;
}) => {
  const [error, setError] = React.useState("");
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [handleDeclineTermsAndCondition, setOnDeclineTermsAndCondition] =
    useState(() => () => {});
  const [acceptedTermsAndCondition, setAcceptedTermsAndCondition] =
    useState(false);
  const [showTermsAndConditionsModal, setShowTermsAndConditionsModal] =
    useState(false);
  const [onAcceptTermsAndCondition, setOnAcceptTermsAndCondition] = useState(
    () => () => {}
  );
  const web3 = useWeb3();

  const handleSign = async (tx: any) => {};

  const handleApproveConfirmation = async (tx: any) => {
    setIsProcessing(false);
  };
  const handleConfirmation = async (tx: any) => {
    onSuccess();
  };

  const onError = (err: any) => {
    setIsProcessing(false);
    setError(err.message);
  };
  const redeemVesting = async () => {
    setIsProcessing(true);
    setError("");

    await redeem(
      web3,
      vesting.account,
      vesting.amount,
      vesting.curve,
      vesting.durationWeeks,
      vesting.startDate,
      vesting.initialUnlock,
      vesting.requiresSPT,
      vesting.proof,
      handleSign,
      handleConfirmation,
      onError
    );

    setIsProcessing(false);
  };

  const requestTermsAndConditionsAcceptance = useCallback(() => {
    return new Promise((resolve) => {
      if (acceptedTermsAndCondition) {
        resolve(true);
      } else {
        // We need a function to return a function, as react treats functions special
        setOnAcceptTermsAndCondition(() => () => {
          setShowTermsAndConditionsModal(false);
          setAcceptedTermsAndCondition(true);
          resolve(true);
        });
        // We need a function to return a function, as react treats functions special
        setOnDeclineTermsAndCondition(() => () => {
          setShowTermsAndConditionsModal(false);
          resolve(false);
        });
        setShowTermsAndConditionsModal(true);
      }
    });
  }, [acceptedTermsAndCondition]);

  const handleRedeemRequest = useCallback(async () => {
    const acceptedTermsAndCondition =
      await requestTermsAndConditionsAcceptance();
    if (acceptedTermsAndCondition) {
      setAcceptedTermsAndCondition(true);
      redeemVesting();
    }
  }, [vesting, requestTermsAndConditionsAcceptance]);

  return (
    <div>
      {showTermsAndConditionsModal ? (
        <TermsAndConditions
          onAccept={onAcceptTermsAndCondition}
          onReject={handleDeclineTermsAndCondition}
        />
      ) : null}
      <div className="">
        {error && (
          <div className="flex">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3 max-w-xs">
              <h3 className="text-sm font-bold text-red-800">
                Something went wrong!
              </h3>
              <div className="mt-2 pr-10 text-sm text-red-700 overflow-x-auto">
                <p className="">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="px-0 flex flex-row justify-end">
        <button
          className="rounded-md bg-indigo-500 px-2.5 py-1.5
                text-sm font-semibold text-white shadow-sm hover:bg-indigo-800 flex flex-row"
          onClick={handleRedeemRequest}
          disabled={isProcessing}
        >
          {isProcessing && <SpinIcon />}

          <div className="mt-1">Activate Allocation</div>
        </button>
      </div>
    </div>
  );
};
