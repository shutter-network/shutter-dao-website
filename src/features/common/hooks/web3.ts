import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import Web3 from "web3";

export function useWeb3() {
  const { isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  if (isConnected) {
    return new Web3(walletProvider);
  }

  return null;
}
