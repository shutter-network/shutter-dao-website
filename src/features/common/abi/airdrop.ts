const artifact = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_token",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_manager",
        "type": "address"
      },
      {
        "internalType": "uint64",
        "name": "_redeemDeadline",
        "type": "uint64"
      },
      {
        "internalType": "address",
        "name": "_vestingPoolManager",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "_root",
        "type": "bytes32"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "id",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "user",
        "type": "address"
      }
    ],
    "name": "RedeemedVesting",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "airdropManager",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "beneficiary",
        "type": "address"
      }
    ],
    "name": "claimUnusedTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint8",
        "name": "curveType",
        "type": "uint8"
      },
      {
        "internalType": "uint16",
        "name": "durationWeeks",
        "type": "uint16"
      },
      {
        "internalType": "uint64",
        "name": "startDate",
        "type": "uint64"
      },
      {
        "internalType": "uint128",
        "name": "amount",
        "type": "uint128"
      },
      {
        "internalType": "uint128",
        "name": "initialUnlock",
        "type": "uint128"
      },
      {
        "internalType": "bytes32[]",
        "name": "proof",
        "type": "bytes32[]"
      },
      {
        "internalType": "bool",
        "name": "requiresSPT",
        "type": "bool"
      }
    ],
    "name": "redeem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "redeemDeadline",
    "outputs": [
      {
        "internalType": "uint64",
        "name": "",
        "type": "uint64"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "root",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token",
    "outputs": [
      {
        "internalType": "contract ShutterToken",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "vestingPoolManager",
    "outputs": [
      {
        "internalType": "contract VestingPoolManager",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const; export default artifact;