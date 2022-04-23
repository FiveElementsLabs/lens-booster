import { Box, Grid, GridItem, Stack, useColorModeValue } from '@chakra-ui/react';
import PostPreview from './PostPreview';
var randomHex = require('random-hex');


const elements = [
  {
    text: 'Fresh from the derby win, Tommy’s Tales returns to preview Inter v Roma! ',
    name: 'Inter FC',
    color1: '#00B4D6',
    color2: '#00B4D6',
  },
  {
    text: 'Imagine how happy our Inter Club members were after meeting @A10imperador at Inter headquarters',
    name: 'Inter FC',
    color1: '#00B4D6',
    color2: '#00B4D6',
  },
  {
    text: 'I am a dog', 
    name: 'Dog',
  },
  {
    text: 'I am luduvigo',
    name: 'luduvigo',
  },
  {
    text: 'I am a dog',
    name: 'Dog',
  },
];

const getAvatar = (name, color1, color2) => {
  if(!color1 || !color2) {
    const color1 = randomHex.generate().substring(3, 6);
    const color2 = randomHex.generate().substring(1, 4);
    return `https://ui-avatars.com/api/?name=${name}&size=256&rounded=true&bold=true&color=${color1}&background=${color2}`;
  } else {
    return `https://ui-avatars.com/api/?name=${name}&size=256&rounded=true&bold=true&color=${color1}&background=${color2}`;
  }
}

export default function Feed() {
  return (
    <Grid h="200px" templateRows="repeat(2, 1fr)" 
    templateColumns="repeat(5, 1fr)" gap={4} mt={4}>
      <GridItem colSpan={{ base: '5', md: '3'}} m={2}>
        {elements.map((element, index) => (
          <Box mb={4} width="100%" key={index}>
            <Stack p="4" boxShadow="lg" borderRadius="sm">
              <Stack direction="row" width="100%" alignItems="center">
                <PostPreview
                  /*title={'My first post'}*/
                  desc={element.text}
                  author={element.name}
                  /*role="BTC master"*/
                  avatar={getAvatar(element.name, element.color1, element.color2)}
                  date="17-03-2022 12:00 AM"
                />
              </Stack>
            </Stack>
          </Box>
        ))}
      </GridItem>
      <GridItem colSpan={{ base: '5', md: '2'}} m={2}>
        <Box border="1px" h="100%" borderColor={useColorModeValue('black', 'white')} mb={4}></Box>
      </GridItem>
    </Grid>
  );
}
