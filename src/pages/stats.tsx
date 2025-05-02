import React from 'react';
import {
  Box, Text, useColorMode, HStack, VStack, Icon, Progress, Flex, Divider, Button
} from '@chakra-ui/react';
import { FiArrowLeft, FiWifi, FiDatabase, FiClock, FiShield, FiTrendingUp, FiChevronRight } from 'react-icons/fi';
import { useRouter } from 'next/router';

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
        <HStack mb={6} align="center">
          <Icon as={FiArrowLeft} color={isDark ? 'white' : 'gray.700'} fontSize="xl" cursor="pointer" onClick={() => router.back()} />
          <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold" fontSize="lg">Back</Text>
        </HStack>
        <VStack spacing={6}>
          {/* Network Status Card */}
          <Box bg={isDark ? '#232B3B' : 'white'} borderRadius="2xl" p={6} w="full">
            <Flex justify="space-between" align="center" mb={2}>
              <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold" fontSize="lg">Network Status</Text>
              <HStack bg={isDark ? 'rgba(39, 60, 48, 0.5)' : 'green.50'} px={3} py={1} borderRadius="lg">
                <Icon as={FiWifi} color="green.400" />
                <Text color="green.400" fontWeight="bold" fontSize="md">Connected</Text>
              </HStack>
            </Flex>
            <HStack spacing={4} mb={2} mt={4}>
              <HStack spacing={2} flex={1}>
                <Icon as={FiDatabase} color={isDark ? 'gray.400' : 'gray.500'} />
                <Text color={isDark ? 'gray.300' : 'gray.600'} fontSize="md">Connected Peers</Text>
              </HStack>
              <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold">{statsData.network.peers}</Text>
            </HStack>
            <HStack spacing={4} mb={2}>
              <HStack spacing={2} flex={1}>
                <Icon as={FiClock} color={isDark ? 'gray.400' : 'gray.500'} />
                <Text color={isDark ? 'gray.300' : 'gray.600'} fontSize="md">Data Sync</Text>
              </HStack>
              <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold">{statsData.network.sync}%</Text>
            </HStack>
            <Progress value={statsData.network.sync} size="sm" colorScheme="cyan" borderRadius="full" mb={2} />
            <Flex justify="space-between" align="center">
              <Text color={isDark ? 'gray.400' : 'gray.500'} fontSize="sm">Last update</Text>
              <Text color={isDark ? 'white' : 'gray.800'} fontSize="sm">{statsData.network.lastUpdate}</Text>
            </Flex>
          </Box>

          {/* Verification Status Card */}
          <Box bg={isDark ? '#232B3B' : 'white'} borderRadius="2xl" p={6} w="full">
            <Flex align="center" mb={4}>
              <Icon as={FiShield} color={isDark ? 'cyan.400' : 'cyan.600'} mr={2} />
              <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold" fontSize="lg">Verification Status</Text>
            </Flex>
            <VStack align="stretch" spacing={2}>
              <Box>
                <Flex justify="space-between" align="center">
                  <Text color={isDark ? 'gray.300' : 'gray.600'} fontSize="md">Verified Content</Text>
                  <Text color="green.400" fontWeight="bold">{statsData.verification.verified.count} ({statsData.verification.verified.percent}%)</Text>
                </Flex>
                <Progress value={statsData.verification.verified.percent} size="sm" colorScheme="green" borderRadius="full" mb={1} />
              </Box>
              <Box>
                <Flex justify="space-between" align="center">
                  <Text color={isDark ? 'gray.300' : 'gray.600'} fontSize="md">Pending Verification</Text>
                  <Text color="orange.300" fontWeight="bold">{statsData.verification.pending.count} ({statsData.verification.pending.percent}%)</Text>
                </Flex>
                <Progress value={statsData.verification.pending.percent} size="sm" colorScheme="orange" borderRadius="full" mb={1} />
              </Box>
              <Box>
                <Flex justify="space-between" align="center">
                  <Text color={isDark ? 'gray.300' : 'gray.600'} fontSize="md">Disputed Content</Text>
                  <Text color="red.400" fontWeight="bold">{statsData.verification.disputed.count} ({statsData.verification.disputed.percent}%)</Text>
                </Flex>
                <Progress value={statsData.verification.disputed.percent} size="sm" colorScheme="red" borderRadius="full" mb={1} />
              </Box>
            </VStack>
          </Box>

          {/* Trending Topics Card */}
          <Box bg={isDark ? '#232B3B' : 'white'} borderRadius="2xl" p={6} w="full">
            <Flex align="center" mb={4}>
              <Icon as={FiTrendingUp} color={isDark ? 'cyan.400' : 'cyan.600'} mr={2} />
              <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold" fontSize="lg">Trending Topics</Text>
            </Flex>
            <VStack align="stretch" spacing={2} mb={2}>
              {statsData.trending.map((topic, idx) => (
                <Flex key={topic.label} justify="space-between" align="center">
                  <Text color={isDark ? 'gray.300' : 'gray.700'} fontSize="md">{topic.label}</Text>
                  <HStack>
                    <Text color={topic.color} fontWeight="bold">{topic.value}</Text>
                    <Box as="span" color={topic.color} fontSize="xl">•</Box>
                  </HStack>
                </Flex>
              ))}
            </VStack>
            <Divider borderColor={isDark ? 'gray.700' : 'gray.200'} mb={2} />
            <Button variant="link" color={isDark ? 'cyan.400' : 'cyan.600'} rightIcon={<FiChevronRight />} fontWeight="bold" fontSize="md" alignSelf="flex-end">
              See All Topics
            </Button>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default Stats; 