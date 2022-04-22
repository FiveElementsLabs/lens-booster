import React from 'react';
import { Box, Grid, GridItem, Stack, Text, Button, useColorModeValue } from '@chakra-ui/react';

const elements = [
  {
    icon: '🐱',
    text: 'I am a cat',
  },
  {
    icon: '🐶',
    text: 'I am a dog',
  },
  {
    icon: '🐶',
    text: 'I am a dog',
  },
  {
    icon: '🐶',
    text: 'I am a dog',
  },
  {
    icon: '🐶',
    text: 'I am a dog',
  },
];

export default function Home(props) {
  return (
    <Grid h="200px" templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={4} mt={4}>
      <GridItem colSpan={3} m={2}>
        {elements.map((element, index) => (
          <Box border="1px" mb={4}>
            <Stack p="4" boxShadow="lg" borderRadius="sm">
              <Stack direction={{ base: 'column', md: 'row' }} justifyContent="space-between">
                <Text fontSize={{ base: 'md' }} textAlign={'left'} maxW={'4xl'}>
                  {element.text}
                </Text>
              </Stack>
              <Stack direction="row" alignItems="center">
                <Button colorScheme="teal" size="sm" variant="outline">
                  Like
                </Button>
                <Button colorScheme="teal" size="sm" variant="outline">
                  Mirror
                </Button>
              </Stack>
            </Stack>
          </Box>
        ))}
      </GridItem>
      <GridItem colSpan={2} m={2}>
        <Box border="1px" h="100%" borderColor={useColorModeValue('black', 'white')} mb={4}></Box>
      </GridItem>
    </Grid>
  );
}
