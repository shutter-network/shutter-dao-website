import Web3 from "web3";
import { getTokenSymbol } from "./token";

/**
 * Use web3 BN to parse token amount
 *
 * @param amount
 * @returns {string}
 */
export function parseTokenAmount(amount: bigint | number | string): string {
  const web3 = new Web3();
  const bigNumberBalance = web3.utils.toBigInt(amount);
  const decimals = 18;
  const divisor = web3.utils.toBigInt("10") ** web3.utils.toBigInt(decimals);

  const scaleFactor =
    web3.utils.toBigInt("10") ** web3.utils.toBigInt(decimals);

  const scaledBalance = (bigNumberBalance * scaleFactor) / divisor;
  const wholePart = (scaledBalance / scaleFactor).toString();
  const decimalPart = (scaledBalance % scaleFactor)
    .toString()
    .padStart(decimals, "0");
  const formattedBalance = `${wholePart}.${decimalPart}`;

  return formattedBalance;
}

export function formatTokenAmount(
  amount: string,
  suffix: string = getTokenSymbol()
): string {
  return (
    Number(amount).toLocaleString("en-US", {
      maximumFractionDigits: Number(amount) < 1 ? 18 : 4,
    }) +
    " " +
    suffix
  );
}

export function convertToWei(amount: number | string) {
  // Step 1: Convert the number to a string
  let amountStr = amount.toString();

  // Step 2: Split the string into whole and fractional parts
  let [wholePart, fractionalPart = ""] = amountStr.split(".");

  // Step 3: Pad the fractional part with zeros
  fractionalPart = fractionalPart.padEnd(18, "0");

  // Step 4: Concatenate the whole part, the fractional part, and the necessary number of zeros
  let weiStr = wholePart + fractionalPart;

  // Step 5: Convert the resulting string to a BigInt
  let weiBigInt = BigInt(weiStr);

  return weiBigInt;
}
