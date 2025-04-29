import React from 'react';
import { Box, HStack, VStack, Text, Avatar, Badge, IconButton, Button, useColorMode } from '@chakra-ui/react';
import { FiThumbsUp, FiMessageSquare, FiShare2 } from 'react-icons/fi';

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

  const getStatusBadge = () => {
    switch (status) {
      case 'Verified':
        return (
          <Badge colorScheme="green" display="flex" alignItems="center" borderRadius="6px" gap={1}>
            <Box as="span">✓</Box>
            Verified ({verificationCount})
          </Badge>
        );
      case 'Pending':
        return <Badge borderRadius="6px" colorScheme="yellow">Pending</Badge>;
      case 'Disputed':
        return (
          <Badge borderRadius="6px" colorScheme="red" display="flex" alignItems="center" gap={1}>
            <Box as="span">⚠</Box>
            Disputed
          </Badge>
        );
    }
  };

  return (
    <Box 
      bg={colorMode === 'dark' ? 'gray.800' : 'white'} 
      p={4} 
      borderRadius="lg" 
      mb={4}
      boxShadow="sm"
      border="1px solid"
      borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
    >
      <HStack spacing={3} mb={3}>
        <Avatar size="sm" name={author} src={avatar} />
        <VStack align="start" spacing={0} flex={1}>
          <HStack>
            <Text color={colorMode === 'dark' ? 'white' : 'gray.800'} fontWeight="bold">{author}</Text>
            {getStatusBadge()}
          </HStack>
          <Text fontSize="sm" color={colorMode === 'dark' ? 'gray.400' : 'gray.500'}>{timestamp}</Text>
        </VStack>
      </HStack>

      <VStack align="start" spacing={2} mb={3}>
        <Text color={colorMode === 'dark' ? 'white' : 'gray.800'} fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <Text color={colorMode === 'dark' ? 'gray.300' : 'gray.600'} fontSize="sm">
          {content}
        </Text>
      </VStack>

      <HStack spacing={2} mb={4} flexWrap="wrap">
        {tags.map((tag) => (
          <Badge 
            key={tag} 
            colorScheme="blue" 
            variant="subtle"
            bg={colorMode === 'dark' ? 'blue.800' : 'blue.50'}
            color={colorMode === 'dark' ? 'blue.100' : 'blue.800'}
          >
            {tag}
          </Badge>
        ))}
      </HStack>

      <HStack justify="space-between">
        <HStack spacing={4}>
          <HStack>
            <IconButton
              aria-label="Like"
              icon={<FiThumbsUp />}
              variant="ghost"
              color={colorMode === 'dark' ? 'gray.400' : 'gray.500'}
              size="sm"
              _hover={{
                bg: colorMode === 'dark' ? 'gray.700' : 'gray.100'
              }}
            />
            <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.500'}>{likes}</Text>
          </HStack>
          <HStack>
            <IconButton
              aria-label="Comment"
              icon={<FiMessageSquare />}
              variant="ghost"
              color={colorMode === 'dark' ? 'gray.400' : 'gray.500'}
              size="sm"
              _hover={{
                bg: colorMode === 'dark' ? 'gray.700' : 'gray.100'
              }}
            />
            <Text color={colorMode === 'dark' ? 'gray.400' : 'gray.500'}>{comments}</Text>
          </HStack>
          <IconButton
            aria-label="Share"
            icon={<FiShare2 />}
            variant="ghost"
            color={colorMode === 'dark' ? 'gray.400' : 'gray.500'}
            size="sm"
            _hover={{
              bg: colorMode === 'dark' ? 'gray.700' : 'gray.100'
            }}
          />
        </HStack>
        <Button
          size="sm"
          colorScheme="teal"
          variant="ghost"
          _hover={{
            bg: colorMode === 'dark' ? 'teal.800' : 'teal.50'
          }}
        >
          Verify
        </Button>
      </HStack>
    </Box>
  );
};

export default Post; 