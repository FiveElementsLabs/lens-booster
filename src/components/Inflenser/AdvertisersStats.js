import { Box, Table, TableContainer, Thead, Tbody, Th, Tr, Td, Avatar } from '@chakra-ui/react';

import { useCampaignManager } from '../../hooks/useCampaignManager';
import { useSharedState } from '../../context/store';
import { useEffect, useState } from 'react';

export default function AdvertisersStats() {
  const { getUserStatsByCampaign } = useCampaignManager();
  const [{ provider }, dispatch] = useSharedState();

  const [campaignsPayed, setCampaignsPayed] = useState([]);

  useEffect(() => {
    const getUserStats = async () => {
      const campaings = await getUserStatsByCampaign();
      setCampaignsPayed(campaings);
    };
    getUserStats();
  }, [provider]);

  return (
    <>
      <Box mt={8} p={5} borderRadius="20px" boxShadow="lg" bg="#ffffff" color="#5C6F81">
        <TableContainer>
          <Table size="sm" variant="simple">
            <Thead>
              <Tr borderColor="gray.500">
                <Th fontSize={16} color="#1A4587" fontFamily="'Prompt', sans-serif">
                  Advertiser
                </Th>
                <Th fontSize={16} color="#1A4587" fontFamily="'Prompt', sans-serif">
                  Campaign title
                </Th>
                <Th fontSize={16} color="#1A4587" fontFamily="'Prompt', sans-serif">
                  Earned
                </Th>
                <Th fontSize={16} color="#1A4587" fontFamily="'Prompt', sans-serif">
                  Mirrors
                </Th>
                <Th fontSize={16} color="#1A4587" fontFamily="'Prompt', sans-serif">
                  Clicks
                </Th>
                <Th fontSize={16} color="#1A4587" fontFamily="'Prompt', sans-serif">
                  Events
                </Th>
                <Th fontSize={16} color="#1A4587" fontFamily="'Prompt', sans-serif">
                  Total earn
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {campaignsPayed.length != 0 &&
                campaignsPayed.map((campaign, index) => (
                  <>
                    <CampaignsStatsTab key={index} campaign={campaign} />
                  </>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
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
        <Td fontWeight={300}>$ {campaign.earned} </Td>
        <Td fontWeight={300}>{campaign.mirrors}</Td>
        <Td fontWeight={300}>{campaign.clicks.toNumber()}</Td>
        <Td fontWeight={300}>{campaign.actions.toNumber()}</Td>
        <Td fontWeight={300}>$ {campaign.earned}</Td>
      </Tr>
    </>
  );
};
