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

import LogoLight from '../icons/LogoLight';
import LensBoosterIcon from '../icons/LensBoosterIcon';
import Discord from '../icons/Discord';
import Twitter from '../icons/Twitter';
import Medium from '../icons/Medium';
import Lens from '../icons/Lens';
import Docs from '../icons/Docs';
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
                  {isLargerThan640 ? <LogoLight width="300px" /> : <LensBoosterIcon width="60px" heigth="60px" />}
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
                  <Link href="https://twitter.com/LensBooster" fill="#5C6F81" _hover={{ fill: '#FF6827' }}>
                    <Twitter width="35px" heigth="24px" />
                  </Link>
                </Box>
                <Link href="https://www.lensfrens.xyz/lensbooster.lens" fill="#5C6F81" _hover={{ fill: '#FF6827' }}>
                  <Box mr={3}>
                    <Lens width="35px" heigth="24px" />
                  </Box>
                </Link>
                <Link href="https://discord.gg/bxfTM37Xyk" fill="#5C6F81" _hover={{ fill: '#FF6827' }}>
                  <Box mr={3}>
                    <Discord width="35px" heigth="24px" />
                  </Box>
                </Link>
                <Box marginRight={3}>
                  <Link href="https://medium.com/@LensBooster" fill="#5C6F81" _hover={{ fill: '#FF6827' }}>
                    <Medium width="35px" heigth="24px" />
                  </Link>
                </Box>
                <Box marginRight={3}>
                  <Link
                    href="https://fiveelementslabs.gitbook.io/lensbooster/introduction/lensbooster"
                    fill="#5C6F81"
                    _hover={{ fill: '#FF6827' }}
                  >
                    <Docs width="35px" heigth="24px" />
                  </Link>
                </Box>
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
          <Link href="https://twitter.com/LensBooster" fill="#5C6F81" _hover={{ fill: '#FF6827' }}>
            <Twitter width="35px" heigth="24px" />
          </Link>
        </Box>
        <Link href="https://www.lensfrens.xyz/lensbooster.lens" fill="#5C6F81" _hover={{ fill: '#FF6827' }}>
          <Box mx={3}>
            <Lens width="35px" heigth="24px" />
          </Box>
        </Link>
        <Link href="https://discord.gg/bxfTM37Xyk" fill="#5C6F81" _hover={{ fill: '#FF6827' }}>
          <Box mx={3}>
            <Discord width="35px" heigth="24px" />
          </Box>
        </Link>
        <Box mx={3}>
          <Link href="https://medium.com/@LensBooster" fill="#5C6F81" _hover={{ fill: '#FF6827' }}>
            <Medium width="35px" heigth="24px" />
          </Link>
        </Box>
        <Box mx={3}>
          <Link
            href="https://fiveelementslabs.gitbook.io/lensbooster/introduction/lensbooster"
            fill="#5C6F81"
            _hover={{ fill: '#FF6827' }}
          >
            <Docs width="35px" heigth="24px" />
          </Link>
        </Box>
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
