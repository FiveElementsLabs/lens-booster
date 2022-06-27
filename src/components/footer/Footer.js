import { Box, useColorModeValue, Grid, GridItem, Link, Text, Flex, useMediaQuery } from '@chakra-ui/react';
import LensBoosterIcon from '../icons/LensBoosterIcon';
import TwitterFooter from '../icons/TwitterFooter';
import DiscordFooter from '../icons/DiscordFooter';
import FiveElementsFooter from '../icons/FiveElementsFooter';
import ContactFooter from '../icons/ContactFooter';
import LensFooter from '../icons/LensFooter';
import MediumFooter from '../icons/MediumFooter';
import DocsFooter from '../icons/DocsFooter';

export default function Footer() {
  const [isLargerThan640] = useMediaQuery('(min-width: 640px)');
  return (
    <Box backgroundColor={useColorModeValue('light_azure', 'light_azure')} padding={7}>
      {isLargerThan640 && (
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(12, 1fr)"
          w="90%"
          maxW="container.2xl"
          mx="auto"
          alignItems="center"
          fontFamily="'Prompt', sans-serif"
          fontWeight={600}
          gap={{ base: '25px', md: 0 }}
          variant="footerGridsm"
        >
          <GridItem colSpan={{ base: '4', md: '1' }} display={{ base: 'none', md: 'inherit' }} alignContent>
            {' '}
            <LensBoosterIcon />
          </GridItem>
          <GridItem colSpan={{ base: '6', md: '3' }}>
            {' '}
            <Link href="https://fiveelementslabs.com/" variant="footer">
              <Flex>
                <Box w="fit-content" my="auto" mr={2}>
                  <FiveElementsFooter />
                </Box>{' '}
                <Text color="#5C6F81" width="fit-content" display="inline" fontSize={15}>
                  By Five Elements Labs
                </Text>
              </Flex>
            </Link>
          </GridItem>
          <GridItem colSpan={{ base: '6', md: '2' }}>
            {' '}
            <Link href="https://discord.gg/bxfTM37Xyk" variant="footer">
              <Flex>
                <Box w="fit-content" my="auto" mr={2}>
                  <ContactFooter />
                </Box>{' '}
                <Text color="#5C6F81" width="fit-content" display="inline" fontSize={15} textDecoration="none">
                  Contact us
                </Text>
              </Flex>
            </Link>
          </GridItem>
          <GridItem colSpan={{ base: '6', md: '2' }}>
            {' '}
            <Link href="https://fiveelementslabs.gitbook.io/lensbooster/introduction/lensbooster" variant="footer">
              <Flex>
                <Box w="fit-content" my="auto" mr={2}>
                  <DocsFooter />
                </Box>{' '}
                <Text color="#5C6F81" width="fit-content" display="inline" fontSize={15}>
                  Docs
                </Text>
              </Flex>
            </Link>
          </GridItem>
          <GridItem colSpan={{ base: '6', md: '2' }}>
            {' '}
            <Link href="https://medium.com/@LensBooster" variant="footer">
              <Flex>
                <Box w="fit-content" my="auto" mr={2}>
                  <MediumFooter />
                </Box>{' '}
                <Text color="#5C6F81" width="fit-content" display="inline" fontSize={15}>
                  Blog
                </Text>
              </Flex>
            </Link>
          </GridItem>

          <GridItem colSpan={{ base: '6', md: '2' }}>
            {' '}
            <Flex>
              <Link px={2} href="https://twitter.com/LensBooster" fill="#1A4587" _hover={{ fill: '#FF6827' }}>
                <TwitterFooter />
              </Link>
              <Link px={2} href="https://discord.com/invite/bxfTM37Xyk" fill="#1A4587" _hover={{ fill: '#FF6827' }}>
                <DiscordFooter />
              </Link>
              <Link
                px={2}
                href="https://www.lensfrens.xyz/lensbooster.lens"
                fill="#1A4587"
                _hover={{ fill: '#FF6827' }}
              >
                <LensFooter />
              </Link>
            </Flex>
          </GridItem>
        </Grid>
      )}

      {!isLargerThan640 && (
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(12, 1fr)"
          w="90%"
          maxW="container.2xl"
          mx="auto"
          alignItems="center"
          fontFamily="'Prompt', sans-serif"
          fontWeight={600}
          gap={{ base: '25px', md: 0 }}
        >
          <GridItem colSpan="4">
            {' '}
            <Link href="https://twitter.com/LensBooster">
              <Flex>
                <Box w="fit-content" my="auto" mr={2}>
                  <TwitterFooter fill="#1A4587" />
                </Box>{' '}
                <Text color="#5C6F81" width="fit-content" display="inline" fontSize={15}>
                  Twitter
                </Text>
              </Flex>
            </Link>
          </GridItem>
          <GridItem colSpan="8">
            {' '}
            <Link href="https://fiveelementslabs.com/">
              <Flex>
                <Box w="fit-content" my="auto" mr={2}>
                  <FiveElementsFooter />
                </Box>{' '}
                <Text color="#5C6F81" width="fit-content" display="inline" fontSize={15}>
                  By Five Elements Labs
                </Text>
              </Flex>
            </Link>
          </GridItem>
          <GridItem colSpan="4">
            {' '}
            <Link href="https://www.lensfrens.xyz/lensbooster.lens">
              <Flex>
                <Box w="fit-content" my="auto" mr={2}>
                  <LensFooter fill="#1A4587" />
                </Box>{' '}
                <Text color="#5C6F81" width="fit-content" display="inline" fontSize={15}>
                  Lens
                </Text>
              </Flex>
            </Link>
          </GridItem>
          <GridItem colSpan="8">
            {' '}
            <Link href="https://discord.gg/bxfTM37Xyk" textDecoration="none">
              <Flex>
                <Box w="fit-content" my="auto" mr={2}>
                  <ContactFooter />
                </Box>{' '}
                <Text color="#5C6F81" width="fit-content" display="inline" fontSize={15} textDecoration="none">
                  Contact us
                </Text>
              </Flex>
            </Link>
          </GridItem>
          <GridItem colSpan="4">
            {' '}
            <Link href="https://discord.com/invite/bxfTM37Xyk">
              <Flex>
                <Box w="fit-content" my="auto" mr={2}>
                  <DiscordFooter fill="#1A4587" />
                </Box>{' '}
                <Text color="#5C6F81" width="fit-content" display="inline" fontSize={15}>
                  Discord
                </Text>
              </Flex>
            </Link>
          </GridItem>
          <GridItem colSpan="8">
            {' '}
            <Link href="https://fiveelementslabs.gitbook.io/lensbooster/introduction/lensbooster">
              <Flex>
                <Box w="fit-content" my="auto" mr={2}>
                  <DocsFooter />
                </Box>{' '}
                <Text color="#5C6F81" width="fit-content" display="inline" fontSize={15}>
                  Docs
                </Text>
              </Flex>
            </Link>
          </GridItem>

          <GridItem colSpan="4">
            {' '}
            <Link href="https://medium.com/@LensBooster">
              <Flex>
                <Box w="fit-content" my="auto" mr={2}>
                  <MediumFooter />
                </Box>{' '}
                <Text color="#5C6F81" width="fit-content" display="inline" fontSize={15}>
                  Blog
                </Text>
              </Flex>
            </Link>
          </GridItem>
        </Grid>
      )}
    </Box>
  );
}
