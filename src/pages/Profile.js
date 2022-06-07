import { useState, useEffect } from 'react';
import { Box, Code, Stack, Container, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { useProfile } from '../hooks/useProfile';
import { getPublications } from '../api/publications/get-publications';
import PostPreview from '../components/layout/PostPreview';
import TopProfiles from '../components/layout/TopProfiles';
import GrabCash from '../components/layout/GrabCash';
import { getAvatar } from '../lib/GetAvatar';

export default function Profile() {
  const { profileId } = useParams();

  const { currentProfile } = useProfile();
  const [publications, setPublications] = useState([]);

  const [message] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('load data');
        const data = await getPublications(profileId);
        console.log(data);
        setPublications(data);

        console.log(publications);
      } catch (err) {
        console.error('LOADING ERROR in ProfilePage: ', err?.message);
      }
    };
    loadData();
  }, [currentProfile, profileId, publications]);

  return (
    <>
      <Grid h="200px" templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" mt={4}>
        <GridItem colSpan={{ base: '5', md: '3' }} m={2}>
          {publications?.map((post, index) => {
            console.log(post);
            return (
              <Box mb={4} width="100%" key={index}>
                <Stack boxShadow="lg" borderRadius="sm">
                  <Stack direction="row" width="100%" alignItems="center">
                    <PostPreview
                      /*title={'My first post'}*/
                      desc={post.metadata.content}
                      author={post.profile.handle}
                      index={index}
                      profileId={profileId}
                      publicationId={post.id}
                      /*role="BTC master"*/
                      avatar={
                        post?.profile?.picture?.original?.url
                          ? post?.profile?.picture?.original?.url
                          : getAvatar('')
                      }
                      date="17-03-2022 12:00 AM"
                      image={
                        post?.metadata.media.length > 0 ? post?.metadata?.media[0].original.url : ''
                      }
                    />
                  </Stack>
                </Stack>
              </Box>
            );
          })}
        </GridItem>
        <GridItem colSpan={{ base: '5', md: '2' }} m={2}>
          <Box h="100%" borderColor={useColorModeValue('black', 'white')} mb={4}>
            <GrabCash mb={4}></GrabCash>
            <TopProfiles></TopProfiles>
          </Box>
        </GridItem>
      </Grid>

      <Container maxW="container.md" mt={10}>
        <Code maxW="container.md">{message ? 'Congrats: your sharing is earning!' : ''}</Code>
      </Container>
    </>
  );
}
