import { useState, useEffect, useCallback } from 'react';
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
  Spinner,
  useBreakpointValue
} from '@chakra-ui/react';
import { FiCheck, FiLock, FiUser } from 'react-icons/fi';
import { BlurIn, FadeIn, ScaleIn } from '../components/magic-ui';
import { useAuthContext } from './_app';
import { ReclaimProtocolService } from '../lib/auth';
import QRCode from 'react-qr-code';
import { usePrivy } from '@privy-io/react-auth';

interface VerificationProof {
  identifier?: string;
  claimData?: Record<string, unknown>;
}

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
  
  // Responsive values
  const stepperOrientation = useBreakpointValue({ base: 'vertical', md: 'horizontal' });
  const containerPadding = useBreakpointValue({ base: 4, md: 16 });
  const headingSize = useBreakpointValue({ base: 'xl', md: '2xl' });
  const contentMaxWidth = useBreakpointValue({ base: '100%', md: 'lg' });
  const qrCodeSize = useBreakpointValue({ base: 200, md: 240 });
  const stepperSize = useBreakpointValue({ base: 'sm', md: 'lg' });
  
  // Privy integration
  const { 
    ready, 
    authenticated, 
    user: privyUser, 
    login: privyLogin,
  } = usePrivy();

  // If user is already verified, redirect to home
  useEffect(() => {
    if (user?.isVerified) {
      void router.push('/');
    }
  }, [user, router]);

  // Clean up polling interval on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  // Handle verification failure
  const handleVerificationFailure = useCallback((error: Error) => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
    
    setIsVerifying(false);
    onClose();
    
    toast({
      title: "Verification failed",
      description: error.message || "Could not verify your identity",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }, [pollingInterval, onClose, toast]);

  // Handle successful verification
  const handleVerificationSuccess = useCallback((proofs: VerificationProof[] = []) => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
    
    setIsVerified(true);
    setCurrentStep(3);
    setIsVerifying(false);
    onClose();
    
    if (proofs.length > 0 && user?.address) {
      const proof = proofs[0];
      
      const formattedProof = {
        id: proof.identifier || `proof-${Date.now()}`,
        provider: "twitter",
        parameters: {
          userId: user.address,
          timestamp: Date.now(),
          claimData: proof.claimData || {}
        },
        status: "verified"
      };
      
      completeVerification(formattedProof);
    } else if (user?.address) {
      const fallbackProof = {
        id: `proof-${Date.now()}`,
        provider: "twitter",
        parameters: {
          userId: user.address,
          timestamp: Date.now()
        },
        status: "verified"
      };
      
      completeVerification(fallbackProof);
    }
    
    toast({
      title: "Identity verified",
      description: "Your Twitter account has been verified successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    
    setTimeout(() => {
      void router.push('/');
    }, 2000);
  }, [pollingInterval, user, onClose, completeVerification, toast, router]);

  // Connect wallet function using Privy
  const connectWallet = async () => {
    setIsVerifying(true);
    
    try {
      if (!ready) {
        toast({
          title: "Wallet provider initializing",
          description: "Please try again in a moment",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        
        setTimeout(() => {
          setIsVerifying(false);
        }, 1500);
        
        return;
      }
      
      await privyLogin();
      
      if (privyUser?.wallet?.address) {
        login(privyUser.wallet.address);
        setIsWalletConnected(true);
        setCurrentStep(2);
        
        toast({
          title: "Wallet connected",
          description: `Connected with address ${privyUser.wallet.address.substring(0, 6)}...${privyUser.wallet.address.substring(privyUser.wallet.address.length - 4)}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Wallet connection error:", error);
      toast({
        title: "Failed to connect wallet",
        description: error instanceof Error ? error.message : "There was an error connecting your wallet",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  // Start Reclaim Protocol verification
  const startReclaimVerification = async () => {
    if (!user?.address) {
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
      const verificationRequest = await ReclaimProtocolService.generateVerificationRequest(
        user.address,
        handleVerificationSuccess,
        handleVerificationFailure
      );
      
      setQrCodeUrl(verificationRequest.requestUrl);
      setSessionId(verificationRequest.sessionId);
      
      onOpen();
      
      toast({
        title: "QR Code Generated",
        description: "Scan the QR code with the Reclaim mobile app to verify your Twitter account",
        status: "info",
        duration: 5000,
        isClosable: true,
      });
      
    } catch (error) {
      console.error("Verification request error:", error);
      toast({
        title: "Verification request failed",
        description: error instanceof Error ? error.message : "Failed to generate verification request",
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
    <Container maxW="container.xl" px={containerPadding} pt={{ base: 8, md: 16 }}>
      <VStack spacing={{ base: 6, md: 10 }} align="center" justify="center" minH={{ base: "70vh", md: "80vh" }}>
        <BlurIn>
          <Heading as="h1" size={headingSize} textAlign="center" mb={{ base: 2, md: 4 }}>
            Verify Your Identity
          </Heading>
          <Text fontSize={{ base: "lg", md: "xl" }} textAlign="center" color="gray.400" mb={{ base: 8, md: 12 }}>
            Connect your wallet and verify your Twitter account to access Truze
          </Text>
        </BlurIn>
        
        <FadeIn>
          <Box w="full" maxW={{ base: "100%", md: "5xl" }} px={{ base: 2, md: 0 }}>
            <Stepper 
              size={stepperSize} 
              index={currentStep - 1} 
              colorScheme="cyan" 
              orientation={stepperOrientation}
              gap={{ base: 2, md: 4 }}
            >
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
                    <StepTitle fontSize={{ base: "sm", md: "md" }}>{step.title}</StepTitle>
                    <StepDescription fontSize={{ base: "xs", md: "sm" }}>{step.description}</StepDescription>
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
            p={{ base: 6, md: 10 }}
            borderRadius="xl"
            boxShadow="xl"
            w="full"
            maxW={contentMaxWidth}
            textAlign="center"
          >
            <Center mb={{ base: 6, md: 8 }}>
              <Icon
                as={currentStep === 1 ? FiUser : currentStep === 2 ? FiLock : FiCheck}
                w={{ base: 16, md: 20 }}
                h={{ base: 16, md: 20 }}
                color="cyan.400"
                p={4}
                bg={colorMode === 'dark' ? 'gray.700' : 'gray.100'}
                borderRadius="full"
              />
            </Center>
            
            <Heading as="h2" size={{ base: "md", md: "lg" }} mb={{ base: 3, md: 4 }}>
              {currentStep === 1
                ? 'Connect Your Wallet'
                : currentStep === 2
                ? 'Verify Your Twitter Account'
                : 'Verification Complete'}
            </Heading>
            
            <Text color="gray.500" mb={{ base: 6, md: 8 }} fontSize={{ base: "sm", md: "md" }}>
              {currentStep === 1
                ? 'Connect your digital wallet to begin the verification process.'
                : currentStep === 2
                ? 'Verify ownership of your Twitter account using Reclaim Protocol.'
                : 'Your Twitter account has been verified. You now have access to the Truze platform.'}
            </Text>
            
            <Divider my={{ base: 6, md: 8 }} />
            
            {currentStep === 1 && (
              <Button
                colorScheme="cyan"
                size={{ base: "md", md: "lg" }}
                w="full"
                onClick={connectWallet}
                isLoading={isVerifying}
                loadingText="Connecting..."
              >
                Connect Wallet
              </Button>
            )}
            
            {currentStep === 2 && (
              <Button
                colorScheme="cyan"
                size={{ base: "md", md: "lg" }}
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
              <VStack spacing={3}>
                <Icon as={FiCheck} w={{ base: 8, md: 10 }} h={{ base: 8, md: 10 }} color="green.500" />
                <Text color="green.500" fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>
                  Verification successful! Redirecting...
                </Text>
              </VStack>
            )}
          </Box>
        </ScaleIn>
      </VStack>
      
      {/* QR Code Modal */}
      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        isCentered 
        size={{ base: "sm", md: "md" }}
      >
        <ModalOverlay backdropFilter="blur(5px)" />
        <ModalContent mx={4}>
          <ModalHeader fontSize={{ base: "lg", md: "xl" }}>Twitter Verification</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Text textAlign="center" fontSize={{ base: "sm", md: "md" }}>
                Scan this QR code with the Reclaim mobile app to verify your Twitter account
              </Text>
              
              <Box p={4} bg="white" borderRadius="md" shadow="md">
                {qrCodeUrl ? (
                  <QRCode value={qrCodeUrl} size={qrCodeSize} />
                ) : (
                  <Center h={qrCodeSize} w={qrCodeSize}>
                    <Spinner size="xl" color="cyan.500" />
                  </Center>
                )}
              </Box>
              
              <Box bg="gray.100" p={4} borderRadius="md" w="full">
                <Text fontSize={{ base: "xs", md: "sm" }} fontWeight="bold" mb={2} color="gray.800">
                  Instructions:
                </Text>
                <VStack spacing={2} align="start">
                  <Text fontSize={{ base: "xs", md: "sm" }} color="gray.700">1. Download the Reclaim mobile app if you haven't already</Text>
                  <Text fontSize={{ base: "xs", md: "sm" }} color="gray.700">2. Scan the QR code with the app</Text>
                  <Text fontSize={{ base: "xs", md: "sm" }} color="gray.700">3. Log in to your Twitter account</Text>
                  <Text fontSize={{ base: "xs", md: "sm" }} color="gray.700">4. Approve the verification request</Text>
                </VStack>
              </Box>
              
              <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500">
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