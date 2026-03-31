import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config();

// Replace this with your contract's ABI
const abi = [
  // ... ABI array from your compiled contract ...
];

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

const contract = new ethers.Contract(
  process.env.CONTRACT_ADDRESS,
  abi,
  wallet
);

export default contract;