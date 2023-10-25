import { TOKEN_BASE } from "../constants";
import { unit, createUnit, format } from "mathjs";

createUnit({ token: { prefixes: "short", baseName: process.env.REACT_APP_TOKEN_SYMBOL } });

export function roundUp(price) {
  return Math.ceil((price / TOKEN_BASE) * 1000) / 1000;
}

export function parseTokenAmount(amount) {
  return (
    parseInt(amount) / Math.pow(10, process.env.REACT_APP_TOKEN_DECIMALS)
  ).toFixed(process.env.REACT_APP_SHOW_DECIMALS);
}

export function formatTokenAmount(amount) {
  const unitInInternationalSystem = format(unit(roundUp(amount), process.env.REACT_APP_TOKEN_SYMBOL), 4);
  // We want a space in between the prefix and the symbol so we slice it and add it back with a space
  const unitWithoutBase = unitInInternationalSystem.slice(0, -3);
  return unitWithoutBase + process.env.REACT_APP_TOKEN_SYMBOL;
}
