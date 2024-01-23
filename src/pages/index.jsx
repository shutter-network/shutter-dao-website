import React from "react";

import { LayoutDark } from "../features/common/components/layout-dark";
import { MerkleDropHero } from "../features/merkle-drop/components/hero";
import { MerkleDropIntroduction } from "../features/merkle-drop/components/introduction";
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import {projectId, mainnet, metadata} from "../walletconnect/constants";


createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet],
  projectId
})
export default function MerkleDrop() {
  return (
    <LayoutDark>
      <MerkleDropHero />
      <MerkleDropIntroduction />
    </LayoutDark>
  );
}

export function Head() {
  return (
    <>
      <title>Shutter Network Genesis Allocations</title>
      <meta name="description" content="Shutter Network Genesis Allocations" />
    </>
  )
}
