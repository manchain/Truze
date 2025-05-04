import { Box, Container, Flex, HStack, IconButton, Button, useColorMode, useDisclosure, Image } from '@chakra-ui/react';
import { FiSun, FiMoon, FiSearch, FiMenu, FiHome, FiCheck, FiPieChart, FiUser } from 'react-icons/fi';
import Post from '../components/Post';
import { useRouter } from 'next/router';
import { BlurIn, SlideIn, FadeIn, ScaleIn } from '../components/magic-ui';
import NetworkStatusDrawer from '../components/NetworkStatusDrawer';

const verifiedPosts = [
  {
    author: "Andrew Tate",
    avatar: "/avatars/andrew.png",
    timestamp: "Apr 13, 2025, 02:45 PM",
    title: "Global Climate Summit Reaches Historic Agreement on Emissions",
    content: "Representatives from 195 countries have agreed on a landmark deal to reduce carbon emissions by 50% by 2030, setting an ambitious target for climate action",
    tags: ["Climate", "International", "Policy"],
    likes: 59,
    comments: 7,
    status: "Verified" as const,
    verificationCount: 53
  },
  {
    author: "Elon Musk",
    avatar: "/avatars/elon.png",
    timestamp: "Apr 12, 2025, 10:30 AM",
    title: "Tesla Achieves Breakthrough in Battery Technology",
    content: "Tesla announces new battery technology that doubles energy density while reducing production costs by 30%",
    tags: ["Technology", "Energy", "Innovation"],
    likes: 89,
    comments: 12,
    status: "Verified" as const,
    verificationCount: 78
  }
];

export default function Verified() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <Box>
              <Image src="/logo.png" alt="Logo" height="50px" />
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
                onClick={onOpen}
              />
            </ScaleIn>
          </HStack>
        </Flex>
      </BlurIn>

      {/* Navigation Tabs */}
      <SlideIn direction="down">
        <Box pt="56px" px={3} pb={3} bg={colorMode === 'dark' ? 'gray.800' : 'gray.900'}>
          <Flex align="center" justify="space-between">
            <HStack spacing={0} bg={colorMode === 'dark' ? 'gray.900' : 'gray.100'} borderRadius="md" p={1} boxShadow="sm">
              <Button 
                variant="ghost"
                color={colorMode === 'dark' ? 'white' : 'gray.800'}
                bg="transparent"
                _active={{ bg: colorMode === 'dark' ? 'gray.800' : 'white' }}
                _hover={{ bg: colorMode === 'dark' ? 'gray.800' : 'white' }}
                size="sm"
                borderRadius="md"
                fontWeight="normal"
                px={4}
                boxShadow="none"
                onClick={() => router.push('/')}
              >
                Feed
              </Button>
              <Button 
                variant="ghost"
                color={colorMode === 'dark' ? 'white' : 'gray.800'}
                bg={colorMode === 'dark' ? 'gray.800' : 'white'}
                _active={{ bg: colorMode === 'dark' ? 'gray.700' : 'gray.200' }}
                _hover={{ bg: colorMode === 'dark' ? 'gray.700' : 'gray.200' }}
                size="sm"
                borderRadius="md"
                fontWeight="normal"
                px={4}
                boxShadow="none"
              >
                Verified
              </Button>
            </HStack>
            <Button colorScheme="cyan" size="sm" borderRadius="xl" fontWeight="bold" ml={3} px={5} boxShadow="md">
              Connect
            </Button>
          </Flex>
        </Box>
      </SlideIn>

      {/* Main Content */}
      <Container maxW="container.sm" pt={2} pb={12}>
        {verifiedPosts.map((post, index) => (
          <FadeIn key={index}>
            <Post {...post} />
          </FadeIn>
        ))}
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
              variant="ghost"
              color="white"
              _hover={{ bg: colorMode === 'dark' ? 'teal.500' : 'teal.600' }}
              borderRadius="full"
              onClick={() => router.push('/profile')}
            />
          </ScaleIn>
        </Flex>
      </SlideIn>

      {/* Render the NetworkStatusDrawer */}
      <NetworkStatusDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  );
} 