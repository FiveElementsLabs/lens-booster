import { Box, Heading, Flex, Button } from "@chakra-ui/react";
import Chat from "../icons/Chat";

export default function DiscordAd() {
  return (
    <>
      <Box bg="#ffffff" borderRadius="20px" p={6} boxShadow="lg">
        <Flex justifyContent="space-between">
          <Box textAlign="left" color="#00203F">
            <Heading fontSize={30} fontFamily="'Prompt', sans-serif">
              Advertiser?
            </Heading>
            <Heading fontSize={30} fontFamily="'Prompt', sans-serif">
              Inflenser?
            </Heading>
            <Heading fontSize={30} fontFamily="'Prompt', sans-serif">
              Talk with us!
            </Heading>
          </Box>
          <Box>
            {" "}
            <Chat width="101px" heigth="101px" />
          </Box>
        </Flex>
        <Button
          color="white"
          bg="#FF6827"
          w="full"
          mt={6}
          borderRadius={8}
          padding={6}
          fontFamily="'Prompt', sans-serif"
        >
          <a href="https://discord.gg/bxfTM37Xyk">JOIN OUR DISCORD</a>
        </Button>
      </Box>
    </>
  );
}
