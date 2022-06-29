import { Box, Text, Flex, Heading, Image, useFocusOnPointerDown } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCampaignManager } from '../../hooks/useCampaignManager';
import { useCampaign } from '../../hooks/useCampaign';
import { useSharedState } from '../../context/store';

import PostCard from './PostCard';

export default function Dashboard() {
  const { getCampaignInfo } = useCampaign();
  const { getCampaignsPublicationID, getCampaigns } = useCampaignManager();
  const [{ provider, account }] = useSharedState();
  const [publicationIds, setPublicationIds] = useState(null);
  const [loading, setLoading] = useState(true);
  const [allCampaignsExpired, setAllCampaignsExpired] = useState(false);

  useEffect(() => {
    const getPubIdsData = async () => {
      setLoading(true);
      let pubs = await getCampaignsPublicationID();
      for (let i = 0; i < pubs.length; i++) {
        let profileIdPostId = pubs[i][0].split('-');

        let campaigns = await getCampaigns(profileIdPostId[0], profileIdPostId[1]);
        let campaignInfo = await getCampaignInfo(campaigns);

        if (Number(campaignInfo[3]) + Number(campaignInfo[2]) < Date.now() / 1000) pubs.splice(i, 1);
      }

      if (pubs.length == 0) {
        setAllCampaignsExpired(true);
      }
      setPublicationIds(pubs);
      setLoading(false);
    };
    getPubIdsData();
  }, [provider]);

  return (
    <>
      <Box bg="#1A4587" p={5} mt={8} borderRadius="20px" fontWeight={400}>
        <Heading color="white" fontFamily="'Prompt', sans-serif">
          Active Campaigns
        </Heading>
      </Box>
      {loading && (
        <>
          <Image src="/images/Lens_Loader_Light.gif" boxSize="120px" m="auto" />
        </>
      )}

      {allCampaignsExpired && publicationIds?.length == 0 && !loading && (
        <>
          <Box>
            <Text variant="title" fontSize={32} opacity={0.8}>
              No Active Campaigns Found
            </Text>
            <Text variant="title" fontSize={24} opacity={0.6}>
              Come back later...
            </Text>
          </Box>
        </>
      )}
      {/* Array of posts*/}
      {publicationIds &&
        publicationIds.length != 0 &&
        publicationIds.map((id, index) => <PostCard key={index} publicationId={id[0]} />)}
    </>
  );
}
