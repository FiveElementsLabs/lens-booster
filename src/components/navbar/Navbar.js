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

import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Link as LinkRouter } from 'react-router-dom';

import LensBoosterIcon from '../icons/LensBoosterIcon';
import Discord from '../icons/Discord';
import Twitter from '../icons/Twitter';
import Lens from '../icons/Lens';
import darkLogo from '../../rocket.png';
import lightLogo from '../../rocket.png';
import Connect from './Connect.js';
import SelectProfile from './SelectProfile.js';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Smiley from '../icons/Smiley';

const NAV_ITEMS = [
  {
    label: 'LENS USERS',
    href: '/settings',
  },
  {
    label: 'ADVERTISER',
    href: '/',
  },
];

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const [isLargerThan640] = useMediaQuery('(min-width: 640px)');

  return (
    <Box backgroundColor={useColorModeValue('light_azure', 'dark_azure')} shadow="md">
      <Container maxW="container.xl">
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
                  <LensBoosterIcon width="60px" heigth="60px" />
                  {isLargerThan640 ? (
                    <Heading color="#00203F" fontSize={34}>
                      Lens Booster
                    </Heading>
                  ) : (
                    <></>
                  )}
                </Flex>
              </LinkRouter>
              <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                <DesktopNav />
              </Flex>
            </Flex>
            {/* <ColorModeSwitcher mr={2} justifySelf='flex-end' /> */}
            <Box display={{ base: 'none', md: 'block' }} mr={3}>
              <SelectProfile />
            </Box>

            {isLargerThan640 && (
              <>
                <Box mr={3}>
                  <Link href="https://twitter.com/LensBooster">
                    <Twitter width="35px" heigth="24px" />
                  </Link>
                </Box>
                <Link href="https://www.lensfrens.xyz/lensbooster.lens">
                  <Box mr={3}>
                    <Lens width="35px" heigth="24px" />
                  </Box>
                </Link>
                <Link href="https://discord.gg/bxfTM37Xyk">
                  <Box mr={3}>
                    <Discord width="35px" heigth="24px" />
                  </Box>
                </Link>
              </>
            )}
            <Spacer display={{ base: 'initial', md: 'none' }} />
            <Flex alignItems="center">
              {' '}
              <Connect variant="solid">Connect Wallet</Connect>
              <Flex flex={{ base: 1, md: 'auto' }} display={{ base: 'flex', md: 'none' }}>
                <IconButton
                  onClick={onToggle}
                  icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                  color={'#1A4587'}
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
          <Link color="#5C6F81" fontSize="16px" fontFamily="'Prompt', sans-serif" fontWeight={500}>
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
      margin="auto"
      color="#5C6F81"
      fontSize="18px"
      fontWeight="700"
      fontFamily="'Prompt', sans-serif"
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <Flex>
        <Box mx={3}>
          <Link href="https://twitter.com/LensBooster">
            <Twitter width="35px" heigth="24px" />
          </Link>
        </Box>
        <Link href="https://www.lensfrens.xyz/lensbooster.lens">
          <Box mx={3}>
            <Lens width="35px" heigth="24px" />
          </Box>
        </Link>
        <Link href="https://discord.gg/bxfTM37Xyk">
          <Box mx={3}>
            <Discord width="35px" heigth="24px" />
          </Box>
        </Link>
      </Flex>
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
        width="fit-content"
        margin="auto"
      >
        <Text fontWeight={600}>{label}</Text>
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
