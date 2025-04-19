import { Box, Container, Flex, HStack, IconButton, Button, useColorMode } from '@chakra-ui/react';
import { FiSun, FiMoon, FiSearch, FiMenu, FiHome, FiCheck, FiPieChart, FiUser } from 'react-icons/fi';
import Post from '../components/Post';

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

  return (
    <Box minH="100vh" bg="gray.900">
      {/* Header */}
      <Flex
        as="header"
        position="fixed"
        w="100%"
        bg="gray.800"
        px={4}
        py={2}
        alignItems="center"
        justifyContent="space-between"
        zIndex={10}
      >
        <Box color="white" fontWeight="bold">
          logo.
        </Box>
        <HStack>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <FiMoon /> : <FiSun />}
            variant="ghost"
            color="gray.400"
          />
          <IconButton
            aria-label="Search"
            icon={<FiSearch />}
            variant="ghost"
            color="gray.400"
          />
          <IconButton
            aria-label="Menu"
            icon={<FiMenu />}
            variant="ghost"
            color="gray.400"
          />
        </HStack>
      </Flex>

      {/* Navigation Tabs */}
      <Box pt="60px" px={4} pb={2} bg="gray.900">
        <HStack spacing={4}>
          <Button variant="ghost" color="white" size="sm">
            Feed
          </Button>
          <Button variant="ghost" color="white" size="sm">
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
        bottom={0}
        w="100%"
        bg="teal.600"
        py={3}
        px={6}
        justifyContent="space-between"
        zIndex={10}
      >
        <IconButton
          aria-label="Home"
          icon={<FiHome />}
          variant="ghost"
          color="white"
        />
        <IconButton
          aria-label="Verified"
          icon={<FiCheck />}
          variant="ghost"
          color="white"
        />
        <IconButton
          aria-label="New Post"
          icon={<Box as="span" fontSize="24px">+</Box>}
          variant="ghost"
          color="white"
        />
        <IconButton
          aria-label="Analytics"
          icon={<FiPieChart />}
          variant="ghost"
          color="white"
        />
        <IconButton
          aria-label="Profile"
          icon={<FiUser />}
          variant="ghost"
          color="white"
        />
      </Flex>
    </Box>
  );
} 