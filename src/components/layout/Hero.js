import Head from 'next/head';
import {
  Box,
  Heading,
  Container,
  Text,
  Stack,
} from '@chakra-ui/react';
import Features from '../../components/layout/Features';

export default function Hero() {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Container maxW={'3xl'}>
        <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          mt={8}
          py={{ base: 10, md: 12 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Lens 
            <Text as={'span'} color={'green.400'}>
            Booster
            </Text>
          <Text  fontSize={{ base: '2xl', sm: '2xl', md: '2xl' }}>

            Boost your content and skyrocket your audience
          </Text>
          </Heading>
        </Stack>
      </Container>
        <Features py={{ base: 6, md: 8 }} />
    </>
  );
}
