import React from "react";

import ClaimFlow from "./claim-flow";
import { StateProvider } from "../../../store/provider";
import { LinkButton } from "../../common/components/link-button";

export function MerkleDropHero() {
  return (
    <section className="md:container md:mx-auto md:px-20 text-rich-black-lighter md:py-20 pt-12 pb-0">
      <div className="hero-header items-center flex md:flex-row flex-col px-4">
        <div className="md:flex-1 sm:w-1/2 w-2/3 self-baseline pt-20 md:ml-0 pr-16">
          <h1 className="md:text-6xl text-5xl font-semibold leading-tight mb-10 text-off-white">
            Genesis Allocations
          </h1>
          <p className="text-2xl text-grey-darker">
            Claim tokens of your Shutter Network Genesis Allocations
          </p>
          <br />
          <p className="text-grey">
            The Genesis Allocations are smart contracts deployed on the Ethereum
            blockchain. An allocation contains a list of addresses as they have
            been deployed in the and the amount of claimable Shutter Tokens
            (e.g., SHU) per address in the form of a Merkle root.
          </p>
          <div className="flex flex-row items-center">
            <LinkButton
              className={`md:px-8 px-6 py-4 my-8 bg-majorelle-blue flex items-center justify-center hover:bg-dark-green transition duration-500 ease-in-out transition-all`}
              isDark
              label="Learn more"
              href="https://blog.shutter.network/shutter-network-genesis-launch-program/"
            />
          </div>
        </div>
        <div className="flex-1 max-w-lg">
          <StateProvider>
            <ClaimFlow />
          </StateProvider>
        </div>
      </div>
    </section>
  );
}
