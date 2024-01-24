import React, { useReducer, createContext, useContext } from "react";
import { type VestingOnchainType } from "../features/merkle-drop/components/vestings/vesting";

export type State = {
  accounts: {
    [account: string]: {
      pool: string;
      balance: bigint;
      delegatee: string;
    };
  };
  vestings: {
    [vestingId: string]: VestingOnchainType;
  };
};

export type Action =
  | {
      type: "update_pool_info";
      payload: {
        account: string;
        poolAddress?: string;
        balance?: bigint;
        delegatee?: string;
      };
    }
  | {
      type: "update_vesting_info";
      payload: {
        vestingId: string;
        vesting: VestingOnchainType;
      };
    };

// Define your reducer
export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "update_pool_info":
      const payload = action.payload;
      const currentAccount = state.accounts[payload.account] || {};
      return {
        ...state,
        accounts: {
          ...state.accounts,
          [payload.account]: {
            ...currentAccount,
            pool: payload.poolAddress || currentAccount.pool,
            balance: payload.balance || currentAccount.balance,
            delegatee: payload.delegatee || currentAccount.delegatee,
          },
        },
      };
    case "update_vesting_info":
      const vestingPayload = action.payload;
      return {
        ...state,
        vestings: {
          ...state.vestings,
          [vestingPayload.vestingId]: {
            ...vestingPayload.vesting,
          },
        },
      };
    default:
      throw new Error("No action type found", action);
  }
};
