import { Box, Heading, Text, Link, Divider, Stack, Flex } from '@chakra-ui/react';

export default function HowItWorks() {
  return (
    <>
      <Box bg="#1A4587" color="white" borderRadius="20px" p={4} id="howitworks">
        <Heading fontSize={40} fontWeight={600} color="white">
          How it works
        </Heading>
      </Box>
      <Box bg="#ffffff" borderRadius="20px" p={6} textAlign="left" mt={6} boxShadow="lg">
        <Heading as="h3" mb={4}>
          What is Lens Booster
        </Heading>
        <Text w={{ base: '100%', md: '80%' }} mb={4}>
          Lens Booster is an engage to earn protocol. The idea behind Lens Booster is to disintermediate{' '}
          <b>advertising</b> by creating a market between businesses or creators that want to promote contents and users
          of twitter, Lens or other platforms. Users can be rewarded to perform a web2 or web3 actions in a flexible way (giveaways, loyalty program, referrals and others).
        </Text>
        
      </Box>
      <Box bg="#ffffff" borderRadius="20px" p={6} textAlign="left" mt={6} boxShadow="lg">
        <Box display={{ base: 'block', md: 'flex' }}>
          <Heading
            as="h3"
            mb={{ base: 1, md: 4 }}
            borderRight={{ base: '3px solid #BFC1C6', md: '0' }}
            w={{ base: 'fit-content', md: 'auto' }}
            paddingRight={{ base: 3, md: 0 }}
          >
            How it works
          </Heading>
          <Heading
            as="h3"
            mb={4}
            color="#FF6827"
            borderLeft={{ base: '0', md: '3px solid #BFC1C6' }}
            marginLeft={{ base: 0, md: 2 }}
            paddingLeft={{ base: 0, md: 2 }}
          >
            Businesses or creators 
          </Heading>
        </Box>

        <Text w={{ base: '100%', md: '80%' }}>
          Deploy sponsored campaigns by setting duration, budget and other parameters that control how
          the rewards are distributed. It is possible to target specific communities with the campaigns and apply custom bot filters.
        </Text>
      </Box>
      <Box bg="#ffffff" borderRadius="20px" p={6} textAlign="left" mt={6} boxShadow="lg">
        <Box display={{ base: 'block', md: 'flex' }}>
          <Heading
            as="h5"
            mb={{ base: 1, md: 4 }}
            borderRight={{ base: '3px solid #BFC1C6', md: '0' }}
            w={{ base: 'fit-content', md: 'auto' }}
            paddingRight={{ base: 3, md: 0 }}
          >
            How it works
          </Heading>
          <Heading
            as="h5"
            mb={4}
            color="#FF6827"
            borderLeft={{ base: '0', md: '3px solid #BFC1C6' }}
            marginLeft={{ base: 0, md: 2 }}
            paddingLeft={{ base: 0, md: 2 }}
          >
            Users
          </Heading>
        </Box>

        <Text w={{ base: '100%', md: '80%' }}>
          Users can take part in sponsored campaigns and earn rewards in form of NFTs or ERC20s
        </Text>
      </Box>
      
    </>
  );
}
