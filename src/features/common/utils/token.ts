export const getTokenSymbol = (): string => {
  return process.env.REACT_APP_TOKEN_SYMBOL || "SHU";
};
