import {
  Box,
  Flex,
  Input,
  Button,
  Text,
  InputGroup,
} from '@chakra-ui/react';

export default function Navbar() {
  return (
    <Box bg="gray.100" px={6} py={3} boxShadow="sm">
      <Flex
        maxW="7xl"
        mx="auto"
        align="center"
        justify="space-between"
      >
        {/* Logo */}
        <Text fontWeight="bold" fontSize="xl">
          Heirloom
        </Text>

        {/* Search bar */}
        <InputGroup w="300px">
          <Input placeholder="Search..." bg="white" />
        </InputGroup>

        {/* Sign In Button */}
        <Button variant="outline">Sign In</Button>
      </Flex>
    </Box>
  );
}
