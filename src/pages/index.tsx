import { Box, Container, Flex, HStack, IconButton, Button, useColorMode, useDisclosure, Image, VStack, Icon, Text } from '@chakra-ui/react';
import { FiSun, FiMoon, FiSearch, FiMenu, FiHome, FiCheck, FiPieChart, FiUser } from 'react-icons/fi';
import Post from '../components/Post';
import { useRouter } from 'next/router';
import { BlurIn, SlideIn, FadeIn, ScaleIn } from '../components/magic-ui';
import NetworkStatusDrawer from '../components/NetworkStatusDrawer';
import { useEffect, useState } from 'react';
import { useAuthContext } from './_app';
import { usePrivy } from '@privy-io/react-auth';

interface PostData {
  id: number;
  author: string;
  avatar: string;
  timestamp: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: number;
  status: 'Verified' | 'Pending' | 'Disputed';
  verificationCount: number;
}

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, loading, logout } = useAuthContext();
  const { ready, authenticated, logout: privyLogout } = usePrivy();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Redirect to verification page if user is not verified
  useEffect(() => {
    if (!loading && !user) {
      router.push('/verify');
    }
  }, [user, loading, router]);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        if (response.ok) {
          const data = await response.json();
          // Transform/format dates if necessary, though API now returns formatted string or ISO
          // API returns Supabase rows, we might need to map fields if they are snake_case
          const formattedData = data.map((post: any) => ({
            id: post.id,
            author: post.author,
            avatar: post.avatar,
            timestamp: new Date(post.timestamp).toLocaleString(),
            title: post.title,
            content: post.content,
            tags: post.tags,
            likes: post.likes,
            comments: post.comments,
            status: post.status,
            verificationCount: post.verification_count || 0
          }));
          setPosts(formattedData);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, []);

  // Render loading state or redirect if not authenticated
  if (loading || !user) {
    return null; // Or a loading spinner
  }

  const handleLogout = async () => {
    if (authenticated && ready) {
      await privyLogout();
    }
    logout();
    router.push('/verify');
  };

  return (
    <Box minH="100vh" bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}>
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
                Feed
              </Button>
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
        {posts.map((post, index) => (
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
            <VStack spacing={1} as="button" onClick={() => router.push('/')} color="white" _active={{ transform: 'scale(0.95)' }}>
              <Icon as={FiHome} boxSize={5} />
              <Text fontSize="10px" fontWeight="medium">Home</Text>
            </VStack>
          </ScaleIn>

          <ScaleIn>
            <VStack spacing={1} as="button" onClick={() => router.push('/verified')} color="gray.300" _hover={{ color: 'white' }} _active={{ transform: 'scale(0.95)' }}>
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