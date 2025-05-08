import React, { ReactNode } from 'react';
import { PrivyProvider as PrivyClientProvider } from '@privy-io/react-auth';

// Replace with your actual Privy App ID
const PRIVY_APP_ID = 'cmae9okvv006pla0mfcnnv9al';

const baseSepolia = {
  id: 84532,
  name: 'Base Sepolia',
  rpcUrls: {
    default: {
      http: ['https://sepolia.base.org']
    }
  },
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18
  },
  blockExplorers: {
    default: {
      name: 'BaseScan',
      url: 'https://sepolia.basescan.org'
    }
  },
  testnet: true
};

interface PrivyProviderProps {
  children: ReactNode;
}

export default function PrivyProvider({ children }: PrivyProviderProps) {
  return (
    <PrivyClientProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ['wallet', 'email'],
        appearance: {
          theme: 'dark',
          accentColor: '#0BC5EA',
          logo: '/logo.png'
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          showWalletUIs: true
        },
        defaultChain: baseSepolia,
        supportedChains: [baseSepolia],
        walletConnectCloudProjectId: 'your-wc-project-id'
      }}
    >
      {children}
    </PrivyClientProvider>
  );
} 