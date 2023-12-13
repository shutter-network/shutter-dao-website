import React, { useCallback, useState } from "react";

import * as backend from "../api/backend";
import * as web3 from "../api/web3";
import {
  getDefaultAccount,
  requestPermission,
  sameAddress,
  verifyChainId,
} from "../../common/api/web3";

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
import ClaimValid from "./claim-components/claim-valid";
import Claims from "./claim-components/claims";

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

// type Vesting = {
//   account: string,
//   amount: string,
//   chainId: string,
//   contract: string,
//   curve: number,
//   durationWeeks: number,
//   initialUnlock: number,
//   proof: string[],
//   startDate: number,
//   tag: string,
//   vestingId: string,

// }

function ClaimFlow() {
  const [internalState, setInternalState] = useState(STATE.INPUT);
  const [claimAddress, setClaimAddress] = useState("");
  const [proof, setProof] = useState([]);
  const [tokenAmount, setTokenAmount] = useState("");
  // const [curve, setCurve] = useState(0);
  // const [durationWeeks, setDurationWeeks] = useState(0);
  // const [startDate, setStartDate] = useState(0);
  // const [initialUnlock, setInitialUnlock] = useState(0);
  const [claimedAmount, setClaimedAmount] = useState("");
  const [vestings, setVestings] = useState([]);
  const web3Account = useAccount();
  const chainState = useChainState();
  const [txHash, setTxHash] = useState("");
  const [confirmations, setConfirmations] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [onAcceptTermsAndCondition, setOnAcceptTermsAndCondition] = useState(
    () => () => {}
  );
  const [
    handleDeclineTermsAndCondition,
    setOnDeclineTermsAndCondition,
  ] = useState(() => () => {});
  const [acceptedTermsAndCondition, setAcceptedTermsAndCondition] = useState(
    false
  );
  const [
    showTermsAndConditionsModal,
    setShowTermsAndConditionsModal,
  ] = useState(false);

  const handleSign = useCallback(hash => {
    setTxHash(hash);
    setInternalState(STATE.CLAIM_WAIT);
  }, []);

  const setClaimedAmountByReceipt = useCallback(
    async receipt => {
      const claimedTokenAmountByReceipt = await web3.getClaimedTokenAmountByReceipt(
        receipt
      );
      setClaimedAmount(claimedTokenAmountByReceipt);
    },
    [setClaimedAmount]
  );

  const handleConfirmation = useCallback(
    (confirmationNumber, receipt) => {
      // Workaround to access current hash
      setTxHash(currentHash => {
        console.log(receipt)
        // Only process incoming confirmations if it is about current transaction
        if (String(receipt.transactionHash) === String(currentHash)) {
          if (
            confirmationNumber >= parseInt(process.env.REACT_APP_CONFIRMATIONS)
          ) {
            setInternalState(STATE.CLAIM_END);
            setClaimedAmountByReceipt(receipt);
          }
          setConfirmations(confirmationNumber);
        }
        return currentHash;
      });
    },
    [setClaimedAmountByReceipt]
  );

  const submit = useCallback(address => {
    showError(
      "In order to claim your tokens you have to give this site permission to your wallet."
    );
    setInternalState(STATE.LOADING);
    setClaimAddress(address);
    backend
      .fetchTokenEntitlement(address)
      .then(data => {
        if(data.length > 0) {
          setVestings(data);
          setInternalState(STATE.SHOW_PROOF);
        }
        // const { amount } = data[0];
        // // tokens might be a string, to preserve precision
        // if (amount.toString() === "0") {
        //   setInternalState(STATE.NO_TOKENS);
        // } else {
        //   showProof(data[0]);
        // }
      })
      .catch(error => {
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

  const claim = useCallback(async (vestingId) => {
    setInternalState(STATE.CLAIM_START);
    if (!(await requestPermission())) {
      showError(
        "In order to claim your tokens you have to give this site permission to your wallet."
      );
    }
    // We can not use the web3Account state variable, since this gets updated
    // by an interval and might not be correct at this point in time.
    else if (!sameAddress(await getDefaultAccount(), claimAddress)) {
      showError(
        `The selected account in your Web3 enabled browser does not match
               the merkle drop address and you can only claim the tokens for an
               account you control. To claim your tokens,
               please change the account of your Web3
               enabled browser or MetaMask plugin, or try a different address.`
      );
    } else if (!(await verifyChainId(process.env.REACT_APP_CHAIN_ID))) {
      showError(
        `You are connected to the wrong chain. To claim your tokens please connect
        to the ${process.env.REACT_APP_CHAIN_NAME}`
      );
    } else {
      try {
        console.log(claimAddress,
          tokenAmount,
          curve,
          durationWeeks,
          startDate,
          initialUnlock,
          proof);
        await web3.redeem(
          claimAddress,
          tokenAmount,
          curve,
          durationWeeks,
          startDate,
          initialUnlock,
          proof,
          handleSign,
          handleConfirmation
        );
      } catch (error) {
        console.error(error);
        if (error.code === web3.TRANSACTION_REVERTED_ERROR_CODE) {
          showError(
            "Your transaction have been reverted. Did you try to claim your tokens twice?",
            {
              state: STATE.TRANSACTION_FAILED,
            }
          );
        } else if (error.code === web3.USER_REJECTED_ERROR_CODE) {
          setInternalState(STATE.SHOW_PROOF);
        } else {
          showError("Something went wrong with your transaction.", {
            state: STATE.TRANSACTION_FAILED,
          });
        }
      }
    }
  }, [
    claimAddress,
    tokenAmount,
    proof,
    handleSign,
    handleConfirmation,
  ]);

  const requestTermsAndConditionsAcceptance = useCallback(() => {
    return new Promise(resolve => {
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

  const handleClaimRequest = useCallback(async () => {
    const acceptedTermsAndCondition = await requestTermsAndConditionsAcceptance();
    if (acceptedTermsAndCondition) {
      claim();
    }
  }, [claim, requestTermsAndConditionsAcceptance]);

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

  // const showProof = (data) => {
  //   const { proof,  amount, curve, durationWeeks, startDate, initialUnlock } = data;
  //   console.log(data)
  //   setProof(proof);
  //   setTokenAmount(amount);
  //   setCurve(curve);
  //   setDurationWeeks(durationWeeks);
  //   setStartDate(startDate);
  //   setInitialUnlock(initialUnlock || 0);
  //   setInternalState(STATE.SHOW_PROOF);
  // };

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
            <div>
            <AddressDisplay address={claimAddress} />
            </div>
          <Claims vestings={vestings} account={claimAddress}/>
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
    handleClaimRequest,
    handleDeclineTermsAndCondition,
    internalState,
    onAcceptTermsAndCondition,
    proof,
    requestTermsAndConditionsAcceptance,
    reset,
    showTermsAndConditionsModal,
    submit,
    txHash,
    wrongAccountSelected,
  ]);

  return (
    <div>
      <Card className="md:shadow-2xl md:bg-card-colors-darkest_grey bg-transparent md:p-4 rounded-sm">
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
