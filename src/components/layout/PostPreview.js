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
import BoostModal from "./BoostModal";

var moment = require("moment");
var emoji = require("node-emoji");

console.log();

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
  const totalFollowers = currentProfile?.stats?.totalFollowers;
  console.log(totalFollowers);

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
          <img src={image} alt="Post preview created by the user" width="auto" height="auto" />
        ) : (
          <></>
        )}
      </Box>
      <Stack direction="row" alignItems="center" mt={2}>
        <Button colorScheme="teal" size="sm" variant="outline">
          {"Share & Earn \t\t"}
          {emoji.get("repeat")}
        </Button>
        <Button colorScheme="red" size="sm" variant="outline" onClick={onOpen}>
          {"Boost \t\t"}
          {emoji.get("rocket")}
        </Button>
        {index === 0 &&
        window.localStorage.getItem("amount") > 0 &&
        window.localStorage.getItem("currentFollowers") &&
        window.localStorage.getItem("currentFollowers") >= 0 ? (
          <Button colorScheme="yellow" size="sm" variant="outline">
            {"Pay out \t\t"}
            {emoji.get("moneybag")}
            {index === 0
              ? "(" +
                (currentFollowers === "undefined" ? 0 : currentFollowers) +
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
