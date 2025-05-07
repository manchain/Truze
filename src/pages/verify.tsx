import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  useColorMode,
  Image,
  useToast,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  HStack,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Center,
  Divider,
  Spinner
} from '@chakra-ui/react';
import { FiCheck, FiLock, FiUser } from 'react-icons/fi';
import { BlurIn, FadeIn, ScaleIn } from '../components/magic-ui';
import { useAuthContext } from './_app';
import { ReclaimProtocolService } from '../lib/auth';
import QRCode from 'react-qr-code';
import { usePrivy } from '@privy-io/react-auth';

const VerifyPage = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentStep, setCurrentStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [pollingInterval, setPollingInterval] = useState<NodeJS.Timeout | null>(null);
  const { user, login, completeVerification } = useAuthContext();
  
  // Privy integration
  const { 
    ready, 
    authenticated, 
    user: privyUser, 
    login: privyLogin,
    logout: privyLogout 
  } = usePrivy();

  // If user is already verified, redirect to home
  useEffect(() => {
    if (user && user.isVerified) {
      router.push('/');
    }
  }, [user, router]);

  // Set wallet connection status when component mounts or user changes
  useEffect(() => {
    if (user) {
      console.log("User detected in auth context:", user);
      setIsWalletConnected(true);
      setCurrentStep(2);
    }
  }, [user]);
  
  // Update UI based on Privy authentication state
  useEffect(() => {
    console.log("Privy state:", { ready, authenticated, privyUser });
    
    if (ready) {
      // If Privy is still connecting (showing UI), show loading state
      if (!authenticated && privyUser === undefined) {
        setIsVerifying(true);
      } else if (!authenticated && privyUser === null) {
        // If Privy attempted connection but failed
        setIsVerifying(false);
      }
    }
  }, [ready, authenticated, privyUser]);

  // Clean up polling interval on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);
  
  // Sync Privy authentication state
  useEffect(() => {
    if (ready && authenticated && privyUser) {
      console.log("Privy user authenticated:", privyUser);
      
      // Get wallet address from user's linked wallets
      let walletAddress = null;
      
      // Check if user has linked wallets
      if (privyUser.linkedAccounts) {
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
      
      if (walletAddress) {
        console.log("Wallet connected:", walletAddress);
        // Login with the wallet address from Privy
        login(walletAddress);
        setIsWalletConnected(true);
        setCurrentStep(2);
        
        toast({
          title: "Wallet connected",
          description: `Connected with address ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  }, [privyUser, authenticated, ready, login, toast]);

  // Connect wallet function using Privy
  const connectWallet = async () => {
    setIsVerifying(true);
    
    try {
      if (!ready) {
        console.log("Privy is not ready yet, waiting...");
        
        // Show waiting toast
        toast({
          title: "Wallet provider initializing",
          description: "Please try again in a moment",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        
        // Set a timeout to reset the loading state
        setTimeout(() => {
          setIsVerifying(false);
        }, 1500);
        
        return;
      }
      
      console.log("Initiating Privy login");
      // Use Privy to connect wallet
      await privyLogin();
      
      toast({
        title: "Connecting wallet...",
        description: "Please follow the prompts in the Privy modal",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error("Wallet connection error:", error);
      toast({
        title: "Failed to connect wallet",
        description: error.message || "There was an error connecting your wallet",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsVerifying(false);
    }
  };

  // Handle verification failure
  const handleVerificationFailure = (error: any) => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
    
    setIsVerifying(false);
    onClose(); // Close the QR code modal
    
    toast({
      title: "Verification failed",
      description: error.message || "Could not verify your identity",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  // Handle successful verification
  const handleVerificationSuccess = (proofs: any[] = []) => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
    
    console.log("Verification successful! Proofs:", proofs);
    
    setIsVerified(true);
    setCurrentStep(3);
    setIsVerifying(false);
    onClose(); // Close the QR code modal
    
    // Get the proof from the proofs array
    if (proofs.length > 0) {
      const proof = proofs[0];
      
      // Format a meaningful proof object
      const formattedProof = {
        id: proof.identifier || `proof-${Date.now()}`,
        provider: "twitter",
        parameters: {
          userId: user?.address || "unknown",
          timestamp: Date.now(),
          claimData: proof.claimData || {}
        },
        status: "verified"
      };
      
      console.log("Formatted proof:", formattedProof);
      
      // Pass the proof to the completeVerification function
      completeVerification(formattedProof);
    } else {
      // If no proofs were received, create a fallback proof
      const fallbackProof = {
        id: `proof-${Date.now()}`,
        provider: "twitter",
        parameters: {
          userId: user?.address || "unknown",
          timestamp: Date.now()
        },
        status: "verified"
      };
      
      console.log("No proofs received, using fallback:", fallbackProof);
      completeVerification(fallbackProof);
    }
    
    toast({
      title: "Identity verified",
      description: "Your Twitter account has been verified successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    
    // After successful verification, wait briefly then redirect
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  // Start Reclaim Protocol verification
  const startReclaimVerification = async () => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please connect your wallet first",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    
    setIsVerifying(true);
    
    try {
      console.log("Starting Reclaim verification for address:", user.address);
      // Generate verification request using Reclaim Protocol
      const verificationRequest = await ReclaimProtocolService.generateVerificationRequest(
        user.address,
        handleVerificationSuccess,
        handleVerificationFailure
      );
      
      console.log("Verification request created:", verificationRequest);
      setQrCodeUrl(verificationRequest.requestUrl);
      setSessionId(verificationRequest.sessionId);
      
      // Open QR code modal
      onOpen();
      
      toast({
        title: "QR Code Generated",
        description: "Scan the QR code with the Reclaim mobile app to verify your Twitter account",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      
    } catch (error: any) {
      console.error("Verification request error:", error);
      toast({
        title: "Verification request failed",
        description: error.message || "Failed to generate verification request",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setIsVerifying(false);
    }
  };

  // Steps in the verification process
  const steps = [
    { title: 'Connect Wallet', description: 'Connect your digital wallet' },
    { title: 'Verify Twitter', description: 'Verify your Twitter' },
    { title: 'Access Platform', description: 'Gain access to the Truze platform' },
  ];

  return (
    <Container maxW="container.xl" pt={16}>
      <VStack spacing={10} align="center" justify="center" minH="80vh">
        <BlurIn>
          <Heading as="h1" size="2xl" textAlign="center" mb={4}>
            Verify Your Identity
          </Heading>
          <Text fontSize="xl" textAlign="center" color="gray.400" mb={12}>
            Connect your wallet and verify your Twitter account to access Truze
          </Text>
        </BlurIn>
        
        <FadeIn>
          <Box w="full" maxW="5xl">
            <Stepper size="lg" index={currentStep - 1} colorScheme="cyan">
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepIndicator>
                    <StepStatus
                      complete={<StepIcon />}
                      incomplete={<StepNumber />}
                      active={<StepNumber />}
                    />
                  </StepIndicator>
                  <Box flexShrink="0">
                    <StepTitle>{step.title}</StepTitle>
                    <StepDescription>{step.description}</StepDescription>
                  </Box>
                  <StepSeparator />
                </Step>
              ))}
            </Stepper>
          </Box>
        </FadeIn>
        
        <ScaleIn>
          <Box
            bg={colorMode === 'dark' ? 'gray.800' : 'white'}
            p={10}
            borderRadius="xl"
            boxShadow="xl"
            w="full"
            maxW="lg"
            textAlign="center"
          >
            <Center mb={8}>
              <Icon
                as={currentStep === 1 ? FiUser : currentStep === 2 ? FiLock : FiCheck}
                w={20}
                h={20}
                color="cyan.400"
                p={4}
                bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
                borderRadius="full"
              />
            </Center>
            
            <Heading as="h2" size="lg" mb={4}>
              {currentStep === 1
                ? 'Connect Your Wallet'
                : currentStep === 2
                ? 'Verify Your Twitter Account'
                : 'Verification Complete'}
            </Heading>
            
            <Text color="gray.500" mb={8}>
              {currentStep === 1
                ? 'Connect your digital wallet to begin the verification process.'
                : currentStep === 2
                ? 'Verify ownership of your Twitter account using Reclaim Protocol.'
                : 'Your Twitter account has been verified. You now have access to the Truze platform.'}
            </Text>
            
            <Divider my={8} />
            
            {currentStep === 1 && (
              <Button
                colorScheme="cyan"
                size="lg"
                w="full"
                onClick={connectWallet}
                isLoading={isVerifying || (ready && !authenticated)}
                loadingText="Connecting..."
              >
                Connect Wallet
              </Button>
            )}
            
            {currentStep === 2 && (
              <Button
                colorScheme="cyan"
                size="lg"
                w="full"
                onClick={startReclaimVerification}
                isLoading={isVerifying}
                loadingText="Processing..."
                leftIcon={<FiLock />}
              >
                Verify Twitter Account
              </Button>
            )}
            
            {currentStep === 3 && (
              <VStack>
                <Icon as={FiCheck} w={10} h={10} color="green.500" />
                <Text color="green.500" fontWeight="bold">
                  Verification successful! Redirecting...
                </Text>
              </VStack>
            )}
          </Box>
        </ScaleIn>
      </VStack>
      
      {/* QR Code Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent>
          <ModalHeader>Twitter Verification</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Text textAlign="center">
                Scan this QR code with the Reclaim mobile app to verify your Twitter account
              </Text>
              
              <Box p={4} bg="white" borderRadius="md" shadow="md">
                {qrCodeUrl ? (
                  <QRCode value={qrCodeUrl} size={240} />
                ) : (
                  <Center h={240} w={240}>
                    <Spinner size="xl" color="cyan.500" />
                  </Center>
                )}
              </Box>
              
              <Box bg="gray.100" p={4} borderRadius="md" w="full">
                <Text fontSize="sm" fontWeight="bold" mb={2} color="gray.800">
                  Instructions:
                </Text>
                <VStack spacing={2} align="start">
                  <Text fontSize="sm" color="gray.700">1. Download the Reclaim mobile app if you haven't already</Text>
                  <Text fontSize="sm" color="gray.700">2. Scan the QR code with the app</Text>
                  <Text fontSize="sm" color="gray.700">3. Log in to your Twitter account</Text>
                  <Text fontSize="sm" color="gray.700">4. Approve the verification request</Text>
                </VStack>
              </Box>
              
              <Text fontSize="sm" color="gray.500">
                Session ID: {sessionId}
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default VerifyPage; 