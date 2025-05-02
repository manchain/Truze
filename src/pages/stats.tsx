import React from 'react';
import {
  Box, Text, useColorMode, HStack, VStack, Icon, Progress, Flex, Divider, Button
} from '@chakra-ui/react';
import { FiArrowLeft, FiWifi, FiDatabase, FiClock, FiShield, FiTrendingUp, FiChevronRight } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { BlurIn, SlideIn, FadeIn, ScaleIn } from '../components/magic-ui';

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
    { label: 'Climate Policy', value: 1243, color: 'green.400' },
    { label: 'Economic Summit', value: 856, color: 'green.400' },
    { label: 'Tech Regulations', value: 742, color: 'red.400' },
    { label: 'Healthcare Reform', value: 521, color: 'green.400' },
    { label: 'Election Update', value: 498, color: 'red.400' },
  ],
};

const Stats = () => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';
  const router = useRouter();

  return (
    <Box minH="100vh" bg={isDark ? '#151C28' : 'gray.50'} px={2} py={4}>
      <Box maxW="container.sm" mx="auto">
        <BlurIn duration={0.8} delay={0.2}>
          <HStack mb={6} align="center">
            <ScaleIn duration={0.5} delay={0.4}>
              <Icon as={FiArrowLeft} color={isDark ? 'white' : 'gray.700'} fontSize="xl" cursor="pointer" onClick={() => router.back()} />
            </ScaleIn>
            <ScaleIn duration={0.5} delay={0.5}>
              <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold" fontSize="lg">Back</Text>
            </ScaleIn>
          </HStack>
        </BlurIn>
        <VStack spacing={6}>
          {/* Network Status Card */}
          <SlideIn direction="right" duration={0.6} delay={0.3}>
            <Box bg={isDark ? '#232B3B' : 'white'} borderRadius="2xl" p={6} w="full">
              <ScaleIn duration={0.5} delay={0.4}>
                <Flex justify="space-between" align="center" mb={2}>
                  <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold" fontSize="lg">Network Status</Text>
                  <HStack bg={isDark ? 'rgba(39, 60, 48, 0.5)' : 'green.50'} px={3} py={1} borderRadius="lg">
                    <Icon as={FiWifi} color="green.400" />
                    <Text color="green.400" fontWeight="bold" fontSize="md">Connected</Text>
                  </HStack>
                </Flex>
              </ScaleIn>
              <VStack spacing={4} align="stretch">
                <FadeIn duration={0.5} delay={0.5}>
                  <HStack spacing={4}>
                    <HStack spacing={2} flex={1}>
                      <Icon as={FiDatabase} color={isDark ? 'gray.400' : 'gray.500'} />
                      <Text color={isDark ? 'gray.300' : 'gray.600'} fontSize="md">Connected Peers</Text>
                    </HStack>
                    <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold">{statsData.network.peers}</Text>
                  </HStack>
                </FadeIn>
                <FadeIn duration={0.5} delay={0.6}>
                  <HStack spacing={4}>
                    <HStack spacing={2} flex={1}>
                      <Icon as={FiClock} color={isDark ? 'gray.400' : 'gray.500'} />
                      <Text color={isDark ? 'gray.300' : 'gray.600'} fontSize="md">Data Sync</Text>
                    </HStack>
                    <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold">{statsData.network.sync}%</Text>
                  </HStack>
                </FadeIn>
                <FadeIn duration={0.5} delay={0.7}>
                  <Progress value={statsData.network.sync} size="sm" colorScheme="cyan" borderRadius="full" />
                </FadeIn>
              </VStack>
            </Box>
          </SlideIn>

          {/* Verification Status Card */}
          <SlideIn direction="left" duration={0.6} delay={0.4}>
            <Box bg={isDark ? '#232B3B' : 'white'} borderRadius="2xl" p={6} w="full">
              <ScaleIn duration={0.5} delay={0.5}>
                <Flex align="center" mb={4}>
                  <Icon as={FiShield} color={isDark ? 'cyan.400' : 'cyan.600'} mr={2} />
                  <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold" fontSize="lg">Verification Status</Text>
                </Flex>
              </ScaleIn>
              <VStack align="stretch" spacing={2}>
                <FadeIn duration={0.5} delay={0.6}>
                  <Box>
                    <Flex justify="space-between" align="center">
                      <Text color={isDark ? 'gray.300' : 'gray.600'} fontSize="md">Verified</Text>
                      <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold">{statsData.verification.verified.count} ({statsData.verification.verified.percent}%)</Text>
                    </Flex>
                    <Progress value={statsData.verification.verified.percent} size="sm" colorScheme="blue" borderRadius="full" />
                  </Box>
                </FadeIn>
                <FadeIn duration={0.5} delay={0.7}>
                  <Box>
                    <Flex justify="space-between" align="center">
                      <Text color={isDark ? 'gray.300' : 'gray.600'} fontSize="md">Pending</Text>
                      <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold">{statsData.verification.pending.count} ({statsData.verification.pending.percent}%)</Text>
                    </Flex>
                    <Progress value={statsData.verification.pending.percent} size="sm" colorScheme="blue" borderRadius="full" />
                  </Box>
                </FadeIn>
                <FadeIn duration={0.5} delay={0.8}>
                  <Box>
                    <Flex justify="space-between" align="center">
                      <Text color={isDark ? 'gray.300' : 'gray.600'} fontSize="md">Disputed</Text>
                      <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold">{statsData.verification.disputed.count} ({statsData.verification.disputed.percent}%)</Text>
                    </Flex>
                    <Progress value={statsData.verification.disputed.percent} size="sm" colorScheme="blue" borderRadius="full" />
                  </Box>
                </FadeIn>
              </VStack>
            </Box>
          </SlideIn>

          {/* Trending Topics Card */}
          <SlideIn direction="up" duration={0.6} delay={0.5}>
            <Box bg={isDark ? '#232B3B' : 'white'} borderRadius="2xl" p={6} w="full">
              <ScaleIn duration={0.5} delay={0.6}>
                <Flex align="center" mb={4}>
                  <Icon as={FiTrendingUp} color={isDark ? 'cyan.400' : 'cyan.600'} mr={2} />
                  <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold" fontSize="lg">Trending Topics</Text>
                </Flex>
              </ScaleIn>
              <VStack align="stretch" spacing={2}>
                <FadeIn duration={0.5} delay={0.7}>
                  <Flex justify="space-between" align="center">
                    <Text color={isDark ? 'gray.300' : 'gray.700'} fontSize="md">Climate Policy</Text>
                    <HStack>
                      <Text color="green.400" fontWeight="bold">1243</Text>
                      <Box as="span" color="green.400" fontSize="xl">•</Box>
                    </HStack>
                  </Flex>
                </FadeIn>
                <FadeIn duration={0.5} delay={0.8}>
                  <Flex justify="space-between" align="center">
                    <Text color={isDark ? 'gray.300' : 'gray.700'} fontSize="md">Economic Summit</Text>
                    <HStack>
                      <Text color="green.400" fontWeight="bold">856</Text>
                      <Box as="span" color="green.400" fontSize="xl">•</Box>
                    </HStack>
                  </Flex>
                </FadeIn>
                <FadeIn duration={0.5} delay={0.9}>
                  <Flex justify="space-between" align="center">
                    <Text color={isDark ? 'gray.300' : 'gray.700'} fontSize="md">Tech Regulations</Text>
                    <HStack>
                      <Text color="red.400" fontWeight="bold">742</Text>
                      <Box as="span" color="red.400" fontSize="xl">•</Box>
                    </HStack>
                  </Flex>
                </FadeIn>
                <FadeIn duration={0.5} delay={1.0}>
                  <Flex justify="space-between" align="center">
                    <Text color={isDark ? 'gray.300' : 'gray.700'} fontSize="md">Healthcare Reform</Text>
                    <HStack>
                      <Text color="green.400" fontWeight="bold">521</Text>
                      <Box as="span" color="green.400" fontSize="xl">•</Box>
                    </HStack>
                  </Flex>
                </FadeIn>
                <FadeIn duration={0.5} delay={1.1}>
                  <Flex justify="space-between" align="center">
                    <Text color={isDark ? 'gray.300' : 'gray.700'} fontSize="md">Election Update</Text>
                    <HStack>
                      <Text color="red.400" fontWeight="bold">498</Text>
                      <Box as="span" color="red.400" fontSize="xl">•</Box>
                    </HStack>
                  </Flex>
                </FadeIn>
              </VStack>
              <Divider borderColor={isDark ? 'gray.700' : 'gray.200'} my={4} />
              <ScaleIn duration={0.5} delay={1.2}>
                <Button variant="link" color={isDark ? 'cyan.400' : 'cyan.600'} rightIcon={<FiChevronRight />} fontWeight="bold" fontSize="md" alignSelf="flex-end">
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