import React from "react";

import { LinkButton } from "../../common/components/link-button";

export function MerkleDropIntroduction() {
  return (
    <section className="bg-$ShutterBG">
      <div className="md:container mx-auto md:px-20 flex flex-col md:py-8 pt-2 pb-10 w-full">
        <div className="flex-1 px-4">
          <div>
            <h1 className="md:text-5xl text-4xl leading-tight my-8 text-off-white font-semibold pr-28 md:pr-28">
              Introducing the Shutter Network Genesis Allocations
            </h1>
          </div>
        </div>
        <div className="flex-1 px-4">
          <div className="flex flex-col text-grey">
            <p className="pb-4">
              <a
                href="https://shutter.network/"
                target="_blank"
                className="underline"
              >
                Shutter
              </a>{" "}
              is a project to address the challenge of malicious Maximal Extractable Value (MEV) on Ethereum as well as other information asymmetries in distributed systems. MEV refers to the value that searchers or validators can extract from users' transactions through practices like front-running. Shutter aims to protect users from exploitation by employing a distributed key generation mechanism, ensuring fair and secure transactions on the Ethereum blockchain.
            </p>
            <p className="py-4">
              Initially, Shutter DAO 0x36 is allocating about 42% of SHU for public distribution while reserving 58% in the DAO's fund, which is dedicated to future initiatives, airdrops, community incentives, and unforeseen requirements.
            </p>
            <p className="py-4">
              The genesis allocations claiming smart contracts require activating the vesting schedule of the tokens, which allows you to delegate the voting power equal to the whole amount of tokens in the vesting schedule. This delegation effectively gives the delegate increased voting power in the number of the delegating address’s tokens. Delegation of voting power can be canceled at any point.
              <br />
              <br />
              Find out more about delegates at the{" "}
              <a
                href="https://shutterprotodao.discourse.group/t/shutter-dao-0x36-delegates-list/175"
                target="_blank"
                className="underline"
              >
                Shutter DAO 0x36 Delegates List
              </a>
              .
            </p>
          </div>
          <div className="flex flex-row items-center place-content-center">
            <LinkButton
              className={`md:px-8 px-6 py-4 my-8 bg-white-darker text-shutter-black flex items-center justify-center hover:bg-shutter-dark-green transition duration-500 ease-in-out transition-all`}
              isDark
              label="Learn more about Shutter DAO 0x36"
              href="https://blog.shutter.network/shutter-dao-0x36-deployed/"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
