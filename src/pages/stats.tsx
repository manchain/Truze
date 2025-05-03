import React from 'react';
import {
  Box, Text, useColorMode, HStack, VStack, Icon, Progress, Flex, Divider, Button, IconButton
} from '@chakra-ui/react';
import { FiArrowLeft, FiUser } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { BlurIn, SlideIn, ScaleIn, FadeIn } from '../components/magic-ui';

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
    <Box minH="100vh" bg={isDark ? '#101828' : 'gray.50'} px={2} py={4}>
      <Box maxW="container.sm" mx="auto" px={4}>
        <BlurIn>
          <HStack mb={6} align="center">
            <ScaleIn>
              <Icon as={FiArrowLeft} color={isDark ? 'white' : 'gray.700'} fontSize="2xl" cursor="pointer" onClick={() => router.back()} />
            </ScaleIn>
            <ScaleIn>
              <Text color={isDark ? 'white' : 'gray.100'} fontWeight="bold" fontSize="2xl" ml={2}>Back</Text>
            </ScaleIn>
          </HStack>
        </BlurIn>
        <VStack spacing={8}>
          {/* Network Status Card */}
          <SlideIn direction="right">
            <Box bg={isDark ? '#1A2332' : 'white'} borderRadius="2xl" p={6} w="350px" minH="260px" mx="auto">
              <Flex justify="space-between" align="center" mb={2}>
                <Text color={isDark ? 'white' : 'gray.900'} fontWeight="bold" fontSize="lg">Network Status</Text>
                <HStack bg={isDark ? 'rgba(16, 40, 24, 0.5)' : 'green.50'} px={3} py={1} borderRadius="lg">
                  <Box as="span" fontSize="lg" color="green.400" mr={1}>●</Box>
                  <Text color="green.400" fontWeight="bold" fontSize="md">Connected</Text>
                </HStack>
              </Flex>
              <HStack spacing={3} mt={4} mb={1}>
                <Box as="span" fontSize="xl" color={isDark ? 'gray.400' : 'gray.500'}>🗄️</Box>
                <Text color={isDark ? 'gray.400' : 'gray.600'} fontSize="md">Connected Peers</Text>
                <Text color={isDark ? 'white' : 'gray.100'} fontWeight="bold" ml="auto">{statsData.network.peers}</Text>
              </HStack>
              <HStack spacing={3} mb={1}>
                <Box as="span" fontSize="xl" color={isDark ? 'gray.400' : 'gray.500'}>⏰</Box>
                <Text color={isDark ? 'gray.400' : 'gray.600'} fontSize="md">Data Sync</Text>
                <Text color={isDark ? 'white' : 'gray.100'} fontWeight="bold" ml="auto">{statsData.network.sync}%</Text>
              </HStack>
              <Progress value={statsData.network.sync} size="sm" colorScheme="cyan" borderRadius="full" mb={2} />
              <Flex justify="space-between" align="center">
                <Text color={isDark ? 'gray.400' : 'gray.500'} fontSize="sm">Last update</Text>
                <Text color={isDark ? 'white' : 'gray.100'} fontSize="sm">{statsData.network.lastUpdate}</Text>
              </Flex>
            </Box>
          </SlideIn>

          {/* Verification Status Card */}
          <SlideIn direction="left">
            <Box bg={isDark ? '#1A2332' : 'white'} borderRadius="2xl" p={6} w="350px" minH="260px" mx="auto">
              <Flex align="center" mb={4}>
                <Box as="span" fontSize="xl" color={isDark ? 'cyan.400' : 'cyan.600'} mr={2}>🛡️</Box>
                <Text color={isDark ? 'white' : 'gray.900'} fontWeight="bold" fontSize="lg">Verification Status</Text>
              </Flex>
              <VStack align="stretch" spacing={2}>
                <Box>
                  <Flex justify="space-between" align="center">
                    <Text color={isDark ? 'gray.400' : 'gray.600'} fontSize="md">Verified Content</Text>
                    <Text color="green.400" fontWeight="bold">{statsData.verification.verified.count} ({statsData.verification.verified.percent}%)</Text>
                  </Flex>
                  <Progress value={statsData.verification.verified.percent} size="sm" colorScheme="green" borderRadius="full" />
                </Box>
                <Box>
                  <Flex justify="space-between" align="center">
                    <Text color={isDark ? 'gray.400' : 'gray.600'} fontSize="md">Pending Verification</Text>
                    <Text color="orange.300" fontWeight="bold">{statsData.verification.pending.count} ({statsData.verification.pending.percent}%)</Text>
                  </Flex>
                  <Progress value={statsData.verification.pending.percent} size="sm" colorScheme="orange" borderRadius="full" />
                </Box>
                <Box>
                  <Flex justify="space-between" align="center">
                    <Text color={isDark ? 'gray.400' : 'gray.600'} fontSize="md">Disputed Content</Text>
                    <Text color="red.400" fontWeight="bold">{statsData.verification.disputed.count} ({statsData.verification.disputed.percent}%)</Text>
                  </Flex>
                  <Progress value={statsData.verification.disputed.percent} size="sm" colorScheme="red" borderRadius="full" />
                </Box>
              </VStack>
            </Box>
          </SlideIn>

          {/* Trending Topics Card */}
          <SlideIn direction="up">
            <Box bg={isDark ? '#1A2332' : 'white'} borderRadius="2xl" p={6} w="350px" minH="260px" mx="auto">
              <Flex align="center" mb={4}>
                <Box as="span" fontSize="xl" color={isDark ? 'cyan.400' : 'cyan.600'} mr={2}>📈</Box>
                <Text color={isDark ? 'white' : 'gray.900'} fontWeight="bold" fontSize="lg">Trending Topics</Text>
              </Flex>
              <VStack align="stretch" spacing={1} mb={2}>
                <Flex justify="space-between" align="center">
                  <Text color={isDark ? 'gray.400' : 'gray.300'} fontSize="md">Climate Policy</Text>
                  <HStack>
                    <Text color="green.400" fontWeight="bold">1243</Text>
                    <Box as="span" color="green.400" fontSize="xl">•</Box>
                  </HStack>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text color={isDark ? 'gray.400' : 'gray.300'} fontSize="md">Economic Summit</Text>
                  <HStack>
                    <Text color="green.400" fontWeight="bold">856</Text>
                    <Box as="span" color="green.400" fontSize="xl">•</Box>
                  </HStack>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text color={isDark ? 'gray.400' : 'gray.300'} fontSize="md">Tech Regulations</Text>
                  <HStack>
                    <Text color="red.400" fontWeight="bold">742</Text>
                    <Box as="span" color="red.400" fontSize="xl">•</Box>
                  </HStack>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text color={isDark ? 'gray.400' : 'gray.300'} fontSize="md">Healthcare Reform</Text>
                  <HStack>
                    <Text color="green.400" fontWeight="bold">521</Text>
                    <Box as="span" color="green.400" fontSize="xl">•</Box>
                  </HStack>
                </Flex>
                <Flex justify="space-between" align="center">
                  <Text color={isDark ? 'gray.400' : 'gray.300'} fontSize="md">Election Update</Text>
                  <HStack>
                    <Text color="red.400" fontWeight="bold">498</Text>
                    <Box as="span" color="red.400" fontSize="xl">•</Box>
                  </HStack>
                </Flex>
              </VStack>
              <Divider borderColor={isDark ? 'gray.700' : 'gray.200'} my={4} />
              <ScaleIn>
                <Button variant="link" color={isDark ? 'white' : 'cyan.600'} rightIcon={<Box as="span" fontSize="lg">→</Box>} fontWeight="bold" fontSize="md" alignSelf="flex-end">
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