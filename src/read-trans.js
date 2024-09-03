import React, { useState } from 'react';

import { ethers } from 'https://unpkg.com/ethers@5.2/dist/ethers.esm.min.js';
import { useReadContracts, useWriteContract } from 'wagmi';

import { parseEther } from 'viem';

   
function ReadContract() {
  const wagmiContractConfig = {
    address: '0x35a7Ac0A5ECf99B77b933e4Ac281e5f6a4342Ea9',
    abi: [
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
   };

 // State to control the button's disabled state
 const [shouldDisableButton, setShouldDisableButton] = useState(false);

  const result = useReadContracts({
    contracts: [
      { 
        ...wagmiContractConfig,
        functionName: 'getContractBalance',
        args: ['0x35a7Ac0A5ECf99B77b933e4Ac281e5f6a4342Ea9'],
      }, 
      { 
        ...wagmiContractConfig,
        functionName: 'getBalance',
      }, 
    ]
  });
  const { writeContract } = useWriteContract(); // Obtain the writeContract function
  const contPay = async (e) => {
    try {
      e.preventDefault();
    const formData = new FormData(e.target);
    const amt = formData.get('amt');
    console.log('amt',amt);
      let tamt = await writeContract({
        address: wagmiContractConfig.address,
        abi: wagmiContractConfig.abi,
        functionName: 'deposit',
        args: [],
        value: parseEther(amt),
      });
      const txReceipt = await tamt.wait();
      console.log('txReceipt',txReceipt);
      console.log('Transaction sent',wagmiContractConfig.address);
      setShouldDisableButton(true)
    } catch (error) {
      console.error('Error sending transaction:', error);
    }
 };

 const metaAllPay=async()=>{
  try {
    await writeContract({
      address: wagmiContractConfig.address,
      abi: wagmiContractConfig.abi,
      functionName: 'withdrawAll',
      args: [],
    });
    console.log('Transaction sent',wagmiContractConfig.address);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
 }
 const walletPay=async(e)=>{
  try {
    e.preventDefault();
    const formData = new FormData(e.target);
    const amt = formData.get('amt');
    await writeContract({
      address: wagmiContractConfig.address,
      abi: wagmiContractConfig.abi,
      functionName: 'transfetTo',
      args: ['0x22dF3801713b7FFCbbaD9E53abE63Eee6E16926B', parseEther(amt)],
      value: '0',

    });
    console.log('Transaction sent',wagmiContractConfig.address);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
 }
 const metapay=async(e)=>{
  try {
    console.log('metapay');
    e.preventDefault();
    const formData = new FormData(e.target);
    const amt = formData.get('amt');
    console.log('amt',parseEther(amt));
    await writeContract({
      address: wagmiContractConfig.address,
      abi: wagmiContractConfig.abi,
      functionName: 'withdraw',
      args: [parseEther(amt)],
      value:'0',

    });
    console.log('Transaction sent',wagmiContractConfig.address);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
 }

  const data = result.data;
  const error = result.error;
  const isPending = result.isPending;
  console.log('data',data);
  let balance, wbalance;
  if (data) {
    [balance, wbalance] = data;
  }
  let amt1
if(balance!==undefined){

    console.log('balance',balance['result']);
    console.log('wagmiContractConfig',wagmiContractConfig.address);
    amt1=ethers.utils.formatEther(balance['result'])

}
else{
    amt1=''
}

  if (isPending) {
    return '<div>Loading...</div>';
  }

  if (error) {
    return '<div>Error: ' + (error.shortMessage || error.message) + '</div>';
  }

  return (
    <> 
    <div>Balance:  {(balance ? amt1 : '')} </div>
    <div>Wallet Balance:  {(balance ? amt1 : '')} </div>
    <form onSubmit={contPay}>
    <input name="amt" placeholder="amt" required />

  <br/>
    <button>Pay to contract</button>
  </form>

<br/>
<br/>
<form onSubmit={metapay}>
    <input name="amt" placeholder="amt" required />
<br/>
    <button >Pay specific to Metamask</button>
    </form>
  <br/>
  <br/>
    <button 
    onClick={metaAllPay}>Pay all to Metamask</button>
    <br/>
<br/>
<form onSubmit={walletPay}>
<input name="amt" placeholder="amt" required />
<br/>
    <button>Pay To another wallet</button>
    </form>

    <br/>
<br/>
    </>

  );
}

export default ReadContract;
