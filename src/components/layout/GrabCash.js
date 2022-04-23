import { Box, Text, Stack, Avatar, Flex } from '@chakra-ui/react';
import { Link as LinkRouter } from 'react-router-dom';

import { getAvatar } from '../../lib/GetAvatar';

var emoji = require('node-emoji');

const grabCash = [
  {
    name: 'Inter FC',
    handle: '@fcinter',
    url: '/0x05ef',
    totalpaid: '$52,340.00',
    avatar: 'https://pbs.twimg.com/profile_images/1501851471993786372/e__2kcIx_400x400.jpg',
  },
  {
    name: 'Boost DAO',
    handle: '@boostdao',
    totalpaid: '$300.00',
    url: '/0x05ee',
    avatar: 'https://ik.imagekit.io/lensterimg/tr:n-avatar/https://ipfs.infura.io/ipfs/QmSghYdm87zoMzpCX5i3fidWLdREMKuP1tk9dGXXcxRyPc',
  },
  {
    name: 'Devconnect',
    handle: '@devconnect',
    url: '/0x05f9',
    totalpaid: '$4,230.00',
    avatar: 'https://ik.imagekit.io/lensterimg/tr:n-avatar/https://ipfs.infura.io/ipfs/QmXYNepRCTLvRUVHoUoGUNYyAbG7kweSLKYcsnCrQR6cbU',
  }
];

export default function GrabCash({
  title,
  desc,
  category,
  author,
  role,
  avatar,
  date,
  ...rest
}) {
  return (
    <Box p={5} rounded="lg" shadow="md" borderWidth="1px" {...rest} align="left" width="100%">
      <Flex>
        <Box>
          <Text fontWeight="bold"> {emoji.get('💰')} Share and Earn</Text>
        </Box>
      </Flex>
      <Text mt={4}>{desc}</Text>
      {grabCash.map((element, index) => (
        <LinkRouter to={element.url ?? '#'} key={index}>
          <Stack direction="row" alignItems="center" mt={4}>
            <Avatar size="sm" src={element.avatar? element.avatar : getAvatar(element.name, element.color1, element.color2)}
 />

            <Box ml="3">
              <Text fontWeight="bold">{element.name}</Text>
              <Text fontSize="xs">{element.handle}</Text>
              <Text fontSize="sm" fontWeight="bold">Total paid: {element.totalpaid}</Text>
            </Box>
          </Stack>
        </LinkRouter>
      ))}
    </Box>
  );
}
