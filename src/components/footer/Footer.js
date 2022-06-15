import { Box, useColorModeValue, Grid, GridItem, Link, Text, Flex } from '@chakra-ui/react';
import LensBoosterIcon from '../icons/LensBoosterIcon';
import TwitterFooter from '../icons/TwitterFooter';
import DiscordFooter from '../icons/DiscordFooter';
import FiveElementsFooter from '../icons/FiveElementsFooter';
import ContactFooter from '../icons/ContactFooter';
import LensFooter from '../icons/LensFooter';

export default function Footer() {
  return (
    <Box
      backgroundColor={useColorModeValue("light_azure", "light_azure")}
      padding={7}
    >
      <Grid
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(12, 1fr)"
        maxW="container.xl"
        mx="auto"
        alignItems="center"
        fontFamily="'Prompt', sans-serif"
        fontWeight={600}
        gap={{ base: '25px', md: 0 }}
      >
        <GridItem colSpan={{ base: '6', md: '2' }} display={{ base: 'none', md: 'inherit' }} alignContent>
          {' '}
          <LensBoosterIcon width="20rem" />
        </GridItem>
        <GridItem colSpan={{ base: '6', md: '2' }}>
          {' '}
          <Link href="https://discord.gg/bxfTM37Xyk">
            <Flex>
              <Box w="fit-content" my="auto" mr={2}>
                <ContactFooter />
              </Box>{' '}
              <Text color="#5C6F81" width="fit-content" display="inline" fontSize={12}>
                Contact us
              </Text>
            </Flex>
          </Link>
        </GridItem>

        <GridItem colSpan={{ base: '6', md: '2' }}>
          {' '}
          <Link href="https://www.lensfrens.xyz/lensbooster.lens">
            <Flex>
              <Box w="fit-content" my="auto" mr={2}>
                <LensFooter />
              </Box>{' '}
              <Text color="#5C6F81" width="fit-content" display="inline" fontSize={12}>
                Lens
              </Text>
            </Flex>
          </Link>
        </GridItem>
        <GridItem colSpan={{ base: '6', md: '2' }}>
          {' '}
          <Link href="https://twitter.com/LensBooster">
            <Flex>
              <Box w="fit-content" my="auto" mr={2}>
                <TwitterFooter />
              </Box>{' '}
              <Text color="#5C6F81" width="fit-content" display="inline" fontSize={12}>
                Twitter
              </Text>
            </Flex>
          </Link>
        </GridItem>
        <GridItem colSpan={{ base: '6', md: '2' }}>
          {' '}
          <Link href="https://discord.gg/bxfTM37Xyk">
            <Flex>
              <Box w="fit-content" my="auto" mr={2}>
                <DiscordFooter />
              </Box>{' '}
              <Text color="#5C6F81" width="fit-content" display="inline" fontSize={12}>
                Discord
              </Text>
            </Flex>
          </Link>
        </GridItem>
        <GridItem colSpan={{ base: '9', md: '2' }}>
          {' '}
          <Link href="https://fiveelementslabs.com/">
            <Flex>
              <Box w="fit-content" my="auto" mr={2}>
                <FiveElementsFooter />
              </Box>{' '}
              <Text color="#5C6F81" width="fit-content" display="inline" fontSize={12}>
                By Five Elements Labs
              </Text>
            </Flex>
          </Link>
        </GridItem>
      </Grid>
    </Box>
  );
}
