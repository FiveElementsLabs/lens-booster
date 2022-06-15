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
  useMediaQuery
} from "@chakra-ui/react";

import AdvertisersStats from "./AdvertisersStats";
import AdvertisersStatsMobile from "./AdvertisersStatsMobile"

export default function Dashboard() {
    const [isLargerThan640] = useMediaQuery('(min-width: 640px)');

  return (
    <>
      <Box
        mt={8}
        p={5}
        borderRadius="20px"
        boxShadow="lg"
        bg="white"
        fontFamily="'Prompt', sans-serif"
        width="auto"
        
      >
        
        <Flex alignItems="center" display={{base: "block", md: "flex"}} >
          <Text color="#FF6827" fontSize={26} textAlign="left"  mb={{base: "10px", md: "0"}} >
            Total earned
            <Text
              color="#FF6827"
              fontSize={30}
              textAlign="left"
              verticalAlign="center"
              fontWeight={600}
              lineHeight={{base: 1, md: 1.5}}
            >
              $ 623.25
            </Text>
          </Text>

          <Spacer />
          <Text color="#1A4587" fontSize={24} textAlign="left" mb={{base: "10px", md: "0"}}>
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
          <Text color="#1A4587" fontSize={24} textAlign="left" mb={{base: "10px", md: "0"}}>
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
          <Text color="#1A4587" fontSize={24} textAlign="left">
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

      {isLargerThan640 ? <AdvertisersStats /> : <AdvertisersStatsMobile />}
    </>
  );
}
