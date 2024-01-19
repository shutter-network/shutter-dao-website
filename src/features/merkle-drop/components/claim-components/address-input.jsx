import React, { useState, useCallback } from "react";
import Message from "./message";
import { isAddress } from "web3-validator";
import { CHAIN_STATE } from "../../../common/hooks/chain-state";
import { Button } from "../../../common/components/button";
import { Card } from "../../../common/components/card";
import { getAddress } from "ethers";

function AddressInput(props) {
  const addressRegex = new RegExp("^(0x)?[a-fA-F0-9]*$");
  const [address, setAddress] = useState("");
  const invalid = address.length > 0 && !isAddress(address);
  const valid = address.length > 0 && isAddress(address);
  const onSubmit = props.onSubmit;
  const chainState = props.chainState;

  let inputClasses = "";

  const handleChange = useCallback(
    (event) => {
      const newAddress = event.target.value;
      if (addressRegex.test(newAddress)) {
        setAddress(getAddress(newAddress.toLowerCase());
      }
    },
    [addressRegex]
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      onSubmit(address);
    },
    [onSubmit, address]
  );

  if (invalid) {
    inputClasses += "border border-neon-pink";
  }

  const noDappWarningMessage =
    "Some functionalities are missing as no Web3 enabled browser was detected. Please install the Metamask plugin or browse this site with a Web3 enabled browser for full functionality.";

  const wrongChainWarningMessage = `You are connected to the wrong chain. For full functionality please connect to the ${process.env.REACT_APP_CHAIN_NAME}.`;

  return (
    <div>
      <form>
        <div className="flex flex-row mt-2">
          <Card className="flex-1 md:bg-transparent bg-shutter-black-lighter bg-opacity-0 md:bg-opacity-100 py-2 md:px-4 px-0 md:p-0">
            <div className="flex-1 pr-2">
              <div
                className={`flex flex-row items-center w-full rounded-full bg-shutter-black-lightest text-grey h-12 my-4 ${inputClasses}`}
              >
                <input
                  className="bg-shutter-black-lightest ml-2 px-2 mr-2 w-full
                  rounded-full placeholder-grey-darker text-sm md:text-base font-medium min-w-[170px]"
                  // autoComplete="off"
                  spellCheck="false"
                  type="text"
                  value={address}
                  onChange={handleChange}
                  placeholder="Enter ETH Address (0x...)"
                  autoFocus={props.autoFocus}
                  name={"address"}
                  required
                />
              </div>
            </div>
            <div className="flex flex-row items-center">
              <Button
                className={`md:px-8 px-6 py-4 bg-grey text-shutter-black flex items-center justify-center hover:bg-shutter-green transition duration-500 ease-in-out transition-all font-bold`}
                isDark
                type="submit"
                value="Submit"
                label="Check →"
                onClick={handleSubmit}
                disabled={!valid}
              />
            </div>
          </Card>
        </div>
        <div>
          <Card className="flex-1 md:bg-transparent md:shadow-none bg-card-colors-darkest_grey shadow-2xl md:py-2 py-0 px-4 md:p-0 mt-2 z-20 p-4">
            <div className="p-2 md:p-0">
              {!address ? (
                <p className="text-shutter-dark-green text-sm">
                  Enter your Ethereum address to check if it is eligible to
                  claim.
                </p>
              ) : invalid ? (
                <p className="text-neon-pink text-sm">
                  Please enter a valid address
                </p>
              ) : (
                <p className="text-shutter-dark-green text-sm">&nbsp;</p>
              )}
            </div>
          </Card>
        </div>
        <div className="py-2">
          {chainState === CHAIN_STATE.DISCONNECTED && (
            <Message>{noDappWarningMessage}</Message>
          )}
          {chainState === CHAIN_STATE.WRONG_CHAIN && (
            <Message>{wrongChainWarningMessage}</Message>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddressInput;
