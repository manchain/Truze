import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, Textarea, Text, VStack, useColorMode, IconButton, HStack } from '@chakra-ui/react';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { BlurIn, SlideIn, ScaleIn, FadeIn } from '../components/magic-ui';

const Upload = () => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const isDark = colorMode === 'dark';

  return (
    <Box minH="100vh" bg={isDark ? '#151C28' : 'gray.50'} px={2} py={4}>
      <Box maxW="container.sm" mx="auto">
        <BlurIn duration={0.8} delay={0.2}>
          <HStack mb={6} align="center">
            <ScaleIn duration={0.5} delay={0.4}>
              <IconButton
                icon={<FiArrowLeft />}
                aria-label="Back"
                variant="ghost"
                color={isDark ? 'white' : 'gray.700'}
                fontSize="xl"
                onClick={() => router.back()}
              />
            </ScaleIn>
            <ScaleIn duration={0.5} delay={0.5}>
              <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold" fontSize="lg">Back</Text>
            </ScaleIn>
          </HStack>
        </BlurIn>
        <SlideIn direction="right" duration={0.6} delay={0.3}>
          <Box
            bg={isDark ? '#232B3B' : 'white'}
            borderRadius="2xl"
            p={6}
            boxShadow={isDark ? 'none' : 'md'}
          >
            <VStack align="stretch" spacing={5}>
              <ScaleIn duration={0.5} delay={0.4}>
                <Box>
                  <Text color={isDark ? 'white' : 'gray.800'} fontWeight="bold" fontSize="2xl" mb={1}>
                    Upload News Article
                  </Text>
                  <Text color={isDark ? 'gray.400' : 'gray.500'} fontSize="md">
                    Create and share verified news content with the network
                  </Text>
                </Box>
              </ScaleIn>
              <SlideIn direction="left" duration={0.5} delay={0.5}>
                <FormControl>
                  <FormLabel color={isDark ? 'white' : 'gray.800'} fontWeight="bold" fontSize="md" mb={1}>Title</FormLabel>
                  <FadeIn duration={0.5} delay={0.6}>
                    <Input
                      placeholder="Enter article title"
                      bg={isDark ? 'transparent' : 'white'}
                      borderColor={isDark ? 'cyan.700' : 'cyan.400'}
                      color={isDark ? 'gray.200' : 'gray.800'}
                      _placeholder={{ color: isDark ? 'gray.500' : 'gray.400' }}
                      borderWidth={2}
                      borderRadius="lg"
                      mb={1}
                      _focus={{ borderColor: 'cyan.400' }}
                    />
                  </FadeIn>
                  <FadeIn duration={0.5} delay={0.7}>
                    <Text color={isDark ? 'gray.400' : 'gray.500'} fontSize="sm">
                      A clear and concise title for your article
                    </Text>
                  </FadeIn>
                </FormControl>
              </SlideIn>
              <SlideIn direction="right" duration={0.5} delay={0.6}>
                <FormControl>
                  <FormLabel color={isDark ? 'white' : 'gray.800'} fontWeight="bold" fontSize="md" mb={1}>Content</FormLabel>
                  <FadeIn duration={0.5} delay={0.7}>
                    <Textarea
                      placeholder="Write your article content here"
                      bg={isDark ? 'transparent' : 'white'}
                      borderColor={isDark ? 'cyan.700' : 'cyan.400'}
                      color={isDark ? 'gray.200' : 'gray.800'}
                      _placeholder={{ color: isDark ? 'gray.500' : 'gray.400' }}
                      borderWidth={2}
                      borderRadius="lg"
                      minH="120px"
                      mb={1}
                      _focus={{ borderColor: 'cyan.400' }}
                    />
                  </FadeIn>
                </FormControl>
              </SlideIn>
              <SlideIn direction="left" duration={0.5} delay={0.7}>
                <FormControl>
                  <FormLabel color={isDark ? 'white' : 'gray.800'} fontWeight="bold" fontSize="md" mb={1}>Tags</FormLabel>
                  <FadeIn duration={0.5} delay={0.8}>
                    <Input
                      placeholder="Enter tags separated by comma"
                      bg={isDark ? 'transparent' : 'white'}
                      borderColor={isDark ? 'cyan.700' : 'cyan.400'}
                      color={isDark ? 'gray.200' : 'gray.800'}
                      _placeholder={{ color: isDark ? 'gray.500' : 'gray.400' }}
                      borderWidth={2}
                      borderRadius="lg"
                      mb={1}
                      _focus={{ borderColor: 'cyan.400' }}
                    />
                  </FadeIn>
                  <FadeIn duration={0.5} delay={0.9}>
                    <Text color={isDark ? 'gray.400' : 'gray.500'} fontSize="sm">
                      Help others discover your article
                    </Text>
                  </FadeIn>
                </FormControl>
              </SlideIn>
              <ScaleIn duration={0.5} delay={1.0}>
                <Button
                  leftIcon={<FiUpload />}
                  colorScheme="cyan"
                  bg={isDark ? '#0596B7' : 'cyan.500'}
                  color="white"
                  size="lg"
                  borderRadius="lg"
                  fontWeight="bold"
                  fontSize="lg"
                  mt={2}
                  _hover={{ bg: isDark ? '#038ca6' : 'cyan.600' }}
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