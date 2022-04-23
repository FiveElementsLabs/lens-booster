import {
    Box,
    Text,
    Heading,
    Stack,
    Button,
    Badge,
    Flex,
    Avatar,
    HStack,
  } from '@chakra-ui/react';
  
  export default function PostPreview({
    title,
    desc,
    category,
    author,
    role,
    avatar,
    date,
    ...rest
  }) {
    return (
      <Box p={5} shadow="md" borderWidth="1px" {...rest} align="left" width='100%'>
        <Flex>
          <Avatar src={avatar} />
          <Box ml="3">
            <Text fontWeight="bold">{author}</Text>
            <Text fontSize="sm">{role}</Text>
          </Box>
        </Flex>
        <Heading fontSize="xl" marginTop="1rem">
          {title}
        </Heading>
        <Text mt={4}>{desc}</Text>
        <HStack marginTop="1rem">
          <Text fontSize='xs'>{date}</Text>
        </HStack>
        <Stack direction="row" alignItems="center"  mt={2}>
          <Button colorScheme="teal" size="sm" variant="outline">
            Like
          </Button>
          <Button colorScheme="teal" size="sm" variant="outline">
            Mirror
          </Button>
        </Stack>
      </Box>
    );
  }
  
  const categories = {
    general: 'green',
    finance: 'red',
    ideas: 'yellow',
  };