import Head from "next/head";
import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
  Button,
  Flex,
} from "@chakra-ui/react";
import LensBox from "../icons/Lens_Deco_Box.svg";

export default function Hero() {
  return (
    <>
      <Box
        backgroundImage={LensBox}
        backgroundSize="cover"
        as={Box}
        textAlign={"center"}
        mt={8}
        py={{ base: 12, md: 20 }}
        borderRadius="20px"
        boxShadow="lg"
      >
        <Heading
          fontWeight={600}
          fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
          maxW="sm"
          mx="auto"
          textAlign={"center"}
          color="#00203F"
          fontFamily="'Prompt', sans-serif"
        >
          LensBooster
          <Text
            fontSize={{ base: "2xl", sm: "2xl", md: "2xl" }}
            color="#5C6F81"
            fontWeight="300"
            fontFamily="'Roboto', sans-serif"
          >
            <b>Boost</b> your content and <b>skyrocket your audience</b>
          </Text>
        </Heading>
        <Flex w="fit-content" mx="auto" gap={4} mt={6}>
          <Button bg="#FF6827" color="white" flexBasis="100%" p="20px">
            CREATE CAMPAIGN
          </Button>
          <Button bg="#FF6827" color="white" flexBasis="100%">
            SHARE & EARN
          </Button>
        </Flex>
      </Box>
    </>
  );
}
