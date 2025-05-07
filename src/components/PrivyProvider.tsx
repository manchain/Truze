import React, { ReactNode, useEffect } from 'react';
import { PrivyProvider as PrivyClientProvider } from '@privy-io/react-auth';
import { createRoot } from 'react-dom/client';

// Replace with your actual Privy App ID
const PRIVY_APP_ID = 'cmae9okvv006pla0mfcnnv9al';

interface PrivyProviderProps {
  children: ReactNode;
}

// Pre-initialize Privy to avoid readiness issues
if (typeof window !== 'undefined') {
  // Create a div element for preloading
  const preloadDiv = document.createElement('div');
  preloadDiv.style.display = 'none';
  document.body.appendChild(preloadDiv);
  
  // Preload Privy components
  const root = createRoot(preloadDiv);
  root.render(
    <PrivyClientProvider 
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ['wallet'],
        embeddedWallets: {
          createOnLogin: 'all-users',
          showWalletUIs: true
        }
      }}
    >
      <div />
    </PrivyClientProvider>
  );
  
  // Clean up after a delay
  setTimeout(() => {
    if (document.body.contains(preloadDiv)) {
      document.body.removeChild(preloadDiv);
    }
  }, 2000);
}

export default function PrivyProvider({ children }: PrivyProviderProps) {
  useEffect(() => {
    console.log('PrivyProvider mounted');
  }, []);

  return (
    <PrivyClientProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ['wallet', 'email'],
        appearance: {
          theme: 'dark',
          accentColor: '#0BC5EA',
          logo: '/logo.png',
        },
        embeddedWallets: {
          createOnLogin: 'all-users',
          showWalletUIs: true
        },
        supportedChains: [
          { 
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
            }
          }
        ],
        defaultChain: { 
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
          }
        },
      }}
    >
      {children}
    </PrivyClientProvider>
  );
} 