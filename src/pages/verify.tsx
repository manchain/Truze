import { Box, Container, Flex, Heading, Text, Button, VStack, Icon, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthContext } from './_app';
import { usePrivy } from '@privy-io/react-auth';
import { FiShield, FiUserCheck } from 'react-icons/fi';
import { FadeIn, ScaleIn } from '../components/magic-ui';

export default function Verify() {
    const router = useRouter();
    const { user, login } = useAuthContext();
    const { login: privyLogin, ready, authenticated, user: privyUser } = usePrivy();
    const toast = useToast();

    useEffect(() => {
        if (ready && authenticated && user) {
            router.push('/');
        }
    }, [ready, authenticated, user, router]);

    const handleConnect = async () => {
        if (!ready) return;

        try {
            if (!authenticated) {
                privyLogin();
            } else {
                // If already authenticated with Privy but app state is out of sync or needs verification
                router.push('/');
            }
        } catch (error) {
            console.error('Connection failed:', error);
            toast({
                title: "Connection Failed",
                description: "Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box minH="100vh" bg="brand.deepSpace" display="flex" alignItems="center" justifyContent="center">
            <Container maxW="container.sm">
                <VStack spacing={8} textAlign="center">
                    <ScaleIn>
                        <Box
                            p={6}
                            borderRadius="full"
                            bg="rgba(88, 101, 242, 0.1)"
                            border="1px solid"
                            borderColor="brand.blurple"
                            boxShadow="0 0 20px rgba(88, 101, 242, 0.3)"
                        >
                            <Icon as={FiShield} boxSize={12} color="brand.blurple" />
                        </Box>
                    </ScaleIn>

                    <VStack spacing={2}>
                        <FadeIn>
                            <Heading
                                as="h1"
                                size="2xl"
                                bgGradient="linear(to-r, brand.synthwaveStart, brand.synthwaveEnd)"
                                bgClip="text"
                                fontWeight="extrabold"
                            >
                                Truze
                            </Heading>
                        </FadeIn>
                        <FadeIn delay={0.1}>
                            <Text fontSize="xl" color="brand.lavenderMist" fontWeight="medium">
                                Verify Truth. On-Chain.
                            </Text>
                        </FadeIn>
                        <FadeIn delay={0.2}>
                            <Text fontSize="md" color="gray.500" maxW="sm">
                                Connect your wallet to start verifying news and earning reputation in the decentralized truth network.
                            </Text>
                        </FadeIn>
                    </VStack>

                    <FadeIn delay={0.3}>
                        <Button
                            size="lg"
                            bgGradient="linear(to-r, brand.synthwaveStart, brand.synthwaveEnd)"
                            color="white"
                            borderRadius="full"
                            px={10}
                            py={7}
                            fontSize="lg"
                            fontWeight="bold"
                            leftIcon={<Icon as={FiUserCheck} />}
                            _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
                            _active={{ transform: 'scale(0.95)' }}
                            transition="all 0.2s"
                            onClick={handleConnect}
                            isLoading={!ready}
                            isDisabled={!ready}
                        >
                            Connect Wallet
                        </Button>
                    </FadeIn>
                </VStack>
            </Container>
        </Box>
    );
}
