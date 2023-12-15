export const isEthAddress = (address: string) => {
  return address.startsWith("0x") && address.length === 42;
};
