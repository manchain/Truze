import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Text, VStack, useColorMode, IconButton, HStack, useToast } from '@chakra-ui/react';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { BlurIn, SlideIn, ScaleIn, FadeIn } from '../components/magic-ui';
import { useAuthContext } from './_app';

const Upload = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const isDark = colorMode === 'dark';
  const toast = useToast();
  const { user, loading } = useAuthContext();

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/verify');
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpload = async () => {
    if (!title || !content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          content,
          tags,
          author: user?.address ? `${user.address.slice(0, 6)}...${user.address.slice(-4)}` : 'Anonymous',
          authorAddress: user?.address
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload article');
      }

      toast({
        title: "Success",
        description: "Article uploaded successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      router.push('/');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to upload article",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box minH="100vh" bg="brand.deepSpace" px={2} py={4}>
      <Box maxW="container.sm" mx="auto">
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
              <Text color="brand.lavenderMist" fontWeight="bold" fontSize="lg">Back</Text>
            </ScaleIn>
          </HStack>
        </BlurIn>
        <SlideIn direction="right">
          <Box
            bg="rgba(255, 255, 255, 0.03)" // Slight transparent background for card
            borderRadius="2xl"
            p={6}
            boxShadow="lg"
            border="1px solid"
            borderColor="whiteAlpha.100"
          >
            <VStack align="stretch" spacing={5}>
              <ScaleIn>
                <Box>
                  <Text color="brand.lavenderMist" fontWeight="bold" fontSize="2xl" mb={1}>
                    Upload News Article
                  </Text>
                  <Text color="gray.400" fontSize="md">
                    Create and share verified news content with the network
                  </Text>
                </Box>
              </ScaleIn>
              <SlideIn direction="left">
                <FormControl isRequired>
                  <FormLabel color="brand.lavenderMist" fontWeight="bold" fontSize="md" mb={1}>Title</FormLabel>
                  <FadeIn>
                    <Input
                      placeholder="Enter article title"
                      bg="rgba(0, 0, 0, 0.2)"
                      borderColor="brand.blurple"
                      color="brand.lavenderMist"
                      _placeholder={{ color: 'gray.500' }}
                      borderWidth={1}
                      borderRadius="lg"
                      mb={1}
                      _focus={{ borderColor: 'brand.synthwaveEnd', boxShadow: '0 0 0 1px #FF00FF' }}
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </FadeIn>
                  <FadeIn>
                    <Text color="gray.500" fontSize="sm">
                      A clear and concise title for your article
                    </Text>
                  </FadeIn>
                </FormControl>
              </SlideIn>
              <SlideIn direction="right">
                <FormControl isRequired>
                  <FormLabel color="brand.lavenderMist" fontWeight="bold" fontSize="md" mb={1}>Content</FormLabel>
                  <FadeIn>
                    <Textarea
                      placeholder="Write your article content here"
                      bg="rgba(0, 0, 0, 0.2)"
                      borderColor="brand.blurple"
                      color="brand.lavenderMist"
                      _placeholder={{ color: 'gray.500' }}
                      borderWidth={1}
                      borderRadius="lg"
                      minH="120px"
                      mb={1}
                      _focus={{ borderColor: 'brand.synthwaveEnd', boxShadow: '0 0 0 1px #FF00FF' }}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    />
                  </FadeIn>
                </FormControl>
              </SlideIn>
              <SlideIn direction="left">
                <FormControl>
                  <FormLabel color="brand.lavenderMist" fontWeight="bold" fontSize="md" mb={1}>Tags</FormLabel>
                  <FadeIn>
                    <Input
                      placeholder="Enter tags separated by comma"
                      bg="rgba(0, 0, 0, 0.2)"
                      borderColor="brand.blurple"
                      color="brand.lavenderMist"
                      _placeholder={{ color: 'gray.500' }}
                      borderWidth={1}
                      borderRadius="lg"
                      mb={1}
                      _focus={{ borderColor: 'brand.synthwaveEnd', boxShadow: '0 0 0 1px #FF00FF' }}
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                    />
                  </FadeIn>
                  <FadeIn>
                    <Text color="gray.500" fontSize="sm">
                      Help others discover your article
                    </Text>
                  </FadeIn>
                </FormControl>
              </SlideIn>
              <ScaleIn>
                <Button
                  leftIcon={<FiUpload />}
                  bgGradient="linear(to-r, brand.synthwaveStart, brand.synthwaveEnd)"
                  color="white"
                  size="lg"
                  borderRadius="lg"
                  fontWeight="bold"
                  fontSize="lg"
                  mt={2}
                  _hover={{ opacity: 0.9, transform: 'translateY(-1px)' }}
                  _active={{ transform: 'translateY(1px)' }}
                  onClick={handleUpload}
                  isLoading={isSubmitting}
                  loadingText="Publishing..."
                >
                  Publish Article
                </Button>
              </ScaleIn>
            </VStack>
          </Box>
        </SlideIn>
      </Box>
    </Box>
  );
};

export default Upload;