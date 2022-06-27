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
            <Table size="sm" variant="classic">
              <Thead>
                <Tr borderColor="gray.500">
                  <Th>Advertiser</Th>
                  <Th>Campaign title</Th>
                  <Th>Earned</Th>
                  <Th>Mirrors</Th>
                  <Th>Clicks</Th>
                  <Th>Events</Th>
                  <Th>Total earn</Th>
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
        <Td>$ {campaign.earned / 1e6} </Td>
        <Td>{campaign.mirrors}</Td>
        <Td>{campaign.clicks.toNumber()}</Td>
        <Td>{campaign.actions.toNumber()}</Td>
        <Td>$ {campaign.earned / 1e6}</Td>
      </Tr>
    </>
  );
};
