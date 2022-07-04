import { Box, Heading, Flex, Button, useMediaQuery } from '@chakra-ui/react';
import ChatIcon from '../icons/ChatIcon';

export default function DiscordAd() {
  const [isTablet] = useMediaQuery('(min-width: 768px) and (max-width: 1024px)');

  return (
    <>
      <Box bg="#ffffff" borderRadius="20px" p={6} boxShadow="lg">
        <Flex justifyContent="space-between">
          <Box textAlign="left">
            <Heading color="#00203F">Want to promote contents?</Heading>
            <Heading color="#00203F">Let's talk</Heading>
          </Box>
          <Box> {!isTablet && <ChatIcon width="101px" heigth="101px" />}</Box>
        </Flex>
        <Button w="full" mt={6} borderRadius={8} padding={6}>
          <a href="https://discord.gg/bxfTM37Xyk">JOIN OUR DISCORD</a>
        </Button>
      </Box>
    </>
  );
}
