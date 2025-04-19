import React from 'react';
import { Box, HStack, VStack, Text, Avatar, Badge, IconButton, Button } from '@chakra-ui/react';
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
  const getStatusBadge = () => {
    switch (status) {
      case 'Verified':
        return (
          <Badge colorScheme="green" display="flex" alignItems="center" gap={1}>
            <Box as="span">✓</Box>
            Verified ({verificationCount})
          </Badge>
        );
      case 'Pending':
        return <Badge colorScheme="yellow">Pending</Badge>;
      case 'Disputed':
        return (
          <Badge colorScheme="red" display="flex" alignItems="center" gap={1}>
            <Box as="span">⚠</Box>
            Disputed
          </Badge>
        );
    }
  };

  return (
    <Box bg="gray.800" p={4} borderRadius="lg" mb={4}>
      <HStack spacing={3} mb={3}>
        <Avatar size="sm" name={author} src={avatar} />
        <VStack align="start" spacing={0} flex={1}>
          <HStack>
            <Text color="white" fontWeight="bold">{author}</Text>
            {getStatusBadge()}
          </HStack>
          <Text fontSize="sm" color="gray.400">{timestamp}</Text>
        </VStack>
      </HStack>

      <VStack align="start" spacing={2} mb={3}>
        <Text color="white" fontSize="lg" fontWeight="bold">
          {title}
        </Text>
        <Text color="gray.300" fontSize="sm">
          {content}
        </Text>
      </VStack>

      <HStack spacing={2} mb={4} flexWrap="wrap">
        {tags.map((tag) => (
          <Badge key={tag} colorScheme="blue" variant="subtle">
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
              color="gray.400"
              size="sm"
            />
            <Text color="gray.400">{likes}</Text>
          </HStack>
          <HStack>
            <IconButton
              aria-label="Comment"
              icon={<FiMessageSquare />}
              variant="ghost"
              color="gray.400"
              size="sm"
            />
            <Text color="gray.400">{comments}</Text>
          </HStack>
          <IconButton
            aria-label="Share"
            icon={<FiShare2 />}
            variant="ghost"
            color="gray.400"
            size="sm"
          />
        </HStack>
        <Button
          size="sm"
          colorScheme="teal"
          variant="ghost"
        >
          Verify
        </Button>
      </HStack>
    </Box>
  );
};

export default Post; 