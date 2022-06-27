import {
  Box,
  Flex,
  Button,
  Text,
  IconButton,
  Stack,
  Input,
  Link,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
  Container,
  Heading,
  Spacer,
} from '@chakra-ui/react';

import { useLocation } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Link as LinkRouter } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';

import LogoLight from '../icons/LogoLight';
import LensBoosterIcon from '../icons/LensBoosterIcon';
import Discord from '../icons/Discord';
import Twitter from '../icons/Twitter';
import Medium from '../icons/Medium';
import Lens from '../icons/Lens';
import Docs from '../icons/Docs';
import DiscordFooter from '../icons/DiscordFooter';
import TwitterFooter from '../icons/TwitterFooter';
import MediumFooter from '../icons/MediumFooter';
import LensFooter from '../icons/LensFooter';
import DocsFooter from '../icons/DocsFooter';
import FiveElements from '../icons/FiveElements';
import ContactFooter from '../icons/ContactFooter';

import Connect from './Connect.js';

import SelectProfile from './SelectProfile.js';

const NAV_ITEMS = [
  {
    label: 'HOW IT WORKS',
    href: '/#howitworks',
  },
  {
    label: 'INFLENSER',
    href: '/inflenser',
  },
];

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const [isLargerThan640] = useMediaQuery('(min-width: 640px)');

  return (
    <Box backgroundColor={useColorModeValue('light_azure', 'light_azure')} shadow="md">
      <Container w="90%" maxW="container.2xl">
        <Box>
          <Flex
            minH={'60px'}
            py={{ base: 2 }}
            align={'center'}
            marginLeft="auto"
            width={{ base: 'initial', md: 'initial' }}
          >
            <Flex
              flex={{ base: 1 }}
              justify={{ base: 'left', md: 'start' }}
              marginLeft={{ base: '5px', md: '0' }}
              alignItems="center"
            >
              <LinkRouter to={'/'}>
                <Flex alignItems="center">
                  {isLargerThan640 ? <LogoLight width="300px" /> : <LensBoosterIcon width="60px" heigth="60px" />}
                </Flex>
              </LinkRouter>
              <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                <DesktopNav />
              </Flex>
            </Flex>
            {/* <ColorModeSwitcher mr={2} justifySelf='flex-end' /> */}
            <Box display={{ base: 'none', md: 'block' }} mr={1}>
              <SelectProfile />
            </Box>

            <Spacer display={{ base: 'initial', md: 'none' }} />
            <Flex alignItems="center">
              {' '}
              <Connect variant="solid">Connect Wallet</Connect>
              {isLargerThan640 && (
                <Box>
                  <IconButton
                    marginLeft="5px"
                    height="34px"
                    onClick={onToggle}
                    icon={isOpen ? <BsThreeDots w={5} h={5} /> : <BsThreeDots w={5} h={5} />}
                    aria-label={'Toggle Navigation'}
                  />

                  <Box
                    position="absolute"
                    top="80px"
                    right="calc(6% + 2px)"
                    bg="white"
                    p="8px 16px 8px 8px"
                    display={isOpen ? 'block' : 'none'}
                    border="2px solid #1A4587"
                    borderRadius={8}
                    zIndex={1000}
                  >
                    <Box mb="10px">
                      <Link
                        href="https://twitter.com/LensBooster"
                        fill="#1A4587"
                        _hover={{ textDecoration: 'none', color: '#FF6827' }}
                      >
                        <Flex>
                          <Box w="fit-content" my="auto" mr={3} ml={1}>
                            <FiveElements />
                          </Box>{' '}
                          <Text
                            color="#5C6F81"
                            fontWeight={500}
                            width="fit-content"
                            display="inline"
                            fontSize={15}
                            variant="infleserPageTitles"
                          >
                            By Five Elements Labs
                          </Text>
                        </Flex>
                      </Link>
                    </Box>
                    <Box mb="10px">
                      <Link
                        href="https://discord.com/invite/bxfTM37Xyk"
                        fill="#1A4587"
                        _hover={{ textDecoration: 'none', color: '#FF6827' }}
                      >
                        <Flex>
                          <Box w="fit-content" my="auto" mr={2} ml={1}>
                            <ContactFooter />
                          </Box>{' '}
                          <Text
                            color="#5C6F81"
                            fontWeight={500}
                            width="fit-content"
                            display="inline"
                            fontSize={15}
                            variant="infleserPageTitles"
                          >
                            Contact Us
                          </Text>
                        </Flex>
                      </Link>
                    </Box>
                    <Box mb="10px">
                      <Link
                        href="https://fiveelementslabs.gitbook.io/lensbooster/introduction/lensbooster"
                        fill="#1A4587"
                        _hover={{ textDecoration: 'none', color: '#FF6827' }}
                      >
                        <Flex>
                          <Box w="fit-content" my="auto" mr={3} ml={1}>
                            <DocsFooter />
                          </Box>{' '}
                          <Text
                            color="#5C6F81"
                            fontWeight={500}
                            width="fit-content"
                            display="inline"
                            fontSize={15}
                            variant="infleserPageTitles"
                          >
                            Docs
                          </Text>
                        </Flex>
                      </Link>
                    </Box>
                    <Box mb="10px">
                      <Link
                        href="https://medium.com/@LensBooster"
                        fill="#1A4587"
                        _hover={{ textDecoration: 'none', color: '#FF6827' }}
                      >
                        <Flex>
                          <Box w="fit-content" my="auto" mr={3} ml={1}>
                            <MediumFooter />
                          </Box>{' '}
                          <Text
                            color="#5C6F81"
                            fontWeight={500}
                            width="fit-content"
                            display="inline"
                            fontSize={15}
                            variant="infleserPageTitles"
                          >
                            Blog
                          </Text>
                        </Flex>
                      </Link>
                    </Box>
                    <Box mb="10px">
                      <Link
                        href="https://twitter.com/LensBooster"
                        fill="#1A4587"
                        _hover={{ textDecoration: 'none', color: '#FF6827' }}
                      >
                        <Flex>
                          <Box w="fit-content" my="auto" mr={2} ml={1}>
                            <TwitterFooter />
                          </Box>{' '}
                          <Text
                            color="#5C6F81"
                            fontWeight={500}
                            width="fit-content"
                            display="inline"
                            fontSize={15}
                            variant="infleserPageTitles"
                          >
                            Twitter
                          </Text>
                        </Flex>
                      </Link>
                    </Box>
                    <Box mb="10px">
                      <Link
                        href="https://www.lensfrens.xyz/lensbooster.lens"
                        fill="#1A4587"
                        _hover={{ textDecoration: 'none', color: '#FF6827' }}
                      >
                        <Flex>
                          <Box w="fit-content" my="auto" mr={2} ml={1}>
                            <LensFooter />
                          </Box>{' '}
                          <Text
                            color="#5C6F81"
                            fontWeight={500}
                            width="fit-content"
                            display="inline"
                            fontSize={15}
                            variant="infleserPageTitles"
                          >
                            Lens
                          </Text>
                        </Flex>
                      </Link>
                    </Box>
                    <Box>
                      <Link
                        href="https://discord.com/invite/bxfTM37Xyk"
                        fill="#1A4587"
                        _hover={{ textDecoration: 'none', color: '#FF6827' }}
                      >
                        <Flex>
                          <Box color="#5C6F81" w="fit-content" my="auto" mr={2} ml={1}>
                            <DiscordFooter />
                          </Box>{' '}
                          <Text
                            color="#5C6F81"
                            fontWeight={500}
                            width="fit-content"
                            display="inline"
                            fontSize={15}
                            variant="infleserPageTitles"
                          >
                            Discord
                          </Text>
                        </Flex>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              )}
              {isLargerThan640 && <Box position={'absolute'}></Box>}
              <Flex flex={{ base: 1, md: 'auto' }} display={{ base: 'flex', md: 'none' }}>
                <IconButton
                  onClick={onToggle}
                  icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                  color={'#1A4587'}
                  bg="transparent"
                  _hover={{ bg: 'transparent' }}
                  _active={{ bg: 'transparent' }}
                  _focus={{ bg: 'transparent' }}
                  aria-label={'Toggle Navigation'}
                />
              </Flex>
            </Flex>
          </Flex>

          <Collapse in={isOpen} animateOpacity>
            <MobileNav />
          </Collapse>
        </Box>
      </Container>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Link
            _hover={{ textDecoration: 'none', color: '#FF6827' }}
            color="#5C6F81"
            fontSize="16px"
            fontFamily="'Prompt', sans-serif"
            fontWeight={600}
            href={navItem.href}
            {...(useLocation().pathname === navItem.href ? { color: '#FF6827' } : { color: '#5C6F81' })}
            _focus={{
              boxShadow: '0 0 0 0 #ffffff, 0 0 0 #ffffff',
            }}
          >
            {navItem.label.toUpperCase()}
          </Link>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      p={4}
      display={{ md: 'none' }}
      width="fit-content"
      color="#5C6F81"
      fontSize="20px"
      fontWeight="600"
      fontFamily="'Prompt', sans-serif"
      marginRight="auto"
      spacing={5}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}

      <Box>
        <Link href="https://twitter.com/LensBooster" fill="#1A4587">
          <Flex>
            <Box color="#5C6F81" w="fit-content" my="auto" mr={4} ml={1}>
              <FiveElements />
            </Box>{' '}
            <Text width="fit-content" display="inline" fontSize={15}>
              By Five Elements Labs
            </Text>
          </Flex>
        </Link>
      </Box>
      <Box>
        <Link href="https://discord.com/invite/bxfTM37Xyk" fill="#1A4587">
          <Flex>
            <Box color="#5C6F81" w="fit-content" my="auto" mr={3} ml={1}>
              <ContactFooter />
            </Box>{' '}
            <Text width="fit-content" display="inline" fontSize={15}>
              Contact Us
            </Text>
          </Flex>
        </Link>
      </Box>
      <Box>
        <Link href="https://fiveelementslabs.gitbook.io/lensbooster/introduction/lensbooster" fill="#1A4587">
          <Flex>
            <Box color="#5C6F81" w="fit-content" my="auto" mr={4} ml={1}>
              <DocsFooter />
            </Box>{' '}
            <Text width="fit-content" display="inline" fontSize={15}>
              Docs
            </Text>
          </Flex>
        </Link>
      </Box>
      <Box>
        <Link href="https://medium.com/@LensBooster" fill="#1A4587">
          <Flex>
            <Box color="#5C6F81" w="fit-content" my="auto" mr={4} ml={1}>
              <MediumFooter />
            </Box>{' '}
            <Text width="fit-content" display="inline" fontSize={15}>
              Blog
            </Text>
          </Flex>
        </Link>
      </Box>
      <Box>
        <Link href="https://twitter.com/LensBooster" fill="#1A4587">
          <Flex>
            <Box color="#5C6F81" w="fit-content" my="auto" mr={3} ml={1}>
              <TwitterFooter />
            </Box>{' '}
            <Text width="fit-content" display="inline" fontSize={15}>
              Twitter
            </Text>
          </Flex>
        </Link>
      </Box>
      <Box>
        <Link href="https://www.lensfrens.xyz/lensbooster.lens" fill="#1A4587">
          <Flex>
            <Box color="#5C6F81" w="fit-content" my="auto" mr={3} ml={1}>
              <LensFooter />
            </Box>{' '}
            <Text width="fit-content" display="inline" fontSize={15}>
              Lens
            </Text>
          </Flex>
        </Link>
      </Box>
      <Box>
        <Link href="https://discord.com/invite/bxfTM37Xyk" fill="#1A4587">
          <Flex>
            <Box color="#5C6F81" w="fit-content" my="auto" mr={3} ml={1}>
              <DiscordFooter />
            </Box>{' '}
            <Text width="fit-content" display="inline" fontSize={15}>
              Discord
            </Text>
          </Flex>
        </Link>
      </Box>
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
        width="fit-content"
        marginRight="auto"
      >
        <Text fontWeight={600} fontSize="20px">
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={10}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.400', 'gray.600')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
