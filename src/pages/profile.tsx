import { Box, Container, Flex, HStack, VStack, Text, Button, Avatar, IconButton, Icon, Textarea, useToast, Spinner, Center } from '@chakra-ui/react';
import React from 'react';
import { FiArrowLeft, FiEdit2, FiHome, FiCheck, FiPieChart, FiUser, FiSave } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { BlurIn, SlideIn, ScaleIn, FadeIn } from '../components/magic-ui';
import { useAuthContext } from './_app';
import Post from '../components/Post';

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
  verificationCount?: number;
  author_address?: string; // Optional since it might not always be returned or we need to check strict types
}

export default function Profile() {
  const router = useRouter();
  const { user, loading } = useAuthContext();
  const toast = useToast();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/verify');
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  const [isEditing, setIsEditing] = useState(false);
  const [bio, setBio] = useState('Blockchain enthusiast. Verifying truth on-chain.');
  const [tempBio, setTempBio] = useState(bio);
  const [userPosts, setUserPosts] = useState<PostData[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  // Initialize with generic data or user data if available
  const displayName = user?.address ? `${user.address.slice(0, 6)}...${user.address.slice(-4)}` : 'Anonymous User';
  const displayHandle = user?.address ? `@${user.address.slice(0, 6)}` : '@anonymous';

  useEffect(() => {
    if (user?.address) {
      fetchUserPosts();
    }
  }, [user?.address]);

  const fetchUserPosts = async () => {
    setLoadingPosts(true);
    try {
      const response = await fetch('/api/posts');
      if (response.ok) {
        const data = await response.json();
        // Filter posts where author_address matches current user
        // Note: API returns 'author_address' (snake_case) from DB, ensure we check that.
        const myPosts = data.filter((post: any) =>
          post.author_address &&
          post.author_address.toLowerCase() === user?.address?.toLowerCase()
        );

        const formattedData = myPosts.map((post: any) => ({
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
        setUserPosts(formattedData);
      }
    } catch (error) {
      console.error('Failed to fetch user posts:', error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
    setTempBio(bio);
  };

  const handleSaveClick = () => {
    setBio(tempBio);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your bio has been successfully updated.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box minH="100vh" bg="brand.deepSpace" pb="100px">
      {/* Header */}
      <BlurIn>
        <Flex
          as="header"
          w="100%"
          px={4}
          py={4}
          alignItems="center"
          justifyContent="space-between"
        >
          <IconButton
            icon={<FiArrowLeft />}
            aria-label="Back"
            variant="ghost"
            color="brand.lavenderMist"
            fontSize="xl"
            _hover={{ bg: 'whiteAlpha.100' }}
            onClick={() => router.back()}
          />
          <Text color="brand.lavenderMist" fontWeight="bold" fontSize="lg">
            Profile
          </Text>
          <Box w={10} /> {/* Spacer for alignment */}
        </Flex>
      </BlurIn>

      {/* Profile Section */}
      <Container maxW="container.sm" pt={4}>
        <SlideIn direction="down">
          <Flex direction="column" align="center" gap={4}>
            <ScaleIn>
              <Box
                p={1}
                borderRadius="full"
                bgGradient="linear(to-tr, brand.synthwaveStart, brand.synthwaveEnd)"
                boxShadow="lg"
              >
                <Avatar
                  size="2xl"
                  name={displayName}
                  src="" // No default image for now
                  borderWidth={4}
                  borderColor="brand.deepSpace"
                  bg="brand.synthwaveStart"
                />
              </Box>
            </ScaleIn>

            <VStack spacing={1} align="center">
              <FadeIn>
                <Text fontWeight="bold" fontSize="2xl" color="brand.lavenderMist">
                  {displayName}
                </Text>
              </FadeIn>
              <FadeIn>
                <Text fontSize="md" color="gray.500">
                  {displayHandle}
                </Text>
              </FadeIn>
            </VStack>

            <FadeIn>
              {isEditing ? (
                <Textarea
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  placeholder="Enter your bio..."
                  size="sm"
                  borderRadius="md"
                  borderColor="brand.blurple"
                  color="brand.lavenderMist"
                  bg="rgba(0,0,0,0.2)"
                  maxW="sm"
                  textAlign="center"
                  _focus={{ borderColor: 'brand.synthwaveEnd', boxShadow: '0 0 0 1px #FF00FF' }}
                />
              ) : (
                <Text textAlign="center" color="gray.400" maxW="sm" px={4} fontSize="sm" lineHeight="1.6">
                  {bio}
                </Text>
              )}
            </FadeIn>

            <HStack spacing={3} mt={2} w="full" px={8} justify="center">
              <SlideIn direction="left">
                {isEditing ? (
                  <Button
                    leftIcon={<FiSave />}
                    bg="brand.acidGreen"
                    color="black"
                    size="sm"
                    borderRadius="lg"
                    fontWeight="bold"
                    px={6}
                    _hover={{ opacity: 0.9 }}
                    onClick={handleSaveClick}
                  >
                    Save Profile
                  </Button>
                ) : (
                  <Button
                    leftIcon={<FiEdit2 />}
                    bg="brand.blurple"
                    color="white"
                    size="sm"
                    borderRadius="lg"
                    fontWeight="bold"
                    px={6}
                    _hover={{ opacity: 0.9 }}
                    onClick={handleEditClick}
                  >
                    Edit Profile
                  </Button>
                )}
              </SlideIn>
            </HStack>
          </Flex>
        </SlideIn>

        {/* Stats Card */}
        <SlideIn direction="up">
          <Box mt={8} mx={4}>
            <Flex
              bg="rgba(255, 255, 255, 0.03)"
              borderRadius="2xl"
              border="1px solid"
              borderColor="whiteAlpha.100"
              p={6}
              justify="space-between"
              align="center"
              boxShadow="lg"
            >
              <VStack spacing={0} align="center" flex={1}>
                <Text fontWeight="bold" fontSize="xl" color="brand.lavenderMist">{userPosts.length}</Text>
                <Text fontSize="xs" color="gray.500" fontWeight="medium">Posts</Text>
              </VStack>
              <Box w="1px" h="40px" bg="whiteAlpha.100" />
              <VStack spacing={0} align="center" flex={1}>
                <Text fontWeight="bold" fontSize="xl" color="brand.lavenderMist">0</Text>
                <Text fontSize="xs" color="gray.500" fontWeight="medium">Followers</Text>
              </VStack>
              <Box w="1px" h="40px" bg="whiteAlpha.100" />
              <VStack spacing={0} align="center" flex={1}>
                <Text fontWeight="bold" fontSize="xl" color="brand.lavenderMist">0</Text>
                <Text fontSize="xs" color="gray.500" fontWeight="medium">Following</Text>
              </VStack>
            </Flex>
          </Box>
        </SlideIn>

        {/* User's Posts Section */}
        <Box mt={8} mx={2}>
          <FadeIn>
            <Text fontSize="lg" fontWeight="bold" color="brand.lavenderMist" mb={4} ml={2}>
              My Posts
            </Text>
          </FadeIn>

          {loadingPosts ? (
            <Center py={10}>
              <Spinner color="brand.blurple" />
            </Center>
          ) : userPosts.length > 0 ? (
            userPosts.map((post, index) => (
              <ScaleIn key={post.id} delay={index * 0.1}>
                <Post {...post} />
              </ScaleIn>
            ))
          ) : (
            <FadeIn>
              <Center py={10} flexDir="column">
                <Text color="gray.500">No posts yet.</Text>
                <Button
                  mt={4}
                  size="sm"
                  variant="outline"
                  borderColor="brand.blurple"
                  color="brand.blurple"
                  onClick={() => router.push('/upload')}
                >
                  Create one now
                </Button>
              </Center>
            </FadeIn>
          )}
        </Box>
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
            <VStack spacing={1} as="button" onClick={() => router.push('/profile')} color="white" _active={{ transform: 'scale(0.95)' }}>
              <Icon as={FiUser} boxSize={5} />
              <Text fontSize="10px" fontWeight="medium">Profile</Text>
            </VStack>
          </ScaleIn>
        </Flex>
      </SlideIn>
    </Box>
  );
}