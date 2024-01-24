import { useWeb3ModalAccount } from "@web3modal/ethers/react";

export function useAccount(): string | undefined {
  const { address } = useWeb3ModalAccount();

  return address;
}
