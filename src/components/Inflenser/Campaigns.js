import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import PostCard from "./PostCard";

export default function Dashboard() {
  const campaignsIpfs = [
    "https://ipfs.infura.io/ipfs/QmVSNBUEKM5JVnus1bhzrc9Wg6UXZpCcmKAWZYszU3sWYa",
  ];
  return (
    <>
      <Box bg="#1A4587" p={5} mt={8} borderRadius="20px">
        <Heading color="white">Active Campaigns</Heading>
      </Box>
      {/* Array of posts*/}
      <PostCard contentIpfs={campaignsIpfs[0]} />
    </>
  );
}
