import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth, AuthUser, ReclaimProtocolService } from '../lib/auth';
import PrivyProvider from '../components/PrivyProvider';
import { usePrivy } from '@privy-io/react-auth';

// Create authentication context
export const AuthContext = createContext<{
  user: AuthUser | null;
  loading: boolean;
  login: (address: string) => void;
  logout: () => void;
  completeVerification: (proof?: any) => void;
}>({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  completeVerification: () => {},
});

// Custom hook to use auth context
export const useAuthContext = () => useContext(AuthContext);

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
      },
    },
  },
});

// Wrapper for Privy connected auth
function AuthWrapper({ Component, pageProps }: AppProps) {
  const auth = useAuth();
  const { user: privyUser, authenticated, ready } = usePrivy();
  
  // Initialize Reclaim Protocol on app load
  useEffect(() => {
    ReclaimProtocolService.initialize();
  }, []);

  // Sync Privy user with our auth context when authenticated
  useEffect(() => {
    async function syncWalletAddress() {
      try {
        console.log("Checking Privy status:", { ready, authenticated, hasUser: !!privyUser });
        
        if (ready && authenticated && privyUser) {
          console.log("Privy auth status:", { ready, authenticated });
          console.log("Privy user:", privyUser);
          
          // Get wallet address from user's linked wallets
          let walletAddress = null;
          
          // Check if user has linked wallets
          if (privyUser.linkedAccounts) {
            console.log("Linked accounts:", privyUser.linkedAccounts);
            // Find the first wallet account
            const walletAccount = privyUser.linkedAccounts.find(account => 
              account.type === 'wallet'
            );
            
            if (walletAccount && 'address' in walletAccount) {
              walletAddress = walletAccount.address;
              console.log("Got wallet address from linked accounts:", walletAddress);
            }
          }
          
          // Fallback to wallet property if available
          if (!walletAddress && privyUser.wallet?.address) {
            walletAddress = privyUser.wallet.address;
            console.log("Got wallet address from wallet property:", walletAddress);
          }
          
          if (walletAddress && (!auth.user || auth.user.address !== walletAddress)) {
            console.log("Logging in with wallet address:", walletAddress);
            // Login with the wallet address from Privy
            auth.login(walletAddress);
          } else if (!walletAddress) {
            console.log("No wallet address found in Privy user");
          }
        }
      } catch (error) {
        console.error("Error synchronizing Privy wallet:", error);
      }
    }
    
    syncWalletAddress();
  }, [privyUser, authenticated, ready, auth]);

  return (
    <AuthContext.Provider value={auth}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

function MyApp(props: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <PrivyProvider>
        <AuthWrapper {...props} />
      </PrivyProvider>
    </ChakraProvider>
  );
}

export default MyApp; 