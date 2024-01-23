import React, { useEffect } from "react";

import { CheckCircleIcon } from "@heroicons/react/24/solid";

import { type VestingType, Vesting } from "./vesting";
import { VestingPoolInfo } from "./vesting-pool-info";

function Vestings({
  vestings,
  account,
}: {
  vestings: VestingType[];
  account: string;
}) {
  const noDupVestings = Object.values(
    vestings.reduce(
      (r: { [k: string]: VestingType }, v) => ((r[v.vestingId] = v), r),
      {}
    )
  ).flat();

  return (
    <div>
      <div>
        <div className="rounded-md bg-green-50 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <CheckCircleIcon
                className="h-5 w-5 text-green-400"
                aria-hidden="true"
              />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-bold text-green-800">
                Congrats! There{" "}
                {noDupVestings.length == 1
                  ? "is 1 allocation"
                  : `are ${noDupVestings.length} allocations`}{" "}
                for this address.
              </h3>
              <VestingPoolInfo account={account} />
            </div>
          </div>
        </div>
      </div>

      {noDupVestings.map((vesting, index) => {
        return (
          <div key={index}>
            <Vesting vesting={vesting} index={index} />
          </div>
        );
      })}
    </div>
  );
}

export default Vestings;
