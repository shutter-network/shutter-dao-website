import React, { useEffect, useState } from "react";
import { getVestingData, getMerkleDropContract, redeem } from "../../api/web3";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { formatTokenAmount, parseTokenAmount } from "../../../common/utils/math";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import { useStateValue } from "../../../../store/hook";
import { LinkToAddress } from "../../../common/components/link-to-address";
import { ActivateVesting } from "./activate-vesting";
import { WarningAccount } from "./warning-account";
import ClaimableAmount from "./claimable-amount";
import { get } from "http";
import { getTokenSymbol } from "../../../common/utils/token";
import { useAccount } from "../../../common/hooks/account";

export type VestingType = {
  account: string;
  amount: string;
  chainId: string;
  contract: string;
  curve: number;
  durationWeeks: number;
  initialUnlock: number;
  proof: string[];
  startDate: number;
  tag: string;
  vestingId: string;
};

export type VestingOnchainType = {
  amount: bigint;
  amountClaimed: bigint;
  cancelled: boolean;
  curveType: bigint;
  durationWeeks: bigint;
  initialUnlock: bigint;
  managed: boolean;
  pausingDate: bigint;
  startDate: bigint;
};

export const Vesting = ({
  vesting,
  index,
}: {
  vesting: VestingType;
  index: number;
}) => {
  const account = useAccount();
  const [state, dispatch] = useStateValue();
  const onChainVesting = state.vestings?.[vesting.vestingId];

  const [redeemDeadline, setRedeemDeadline] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const updateVestingInfo = async () => {
    const data:VestingOnchainType = await getVestingData(vesting.account, vesting.vestingId);

    if (data && data.amount !== 0n) {
      dispatch({
        type: "update_vesting_info",
        payload: {
          vestingId: vesting.vestingId,
          vesting: data,
        },
      });
    }
  };

  const onActivateVestingSuccess = async () => {
    await updateVestingInfo();
  };

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      // console.log('contract', vesting)
      const airdrop = await getMerkleDropContract(vesting.contract);
      // the date in solidity is in seconds, so we need to multiply by 1000
      const redeemDeadline = (await airdrop.methods
        .redeemDeadline()
        .call()) as bigint;

      setRedeemDeadline(new Date(Number(redeemDeadline) * 1000).toLocaleDateString("en-US", { day: "2-digit", month: "long", year: "numeric" }));

      await updateVestingInfo();
      setIsLoading(false);
    };

    getData();
  }, [vesting]);

  const badge = onChainVesting ? (
    <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
      Activated
    </span>
  ) : (
    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
      Not Activated
    </span>
  );

  const poolNotRedeemed = (
    <div className="rounded-md bg-red-50  mt-4">
      <div className="flex p-4">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="h-5 w-5 text-red-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <div>
          <h3 className="text-sm font-bold text-red-800">
            This allocation is not activated!
          </h3>
          </div>

          <div className="mt-2 text-sm text-red-700">
            Activate until {redeemDeadline} to not lose your eligible tokens.
          </div>
        </div>
      </div>
      {!onChainVesting && (
        <div className={"mx-4 pb-4"}>
          <ActivateVesting
            vesting={vesting}
            onSuccess={onActivateVestingSuccess}
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="rounded-md border border-white/20 p-5 mb-10">
      <div className="px-4 sm:px-0 flex flex-1 flex-row justify-between">
        <h3 className="text-base font-semibold leading-7 text-white">
          Allocation {index + 1}
        </h3>
        {isLoading ? null : badge}
      </div>
      {isLoading || !account ? null : !onChainVesting && poolNotRedeemed}
      <div className="mt-6 border-t border-white/10">
        <dl className="divide-y divide-white/10">
          <div className="px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-white">Amount</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {formatTokenAmount(parseTokenAmount(vesting.amount))}
            </dd>
          </div>
          {showDetails && (
            <>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-white">
                  Chain ID
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                  {vesting.chainId}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-white">
                  Contract
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                  <LinkToAddress address={vesting.contract} />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-white">
                  Duration Weeks
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                  {vesting.durationWeeks}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm font-medium leading-6 text-white">
                  Initial Unlock
                </dt>
                <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                  {formatTokenAmount(parseTokenAmount(vesting.initialUnlock))}
                </dd>
              </div>
              {onChainVesting && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-white">
                    Amount claimed
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                    {formatTokenAmount(parseTokenAmount(onChainVesting.amountClaimed))}
                  </dd>
                </div>
              )}
              {onChainVesting && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-white">
                    Claimable amount
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
                    <ClaimableAmount vestingOnChain={onChainVesting} vestingDataFromServer={vesting}/>
                  </dd>
                </div>
              )}
            </>
          )}
        </dl>
        <div className="flex justify-center items-center">
          <div className="relative">
            <div className="absolute w-1 h-full left-1/2 transform -translate-x-1/2"></div>

            <button
              className="rounded-full bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex flex-row"
              onClick={() => setShowDetails(!showDetails)}
            >
              {!showDetails ? (
                <ChevronDownIcon
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              ) : (
                <ChevronUpIcon
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              )}
              <div className="text-sm mr-1">{!showDetails ? 'show more' : 'show less'}</div>
            </button>
          </div>
        </div>

        <WarningAccount vestingAccount={vesting.account} />
      </div>
    </div>
  );
};
