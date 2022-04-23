import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Code,
  useToast,
  Stack,
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
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

import { useProfile } from "../hooks/useProfile";
import { createProfile } from "../api/profile/create-profile";
import { updateProfile } from "../api/profile/update-profile";
import { useSharedState } from "../context/store";
import { createPost } from "../api/publications/post";
import { getPublications } from "../api/publications/get-publications";
import PostPreview from "../components/layout/PostPreview";

export default function Settings() {
  const [{ account, provider }] = useSharedState();
  const { profiles, currentProfile } = useProfile();
  const [selectedProfile, setSelectedProfile] = useState({});
  const [postMetaData, setPostMetaData] = useState({});
  const [posts, setPosts] = useState([]);
  const [publications, setPublications] = useState([]);

  const [message, setMessage] = useState("");
  const [handle, setHandle] = useState("");
  const [profileMetaData, setProfileMetaData] = useState({});
  const toast = useToast();
  const location = useLocation();

  const profileId = location.pathname.substring(1);

  console.log(currentProfile);
  useEffect(() => {
    if (profiles) {
      setSelectedProfile(currentProfile);
    }
  }, [profiles, currentProfile]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getPublications(profileId);
        console.log(data);
        setPublications(data);

        console.log(publications);
      } catch (err) {
        console.error("LOADING ERROR in ProfilePage: ", err?.message);
      }
    };
    loadData();
  }, [currentProfile]);

  const onCreateProfile = async (e) => {
    e.preventDefault();
    console.log("onCreateProfile: ", account + " " + handle);
    try {
      const signer = await provider.getSigner();
      const res = await createProfile(account, handle, signer);
      setMessage(res);
      toast({
        title: "New profile created",
        status: "success",
        position: "bottom-right",
        variant: "subtle",
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
        title: "Profile updated",
        status: "success",
        position: "bottom-right",
        variant: "subtle",
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
      <Box
        mx="auto"
        maxW="container.md"
        rounded="xl"
        mt={5}
        p={4}
        bg={useColorModeValue("#ECF1FE", "")}
      >
        <Text marginBottom={5}>Posts</Text>
        <GridItem colSpan={{ base: "5", md: "3" }} m={2}>
          {publications?.map((post, index) => {
              console.log(post)
            return (
              <Box mb={4} width="100%" key={index}>
                <Stack boxShadow="lg" borderRadius="sm">
                  <Stack direction="row" width="100%" alignItems="center">
                    <PostPreview
                      /*title={'My first post'}*/
                      desc={post.metadata.description}
                      author={post.profile.handle}
                      /*role="BTC master"*/
                      // avatar={
                      //   element.avatar
                      //     ? element.avatar
                      //     : getAvatar(
                      //         element.name,
                      //         element.color1,
                      //         element.color2
                      //       )
                      // }
                      date="17-03-2022 12:00 AM"
                    />
                  </Stack>
                </Stack>
              </Box>
            );
          })}
        </GridItem>
      </Box>

      <Container maxW="container.md" mt={10}>
        <Code maxW="container.md">
          {message ? JSON.stringify(message) : ""}
        </Code>
      </Container>
    </>
  );
}