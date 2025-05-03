import { Box, Container, Flex, HStack, IconButton, Button, Avatar, Text, VStack, useColorMode } from '@chakra-ui/react';
import { FiSun, FiMoon, FiSearch, FiMenu, FiHome, FiCheck, FiPieChart, FiUser, FiEdit2, FiSettings } from 'react-icons/fi';
import { BlurIn, SlideIn, ScaleIn } from '../components/magic-ui';
import { useRouter } from 'next/router';

export default function Profile() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  return (
    <Box minH="100vh" bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}>
      {/* Header */}
      <BlurIn>
        <Flex
          as="header"
          position="fixed"
          w="100%"
          bg={colorMode === 'dark' ? 'gray.800' : 'white'}
          px={3}
          py={1}
          alignItems="center"
          justifyContent="space-between"
          zIndex={10}
          boxShadow="sm"
        >
          <ScaleIn>
            <Box color={colorMode === 'dark' ? 'white' : 'gray.800'} fontWeight="bold">
              logo.
            </Box>
          </ScaleIn>
          <HStack>
            <ScaleIn>
              <IconButton
                aria-label="Toggle color mode"
                icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
                variant="ghost"
                color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
                onClick={toggleColorMode}
              />
            </ScaleIn>
            <ScaleIn>
              <IconButton
                aria-label="Search"
                icon={<FiSearch />}
                variant="ghost"
                color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
              />
            </ScaleIn>
            <ScaleIn>
              <IconButton
                aria-label="Menu"
                icon={<FiMenu />}
                variant="ghost"
                color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
              />
            </ScaleIn>
          </HStack>
        </Flex>
      </BlurIn>

      {/* Profile Section */}
      <Container maxW="container.sm" pt="80px" pb={4}>
        <SlideIn direction="down">
          <Flex align="center" direction="column" gap={4}>
            <Avatar size="2xl" name="Andrew Tate" src="/avatars/andrew.png" boxShadow="lg" />
            <VStack spacing={0} align="center">
              <Text fontWeight="bold" fontSize="2xl" color={colorMode === 'dark' ? 'white' : 'gray.800'}>
                Andrew Tate
              </Text>
              <Text fontSize="md" color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
                @andrewtate
              </Text>
            </VStack>
            <Text textAlign="center" color={colorMode === 'dark' ? 'gray.300' : 'gray.700'} maxW="sm">
              Climate advocate. Entrepreneur. Sharing news and insights on global policy and innovation.
            </Text>
            <HStack spacing={4} mt={2}>
              <Button leftIcon={<FiEdit2 />} colorScheme="cyan" size="sm" borderRadius="md" fontWeight="bold">
                Edit Profile
              </Button>
              <Button leftIcon={<FiSettings />} variant="outline" colorScheme="cyan" size="sm" borderRadius="md">
                Settings
              </Button>
            </HStack>
          </Flex>
        </SlideIn>
        {/* Stats Card */}
        <SlideIn direction="up">
          <Flex mt={8} bg={colorMode === 'dark' ? 'gray.800' : 'white'} borderRadius="lg" boxShadow="md" p={6} justify="space-around" align="center">
            <VStack spacing={0} align="center">
              <Text fontWeight="bold" fontSize="lg" color={colorMode === 'dark' ? 'white' : 'gray.800'}>53</Text>
              <Text fontSize="sm" color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>Posts</Text>
            </VStack>
            <VStack spacing={0} align="center">
              <Text fontWeight="bold" fontSize="lg" color={colorMode === 'dark' ? 'white' : 'gray.800'}>1.2k</Text>
              <Text fontSize="sm" color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>Followers</Text>
            </VStack>
            <VStack spacing={0} align="center">
              <Text fontWeight="bold" fontSize="lg" color={colorMode === 'dark' ? 'white' : 'gray.800'}>180</Text>
              <Text fontSize="sm" color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>Following</Text>
            </VStack>
          </Flex>
        </SlideIn>
      </Container>

      {/* Bottom Navigation */}
      <SlideIn direction="up">
        <Flex
          position="fixed"
          bottom={2}
          left="50%"
          transform="translateX(-50%)"
          w="95%"
          maxW="container.sm"
          bg={colorMode === 'dark' ? 'teal.600' : 'teal.500'}
          py={2}
          px={4}
          justifyContent="space-between"
          borderRadius="full"
          boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
          zIndex={10}
        >
          <ScaleIn>
            <IconButton
              aria-label="Home"
              icon={<Box as={FiHome} boxSize={6} />}
              variant="ghost"
              color="white"
              _hover={{ bg: colorMode === 'dark' ? 'teal.500' : 'teal.600' }}
              borderRadius="full"
              onClick={() => router.push('/')}
            />
          </ScaleIn>
          <ScaleIn>
            <IconButton
              aria-label="Verified"
              icon={<Box as={FiCheck} boxSize={6} />}
              variant="ghost"
              color="white"
              _hover={{ bg: colorMode === 'dark' ? 'teal.500' : 'teal.600' }}
              borderRadius="full"
              onClick={() => router.push('/stats')}
            />
          </ScaleIn>
          <ScaleIn>
            <IconButton
              aria-label="New Post"
              icon={<Box fontSize="32px" fontWeight="bold">+</Box>}
              variant="ghost"
              color="white"
              _hover={{ bg: colorMode === 'dark' ? 'teal.500' : 'teal.600' }}
              borderRadius="full"
              onClick={() => router.push('/upload')}
            />
          </ScaleIn>
          <ScaleIn>
            <IconButton
              aria-label="Analytics"
              icon={<Box as={FiPieChart} boxSize={6} />}
              variant="ghost"
              color="white"
              _hover={{ bg: colorMode === 'dark' ? 'teal.500' : 'teal.600' }}
              borderRadius="full"
              onClick={() => router.push('/stats')}
            />
          </ScaleIn>
          <ScaleIn>
            <IconButton
              aria-label="Profile"
              icon={<Box as={FiUser} boxSize={6} />}
              variant="solid"
              colorScheme="cyan"
              bg={colorMode === 'dark' ? 'cyan.400' : 'cyan.300'}
              color={colorMode === 'dark' ? 'gray.900' : 'white'}
              borderRadius="full"
              boxShadow="md"
              isActive
            />
          </ScaleIn>
        </Flex>
      </SlideIn>
    </Box>
  );
} 