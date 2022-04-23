import { Box, Grid, GridItem, Stack, Text, Button, useColorModeValue } from '@chakra-ui/react';
import PostPreview from "./PostPreview";


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

export default function Feed() {
  return (
<Grid h="200px" templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" gap={4} mt={4}>
<GridItem colSpan={3} m={2}>
  {elements.map((element, index) => (
    <Box mb={4} width="100%" key={index}>
      <Stack p="4" boxShadow="lg" borderRadius="sm">
        <Stack direction="row" width="100%" alignItems="center">

          <PostPreview
          title={"My first post"}
          desc={element.text}
          author="Satoshi Nakamoto"
          role="BTC master"
          avatar="https://bit.ly/sage-adebayo"
          date="17-03-2022 12:00 AM"
        />

        </Stack>
      </Stack>
    </Box>
  ))}
</GridItem>
<GridItem colSpan={2} m={2}>
  <Box border="1px" h="100%" borderColor={useColorModeValue('black', 'white')} mb={4}></Box>
</GridItem>

  </Grid>
  )}

   /*   <GridItem rowSpan={1} colSpan={1}>
        <Heading as="h3" size="lg" align="left">
          Latest posts
        </Heading>
      </GridItem>
      <GridItem rowSpan={10} colSpan={1} bg="papayawhip"></GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <PostPreview
          title="My first post"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          category="general"
          author="Satoshi Nakamoto"
          role="BTC master"
          avatar="https://bit.ly/sage-adebayo"
          date="17-03-2022 12:00 AM"
        />
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <PostPreview
          title="My second post"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          category="finance"
          author="Martin Odersky"
          role="Computer scientist"
          avatar="https://bit.ly/sage-adebayo"
          date="16-03-2022 11:00 PM"
        />
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <PostPreview
          title="My third post"
          desc="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
          category="ideas"
          author="Sir Isaac Newton"
          role="Inventor"
          avatar="https://bit.ly/sage-adebayo"
          date="15-03-2022 2:00 PM"
        />
      </GridItem>
    </Grid>

    
  );
}
*/
