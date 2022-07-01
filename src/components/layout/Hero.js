import Head from 'next/head';
import { Box, Heading, Container, Text, Stack, Button, Flex, useMediaQuery } from '@chakra-ui/react';
import HeroBackground from '../icons/Lens_Deco_Box.svg';
import HeroMobileBackground from '../icons/Lens_Deco_Box_Mobile.svg';

export default function Hero() {
  const [isLargerThan640] = useMediaQuery('(min-width: 640px)');

  return (
    <>
      <Box
        backgroundImage={isLargerThan640 ? HeroBackground : HeroMobileBackground}
        backgroundSize="cover"
        as={Box}
        textAlign={'center'}
        mt={8}
        py={{ base: 40, md: 20 }}
        borderRadius="20px"
        boxShadow="lg"
      >
        <Heading
          as="h1"
          fontWeight={600}
          fontSize={{ base: '5xl', sm: '4xl', md: '6xl' }}
          maxW="sm"
          mx="auto"
          textAlign={'center'}
          color="#00203F"
        >
          Lens Booster
          <Text fontSize="2xl" color="#5C6F81" fontWeight={400}>
            <b>Boost</b> your content and <b>skyrocket your audience</b>
          </Text>
        </Heading>
        <Box
          w={{ base: '55%', md: 'fit-content' }}
          mx="auto"
          gap={{ base: 0, md: 4 }}
          mt={6}
          display={{ base: 'block', md: 'flex' }}
        >
          <Button
            flexBasis="100%"
            display={{ base: 'block', md: 'initial' }}
            minW="inherit"
            w={{ base: '100%', md: 'auto' }}
          >
            CREATE CAMPAIGN
          </Button>
          <Button flexBasis="100%" minW="inherit" mt={{ base: 4, md: 0 }} w={{ base: '100%', md: 'auto' }}>
            REPOST & EARN
          </Button>
        </Box>
      </Box>
    </>
  );
}
