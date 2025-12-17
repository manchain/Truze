import { useState, useEffect } from 'react';
import { ReclaimProofRequest } from "@reclaimprotocol/js-sdk";

// Define auth user type
export interface AuthUser {
  address: string;
  isVerified: boolean;
  verificationTimestamp?: number;
  proof?: any;
}

// Constants for Reclaim Protocol
const RECLAIM_APP_ID = "0xc0C5826129baa6a6c27D828f699386919D1C15a7"; // Replace with your Reclaim application ID
const RECLAIM_APP_SECRET = "0x8d27d3ff08e1358fc262167cfb650b7e6674e0b0158a9655de6ae468c5941be9"; // Replace with your Reclaim app secret
const RECLAIM_PROVIDER_ID = "e6fe962d-8b4e-4ce5-abcc-3d21c88bd64a"; // Replace with your provider ID

// Auth state management
export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on component mount
    checkAuth();
  }, []);

  const checkAuth = () => {
    setLoading(true);
    try {
      // Get verification status from localStorage
      const isVerified = localStorage.getItem('userVerified') === 'true';
      const storedAddress = localStorage.getItem('walletAddress');
      const storedProof = localStorage.getItem('userProof');

      if (storedAddress) {
        setUser({
          address: storedAddress,
          isVerified,
          verificationTimestamp: isVerified ? parseInt(localStorage.getItem('verificationTimestamp') || '0') : undefined,
          proof: storedProof ? JSON.parse(storedProof) : undefined
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (address: string) => {
    console.log(`[Auth] Logging in user with address: ${address}`);
    localStorage.setItem('walletAddress', address);
    setUser({
      address,
      isVerified: false
    });
  };

  const completeVerification = (proof: any = null) => {
    console.log(`[Auth] Completing verification for user:`, proof);
    const timestamp = Date.now();
    localStorage.setItem('userVerified', 'true');
    localStorage.setItem('verificationTimestamp', timestamp.toString());

    if (proof) {
      localStorage.setItem('userProof', JSON.stringify(proof));
    }

    setUser(prev => {
      if (!prev) {
        console.error('[Auth] Attempted to verify non-existent user');
        return null;
      }

      console.log(`[Auth] User ${prev.address} verified successfully`);
      return {
        ...prev,
        isVerified: true,
        verificationTimestamp: timestamp,
        proof
      };
    });
  };

  const logout = () => {
    console.log('[Auth] Logging out user');
    localStorage.removeItem('walletAddress');
    localStorage.removeItem('userVerified');
    localStorage.removeItem('verificationTimestamp');
    localStorage.removeItem('userProof');
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
    completeVerification,
    checkAuth
  };
};

// Reclaim Protocol service implementation
export class ReclaimProtocolService {
  private static reclaimClient: any = null;

  // Initialize Reclaim Protocol client
  static initialize() {
    try {
      console.log('Reclaim Protocol initialized');
      return true;
    } catch (error) {
      console.error('Error initializing Reclaim Protocol:', error);
      throw error;
    }
  }

  // Generate verification request with QR code
  static async generateVerificationRequest(walletAddress: string, onSuccess: (proofs: any[]) => void, onFailure: (error: any) => void) {
    try {
      console.log(`Generating verification request for ${walletAddress}`);

      // Initialize a new Reclaim request for this verification
      const reclaimRequest = await ReclaimProofRequest.init(
        RECLAIM_APP_ID,
        RECLAIM_APP_SECRET,
        RECLAIM_PROVIDER_ID
      );

      // Add context to the request
      reclaimRequest.addContext(
        `Verify Twitter for ${walletAddress}`,
        `Truze verification at ${new Date().toISOString()}`
      );

      // Get the request URL for QR code
      const requestUrl = await reclaimRequest.getRequestUrl();
      const statusUrl = reclaimRequest.getStatusUrl();

      console.log("Request URL:", requestUrl);
      console.log("Status URL:", statusUrl);

      // Start session and set callbacks
      await reclaimRequest.startSession({
        onSuccess: (proof) => {
          console.log("Verification success", proof);
          // Convert proof to array if needed
          const proofsArray = Array.isArray(proof) ? proof : [proof].filter(Boolean);
          onSuccess(proofsArray);
        },
        onError: (error) => {
          console.error("Verification failed", error);
          onFailure(error);
        }
      });

      // Return verification request data
      return {
        sessionId: Math.random().toString(36).substring(2, 15),
        requestUrl,
        qrCodeData: requestUrl,
        statusUrl
      };
    } catch (error) {
      console.error('Error generating verification request:', error);
      throw error;
    }
  }
}

// Protected route helper - redirect to verification page if not verified
export const requireAuth = (router: any) => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      // Not authenticated, redirect to verify page
      router.push('/verify');
    } else if (!loading && user && !user.isVerified) {
      // Authenticated but not verified, redirect to verify page
      router.push('/verify');
    }
  }, [user, loading, router]);

  return { user, loading };
}; 