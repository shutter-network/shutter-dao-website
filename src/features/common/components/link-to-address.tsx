// Create a react component that will receive an eth address as prop
// it will shorten it and then display it as a link to etherscan

import React from "react";

const shortenAddress = (address: string) => {
  return `${address.slice(0, 12)}...${address.slice(-8)}`;
};

export const LinkToAddress = ({ address }: { address: string }) => {
  return (
    <a
      href={`${process.env.REACT_APP_EXPLORER_URL?.replace(
        /\/$/,
        ""
      )}/address/${address}`}
      target="_blank"
      rel="noreferrer"
      title={`View on Etherscan: ${address}`}
    >
      {shortenAddress(address)}
    </a>
  );
};
