import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import PostCard from "./PostCard";

export default function Dashboard() {
  const publicationIds = [
    "0x60d3-0x01",
    "0x0132-0x61",
    "0x0d-0x8e",
    "0x03ff-0x06",
  ];
  return (
    <>
      <Box bg="#1A4587" p={5} mt={8} borderRadius="20px">
        <Heading color="white">Active Campaigns</Heading>
      </Box>
      {/* Array of posts*/}
      {publicationIds.map((id) => (
        <PostCard key={id} publicationId={id} />
      ))}
    </>
  );
}
