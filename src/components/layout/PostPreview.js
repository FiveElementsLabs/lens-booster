import {
  Box,
  Text,
  Stack,
  Button,
  Flex,
  Avatar,
  Code,
  Container,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

import { withEmotionCache } from "@emotion/react";
import { useSharedState } from "../../context/store";
import { createMirror } from "../../api/publications/mirror";

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
  ...rest
}) {
  const [{ account, provider }] = useSharedState();
  const [message, setMessage] = useState("");

  const onCreateMirror = async (e) => {
    e.preventDefault();
    try {
      // See api/publications/post for full metadata types.
      const signer = await provider.getSigner();
      const res = await createMirror(signer, account, {});

      setMessage(res);
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
      <Stack direction="row" alignItems="center" mt={2}>
        <Button
          onClick={onCreateMirror}
          colorScheme="teal"
          size="sm"
          variant="outline"
        >
          {"Mirror \t\t"}
          {emoji.get("repeat")}
        </Button>
        <Button colorScheme="red" size="sm" variant="outline">
          {"Boost \t\t"}
          {emoji.get("rocket")}
        </Button>
      </Stack>
      <Container maxW="container.md" mt={10}>
        <Code maxW="container.md">
          {message ? JSON.stringify(message) : ""}
        </Code>
      </Container>
    </Box>
  );
}
