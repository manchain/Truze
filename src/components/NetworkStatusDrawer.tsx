import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Box,
  Flex,
  Text,
  Badge,
  useColorMode
} from '@chakra-ui/react';
import { FiServer, FiBox, FiShare2 } from 'react-icons/fi';

interface NetworkStatusDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const NetworkStatusDrawer: React.FC<NetworkStatusDrawerProps> = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();
  const isDark = colorMode === 'dark';

  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xs">
      <DrawerOverlay />
      <DrawerContent bg={isDark ? '#1A2332' : 'white'} borderRadius="xl" p={0}>
        <DrawerCloseButton mt={2} color={isDark ? 'white' : 'gray.800'} />
        <DrawerHeader pt={8} pb={2} px={6} borderBottomWidth={0}>
          <Text color={isDark ? 'gray.400' : 'gray.500'} fontWeight="bold" fontSize="md" letterSpacing={1} mb={2}>
            Network Status
          </Text>
        </DrawerHeader>
        <DrawerBody px={6} py={2}>
          <Flex align="center" mb={6}>
            <FiServer size={22} color={isDark ? '#A0AEC0' : '#4A5568'} />
            <Text ml={3} fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>
              Main Network
            </Text>
            <Badge ml="auto" px={3} py={1} borderRadius="lg" bg="green.500" color="white" fontWeight="bold" fontSize="sm">
              23 wallets
            </Badge>
          </Flex>
          <Flex align="center" mb={6}>
            <FiBox size={22} color={isDark ? '#A0AEC0' : '#4A5568'} />
            <Text ml={3} fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>
              Local Node
            </Text>
            <Badge ml="auto" px={3} py={1} borderRadius="lg" bg="yellow.400" color={isDark ? 'gray.800' : 'gray.900'} fontWeight="bold" fontSize="sm">
              Syncing
            </Badge>
          </Flex>
          <Flex align="center">
            <FiShare2 size={22} color={isDark ? '#A0AEC0' : '#4A5568'} />
            <Text ml={3} fontWeight="bold" color={isDark ? 'white' : 'gray.800'}>
              Connect Node
            </Text>
            <Text ml="auto" color={isDark ? 'gray.300' : 'gray.700'} fontWeight="bold" fontSize="sm">
              Connected
            </Text>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default NetworkStatusDrawer; 