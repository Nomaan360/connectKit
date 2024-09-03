
import './App.css';
import Web3Provider from './Web3Provider';
import { ConnectKitButton  } from "connectkit";
import config from './config'
import  SendTransaction  from './send-transaction' 
import  ReadContract  from './read-trans' 
import MintNft from './mint-nft' 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

const queryClient = new QueryClient()


const App = (children) => {
  return (
     <WagmiProvider config={config}>
          <Web3Provider>
      <ConnectKitButton />
      <ReadContract />
      </Web3Provider>

     <QueryClientProvider client={queryClient}> 
       {/* <SendTransaction />  */}
     </QueryClientProvider> 
   </WagmiProvider>
  );
};


export default App;
