import { useState, useEffect } from "react";
import getWeb3, { getDefaultAccount } from "../api/web3";

export function useAccount(): string | undefined {
  const [account, setAccount] = useState<string | undefined>("");

  useEffect(() => {
    // box variable to make it available in inner function
    const env = {
      checkAccountIntervalId: 0 as number,
    };

    // define async function because effect function can not be async
    async function checkAccount() {
      try {
        if (getWeb3()) {
          // function that periodically checks the chain state
          async function check() {
            try {
              setAccount(await getDefaultAccount());
            } catch (e: any) {
              console.error(e);
              // Stop the periodical address check
              window.clearInterval(env.checkAccountIntervalId);
              setAccount(undefined);
            }
          }

          env.checkAccountIntervalId = window.setInterval(check, 500);
          check();
        } else {
          setAccount(undefined);
        }
      } catch (error: any) {
        console.log(error);
        setAccount(undefined);
      }
    }

    checkAccount();
    return () => window.clearInterval(env.checkAccountIntervalId);
  }, []);
  return account;
}