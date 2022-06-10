import { Box, Text, GridItem, Grid } from "@chakra-ui/react";
import Rocket from "../icons/Rocket";
import Coin from "../icons/Coin";
import Share from "../icons/Share";

const Feature = ({ title, text, icon }) => {
  return (
    <Box
      boxShadow="lg"
      borderRadius="20px"
      p={6}
      backgroundColor="#ffffff"
      h="95%"
    >
      {icon}
      <Text
        textAlign={"left"}
        fontWeight={600}
        mt={2}
        color="#00203F"
        fontSize={24}
        fontFamily="'Prompt', sans-serif"
      >
        {title}
      </Text>
      <Text textAlign={"left"} color="#5C6F81" fontWeight="300">
        {text}
      </Text>
    </Box>
  );
};

export default function Features() {
  return (
    <Box mt="21px">
      <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(9, 1fr)">
        <GridItem
          colSpan={{ base: "9", md: "3" }}
          m={{ base: 0, md: 3 }}
          ml={{ base: 0, md: 0 }}
        >
          <Feature
            icon={<Rocket width="64px" heigth="64px" />}
            title={"Boost your Lens content"}
            text={
              <>
                <Text>
                  <b>BOOSTERS</b> launch Advertising campaigns to <b>BOOST</b>{" "}
                  their content
                </Text>
              </>
            }
          />
        </GridItem>
        <GridItem colSpan={{ base: "9", md: "3" }} m={{ base: 0, md: 3 }}>
          <Feature
            icon={<Share width="64px" heigth="64px" />}
            title={"Share and Earn"}
            text={
              <>
                <Text>
                  <b>INFLENSERS</b> mirror and share advertised content to earn
                  based on the size of their audience
                </Text>
              </>
            }
          />
        </GridItem>
        <GridItem
          colSpan={{ base: "9", md: "3" }}
          m={{ base: 0, md: 3 }}
          mr={{ base: 0, md: 0 }}
        >
          <Feature
            icon={<Coin width="64px" heigth="64px" />}
            title={"Pay out"}
            text={
              <>
                <Text>
                  Reach your target and pay out <b>INFLENSERS</b> who have
                  boosted your content
                </Text>
              </>
            }
          />
        </GridItem>
      </Grid>
    </Box>
  );
}
