import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { getIpfs } from "../../lib/ipfs";
import { getPublication } from "../../hooks/getPublication";
import Markup from "../shared/Markup";

export default function PostCard({ publicationId }) {
  //https://ipfs.infura.io/ipfs/QmVSNBUEKM5JVnus1bhzrc9Wg6UXZpCcmKAWZYszU3sWYa

  const [publication, setPublication] = useState(null);
  console.log("done");
  useEffect(() => {
    const fetchPublication = async () => {
      const fetchedPublication = await getPublication(publicationId);
      setPublication(fetchedPublication.data.publication);
    };

    fetchPublication();
  }, []);
  return (
    <>
      {publication?.metadata && (
        <Box
          bg="white"
          p={5}
          mt={8}
          borderRadius="20px"
          textAlign="left"
          color="black"
        >
          <Markup>{publication.metadata.content}</Markup>
        </Box>
      )}
    </>
  );
}
