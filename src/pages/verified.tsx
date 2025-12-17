import { Box, Container, Flex, HStack, VStack, Text, Button, Icon, IconButton, useColorMode, useDisclosure, Image } from '@chakra-ui/react';
import { FiSun, FiMoon, FiSearch, FiMenu, FiHome, FiCheck, FiPieChart, FiUser } from 'react-icons/fi';
import Post from '../components/Post';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { BlurIn, SlideIn, FadeIn, ScaleIn } from '../components/magic-ui';
import NetworkStatusDrawer from '../components/NetworkStatusDrawer';
import { useAuthContext } from './_app';

const verifiedPosts = [
  {
    id: 1,
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
    id: 2,
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
  const { user, loading, logout } = useAuthContext();

  // Redirect to verification page if user is not verified
  useEffect(() => {
    if (!loading && !user) {
      router.push('/verify');
    }
  }, [user, loading, router]);


  const handleLogout = () => {
    logout();
    router.push('/verify');
  };

  if (loading || !user) return null;

  return (
    <Box minH="100vh" bg="brand.deepSpace">
      {/* Header */}
      <BlurIn>
        <Flex
          as="header"
          position="fixed"
          w="100%"
          bg="rgba(13, 13, 21, 0.6)"
          backdropFilter="blur(20px)"
          borderBottom="1px solid rgba(255, 255, 255, 0.05)"
          px={3}
          py={3}
          alignItems="center"
          justifyContent="space-between"
          zIndex={100}
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
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
                onClick={toggleColorMode}
              />
            </ScaleIn>
            <ScaleIn>
              <IconButton
                aria-label="Search"
                icon={<FiSearch />}
                variant="ghost"
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
              />
            </ScaleIn>
            <ScaleIn>
              <IconButton
                aria-label="Menu"
                icon={<FiMenu />}
                variant="ghost"
                color="white"
                _hover={{ bg: 'whiteAlpha.200' }}
                onClick={onOpen}
              />
            </ScaleIn>
          </HStack>
        </Flex>
      </BlurIn>

      {/* Navigation Tabs */}
      <SlideIn direction="down">
        <Box pt="100px" px={3} pb={3} bg="brand.deepSpace">
          <Flex align="center" justify="space-between">
            <HStack spacing={0} bg="rgba(255, 255, 255, 0.05)" borderRadius="md" p={1} boxShadow="inner">
              <Button
                variant="ghost"
                color="gray.400"
                bg="transparent"
                _active={{ bg: 'brand.blurple', color: 'white' }}
                _hover={{ bg: 'whiteAlpha.100' }}
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
                color="brand.lavenderMist"
                bg="transparent"
                _active={{ bg: 'brand.blurple', color: 'white' }}
                _hover={{ bg: 'whiteAlpha.100' }}
                size="sm"
                borderRadius="md"
                fontWeight="normal"
                px={4}
                boxShadow="none"
              >
                Verified
              </Button>
            </HStack>
            <Button
              bgGradient="linear(to-r, brand.synthwaveStart, brand.synthwaveEnd)"
              color="white"
              size="sm"
              borderRadius="xl"
              fontWeight="bold"
              ml={3}
              px={5}
              boxShadow="lg"
              _hover={{ opacity: 0.9 }}
              onClick={handleLogout}
            >
              Disconnect
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
          bottom={4}
          left="50%"
          transform="translateX(-50%)"
          w="95%"
          maxW="container.sm"
          bg="brand.blurple"
          py={2}
          px={6}
          justifyContent="space-between"
          borderRadius="2xl"
          boxShadow="2xl"
          zIndex={10}
        >
          <ScaleIn>
            <VStack spacing={1} as="button" onClick={() => router.push('/')} color="gray.300" _hover={{ color: 'white' }} _active={{ transform: 'scale(0.95)' }}>
              <Icon as={FiHome} boxSize={5} />
              <Text fontSize="10px" fontWeight="medium">Home</Text>
            </VStack>
          </ScaleIn>

          <ScaleIn>
            <VStack spacing={1} as="button" onClick={() => router.push('/verified')} color="white" _active={{ transform: 'scale(0.95)' }}>
              <Icon as={FiCheck} boxSize={5} />
              <Text fontSize="10px" fontWeight="medium">Verified</Text>
            </VStack>
          </ScaleIn>

          <ScaleIn>
            <VStack
              spacing={0}
              as="button"
              onClick={() => router.push('/upload')}
              color="brand.acidGreen"
              bg="rgba(0,0,0,0.2)"
              p={2}
              mt={-8}
              borderRadius="full"
              boxShadow="lg"
              _active={{ transform: 'scale(0.95)' }}
            >
              <Box fontSize="32px" fontWeight="bold" lineHeight="1" mt={-1}>+</Box>
            </VStack>
          </ScaleIn>

          <ScaleIn>
            <VStack spacing={1} as="button" onClick={() => router.push('/stats')} color="gray.300" _hover={{ color: 'white' }} _active={{ transform: 'scale(0.95)' }}>
              <Icon as={FiPieChart} boxSize={5} />
              <Text fontSize="10px" fontWeight="medium">Stats</Text>
            </VStack>
          </ScaleIn>

          <ScaleIn>
            <VStack spacing={1} as="button" onClick={() => router.push('/profile')} color="gray.300" _hover={{ color: 'white' }} _active={{ transform: 'scale(0.95)' }}>
              <Icon as={FiUser} boxSize={5} />
              <Text fontSize="10px" fontWeight="medium">Profile</Text>
            </VStack>
          </ScaleIn>
        </Flex>
      </SlideIn>

      {/* Render the NetworkStatusDrawer */}
      <NetworkStatusDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}