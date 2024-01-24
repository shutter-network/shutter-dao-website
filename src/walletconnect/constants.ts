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
  description: "Shutter Network Genesis Allocations",
  url: "https://claim.shutter.network/",
  icons: [],
};
