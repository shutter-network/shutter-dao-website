// import getWeb3 from "../../common/api/web3";
import MerkleDropABI from "../../common/abi/airdrop";
import VestingPoolManagerABI from "../../common/abi/VestingPoolManager";
import VestingPoolABI from "../../common/abi/VestingPool";
import TokenABI from "../../common/abi/token";
import Web3, { Contract, EventLog, Receipt } from "web3";

let web3Initialized: null | Web3 = null;
const getWeb3 = (): Web3 => {
  if (!web3Initialized) {
    web3Initialized = new Web3(process.env.REACT_APP_WEB3_PROVIDER_URL);
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

export async function getUserVestingPool(
  address: string
): Promise<Contract<typeof VestingPoolABI>> {
  const web3 = getWeb3();

  const merkleDropContract = await getMerkleDropContract();

  const vestingPoolManagerAddress = (await merkleDropContract.methods
    .vestingPoolManager()
    .call()) as string;

  const vestingPoolManagerContract = await getVestingPoolManagerContract(vestingPoolManagerAddress);

  const userPool = await vestingPoolManagerContract.methods
    .getVestingPool(address)
    .call();

  const userPoolContract = new web3.eth.Contract(VestingPoolABI, userPool);

  return userPoolContract;
}

const getVestingPoolManagerContract = async (
  address: string
): Promise<Contract<typeof VestingPoolManagerABI>> => {
  const web3 = getWeb3();

  const vestingPoolManagerContract = new web3.eth.Contract(
    VestingPoolManagerABI,
    address
  );

  return vestingPoolManagerContract;
};

export async function getVestingData(
  address: string,
  vestingId: string,
  airdropAddress: string
): Promise<any> {
  const userPoolContract = await getUserVestingPool(address);

  const vesting = await userPoolContract.methods.vestings(vestingId).call();

  return vesting;
}

export async function redeem(
  address: string,
  amount: number,
  curveType: number,
  durationWeeks: number,
  startDate: number,
  initialUnlock: number,
  proof: string[],
  onSign?: (hash: string) => void,
  onConfirmation?: (confirmations: bigint, receipt: Receipt) => void
): Promise<any> {
  const merkleDropContract = await getMerkleDropContract();

  try {
    return await merkleDropContract.methods
      .redeem(curveType, durationWeeks, startDate, amount, initialUnlock, proof)
      .send({
        from: address,
      })
      .on("transactionHash", (hash: string) => onSign && onSign(hash))
      .on(
        "confirmation",
        ({confirmations, receipt}) =>
          onConfirmation && onConfirmation(confirmations, receipt)
      );
  } catch (error: any) {
    // As there seem to be no common error format, this is the best we can do
    if (error.message.includes("revert")) {
      throw new TransactionRevertedError(error.message);
    } else if (error.message.includes("denied")) {
      throw new UserRejectedError(error.message);
    } else {
      throw new Error(error.message);
    }
  }
}

export async function getClaimedTokenAmountByReceipt(receipt: Receipt) {
  const withdrawEventsInBlock = await getWithdrawEventsInBlock(
    receipt.blockNumber as number
  );
  const withdrawEventsByTransaction = filterEventsByTransaction(
    withdrawEventsInBlock,
    receipt.transactionHash as string
  );
  throwIfNoSingleEvent(withdrawEventsByTransaction);
  return parseWithdrawEventTokenAmount(withdrawEventsByTransaction[0]);
}

async function getWithdrawEventsInBlock(blockNumber: number) {
  const merkleDropContract = getMerkleDropContract();
  const eventFilter = {
    fromBlock: blockNumber,
    toBlock: blockNumber,
  };

  return await merkleDropContract.getPastEvents("Withdraw", eventFilter);
}

function filterEventsByTransaction(
  events: EventLog[],
  transactionHash: string
) {
  return events.filter((e) => e.transactionHash === transactionHash);
}

function throwIfNoSingleEvent(events: EventLog[]) {
  if (events.length !== 1) {
    throw new ParseWithdrawEventError(
      "Could not find a single withdraw event for given receipt."
    );
  }
}

function parseWithdrawEventTokenAmount(withdrawEvent: EventLog) {
  window._myEvent = withdrawEvent;
  // This event argument has the type BigNumber.
  // We convert it to a String for an unified handling of amount values
  // (like by the backend) to enable further processing.
  return withdrawEvent.returnValues.value.toString();
}

async function getMerkleDropContract(): Promise<Contract<typeof MerkleDropABI>> {
  const web3 = getWeb3();
  // TODO: Theoretically, web3 could be undefined here. Should not happen, but might. Handle?
  const contract = new web3.eth.Contract(
    MerkleDropABI,
    process.env.REACT_APP_MERKLE_DROP_ADDRESS
  );
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
