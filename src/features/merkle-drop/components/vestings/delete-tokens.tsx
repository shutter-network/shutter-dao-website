import React from "react";
import DelegateTokensModal from "./delegate-tokens-modal";
import { useStateValue } from "../../../../store/hook";
import { ZERO_ADDRESS } from "../../../common/constants";

export const DelegateTokens = ({
  poolBalance, poolAddress, userAccount,
}: {
  poolBalance: bigint;
  userAccount: string;
  poolAddress: string;
}) => {
  const [state, dispatch] = useStateValue();
  const [showForm, setShowForm] = React.useState(false);

  const tokensDelegated = state.accounts[userAccount]?.delegatee;

  return (
    <>
      {showForm && (
        <DelegateTokensModal
          onClose={() => setShowForm(false)}
          poolAddress={poolAddress}
          poolBalance={poolBalance}
          userAddress={userAccount} />
      )}

      <button
        type="button"
        className="rounded-md bg-indigo-500 px-2 py-1.5 text-sm font-medium text-white hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:ring-offset-indigo-50"
        onClick={() => setShowForm(!showForm)}
      >
        {tokensDelegated === ZERO_ADDRESS ? "Delegate tokens" : "Re-delegate tokens"}
      </button>
    </>
  );
};
