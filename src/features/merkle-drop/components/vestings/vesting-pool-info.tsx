import { useEffect, useState } from "react";
import { getTokenContract, getUserVestingPool } from "../../api/web3";
import React from "react";
import {
  formatTokenAmount,
  parseTokenAmount,
} from "../../../common/utils/math";
import { DelegateTokens } from "./delete-tokens";
import { useStateValue } from "../../../../store/hook";
import { LinkToAddress } from "../../../common/components/link-to-address";
import { ZERO_ADDRESS } from "../../../common/constants";
import { getTokenSymbol } from "../../../common/utils/token";

export const VestingPoolInfo = ({ account }: { account: string }) => {
  const [state, dispatch] = useStateValue();
  const poolInfo = state.accounts[account] || {};
  const { pool = null, balance = 0n, delegatee = null } = poolInfo;
  useEffect(() => {
    const getData = async () => {
      const poolContract = await getUserVestingPool(account);

      if (poolContract) {
        const poolAddress = poolContract.options.address as string;
        const tokenAddress = await poolContract.methods.token().call();
        const token = await getTokenContract(tokenAddress);
        const balance = await token.methods.balanceOf(poolAddress).call();
        const delegatee = await token.methods.delegates(poolAddress).call();
        dispatch({
          type: "update_pool_info",
          payload: { account, poolAddress, balance, delegatee },
        });
      }
    };

    getData();
  }, [account, state.vestings]);

  if (!pool) {
    return null;
  }

  return (
    <>
      <div className="mt-2 text-sm text-green-700">
        <ul role="list" className="list-disc space-y-1 pl-5">
          <li>
            Contract address: <LinkToAddress address={pool} />
          </li>
          <li>
            Contract balance:{" "}
            {formatTokenAmount(parseTokenAmount(balance))}
          </li>
          <li>
            <div className="flex flex-row">
              Tokens delegated to:{" "}
              {delegatee && delegatee !== ZERO_ADDRESS ? (
                <LinkToAddress address={delegatee} />
              ) : (
                <div className="ml-1">Not delegated yet.</div>
              )}
            </div>
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <div className="-mx-2 -my-1.5 flex">
          <DelegateTokens
            poolBalance={balance}
            poolAddress={pool}
            userAccount={account}
          />
        </div>
      </div>
    </>
  );
};
