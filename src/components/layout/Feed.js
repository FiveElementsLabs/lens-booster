import { Box, Grid, GridItem, Stack, useColorModeValue } from '@chakra-ui/react';
import PostPreview from './PostPreview';
import TopProfiles from './TopProfiles';
import { getAvatar } from '../../lib/GetAvatar';
import GrabCash from './GrabCash';

const elements = [
  {
    text: 'Fresh from the derby win, Tommy’s Tales returns to preview Inter v Roma! ',
    name: 'Inter FC',
    color1: '#00B4D6',
    color2: '#00B4D6',
    avatar: 'https://pbs.twimg.com/profile_images/1501851471993786372/e__2kcIx_400x400.jpg',
  },
  {
    text: 'Imagine how happy our Inter Club members were after meeting @A10imperador at Inter headquarters',
    name: 'Inter FC',
    avatar: 'https://pbs.twimg.com/profile_images/1501851471993786372/e__2kcIx_400x400.jpg',
  },
  {
    text: 'hey @donosonaumczuk mention should work now on @lenster 🌿 thanks @lensprotocol 🙏',
    name: 'Yoginth',
    avatar:
      'https://ik.imagekit.io/lensterimg/tr:n-avatar/https://statics-mumbai-lens.s3.eu-west-1.amazonaws.com/profile/nft-0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3_mumbai_0x277f5959E22f94D5bD4c2cC0a77c4c71f31da3Ac_1.png',
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

export default function Feed() {
  return (
    <>
      <Grid h="200px" templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" mt={4}>
        <GridItem colSpan={{ base: '5', md: '3' }} m={2}>
          {elements.map((element, index) => (
            <Box mb={4} width="100%" key={index}>
              <Stack boxShadow="lg" borderRadius="sm">
                <Stack direction="row" width="100%" alignItems="center">
                  <PostPreview
                    /*title={'My first post'}*/
                    desc={element.text}
                    author={element.name}
                    /*role="BTC master"*/
                    avatar={
                      element.avatar
                        ? element.avatar
                        : getAvatar(element.name, element.color1, element.color2)
                    }
                    date="17-03-2022 12:00 AM"
                  />
                </Stack>
              </Stack>
            </Box>
          ))}
        </GridItem>
        <GridItem colSpan={{ base: '5', md: '2' }} m={2}>
          <Box h="100%" borderColor={useColorModeValue('black', 'white')} mb={4}>
            <GrabCash mb={4}></GrabCash>
            <TopProfiles></TopProfiles>
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}
