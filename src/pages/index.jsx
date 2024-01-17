import React from "react";

import { LayoutDark } from "../features/common/components/layout-dark";
import { MerkleDropHero } from "../features/merkle-drop/components/hero";
import { MerkleDropIntroduction } from "../features/merkle-drop/components/introduction";
import { MerkleDropFaqs } from "../features/merkle-drop/components/faqs";

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
