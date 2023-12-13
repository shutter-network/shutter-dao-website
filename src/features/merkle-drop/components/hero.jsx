import React from "react";

import ClaimFlow from "./claim-flow";

export function MerkleDropHero() {
  return (
    <section className="md:container md:mx-auto md:px-20 text-rich-black-lighter md:py-20 pt-12 pb-0">
      <div className="hero-header items-center flex md:flex-row flex-col px-4">
        <div className="md:flex-1 sm:w-1/2 w-2/3 self-baseline pt-20 md:ml-0">
          <h1 className="md:text-6xl text-5xl font-semibold leading-tight mb-10 text-off-white">
            Merkle Drop
          </h1>
          <p className="text-2xl text-grey-darker">Claim your Shutter  Tokens</p>
        </div>
        <div className="flex-1">
          <ClaimFlow />
        </div>
      </div>
    </section>
  );
}
