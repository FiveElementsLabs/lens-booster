import {
  Box,
  Text,
  Flex,
  Spacer,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Avatar,
  Heading,
  Divider,
} from "@chakra-ui/react";

import AdvertisersStats from "./AdvertisersStats";

export default function Dashboard() {
  return (
    <>
      <Box mt={8} p={5} borderRadius="20px" boxShadow="lg" bg="white">
        <Flex alignItems="center">
          <Text color="#FF6827" fontSize={26}>
            Total earned
            <Text
              color="#FF6827"
              fontSize={30}
              textAlign="left"
              verticalAlign="center"
              fontWeight={600}
            >
              $ 623.25
            </Text>
          </Text>

          <Spacer />
          <Text color="#1A4587" fontSize={24}>
            Total mirrors
            <Text
              color="#00203F"
              fontSize={24}
              verticalAlign="center"
              textAlign="left"
              fontWeight={600}
            >
              106
            </Text>
          </Text>
          <Spacer />
          <Text color="#1A4587" fontSize={24}>
            Total clicks
            <Text
              color="#00203F"
              fontSize={24}
              textAlign="left"
              fontWeight={600}
            >
              114
            </Text>
          </Text>
          <Spacer />
          <Text color="#1A4587" fontSize={24}>
            Total events
            <Text
              color="#00203F"
              fontSize={24}
              textAlign="left"
              fontWeight={600}
            >
              59
            </Text>
          </Text>
          <Spacer />
        </Flex>
      </Box>

      <AdvertisersStats />
    </>
  );
}
