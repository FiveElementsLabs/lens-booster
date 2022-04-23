import {
  Box,
  Text,
  Stack,
  Button,
  Flex,
  Avatar,
  Code,
  useToast,
  Container,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { useSharedState } from "../../context/store";
import { createMirror } from "../../api/publications/mirror";
import updateSubscription from "../superfluid/updateSubscription";
import distribute from "../superfluid/distributeFunds";
import BoostModal from "./BoostModal";
import { isNullableType } from "graphql";

var moment = require("moment");
var emoji = require("node-emoji");

export default function PostPreview({
  title,
  desc,
  category,
  author,
  role,
  avatar,
  date,
  image,
  profileId,
  index,
  publicationId,
  ...rest
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [{ account, provider, currentProfile }] = useSharedState();
  const [currentFollowers, setCurrentFollowers] = useState(
    window.localStorage.getItem("currentFollowers") || null
  );
  const [message] = useState("");
  const toast = useToast();

  useEffect(() => {
    console.log(window.localStorage.getItem("currentFollowers"));
    const followers = window.localStorage.getItem("currentFollowers");
    setCurrentFollowers(followers);
    console.log(currentFollowers);
  }, [window.localStorage.getItem("currentFollowers")]);

  const totalFollowers = currentProfile?.stats?.totalFollowers;
  console.log(totalFollowers);

  const onDistribute = async (e) => {
    e.preventDefault();
    await distribute(
      window.localStorage.getItem("indexID"),
      window.localStorage.getItem("amount") * 0.01
    );
  };

  const onCreateMirror = async (e) => {
    e.preventDefault();
    try {
      // See api/publications/post for full metadata types.
      const signer = await provider.getSigner();
      const res = await createMirror(
        signer,
        account,
        profileId,
        publicationId,
        {}
      );
      await updateSubscription(
        window.localStorage.getItem("indexID"),
        account,
        10
      );

      console.log(
        parseInt(window.localStorage.getItem("currentFollowers")) + 10
      );
      window.localStorage.setItem(
        "currentFollowers",
        parseInt(window.localStorage.getItem("currentFollowers")) + 10
      );

      console.log(window.localStorage.getItem("currentFollowers"));
      setCurrentFollowers(window.localStorage.getItem("currentFollowers"));

      console.log(res.toString());

      toast({
        title: "Congrats: you're earning by sharing!",
        status: "success",
        position: "bottom-right",
        variant: "subtle",
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Box
      p={5}
      rounded="lg"
      shadow="md"
      borderWidth="1px"
      {...rest}
      align="left"
      width="100%"
    >
      <Flex>
        <Avatar src={avatar} />
        <Box ml="3">
          <Text fontWeight="bold">{author}</Text>
          <Text fontSize="xs">{moment().format("MMM Do YYYY")}</Text>
        </Box>
      </Flex>
      <Text mt={4}>{desc}</Text>
      <Box my={3}>
        {image ? (
          <img src={image} alt="post" width="auto" height="auto" />
        ) : (
          <></>
        )}
      </Box>
      <Stack direction="row" alignItems="center" mt={2}>
        <Button
          onClick={onCreateMirror}
          colorScheme="teal"
          size="sm"
          variant="outline"
        >
          {"Share & Earn \t\t"}
          {emoji.get("repeat")}
        </Button>
        <Button colorScheme="red" size="sm" variant="outline" onClick={onOpen}>
          {"Boost \t\t"}
          {emoji.get("rocket")}
        </Button>
        {index === 0 &&
        window.localStorage.getItem("amount") > 0 &&
        window.localStorage.getItem("currentFollowers") >= 0 ? (
          <Button
            colorScheme="yellow"
            size="sm"
            variant="outline"
            onClick={onDistribute}
          >
            {"Pay out \t\t"}
            {emoji.get("moneybag")}
            {index === 0
              ? "(" +
                currentFollowers +
                "/" +
                window.localStorage.getItem("amount") * 100 +
                ")"
              : ""}
          </Button>
        ) : (
          <></>
        )}
      </Stack>
      <Container maxW="container.md" mt={1}>
        <Code maxW="container.md">
          {message ? JSON.stringify(message) : ""}
        </Code>
      </Container>
      <BoostModal onClose={onClose} onOpen={onOpen} isOpen={isOpen} />
    </Box>
  );
}
