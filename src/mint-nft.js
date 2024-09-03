import React from 'react';
import { useWriteContract,useWaitForTransactionReceipt } from 'wagmi' 
import abi  from './abi' 
function MintNFT() {
   const { data: hash,isPending, error, writeContract } = useWriteContract();

  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const tokenId = formData.get('tokenId');
    writeContract({
      address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
      abi: abi,
      functionName: 'mint',
      args: tokenId
    });
  }
  

    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
      hash,
    });
    return (
      <form>
        <input name="tokenId" placeholder="69420" required />
        <button  disabled={isPending}  type="submit"> {isPending ? 'Confirming...' : 'Mint'} </button>
        {hash && <div>Transaction Hash: {hash}</div>} 
        {isConfirming && <div>Waiting for confirmation...</div>} 
      {isConfirmed && <div>Transaction confirmed.</div>} 
      {error && (
        <div>Error: {(error.shortMessage || error.message)}</div>
      )}
      </form>
    )
  }

export default MintNFT;