import {
    Box,
    Text,
    Stack,
    Button,
    Flex,
    Avatar,
  } from '@chakra-ui/react';

  var moment = require('moment');
  var emoji = require('node-emoji')
  
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
      <Box p={5} rounded='lg' shadow="md" borderWidth="1px" {...rest} align="left" width='100%'>
        <Flex>
          <Avatar src={avatar} />
          <Box ml="3">
            <Text fontWeight="bold">{author}</Text>
            <Text fontSize='xs'>{moment().format("MMM Do YYYY")}</Text>
          </Box>
        </Flex>
        <Text mt={4}>{desc}</Text>
        <Stack direction="row" alignItems="center"  mt={2}>
          <Button colorScheme="teal" size="sm" variant="outline">
            Mirror
          </Button>
          <Button colorScheme="red" size="sm" variant="outline">
             {"Boost \t\t"}{emoji.get('rocket') }
          </Button>
        </Stack>

        
      </Box>
    );
  }