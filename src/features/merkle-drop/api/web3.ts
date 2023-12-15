import MerkleDropABI from "../../common/abi/airdrop";
import VestingPoolManagerABI from "../../common/abi/VestingPoolManager";
import VestingPoolABI from "../../common/abi/VestingPool";
import TokenABI from "../../common/abi/token";
import { Contract, EventLog, Receipt, Web3 } from "web3";
import { default as metamaskWeb3 } from "../../common/api/web3";

type ConfirmationType = { confirmations: bigint; receipt: Receipt };
let web3Initialized: null | Web3 = null;
const getWeb3 = (): Web3 => {
  if (!web3Initialized) {
    web3Initialized = new Web3(
      process.env.REACT_APP_WEB3_PROVIDER_URL as string
    );
  }
  return web3Initialized;
};

export async function getTokenContract(
  address: string
): Promise<Contract<typeof TokenABI>> {
  const web3 = getWeb3();
  const tokenContract = new web3.eth.Contract(TokenABI, address);
  return tokenContract;
}

export async function approve(
  tokenAddress: string,
  sender: string,
  amount: string,
  spender: string,
  onSign?: (hash: string) => void,
  onConfirmation?: (confirmations: bigint, receipt: Receipt) => void,
  onError?: (error: any) => void
): Promise<any> {
  const web3 = metamaskWeb3();
  const tokenContract = await new web3.eth.Contract(TokenABI, tokenAddress);
  try {
    return await tokenContract.methods
      .approve(spender, amount)
      .send({
        from: sender,
      })
      .on("transactionHash", (hash: string) => onSign && onSign(hash))
      .on(
        "confirmation",
        ({ confirmations, receipt }: ConfirmationType) =>
          onConfirmation && onConfirmation(confirmations, receipt)
      )
      .on("error", (error: any) => handleError(error, onError));
  } catch (error: any) {
    if (onError) {
      onError(error);
    } else {
      handleError(error);
    }
  }
}

export async function getUserVestingPool(
  address: string
): Promise<Contract<typeof VestingPoolABI> | null> {
  const web3 = getWeb3();

  const vestingPoolManagerContract = await getVestingPoolManagerContract();

  try {
    const userPool = await vestingPoolManagerContract.methods
      .getVestingPool(address)
      .call();
    const userPoolContract = new web3.eth.Contract(VestingPoolABI, userPool);
    return userPoolContract;
  } catch (error) {
    console.log("error in getUserVestingPool", error);
  }

  return null;
}

const getUserPoolContract = async (address: string) => {
  const web3 = getWeb3();
  const userPoolContract = new web3.eth.Contract(VestingPoolABI, address);
  return userPoolContract;
};

const getVestingPoolManagerContract = async (
  address?: string
): Promise<Contract<typeof VestingPoolManagerABI>> => {
  const web3 = getWeb3();

  address = address || process.env.REACT_APP_VESTING_POOL_MANAGER;

  const vestingPoolManagerContract = new web3.eth.Contract(
    VestingPoolManagerABI,
    address
  );

  return vestingPoolManagerContract;
};

export async function getVestingData(
  address: string,
  vestingId: string
): Promise<any> {
  const userPoolContract = await getUserVestingPool(address);

  if (!userPoolContract) {
    return null;
  }

  const vesting = await userPoolContract.methods.vestings(vestingId).call();

  return vesting;
}

function handleError(error: any, onError?: (error: any) => void) {
  if (onError) {
    onError(error);
  } else {
    if (error.message.includes("revert")) {
      throw new TransactionRevertedError(error.message);
    } else if (error.message.includes("denied")) {
      throw new UserRejectedError(error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

export async function delegateTokens(
  poolAddress: string,
  from: string,
  to: string,
  onSign?: (hash: string) => void,
  onConfirmation?: (confirmations: bigint, receipt: Receipt) => void,
  onError?: (error: any) => void
) {
  const web3 = metamaskWeb3();

  const userVestingPool = new web3.eth.Contract(VestingPoolABI, poolAddress);

  if (!userVestingPool) {
    throw new Error("No vesting pool found for user");
  }

  try {
    return await userVestingPool.methods
      .delegateTokens(to)
      .send({
        from,
      })
      .on("transactionHash", (hash: string) => onSign && onSign(hash))
      .on(
        "confirmation",
        ({ confirmations, receipt }: ConfirmationType) =>
          onConfirmation && onConfirmation(confirmations, receipt)
      )
      .on("error", (error: any) => handleError(error, onError));
  } catch (error: any) {
    handleError(error, onError);
  }
}
export async function redeem(
  address: string,
  amount: string,
  curveType: number,
  durationWeeks: number,
  startDate: number,
  initialUnlock: number,
  proof: string[],
  merkleDropAddress: string,
  onSign?: (hash: string) => void,
  onConfirmation?: (confirmations: bigint, receipt: Receipt) => void,
  onError?: (error: any) => void
): Promise<any> {
  const web3 = metamaskWeb3();

  const merkleDropContract = new web3.eth.Contract(
    MerkleDropABI,
    merkleDropAddress
  );

  try {
    return await merkleDropContract.methods
      .redeem(curveType, durationWeeks, startDate, amount, initialUnlock, proof)
      .send({
        from: address,
      })
      .on("transactionHash", (hash: string) => onSign && onSign(hash))
      .on(
        "confirmation",
        ({ confirmations, receipt }: ConfirmationType) =>
          onConfirmation && onConfirmation(confirmations, receipt)
      )
      .on("error", (error: any) => handleError(error, onError));
  } catch (error: any) {
    handleError(error, onError);
  }
}

export async function getMerkleDropContract(
  address: string
): Promise<Contract<typeof MerkleDropABI>> {
  const web3 = getWeb3();

  const contract = new web3.eth.Contract(MerkleDropABI, address);
  return contract;
}

export const USER_REJECTED_ERROR_CODE = "USER_REJECTED_ERROR";
export const TRANSACTION_REVERTED_ERROR_CODE = "TRANSACTION_REVERTED_ERROR";
export const PARSE_WITHDRAW_EVENT_ERROR_CODE = "PARSE_WITHDRAW_EVENT_ERROR";

class UserRejectedError extends Error {
  code: string;
  constructor(...args: any[]) {
    super(...args);
    this.code = USER_REJECTED_ERROR_CODE;
  }
}

class TransactionRevertedError extends Error {
  code: string;
  constructor(...args: any[]) {
    super(...args);
    this.code = TRANSACTION_REVERTED_ERROR_CODE;
  }
}

class ParseWithdrawEventError extends Error {
  code: string;
  constructor(...args: any[]) {
    super(...args);
    this.code = PARSE_WITHDRAW_EVENT_ERROR_CODE;
  }
}
