import { Box, Text, Stack, Avatar, Flex } from '@chakra-ui/react';
import { Link as LinkRouter } from 'react-router-dom';

import { getAvatar } from '../../lib/GetAvatar';

var emoji = require('node-emoji');

const topProfiles = [
  {
    name: 'Inter FC',
    handle: '@fcinter',
    url: '/fcinter',
    avatar: 'https://pbs.twimg.com/profile_images/1501851471993786372/e__2kcIx_400x400.jpg',
  },
  {
    name: 'luduvigo',
    handle: '@luduvigo',
    url: '/luduvigo',
    avatar: 'https://avatars2.githubusercontent.com/u/1709898?s=460&v=4',
  },
  {
    name: 'Vincenzo Manzon',
    handle: '@vmanzon',
    url: '/vmanzon',
    avatar: 'https://avatars2.githubusercontent.com/u/1709898?s=460&v=4',
  },
];

export default function TopProfiles({
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
          <Text fontWeight="bold"> {emoji.get('fire')} Recommended Profiles</Text>
        </Box>
      </Flex>
      <Text mt={4}>{desc}</Text>
      {topProfiles.map((element, index) => (
        <LinkRouter to={element.url ?? '#'} key={index}>
          <Stack direction="row" alignItems="center" mt={4}>
            <Avatar size="sm" src={element.avatar? element.avatar : getAvatar(element.name, element.color1, element.color2)}
 />

            <Box ml="3">
              <Text fontWeight="bold">{element.name}</Text>
              <Text fontSize="xs">{element.handle}</Text>
            </Box>
          </Stack>
        </LinkRouter>
      ))}
    </Box>
  );
}
