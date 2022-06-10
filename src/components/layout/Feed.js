import {
  Box,
  Grid,
  GridItem,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import PostPreview from "./PostPreview";
import TopProfiles from "./TopProfiles";
import { getAvatar } from "../../lib/GetAvatar";
import GrabCash from "./GrabCash";
import HowItWorks from "./HowItWorks";
import DiscordAd from "./DiscordAd";

const elements = [
  {
    text: "Fresh from the derby win, Tommy’s Tales returns to preview Inter v Roma! ",
    name: "Inter FC",
    color1: "#00B4D6",
    color2: "#00B4D6",
    avatar:
      "https://pbs.twimg.com/profile_images/1501851471993786372/e__2kcIx_400x400.jpg",
  },
  {
    text: "Imagine how happy our Inter Club members were after meeting @A10imperador at Inter headquarters",
    name: "Inter FC",
    avatar:
      "https://pbs.twimg.com/profile_images/1501851471993786372/e__2kcIx_400x400.jpg",
  },
  {
    text: "hey @donosonaumczuk mention should work now on @lenster 🌿 thanks @lensprotocol 🙏",
    name: "Yoginth",
    avatar:
      "https://ik.imagekit.io/lensterimg/tr:n-avatar/https://statics-mumbai-lens.s3.eu-west-1.amazonaws.com/profile/nft-0x3A5bd1E37b099aE3386D13947b6a90d97675e5e3_mumbai_0x277f5959E22f94D5bD4c2cC0a77c4c71f31da3Ac_1.png",
  },
  {
    text: "I am luduvigo",
    name: "luduvigo",
  },
  {
    text: "I am a dog",
    name: "Dog",
  },
];

export default function Feed() {
  return (
    <>
      <Grid templateRows="repeat(1, 1fr)" templateColumns="repeat(9, 1fr)">
        <GridItem colSpan={{ base: "9", md: "6" }} mr={{ base: 0, md: 3 }}>
          <HowItWorks />
        </GridItem>
        <GridItem
          colSpan={{ base: "9", md: "3" }}
          mt={{ base: 10, md: 0 }}
          ml={{ base: 0, md: 3 }}
        >
          <Box
            h="100%"
            borderColor={useColorModeValue("black", "white")}
            mb={4}
          >
            {/* <GrabCash mb={4}></GrabCash>
            <TopProfiles></TopProfiles> */}
            <DiscordAd />
          </Box>
        </GridItem>
      </Grid>
    </>
  );
}
