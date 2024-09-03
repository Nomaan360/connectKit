import { getDefaultConfig } from "connectkit";
import { polygonAmoy }  from "wagmi/chains";
import { injected, metaMask, safe, walletConnect } from 'wagmi/connectors';
import { http, createConfig } from 'wagmi';

const projectId = '<WALLETCONNECT_PROJECT_ID>';

const config = createConfig(
    getDefaultConfig({
      // Your dApps chains
      chains: [polygonAmoy],
      connectors: [
        injected(),
        walletConnect({ projectId }),
        metaMask(),
        safe(),
      ],
      transports: {
        // RPC URL for each chain
        [polygonAmoy.id]: http(
         `https://rpc-amoy.polygon.technology/`,
        ),
      },
  
      // Required API Keys
      walletConnectProjectId: '',
  
      // Required App Info
      appName: "Your App Name",
  
      // Optional App Info
      appDescription: "Your App Description",
      appUrl: "https://family.co", // your app's url
      appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
    }),
  );

export default config;