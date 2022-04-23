import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Code,
  useToast,
  Container,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Textarea,
  Text,
  Select,
  useColorModeValue,
} from '@chakra-ui/react';

import { useProfile } from '../hooks/useProfile';
import { createProfile } from '../api/profile/create-profile';
import { updateProfile } from '../api/profile/update-profile';
import { useSharedState } from '../context/store';
import { createPost } from '../api/publications/post';

export default function Profile() {
  const [{ account, provider }] = useSharedState();
  const { profiles, currentProfile } = useProfile();
  const [selectedProfile, setSelectedProfile] = useState({});
  const [postMetaData, setPostMetaData] = useState({});

  const [message, setMessage] = useState('');
  const [handle, setHandle] = useState('');
  const [profileMetaData, setProfileMetaData] = useState({});
  const toast = useToast();

  useEffect(() => {
    if (profiles) {
      setSelectedProfile(currentProfile);
    }
  }, [profiles, currentProfile]);

  const onCreateProfile = async (e) => {
    e.preventDefault();
    console.log('onCreateProfile: ', account + ' ' + handle);
    try {
      const signer = await provider.getSigner();
      const res = await createProfile(account, handle, signer);
      setMessage(res);
      toast({
        title: 'New profile created',
        status: 'success',
        position: 'bottom-right',
        variant: 'subtle',
      });
    } catch (err) {
      console.error(err?.message);
    }
  };

  const updatePostMetaData = (e, field) => {
    setPostMetaData({
      ...postMetaData,
      [field]: e.target.value,
    });
  };

  const updateProfileMetaData = (e, field) => {
    setProfileMetaData({
      ...profileMetaData,
      [field]: e.target.value,
    });
  };

  const onUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      // See api/profile/update-profile for full metadata types.
      await updateProfile(account, profileMetaData);
      toast({
        title: 'Profile updated',
        status: 'success',
        position: 'bottom-right',
        variant: 'subtle',
      });
    } catch (err) {
      console.error(err?.message);
    }
  };

  const onCreatePost = async (e) => {
    e.preventDefault();
    try {
      // See api/publications/post for full metadata types.
      console.log(postMetaData);
      const signer = await provider.getSigner();
      const res = await createPost(signer, account, postMetaData);

      setMessage(res);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Grid h="200px" templateRows="repeat(2, 1fr)" templateColumns="repeat(5, 1fr)" mt={4}>
        <GridItem colSpan={{ base: '5', md: '2' }} m={2}>
          <Box mx="auto" mt={5} maxW="container.md" border="1px solid gray" rounded="xl" p={4}>
            <Text>Create new Profile</Text>
            <form onSubmit={onCreateProfile}>
              <FormControl mt={5} isRequired>
                <FormLabel htmlFor="handle">Handle</FormLabel>
                <Input
                  id="handle"
                  type="text"
                  onChange={(e) => setHandle(e.target.value)}
                  color={useColorModeValue('black', 'black')}
                />
              </FormControl>
              <Button mt={5} type="submit" colorScheme="teal" variant="outline">
                Create Profile
              </Button>
            </form>
          </Box>
          <Box mx="auto" mt={5} maxW="container.md" border="1px solid gray" rounded="xl" p={4}>
            <Text>Update one of my profiles</Text>
            {/* Possible fields: profileId, name, bio, location, website, twitterUrl, coverPicture */}
            <form onSubmit={onUpdateProfile}>
              <FormControl mt={5}>
                <FormLabel htmlFor="name">Handle</FormLabel>
                <Input
                  id="name"
                  value={selectedProfile ? selectedProfile.handle : ''}
                  type="text"
                  onChange={(e) => updateProfileMetaData(e, 'name')}
                  disabled={true}
                  bg={useColorModeValue('white', 'dark_background')}
                  color={useColorModeValue('black', 'black')}
                />
              </FormControl>
              <FormControl mt={5} isRequired>
                <FormLabel htmlFor="profileId">Profile ID</FormLabel>
                <Select
                  placeholder="Select profile"
                  id="profileId"
                  defaultValue={selectedProfile ? selectedProfile.id : ''}
                  onChange={(e) => {
                    let profile = profiles.find((p) => p.id === e.target.value);
                    setSelectedProfile(profile);
                    setProfileMetaData({
                      name: profile.name,
                      bio: profile.bio,
                      profileId: e.target.value,
                    });
                  }}
                >
                  {profiles?.map((profile, index) => {
                    return (
                      <option key={index} value={profile.id}>
                        {profile.id}
                      </option>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl mt={5}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  id="name"
                  defaultValue={selectedProfile ? selectedProfile.name : ''}
                  type="text"
                  onChange={(e) => updateProfileMetaData(e, 'name')}
                  color={useColorModeValue('white', 'black')}
                />
              </FormControl>
              <FormControl mt={5}>
                <FormLabel htmlFor="bio">Bio</FormLabel>
                <Textarea
                  id="bio"
                  onChange={(e) => updateProfileMetaData(e, 'bio')}
                  defaultValue={selectedProfile ? selectedProfile.bio : ''}
                  color={useColorModeValue('white', 'black')}
                />
              </FormControl>
              <Button mt={5} type="submit" colorScheme="teal" variant="outline">
                Update this profile
              </Button>
            </form>
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: '5', md: '3' }} m={2}>
          <Box mx="auto" mt={5} maxW="container.md" border="1px solid gray" rounded="xl" p={4}>
            <Text>Create new Post</Text>
            {/* Possible fields: profileId, name, description, external_url, image, imageMimeType, content */}
            <form onSubmit={onCreatePost}>
              <FormControl mt={5} isRequired>
                <FormLabel htmlFor="profileId">Profile ID</FormLabel>
                <Input
                  id="profileId"
                  type="text"
                  onChange={(e) => updatePostMetaData(e, 'profileId')}
                />
              </FormControl>
              <FormControl mt={5}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input id="name" type="text" onChange={(e) => updatePostMetaData(e, 'name')} />
              </FormControl>
              <FormControl mt={5}>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Input
                  id="description"
                  type="text"
                  onChange={(e) => updatePostMetaData(e, 'description')}
                />
              </FormControl>
              <FormControl mt={5}>
                <FormLabel htmlFor="external_url">External URL</FormLabel>
                <Input
                  id="external_url"
                  type="text"
                  onChange={(e) => updatePostMetaData(e, 'external_url')}
                />
              </FormControl>
              <FormControl mt={5}>
                <FormLabel htmlFor="image">Image URL</FormLabel>
                <Input id="image" type="text" onChange={(e) => updatePostMetaData(e, 'image')} />
              </FormControl>
              <FormControl mt={5}>
                <FormLabel htmlFor="imageMimeType">Image MimeType</FormLabel>
                <Input
                  id="imageMimeType"
                  type="text"
                  placeholder="image/jpeg"
                  onChange={(e) => updatePostMetaData(e, 'imageMimeType')}
                />
              </FormControl>
              <FormControl mt={5}>
                <FormLabel htmlFor="content">Content</FormLabel>
                <Textarea id="content" onChange={(e) => updatePostMetaData(e, 'content')} />
              </FormControl>
              <Button mt={5} type="submit" colorScheme="teal" variant="outline">
                Create Post
              </Button>
            </form>
          </Box>
          <Box mx="auto" mt={5} maxW="container.md" border="1px solid gray" rounded="xl" p={4}>
            <Text>My posts</Text>
          </Box>
        </GridItem>
        <GridItem colSpan={{ base: '5', md: '3' }} m={2}></GridItem>
      </Grid>

      <Container maxW="container.md" mt={10}>
        <Code maxW="container.md">{message ? JSON.stringify(message) : ''}</Code>
      </Container>
    </>
  );
}
