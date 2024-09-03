import React from 'react';
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

function SendTransaction() {
  const { data: hash, error, isPending, sendTransaction } = useSendTransaction();

  async function submit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const to = formData.get('address');
    const value = formData.get('value');
    sendTransaction({ to, value: parseEther(value) });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  return (
    <form onSubmit={submit}>
      <input name="address" placeholder="0xA0Cf…251e" required />
      <input name="value" placeholder="0.05" required />
      <button disabled={isPending} type="submit">
        {isPending ? 'Confirming...' : 'Send'}
      </button>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && <div>Waiting for confirmation...</div>}
      {isConfirmed && <div>Transaction confirmed.</div>}
      {error && (
        <div>Error: {(error.shortMessage || error.message)}</div>
      )}
    </form>
  );
}

export default SendTransaction;
