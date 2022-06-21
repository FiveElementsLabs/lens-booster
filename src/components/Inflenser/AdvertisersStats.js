import { Box, Table, TableContainer, Thead, Tbody, Th, Tr, Td, Avatar } from '@chakra-ui/react';

import { useCampaignManager } from '../../hooks/useCampaignManager';
import { getPublicationURI } from '../../hooks/getPublicationURI';
import { useSharedState } from '../../context/store';
import { useEffect, useState } from 'react';

export default function AdvertisersStats() {
  const { getUserStatsByCampaign } = useCampaignManager();
  const { getDefaultProfile } = getPublicationURI();
  const [{ provider }, dispatch] = useSharedState();

  const [campaignsPayed, setCampaignsPayed] = useState([]);

  useEffect(() => {
    const getUserStats = async () => {
      const userProfile = await getDefaultProfile();
      const campaings = await getUserStatsByCampaign(userProfile);
      setCampaignsPayed(campaings);
    };
    getUserStats();
  }, [provider]);

  return (
    <>
      {campaignsPayed.length != 0 && (
        <Box mt={8} p={5} borderRadius="20px" boxShadow="lg" bg="#ffffff" color="#5C6F81">
          <TableContainer>
            <Table size="sm" variant="simple">
              <Thead>
                <Tr borderColor="gray.500">
                  <Th fontSize={16} color="#1A4587" fontFamily="'Prompt', sans-serif" textTransform="none">
                    Advertiser
                  </Th>
                  <Th fontSize={16} color="#1A4587" fontFamily="'Prompt', sans-serif" textTransform="none">
                    Campaign title
                  </Th>
                  <Th fontSize={16} color="#1A4587" fontFamily="'Prompt', sans-serif" textTransform="none">
                    Earned
                  </Th>
                  <Th fontSize={16} color="#1A4587" fontFamily="'Prompt', sans-serif" textTransform="none">
                    Mirrors
                  </Th>
                  <Th fontSize={16} color="#1A4587" fontFamily="'Prompt', sans-serif" textTransform="none">
                    Clicks
                  </Th>
                  <Th fontSize={16} color="#1A4587" fontFamily="'Prompt', sans-serif" textTransform="none">
                    Events
                  </Th>
                  <Th fontSize={16} color="#1A4587" fontFamily="'Prompt', sans-serif" textTransform="none">
                    Total earn
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {campaignsPayed.map((campaign, index) => (
                  <>
                    <CampaignsStatsTab key={index} campaign={campaign} />
                  </>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
}

const CampaignsStatsTab = ({ ...props }) => {
  const campaign = props.campaign;
  return (
    <>
      <Tr>
        <Td fontSize={20} color="#00203F" fontFamily="'Prompt', sans-serif">
          <Avatar name={campaign.name} src={campaign.picture} size="xs" mr={2} fontWeight={600} />
          {campaign.name}
        </Td>

        <Td fontSize={15} color="#00203F" fontWeight={600}>
          Fan Token summer special promotion
        </Td>
        <Td fontWeight={400}>$ {campaign.earned / 1e6} </Td>
        <Td fontWeight={400}>{campaign.mirrors}</Td>
        <Td fontWeight={400}>{campaign.clicks.toNumber()}</Td>
        <Td fontWeight={400}>{campaign.actions.toNumber()}</Td>
        <Td fontWeight={400}>$ {campaign.earned / 1e6}</Td>
      </Tr>
    </>
  );
};
