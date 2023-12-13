import Web3 from "web3";

/**
 * Use web3 BN to parse token amount
 *
 * @param amount
 * @returns {string}
 */
export function parseTokenAmount(amount: bigint | number | string): string {
  const web3 = new Web3();
  const bigNumberBalance = web3.utils.toBigInt(amount);
  const decimals = process.env.REACT_APP_TOKEN_DECIMALS || 18;
  const divisor = web3.utils.toBigInt("10") ** web3.utils.toBigInt(decimals);

  const decimalPlaces = process.env.REACT_APP_SHOW_DECIMALS
    ? parseInt(process.env.REACT_APP_SHOW_DECIMALS)
    : 2; // or however you get this value

  const scaleFactor =
    web3.utils.toBigInt("10") ** web3.utils.toBigInt(decimalPlaces);

  const scaledBalance = (bigNumberBalance * scaleFactor) / divisor;
  const wholePart = (scaledBalance / scaleFactor).toString();
  const decimalPart = (scaledBalance % scaleFactor)
    .toString()
    .padStart(decimalPlaces, "0");
  const formattedBalance = `${wholePart}.${decimalPart}`;

  return formattedBalance;
}