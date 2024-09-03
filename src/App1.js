


import logo from './logo.svg';
import './App.css';
import Web3Provider from './Web3Provider';
import { ConnectKitButton  } from "connectkit";
import { ethers } from 'https://unpkg.com/ethers@5.2/dist/ethers.esm.min.js';
import { config } from './config'
import { SendTransaction } from './send-transaction' 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount } from 'wagmi'

const queryClient = new QueryClient()
const paytrans = async () => {
  let contractAddress = "0x35a7Ac0A5ECf99B77b933e4Ac281e5f6a4342Ea9";
  let provider = new ethers.providers.Web3Provider(window.ethereum);
  let abi = [
    {
      "inputs": [],
      "name": "deposit",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address payable",
          "name": "re",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "transfetTo",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "withdraw",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "when",
          "type": "uint256"
        }
      ],
      "name": "Withdrawal",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "withdrawAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "contractaddr",
          "type": "address"
        }
      ],
      "name": "getContractBalance",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalAllocPoint",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unlockTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

    console.log('provider',provider);
    const signer = await provider.getSigner();
    console.log('signer',signer);
    let contract = new ethers.Contract(contractAddress, abi, signer);

    return contract;
}

const getBal=async()=>{
  let contracts=await paytrans()
  let cotractbal = await contracts.getContractBalance("0x35a7Ac0A5ECf99B77b933e4Ac281e5f6a4342Ea9");
  let cotractamt1=await ethers.utils.formatEther(cotractbal)
  let walletbal = await contracts.getBalance();
  const apiUrl = process.env.REACT_APP_PROJECT_ID;
  console.log(`API URL: ${apiUrl}`);
  let walletamt1=await ethers.utils.formatEther(walletbal)
  document.getElementById('walbal').innerText=walletamt1;
  document.getElementById('contbal').innerText=cotractamt1;
  document.getElementById('apiUrl').innerText=`${apiUrl}`;

}

const transmetamask=async()=>{
  let contractIns=await paytrans()

  const amountInEther = "0.01"; 
  const amountInWei =await ethers.utils.parseEther(amountInEther);
  const wallet_balance = await contractIns.getBalance();
  console.log(`Wallet Balance before: ${ethers.utils.formatEther(wallet_balance)} ETH`);
  let balance = await contractIns.getContractBalance("0x35a7Ac0A5ECf99B77b933e4Ac281e5f6a4342Ea9");
  let amt=await ethers.utils.formatEther(balance)
  console.log("before contract amt ===",amt);

  let tamt= await contractIns.withdraw(amountInWei)
  const txReceipt = await tamt.wait();
  console.log('txReceipt',txReceipt);
  const wallet_balance1 = await contractIns.getBalance();
  console.log(`Wallet Balance after: ${ethers.utils.formatEther(wallet_balance1)} ETH`);
  let balance1 = await contractIns.getContractBalance("0x35a7Ac0A5ECf99B77b933e4Ac281e5f6a4342Ea9");
  let amt1=await ethers.utils.formatEther(balance1)
  console.log("after contract amt ===",amt1);
}
const transCont=async()=>{
  let contractIns=await paytrans()
  let balance =  await contractIns.getContractBalance("0x35a7Ac0A5ECf99B77b933e4Ac281e5f6a4342Ea9");
  let amt=await ethers.utils.formatEther(balance)
  console.log("before contract amt ===",amt);
  const wallet_balance = await contractIns.getBalance();
  console.log(`Wallet Balance before: ${ethers.utils.formatEther(wallet_balance)} ETH`);
  const amountInEther = "0.03"; 
  const amountInWei =await ethers.utils.parseEther(amountInEther);
  let tamt= await contractIns.deposit({value:amountInWei})
  const txReceipt = await tamt.wait();
  console.log('txReceipt',txReceipt);
  const wallet_balance1 = await contractIns.getBalance();
  console.log(`Wallet Balance after: ${ethers.utils.formatEther(wallet_balance1)} ETH`);
  let balance1 = await contractIns.getContractBalance("0x35a7Ac0A5ECf99B77b933e4Ac281e5f6a4342Ea9");

  let amt1=await ethers.utils.formatEther(balance1)
  console.log("after contract amt ===",amt1);
}

const transAllmetamask=async()=>{
  let contractIns=await paytrans()

  const wallet_balance = await contractIns.getBalance();
  console.log(`Wallet Balance before: ${ethers.utils.formatEther(wallet_balance)} ETH`);
  let balance =  await contractIns.getContractBalance("0x35a7Ac0A5ECf99B77b933e4Ac281e5f6a4342Ea9");
  let amt=await ethers.utils.formatEther(balance)
  console.log("before contract amt ===",amt);

  let tamt= await contractIns.withdrawAll()
  const txReceipt = await tamt.wait();
  console.log('txReceipt',txReceipt);
  const wallet_balance1 = await contractIns.getBalance();
  console.log(`Wallet Balance after: ${ethers.utils.formatEther(wallet_balance1)} ETH`);
  let balance1 = await contractIns.getContractBalance("0x35a7Ac0A5ECf99B77b933e4Ac281e5f6a4342Ea9");
  let amt1=await ethers.utils.formatEther(balance1)
  console.log("after contract amt ===",amt1);
}
const transotherwallet=async()=>{ 
  let contractIns=await paytrans()

  let balance =  await contractIns.getContractBalance("0x35a7Ac0A5ECf99B77b933e4Ac281e5f6a4342Ea9");
  let amt=await ethers.utils.formatEther(balance)
  console.log("before contract amt ===",amt);
  const wallet_balance = await contractIns.getBalance();
  console.log(`Wallet Balance before: ${ethers.utils.formatEther(wallet_balance)} ETH`);
  const amountInEther = "0.01"; 
  const amountInWei =await ethers.utils.parseEther(amountInEther);
  let tamt= await contractIns.transfetTo('0x22dF3801713b7FFCbbaD9E53abE63Eee6E16926B',amountInWei)
  const txReceipt = await tamt.wait();
  console.log('txReceipt',txReceipt);

  const wallet_balance1 = await contractIns.getBalance();
  console.log(`Wallet Balance after: ${ethers.utils.formatEther(wallet_balance1)} ETH`);
  let balance1 =  await contractIns.getContractBalance("0x35a7Ac0A5ECf99B77b933e4Ac281e5f6a4342Ea9");
  let amt1=await ethers.utils.formatEther(balance1)
  console.log("after contract amt ===",amt1);
}

const App = () => {
  return (
    <Web3Provider>
      <ConnectKitButton />
        <button onClick={getBal}>Get Balance</button>
      <button onClick={transmetamask}>trasfer to metaask</button>
      <button onClick={transCont}>trasfer to contract</button>
       <button onClick={transAllmetamask}>trasfer all to meta mask</button>
       <button onClick={transotherwallet}>trasfer to another wallet from contract</button>
      <h3 id='walbal'/>
       <h3 id='contbal'/>
      <h3 id='apiUrl'/>
    </Web3Provider>

  );
};


export default App;