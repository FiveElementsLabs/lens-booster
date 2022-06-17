import { Box, Text, Flex, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCampaignManager } from '../../hooks/useCampaignManager';
import { useSharedState } from '../../context/store';

import PostCard from './PostCard';

export default function Dashboard() {
  const { getCampaignsPublicationID } = useCampaignManager();
  const [{ provider }, dispatch] = useSharedState();
  const [publicationIds, setPublicationIds] = useState();

  useEffect(() => {
    const getPubIds = async () => {
      const pubs = await getCampaignsPublicationID();
      setPublicationIds(pubs);
    };
    getPubIds();
  }, [provider]);
  return (
    <>
      <Box bg="#1A4587" p={5} mt={8} borderRadius="20px">
        <Heading color="white">Active Campaigns</Heading>
      </Box>

      {/* Array of posts*/}
      {publicationIds &&
        publicationIds.length != 0 &&
        publicationIds.map((id, index) => <PostCard key={index} publicationId={id[0]} />)}
    </>
  );
}
