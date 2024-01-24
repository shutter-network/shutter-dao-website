export const projectId = process.env
  .REACT_APP_WALLETCONNECT_PROJECT_ID as string;
export const mainnet = {
  chainId: parseInt(process.env.REACT_APP_CHAIN_ID as string),
  name: process.env.REACT_APP_CHAIN_NAME,
  currency: "ETH",
  explorerUrl: process.env.REACT_APP_EXPLORER_URL,
  rpcUrl: process.env.REACT_APP_WEB3_PROVIDER_URL,
};

// 3. Create modal
export const metadata = {
  name: "Shutter Network Genesis Allocations",
  description: "Claim tokens of your Shutter Network Genesis Allocations. The Genesis Allocations are smart contracts deployed on the Ethereum blockchain. An allocation contains a list of addresses as they have been deployed in the and the amount of claimable Shutter Tokens (e.g., SHU) per address in the form of a Merkle root.",
  url: "https://claim.shutter.network/",
  icons: [],
};
