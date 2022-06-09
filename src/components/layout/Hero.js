import Head from "next/head";
import { Box, Heading, Container, Text, Stack, Button } from "@chakra-ui/react";
import Features from "../../components/layout/Features";
import { useMirror } from "../../hooks/useMirror";

export default function Hero() {
  const { createPost } = useMirror();

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          mt={8}
          py={{ base: 10, md: 12 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Lens
            <Text as={"span"} color={"green.400"}>
              Booster
            </Text>
            <Text fontSize={{ base: "2xl", sm: "2xl", md: "2xl" }}>
              Boost your content and skyrocket your audience
            </Text>
          </Heading>
          <Button
            colorScheme="teal"
            variant="outline"
            onClick={() =>
              createPost(
                "0x2fb4",
                "https://ipfs.infura.io/ipfs/QmUrNCDN42eQUZLZhbMKQEAvPRkKgehya5hRxttBX8R5oY"
              )
            }
          >
            Mirror
          </Button>
        </Stack>
      </Container>
      <Features py={{ base: 6, md: 8 }} />
    </>
  );
}
