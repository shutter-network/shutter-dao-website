import { TOKEN_BASE } from "../constants";
import { unit, createUnit, format } from "mathjs";
import Web3 from "web3";
createUnit({ token: { prefixes: "short", baseName: process.env.REACT_APP_TOKEN_SYMBOL } });

export function roundUp(price) {
  return Math.ceil((price / TOKEN_BASE) * 1000) / 1000;
}

/**
 * Use web3 BN to parse token amount
 *
 * @param amount
 * @returns {string}
 */
export function parseTokenAmount(amount) {
  const web3 = new Web3();
  const bigNumberBalance = web3.utils.toBN(amount);
  const decimals = process.env.REACT_APP_TOKEN_DECIMALS || 18;
  const divisor = web3.utils.toBN('10').pow(web3.utils.toBN(decimals));

  const decimalPlaces = process.env.REACT_APP_SHOW_DECIMALS || 2;  // or however you get this value

  const scaleFactor = web3.utils.toBN('10').pow(web3.utils.toBN(decimalPlaces));

  const scaledBalance = bigNumberBalance.mul(scaleFactor).div(divisor);
  const wholePart = scaledBalance.div(scaleFactor).toString();
  const decimalPart = scaledBalance.mod(scaleFactor).toString().padStart(decimalPlaces, '0');
  const formattedBalance = `${wholePart}.${decimalPart}`;

  return formattedBalance;
}

export function formatTokenAmount(amount) {
  const unitInInternationalSystem = format(unit(roundUp(amount), process.env.REACT_APP_TOKEN_SYMBOL), 4);
  // We want a space in between the prefix and the symbol so we slice it and add it back with a space
  const unitWithoutBase = unitInInternationalSystem.slice(0, -3);
  return unitWithoutBase + process.env.REACT_APP_TOKEN_SYMBOL;
}
