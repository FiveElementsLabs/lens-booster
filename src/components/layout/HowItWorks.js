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
          Lens Booster is a web3 advertising protocol built on Lens. The idea behind Lens Booster is to disintermediate{' '}
          <b>advertising</b> by creating a market between advertisers that want to promote contents and creators / users
          of Lens (inflensers) that can host the contents in their Lens profiles, visibile in various frontends (see{' '}
          <Link textDecoration="underline" color="#1988F7" href="https://lenster.xyz/" fontWeight={500}>
            Lenster.xyz
          </Link>
          ).
        </Text>
        <Heading as="h3" mb={4}>
          Who is Lens Booster for
        </Heading>
        <Text w={{ base: '100%', md: '80%' }}>
          Lens Booster is for users of Lens protocol and Lens applications such as Lenster.xyz
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
            Advertisers
          </Heading>
        </Box>

        <Text w={{ base: '100%', md: '80%' }}>
          Advertisers can create sponsored campaigns by setting duration, budget and other parameters that control how
          the budget is distributed among Lens users.
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
            Inflensers
          </Heading>
        </Box>

        <Text w={{ base: '100%', md: '80%' }}>
          Users with Lens profile can post incentivized contents from the Lensbooster page to promote it to all their
          social media page.
        </Text>
      </Box>
      <Box bg="#ffffff" borderRadius="20px" p={6} textAlign="left" mt={6} boxShadow="lg">
        <Heading as="h5" mb={4}>
          How the payoff is calculated
        </Heading>
        <Text w={{ base: '100%', md: '80%' }} mb={4}>
          The payoff depends from a boost score taking into account profile popularity on Lens, clicks generated and on
          chain event generated in the advertiser dapp.
        </Text>
        <Text w={{ base: '100%', md: '80%' }} mb={4} fontStyle="italic" color="#1A4587">
          <b>Payoff (usdc) = Boost score (floor) + CPClick * clicks + CPAction * on chain events</b>
        </Text>

        <Text w={{ base: '100%', md: '80%' }} mb={4}>
          <Text fontSize={24} color="#1A4587" display="inline">
            <b>Boost score:&nbsp;</b>
          </Text>
          A score calculated by Lensbooster which measures the popularity of profiles. In the first version of the
          product will be computed off chain with Lens profile activity metrics;
        </Text>
        <Text w={{ base: '100%', md: '80%' }} mb={4}>
          <Text fontSize={24} color="#1A4587" display="inline">
            <b>CPClick:&nbsp;</b>
          </Text>
          The cost per click set by advertisers;
        </Text>
        <Text w={{ base: '100%', md: '80%' }} mb={4}>
          <Text fontSize={24} color="#1A4587" display="inline">
            <b>Clicks:&nbsp;</b>
          </Text>
          Number of clicks to sponsor platform coming from shared post;
        </Text>
        <Text w={{ base: '100%', md: '80%' }} mb={4}>
          <Text fontSize={24} color="#1A4587" display="inline">
            <b>CPAction:&nbsp;</b>
          </Text>
          The cost per on chain transaction coming from followers of profiles addresses, set by advertiser (can be 0).
          This is the equivalent of a referral fee for computing off chain actions.
        </Text>

        <Link textDecoration="underline" color="#1988F7" fontSize={24} fontWeight={500}>
          See an example
        </Link>

        <Heading as="h5" my={4}>
          How the payoff is distributed
        </Heading>
        <Text w={{ base: '100%', md: '80%' }}>
          The payoff for mirroring is distributed at the repost transactions, while the payoff for interactions (clicks
          and or on chain events) is distributed periodically (usually, weekly).
        </Text>
      </Box>
    </>
  );
}
