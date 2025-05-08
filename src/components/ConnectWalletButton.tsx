import React, { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';

export default function ConnectWalletButton() {
  const [isConnecting, setIsConnecting] = useState(false);
  const { login, ready, authenticated } = usePrivy();

  const handleConnect = async () => {
    try {
      setIsConnecting(true);
      await login();
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  if (!ready) {
    return <button disabled>Loading...</button>;
  }

  if (authenticated) {
    return <button disabled>Connected</button>;
  }

  return (
    <button
      onClick={handleConnect}
      disabled={isConnecting}
      className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 disabled:opacity-50"
    >
      {isConnecting ? 'Connecting...' : 'Connect Wallet'}
    </button>
  );
} 