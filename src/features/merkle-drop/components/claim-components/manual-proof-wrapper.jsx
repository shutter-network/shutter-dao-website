import React, { useCallback, useState } from "react";

import ManualProof from "./manual-proof";
import { Button } from "../../../common/components/button";

function ManualProofWrapper({ proof, amount, requestTermsAndCondition }) {
  const [showProof, setShowProof] = useState(false);

  const handleToggle = useCallback(async () => {
    const accepted = await requestTermsAndCondition();
    if (accepted) {
      setShowProof(!showProof);
    }
  }, [requestTermsAndCondition, showProof]);

  return (
    <div>
      <div className="flex fex-row item-center justify-center">
        <Button
          onClick={handleToggle}
          isDark
          className="px-8 py-4 hover:bg-shutter-dark-green"
        >
          <h5
            className={
              "title is-5 " +
              (showProof ? "has-text-weight-bold" : "has-text-weight-light")
            }
          >
            <span
              className={
                "icon is-medium " + (showProof ? "" : "has-opacity-zero")
              }
            >
              <i className="fas fa-arrow-right" />
            </span>
            {showProof ? "Show proof" : "Claim tokens manually"}
          </h5>
        </Button>
      </div>
      <div>
        {showProof && (
          <ManualProof
            proof={proof}
            originalAmount={amount}
            closeModal={() => setShowProof(false)}
          />
        )}
      </div>
    </div>
  );
}

export default ManualProofWrapper;
