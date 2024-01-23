export const projectId = process.env
  .REACT_APP_WALLETCONNECT_PROJECT_ID as string;
export const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

// 3. Create modal
export const metadata = {
  name: "Shutter Network Genesis Allocations",
  description: "Shutter Network Genesis Allocations",
  url: "https://claim.shutter.network/",
  icons: [],
};
