import React, { ReactElement, ReactNode, useEffect } from "react";

import {
  getTokenContract,
  getUserVestingPool,
  getVestingData,
} from "../../api/web3";

import { parseTokenAmount } from "../../../common/utils/math";
import DelegateTokensModal from "./delegate-tokens";

type Vesting = {
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

function Claims({
  vestings,
  account,
}: {
  vestings: Vesting[];
  account: string;
}) {
  console.log("vestings", vestings);
  const [userPool, setUserPool] = React.useState<string | null>(null);
  const [poolBalance, setPoolBalance] = React.useState<bigint>(0n);
  const [delegatedTo, setDelegatedTo] = React.useState<string | null>(null);
  useEffect(() => {
    const getData = async () => {
      const pool = await getUserVestingPool(account);

      if (pool) {
        const poolAddress = pool.options.address as string;
        const tokenAddress = await pool.methods.token().call();
        setUserPool(poolAddress);
        const token = await getTokenContract(tokenAddress);
        const balance = await token.methods.balanceOf(poolAddress).call();
        const delegatee = await token.methods.delegates(poolAddress).call();
        setDelegatedTo(delegatee);
        setPoolBalance(balance as bigint);
      }
    };

    getData();
  }, [account]);

  return (
    <div>
      There are {vestings.length} vestings to claim.
      {userPool && (
        <div>
          There is a vesting pool with address: {userPool} and balance:{" "}
          {parseTokenAmount(poolBalance)} tokens.
          tokens delegated to: {delegatedTo}
          <DelegateTokens poolBalance={poolBalance} poolAddress={userPool}/>
        </div>
      )}
      {vestings.map((vesting, index) => {
        return (
          <div key={index}>
            <Vesting vesting={vesting} index={index} />
          </div>
        );
      })}
    </div>
  );
}

const DelegateTokens = ({poolBalance, poolAddress}: {poolBalance: bigint, poolAddress: string}) => {
    const [showForm, setShowForm] = React.useState(false);

  return (
    <>
    {showForm && <DelegateTokensModal />}

    <button className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20" onClick={() => setShowForm(!showForm)}>
      delegate tokens
      </button>
      </>
  )
}

const Vesting = ({ vesting, index }: { vesting: Vesting; index: number }) => {
  const [redeemed, setRedeemed] = React.useState(false);
  const [delegated, setDelegated] = React.useState(false);

  useEffect(() => {
    const getChainData = async () => {
      const onChainVesting = await getVestingData(
        vesting.account,
        vesting.vestingId,
        vesting.account
      );

      console.log(
        "onChainVesting",
        onChainVesting,
        onChainVesting.amount === 0n
      );
      if (onChainVesting.amount !== 0n) {
        setRedeemed(true);
      }
    };

    getChainData();
    // console.log("web3", web3);
    // console.log("vesting", vesting);
  }, [vesting]);

  return (
    <div className="rounded-md border border-white/20 p-5 mb-10">
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-white">
          Vesting {index + 1}
        </h3>
        <p className="mt-1 max-w-2xl text-xs leading-6 text-gray-400">
          {vesting.vestingId}
        </p>
      </div>
      <div className="mt-6 border-t border-white/10">
        <dl className="divide-y divide-white/10">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-white">Amount</dt>
            <dd className="mt-1 text-sm leading-6 text-gray-400 sm:col-span-2 sm:mt-0">
              {vesting.amount}
            </dd>
          </div>
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
              {vesting.contract}
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
              {vesting.initialUnlock}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 flex flex-row justify-end">
            {!redeemed && (
              <button className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20">
                claim vesting
              </button>
            )}

            <button className="rounded-md bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20">
              delegate
            </button>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default Claims;
