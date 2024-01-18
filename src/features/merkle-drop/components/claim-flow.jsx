import React, { useCallback, useState } from "react";

import * as backend from "../api/backend";
import { sameAddress } from "../../common/api/web3";

import AddressInput from "./claim-components/address-input";
import AddressDisplay from "./claim-components/address-display";
import ClaimSuccess from "./claim-components/claim-success";
import ClaimWait from "./claim-components/claim-wait";
import ClaimStart from "./claim-components/claim-start";
import Error from "./claim-components/error";
import WaitCard from "./claim-components/wait-card";
import ClaimFailed from "./claim-components/claim-failed";
import { useChainState } from "../../common/hooks/chain-state";
import { useAccount } from "../../common/hooks/account";
import { Card } from "../../common/components/card";
import { QuestionMark } from "../../common/components/icons/question-mark";
import NoTokens from "./claim-components/no-tokens";
import Claims from "./vestings/vestings";
import RetryButton from "./claim-components/retry-button";

const STATE = {
  INPUT: "input",
  LOADING: "loading",
  SHOW_PROOF: "showProof",
  CLAIM_START: "startClaimTokens",
  CLAIM_WAIT: "waitClaimTokens",
  CLAIM_END: "endClaimTokens",
  NO_TOKENS: "noTokens",
  TRANSACTION_FAILED: "transactionFailed",
  ERROR: "error",
};

function ClaimFlow() {
  const [internalState, setInternalState] = useState(STATE.INPUT);
  const [claimAddress, setClaimAddress] = useState("");
  const [proof, setProof] = useState([]);
  const [tokenAmount, setTokenAmount] = useState("");
  const [claimedAmount, setClaimedAmount] = useState("");
  const [vestings, setVestings] = useState([]);
  const web3Account = useAccount();
  const chainState = useChainState();
  const [txHash, setTxHash] = useState("");
  const [confirmations, setConfirmations] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const submit = useCallback((address) => {
    showError(
      "In order to claim your tokens you have to give this site permission to your wallet."
    );
    setInternalState(STATE.LOADING);
    setClaimAddress(address);
    backend
      .fetchTokenEntitlement(address)
      .then((data) => {
        if (data.length > 0) {
          setVestings(data);
          setInternalState(STATE.SHOW_PROOF);
        } else {
          setInternalState(STATE.NO_TOKENS);
        }
      })
      .catch((error) => {
        console.error(error);
        if (error.code === backend.SERVER_ERROR_CODE) {
          showError(
            "Could not fetch token entitlement. There was an internal server error, please try again later."
          );
        } else {
          showError(
            "Could not fetch token entitlement. The server is unreachable, please check your internet connection."
          );
        }
      });
  }, []);

  const reset = useCallback(() => {
    setConfirmations(0);
    setErrorMessage("");
    setTxHash("");
    setInternalState(STATE.INPUT);
  }, []);

  const showError = (errorMessage, options = { state: STATE.ERROR }) => {
    setErrorMessage(errorMessage);
    setInternalState(options.state);
  };

  let wrongAccountSelected = false;

  // account can be undefined, if website has no permissions yet to read the account
  // In this case, we do not know whether the account is wrong
  if (web3Account) {
    wrongAccountSelected = !sameAddress(web3Account, claimAddress);
  }

  const renderClaimStatus = useCallback(() => {
    switch (internalState) {
      case STATE.INPUT:
        return (
          <AddressInput onSubmit={submit} chainState={chainState} autoFocus />
        );
      case STATE.LOADING:
        return (
          <WaitCard title="Checking eligibility">
            <div>Please do not close your browser.</div>
            <div>This process may take up a few seconds.</div>
          </WaitCard>
        );
      case STATE.NO_TOKENS:
        return <NoTokens reset={reset} claimAddress={claimAddress} />;
      case STATE.SHOW_PROOF:
        return (
          <>
            <div className="flex-1 flex-row">
              <div
                className={`flex flex-row items-center w-full rounded-full  h-12 my-4`}
              >
                <AddressDisplay address={claimAddress} />

                <div className="flex flex-row items-center">
                  <RetryButton reset={reset} />
                </div>
              </div>
            </div>
            {vestings.length > 0 ? (
              <Claims vestings={vestings} account={claimAddress} />
            ) : (
              <div>no vestings for this address. </div>
            )}
          </>
        );
      case STATE.CLAIM_START:
        return <ClaimStart />;
      case STATE.CLAIM_WAIT:
        return <ClaimWait txHash={txHash} />;
      case STATE.CLAIM_END:
        return (
          <ClaimSuccess
            txHash={txHash}
            confirmations={confirmations}
            amount={claimedAmount}
            reset={reset}
          />
        );
      case STATE.ERROR:
        return <Error errorMessage={errorMessage} reset={reset} />;
      case STATE.TRANSACTION_FAILED:
        return (
          <ClaimFailed
            reset={reset}
            errorMessage={errorMessage}
            txHash={txHash}
          />
        );
      default:
        console.error("Unexpectedly reached default branch.");
    }
  }, [
    chainState,
    claimAddress,
    claimedAmount,
    confirmations,
    tokenAmount,
    errorMessage,
    internalState,
    proof,
    reset,
    submit,
    txHash,
    wrongAccountSelected,
  ]);

  return (
    <div>
      <Card className="md:shadow-2xl md:bg-shutter-black-lighter bg-transparent md:p-4 rounded-xl">
        <div className="flex flex-col w-full md:p-4">
          <div className="flex flex-row">
            <Card className="flex flex-row md:bg-opacity-0 bg-opacity-100 bg-card-colors-darkest_grey shadow-2xl p-4 md:p-0 text-off-white">
              <div className="pr-2">
                <QuestionMark className="stroke-current" />
              </div>
              <h3 className="md:text-lg font-semibold">
                Check address eligibility
              </h3>
            </Card>
          </div>
          {renderClaimStatus()}
        </div>
      </Card>
    </div>
  );
}

export default ClaimFlow;
