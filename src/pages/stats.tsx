import React from 'react';
import {
  Box, Text, useColorMode, HStack, VStack, Icon, Progress, Flex, Divider, Button, IconButton
} from '@chakra-ui/react';
import { FiArrowLeft, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { BlurIn, SlideIn, ScaleIn, FadeIn } from '../components/magic-ui';
import { useAuthContext } from './_app';

const statsData = {
  network: {
    connected: true,
    peers: 20,
    sync: 100,
    lastUpdate: 'Just now',
  },
  verification: {
    verified: { count: 1452, percent: 77 },
    pending: { count: 328, percent: 18 },
    disputed: { count: 94, percent: 5 },
  },
  trending: [
    { label: 'Climate Policy', value: 1243, color: 'brand.acidGreen' },
    { label: 'Economic Summit', value: 856, color: 'brand.acidGreen' },
    { label: 'Tech Regulations', value: 742, color: 'red.400' },
    { label: 'Healthcare Reform', value: 521, color: 'brand.acidGreen' },
    { label: 'Election Update', value: 498, color: 'red.400' },
  ],
};

const Stats = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const { user, loading } = useAuthContext();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/verify');
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <Box minH="100vh" bg="brand.deepSpace" px={2} py={4}>
      <Box maxW="container.sm" mx="auto" px={4}>
        <BlurIn>
          <HStack mb={6} align="center">
            <ScaleIn>
              <IconButton
                icon={<FiArrowLeft />}
                aria-label="Back"
                variant="ghost"
                color="brand.lavenderMist"
                fontSize="xl"
                _hover={{ bg: 'whiteAlpha.100' }}
                onClick={() => router.back()}
              />
            </ScaleIn>
            <ScaleIn>
              <Text color="brand.lavenderMist" fontWeight="bold" fontSize="2xl" ml={2}>Back</Text>
            </ScaleIn>
          </HStack>
        </BlurIn>
        <VStack spacing={8}>
          {/* Network Status Card */}
          <SlideIn direction="right">
            <Box
              bg="rgba(255, 255, 255, 0.03)"
              borderRadius="2xl"
              p={6}
              w="350px"
              minH="260px"
              mx="auto"
              border="1px solid"
              borderColor="whiteAlpha.100"
            >
              <Flex justify="space-between" align="center" mb={2}>
                <Text color="brand.lavenderMist" fontWeight="bold" fontSize="lg">Network Status</Text>
                <HStack bg="rgba(16, 40, 24, 0.5)" px={3} py={1} borderRadius="lg">
                  <Box as="span" fontSize="lg" color="brand.acidGreen" mr={1}>●</Box>
                  <Text color="brand.acidGreen" fontWeight="bold" fontSize="md">Connected</Text>
                </HStack>
              </Flex>
              <HStack spacing={3} mt={4} mb={1}>
                <Box as="span" fontSize="xl" color="gray.400">🗄️</Box>
                <Text color="gray.400" fontSize="md">Connected Peers</Text>
                <Text color="brand.lavenderMist" fontWeight="bold" ml="auto">{statsData.network.peers}</Text>
              </HStack>
              <HStack spacing={3} mb={1}>
                <Box as="span" fontSize="xl" color="gray.400">⏰</Box>
                <Text color="gray.400" fontSize="md">Data Sync</Text>
                <Text color="brand.lavenderMist" fontWeight="bold" ml="auto">{statsData.network.sync}%</Text>
              </HStack>
              <Progress value={statsData.network.sync} size="sm" colorScheme="cyan" borderRadius="full" mb={2} />
              <Flex justify="space-between" align="center">
                <Text color="gray.500" fontSize="sm">Last update</Text>
                <Text color="brand.lavenderMist" fontSize="sm">{statsData.network.lastUpdate}</Text>
              </Flex>
            </Box>
          </SlideIn>

          {/* Verification Status Card */}
          <SlideIn direction="left">
            <Box
              bg="rgba(255, 255, 255, 0.03)"
              borderRadius="2xl"
              p={6}
              w="350px"
              minH="260px"
              mx="auto"
              border="1px solid"
              borderColor="whiteAlpha.100"
            >
              <Flex align="center" mb={4}>
                <Box as="span" fontSize="xl" color="brand.blurple" mr={2}>🛡️</Box>
                <Text color="brand.lavenderMist" fontWeight="bold" fontSize="lg">Verification Status</Text>
              </Flex>
              <VStack align="stretch" spacing={2}>
                <Box>
                  <Flex justify="space-between" align="center">
                    <Text color="gray.400" fontSize="md">Verified Content</Text>
                    <Text color="brand.acidGreen" fontWeight="bold">{statsData.verification.verified.count} ({statsData.verification.verified.percent}%)</Text>
                  </Flex>
                  <Progress value={statsData.verification.verified.percent} size="sm" colorScheme="green" borderRadius="full" />
                </Box>
                <Box>
                  <Flex justify="space-between" align="center">
                    <Text color="gray.400" fontSize="md">Pending Verification</Text>
                    <Text color="orange.300" fontWeight="bold">{statsData.verification.pending.count} ({statsData.verification.pending.percent}%)</Text>
                  </Flex>
                  <Progress value={statsData.verification.pending.percent} size="sm" colorScheme="orange" borderRadius="full" />
                </Box>
                <Box>
                  <Flex justify="space-between" align="center">
                    <Text color="gray.400" fontSize="md">Disputed Content</Text>
                    <Text color="red.400" fontWeight="bold">{statsData.verification.disputed.count} ({statsData.verification.disputed.percent}%)</Text>
                  </Flex>
                  <Progress value={statsData.verification.disputed.percent} size="sm" colorScheme="red" borderRadius="full" />
                </Box>
              </VStack>
            </Box>
          </SlideIn>

          {/* Trending Topics Card */}
          <SlideIn direction="up">
            <Box
              bg="rgba(255, 255, 255, 0.03)"
              borderRadius="2xl"
              p={6}
              w="350px"
              minH="260px"
              mx="auto"
              border="1px solid"
              borderColor="whiteAlpha.100"
            >
              <Flex align="center" mb={4}>
                <Box as="span" fontSize="xl" color="brand.blurple" mr={2}>📈</Box>
                <Text color="brand.lavenderMist" fontWeight="bold" fontSize="lg">Trending Topics</Text>
              </Flex>
              <VStack align="stretch" spacing={1} mb={2}>
                <Flex justify="space-between" align="center">
                  <Text color="gray.400" fontSize="md">Climate Policy</Text>
                  <HStack>
                    <Text color="brand.acidGreen" fontWeight="bold">1243</Text>
                    <Box as="span" color="green.400" fontSize="xl">•</Box>
                  </HStack>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text color="gray.400" fontSize="md">Economic Summit</Text>
                  <HStack>
                    <Text color="brand.acidGreen" fontWeight="bold">856</Text>
                    <Box as="span" color="green.400" fontSize="xl">•</Box>
                  </HStack>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text color="gray.400" fontSize="md">Tech Regulations</Text>
                  <HStack>
                    <Text color="red.400" fontWeight="bold">742</Text>
                    <Box as="span" color="red.400" fontSize="xl">•</Box>
                  </HStack>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text color="gray.400" fontSize="md">Healthcare Reform</Text>
                  <HStack>
                    <Text color="brand.acidGreen" fontWeight="bold">521</Text>
                    <Box as="span" color="green.400" fontSize="xl">•</Box>
                  </HStack>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text color="gray.400" fontSize="md">Election Update</Text>
                  <HStack>
                    <Text color="red.400" fontWeight="bold">498</Text>
                    <Box as="span" color="red.400" fontSize="xl">•</Box>
                  </HStack>
                </Flex>
              </VStack>
              <Divider borderColor="whiteAlpha.200" my={4} />
              <ScaleIn>
                <Button variant="link" color="brand.blurple" rightIcon={<Box as="span" fontSize="lg">→</Box>} fontWeight="bold" fontSize="md" alignSelf="flex-end">
                  See All Topics
                </Button>
              </ScaleIn>
            </Box>
          </SlideIn>
        </VStack>
      </Box>
    </Box>
  );
};

export default Stats;