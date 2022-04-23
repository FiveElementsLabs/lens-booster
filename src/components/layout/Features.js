import { Box, SimpleGrid, Icon, Text, Stack, Flex } from '@chakra-ui/react';
import { FaShareSquare, FaRocket, FaMoneyBill } from 'react-icons/fa';

const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        mb={1}>
        {icon}
      </Flex>
      <Text textAlign={'left'} fontWeight={600}>{title}</Text>
      <Text textAlign={'left'}>{text}</Text>
    </Stack>
  );
};

export default function Features() {
  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={FaRocket} w={10} h={10} />}
          title={'Boost your Lens content'}
          text={
            '🚀 BOOSTERS launch Advertising campaigns to BOOST their content '
          }
        />
        <Feature
          icon={<Icon as={FaShareSquare} w={10} h={10} />}
          title={'Share and Earn'}
          text={
            'INFLENSERS mirror and share advertised content to earn based on the size of their audience'    
          }
        />
        <Feature
          icon={<Icon as={FaMoneyBill} w={10} h={10} />}
          title={'Pay out'}
          text={
            '💰 Meet your audience goal and pay out INFLENSERS who have boosted your content'
          }
        />
      </SimpleGrid>
    </Box>
  );
}