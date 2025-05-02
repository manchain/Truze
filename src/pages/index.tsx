import { Box, Container, Flex, HStack, IconButton, Button, useColorMode } from '@chakra-ui/react';
import { FiSun, FiMoon, FiSearch, FiMenu, FiHome, FiCheck, FiPieChart, FiUser } from 'react-icons/fi';
import Post from '../components/Post';
import { useRouter } from 'next/router';

const samplePosts = [
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
    author: "Chris Hamburger",
    avatar: "/avatars/chris.png",
    timestamp: "Apr 13, 2025, 02:45 PM",
    title: "New Tech Regulation Framework Proposed by Coalition of Nations",
    content: "A multinational coalition has proposed comprehensive legislation for regulating artificial intelligence and data privacy across borders",
    tags: ["Climate", "International", "Policy"],
    likes: 59,
    comments: 7,
    status: "Pending" as const
  },
  {
    author: "Charli xcx",
    avatar: "/avatars/charli.png",
    timestamp: "Apr 13, 2025, 02:45 PM",
    title: "Healthcare Reform Bill faces challenges in Legislative Session",
    content: "The Proposed healthcare reform bill is encountering significant opposition as it moves through committee revies before final vote",
    tags: ["Climate", "International", "Policy"],
    likes: 59,
    comments: 7,
    status: "Disputed" as const
  }
];

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();

  return (
    <Box minH="100vh" bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}>
      {/* Header */}
      <Flex
        as="header"
        position="fixed"
        w="100%"
        bg={colorMode === 'dark' ? 'gray.800' : 'white'}
        px={4}
        py={2}
        alignItems="center"
        justifyContent="space-between"
        zIndex={10}
        boxShadow="sm"
      >
        <Box color={colorMode === 'dark' ? 'white' : 'gray.800'} fontWeight="bold">
          logo.
        </Box>
        <HStack>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
            variant="ghost"
            color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
            onClick={toggleColorMode}
          />
          <IconButton
            aria-label="Search"
            icon={<FiSearch />}
            variant="ghost"
            color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
          />
          <IconButton
            aria-label="Menu"
            icon={<FiMenu />}
            variant="ghost"
            color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
          />
        </HStack>
      </Flex>

      {/* Navigation Tabs */}
      <Box pt="60px" px={4} pb={2} bg={colorMode === 'dark' ? 'gray.900' : 'gray.50'}>
        <HStack spacing={4}>
          <Button 
            variant="ghost" 
            color={colorMode === 'dark' ? 'white' : 'gray.800'} 
            size="sm"
          >
            Feed
          </Button>
          <Button 
            variant="ghost" 
            color={colorMode === 'dark' ? 'white' : 'gray.800'} 
            size="sm"
          >
            Verified
          </Button>
          <Button colorScheme="teal" size="sm" ml="auto">
            Connect
          </Button>
        </HStack>
      </Box>

      {/* Main Content */}
      <Container maxW="container.sm" pt={4} pb={20}>
        {samplePosts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </Container>

      {/* Bottom Navigation */}
      <Flex
        position="fixed"
        bottom={4}
        left="50%"
        transform="translateX(-50%)"
        w="90%"
        maxW="container.sm"
        bg={colorMode === 'dark' ? 'teal.600' : 'teal.500'}
        py={3}
        px={6}
        justifyContent="space-between"
        borderRadius="full"
        boxShadow="0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        zIndex={10}
      >
        <IconButton
          aria-label="Home"
          icon={<Box as={FiHome} boxSize={6} />}
          variant="ghost"
          color="white"
          _hover={{ bg: colorMode === 'dark' ? 'teal.500' : 'teal.600' }}
          borderRadius="full"
        />
        <IconButton
          aria-label="Verified"
          icon={<Box as={FiCheck} boxSize={6} />}
          variant="ghost"
          color="white"
          _hover={{ bg: colorMode === 'dark' ? 'teal.500' : 'teal.600' }}
          borderRadius="full"
        />
        <IconButton
          aria-label="New Post"
          icon={<Box fontSize="32px" fontWeight="bold">+</Box>}
          variant="ghost"
          color="white"
          _hover={{ bg: colorMode === 'dark' ? 'teal.500' : 'teal.600' }}
          borderRadius="full"
          onClick={() => router.push('/upload')}
        />
        <IconButton
          aria-label="Analytics"
          icon={<Box as={FiPieChart} boxSize={6} />}
          variant="ghost"
          color="white"
          _hover={{ bg: colorMode === 'dark' ? 'teal.500' : 'teal.600' }}
          borderRadius="full"
        />
        <IconButton
          aria-label="Profile"
          icon={<Box as={FiUser} boxSize={6} />}
          variant="ghost"
          color="white"
          _hover={{ bg: colorMode === 'dark' ? 'teal.500' : 'teal.600' }}
          borderRadius="full"
        />
      </Flex>
    </Box>
  );
} 