import React, { useState } from 'react';
import { Box, HStack, VStack, Text, Avatar, Badge, IconButton, Button, useColorMode, Icon, Flex } from '@chakra-ui/react';
import { FiThumbsUp, FiMessageSquare, FiShare2, FiLock, FiCheck, FiAlertTriangle, FiArrowUp, FiArrowDown } from 'react-icons/fi';

interface PostProps {
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
}

const Post: React.FC<PostProps> = ({
  author,
  avatar,
  timestamp,
  title,
  content,
  tags,
  likes,
  comments,
  status,
  verificationCount
}) => {
  const { colorMode } = useColorMode();
  const [showVerification, setShowVerification] = useState(false);

  const isDark = colorMode === 'dark';

  const getStatusBadge = () => {
    switch (status) {
      case 'Verified':
        return (
          <Badge 
            display="flex" 
            alignItems="center" 
            gap={1}
            bg={isDark ? "green.500" : "green.500"}
            color="white"
            px={2}
            py={0.5}
            borderRadius="full"
            fontSize="xs"
          >
            <Box as={FiCheck} />
            Verified ({verificationCount})
          </Badge>
        );
      case 'Pending':
        return (
          <Badge 
            display="flex" 
            alignItems="center" 
            gap={1}
            bg={isDark ? "yellow.500" : "yellow.500"}
            color="white"
            px={2}
            py={0.5}
            borderRadius="full"
            fontSize="xs"
          >
            Pending
          </Badge>
        );
      case 'Disputed':
        return (
          <Badge 
            display="flex" 
            alignItems="center" 
            gap={1}
            bg={isDark ? "red.500" : "red.500"}
            color="white"
            px={2}
            py={0.5}
            borderRadius="full"
            fontSize="xs"
          >
            <Box as={FiAlertTriangle} />
            Disputed
          </Badge>
        );
    }
  };

  return (
    <Box 
      bg={isDark ? "gray.800" : "white"}
      p={4} 
      borderRadius="xl" 
      mb={3}
      width="full"
      maxW="container.sm"
      boxShadow={isDark ? "none" : "sm"}
      border="1px solid"
      borderColor={isDark ? "gray.700" : "gray.200"}
    >
      <HStack spacing={3} mb={2}>
        <Avatar size="sm" name={author} src={avatar} />
        <VStack align="start" spacing={0} flex={1}>
          <HStack spacing={2}>
            <Text color={isDark ? "white" : "gray.800"} fontWeight="semibold" fontSize="sm">{author}</Text>
            {getStatusBadge()}
          </HStack>
          <Text fontSize="xs" color={isDark ? "gray.400" : "gray.500"}>{timestamp}</Text>
        </VStack>
      </HStack>

      <VStack align="start" spacing={2} mb={3}>
        <Text 
          color={isDark ? "white" : "gray.800"}
          fontSize="lg" 
          fontWeight="semibold"
          lineHeight="1.2"
        >
          {title}
        </Text>
        <Text 
          color={isDark ? "gray.300" : "gray.600"}
          fontSize="sm"
          lineHeight="1.5"
        >
          {content}
        </Text>
      </VStack>

      <HStack spacing={2} mb={3} flexWrap="wrap">
        {tags.map((tag) => (
          <Badge 
            key={tag} 
            px={3}
            py={1}
            borderRadius="full"
            bg={isDark ? "gray.700" : "gray.100"}
            color={isDark ? "gray.300" : "gray.600"}
            fontSize="xs"
          >
            {tag}
          </Badge>
        ))}
      </HStack>

      {showVerification && (
        <Box mb={3}>
          <HStack spacing={2} mb={2}>
            <Icon as={FiLock} color={isDark ? "gray.400" : "gray.500"} boxSize={4} />
            <Text color={isDark ? "gray.300" : "gray.600"} fontSize="sm">
              Content Verification
            </Text>
          </HStack>
          <Box
            bg={isDark ? "gray.900" : "gray.50"}
            p={2}
            borderRadius="md"
            mb={2}
            border="1px solid"
            borderColor={isDark ? "gray.700" : "gray.200"}
          >
            <Text 
              color={isDark ? "gray.400" : "gray.500"}
              fontSize="xs" 
              fontFamily="mono"
            >
              0x3a7f44hgf3h8q2i......
            </Text>
          </Box>
          <Text color={isDark ? "gray.400" : "gray.500"} fontSize="xs">
            This content has been cryptographically signed by the author and verified by {verificationCount} peers
          </Text>
        </Box>
      )}

      <HStack spacing={4} mb={3}>
        <HStack spacing={1}>
          <Icon as={FiThumbsUp} color={isDark ? "gray.400" : "gray.500"} boxSize={4} />
          <Text color={isDark ? "gray.400" : "gray.500"} fontSize="sm">{likes}</Text>
        </HStack>
        <HStack spacing={1}>
          <Icon as={FiMessageSquare} color={isDark ? "gray.400" : "gray.500"} boxSize={4} />
          <Text color={isDark ? "gray.400" : "gray.500"} fontSize="sm">{comments}</Text>
        </HStack>
        <Button
          variant="ghost"
          size="sm"
          color={isDark ? "gray.400" : "gray.500"}
          height="auto"
          minW="auto"
          p={0}
          _hover={{ bg: 'transparent', color: isDark ? "gray.300" : "gray.700" }}
          onClick={() => {}}
        >
          Share
        </Button>
        {!showVerification ? (
          <Button
            variant="ghost"
            size="sm"
            color={isDark ? "gray.400" : "gray.500"}
            height="auto"
            minW="auto"
            p={0}
            _hover={{ bg: 'transparent', color: isDark ? "gray.300" : "gray.700" }}
            onClick={() => setShowVerification(true)}
          >
            Verify
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="sm"
            color={isDark ? "gray.400" : "gray.500"}
            height="auto"
            minW="auto"
            p={0}
            _hover={{ bg: 'transparent', color: isDark ? "gray.300" : "gray.700" }}
            onClick={() => setShowVerification(false)}
          >
            Hide
          </Button>
        )}
      </HStack>

      {showVerification && (
        <HStack spacing={2} width="full">
          <Button
            leftIcon={<Icon as={FiArrowUp} />}
            bg={isDark ? "green.600" : "green.500"}
            color="white"
            flex={1}
            size="sm"
            _hover={{ bg: isDark ? "green.500" : "green.600" }}
            borderRadius="md"
          >
            Up Vote
          </Button>
          <Button
            leftIcon={<Icon as={FiArrowDown} />}
            bg={isDark ? "red.600" : "red.500"}
            color="white"
            flex={1}
            size="sm"
            _hover={{ bg: isDark ? "red.500" : "red.600" }}
            borderRadius="md"
          >
            Down Vote
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default Post; 