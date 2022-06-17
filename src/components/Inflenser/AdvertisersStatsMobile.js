import { Box, Avatar, Button, Text, Divider, Flex } from '@chakra-ui/react';

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useCampaignManager } from '../../hooks/useCampaignManager';
import { getPublicationURI } from '../../hooks/getPublicationURI';
import { useEffect } from 'react';
import { useSharedState } from '../../context/store';

export default function AdvertisersStatsMobile() {
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
        <Box mt={4} p={5} borderRadius="20px" boxShadow="lg" bg="#ffffff" color="#5C6F81">
          {campaignsPayed.map((campaign) => (
            <>
              <AdStats campaign={campaign} />

              <Divider borderColor="#BFC1C6" />
            </>
          ))}
        </Box>
      )}
    </>
  );
}

const AdStats = ({ ...props }) => {
  const [settingState, setSettingState] = useState(false);
  const campaign = props.campaign;

  return (
    <>
      <Box py={1}>
        <Button
          color="#00203F"
          justifyContent="space-between"
          fontFamily="'Prompt', sans-serif"
          align="left"
          rightIcon={!settingState ? <TriangleDownIcon color="#FF6827" /> : <TriangleUpIcon color="#FF6827" />}
          bg="#ffffff"
          w="100%"
          paddingInlineStart={0}
          paddingInlineEnd={0}
          _focus={{
            boxShadow: '0 0 0 0 rgba(88, 144, 255, .75), 0 0 0 rgba(0, 0, 0, .15)',
          }}
          _hover={{ bg: '#ffffff' }}
          _active={{
            bg: '#ffffff',
            transform: 'scale(1)',
            borderColor: '#ffffff',
          }}
          onClick={() => setSettingState(!settingState)}
        >
          <Flex alignItems="center">
            <Avatar name={campaign.name} src={campaign.picture} size="sm" mr={2} fontWeight={600} />
            {campaign.name}
          </Flex>
        </Button>

        <Box display={settingState ? 'block' : 'none'} textAlign="left">
          <Text fontSize={28} color="#1A4587" fontFamily="'Prompt', sans-serif">
            Campaing title
          </Text>
          <Text fontSize={15} color="#00203F">
            Campaing title
          </Text>
          <Divider borderColor="#BFC1C6" />

          <Text fontSize={28} color="#1A4587" fontFamily="'Prompt', sans-serif">
            Earned
          </Text>
          <Text fontSize={15} color="#5C6F81">
            {campaign.earned}
          </Text>
          <Divider borderColor="#BFC1C6" />

          <Text fontSize={28} color="#1A4587" fontFamily="'Prompt', sans-serif">
            Mirrors
          </Text>
          <Text fontSize={15} color="#5C6F81">
            {campaign.mirrors}
          </Text>
          <Divider borderColor="#BFC1C6" />

          <Text fontSize={28} color="#1A4587" fontFamily="'Prompt', sans-serif">
            Clicks
          </Text>
          <Text fontSize={15} color="#5C6F81">
            {campaign.clicks.toNumber()}
          </Text>
          <Divider borderColor="#BFC1C6" />

          <Text fontSize={28} color="#1A4587" fontFamily="'Prompt', sans-serif">
            Events
          </Text>
          <Text fontSize={15} color="#5C6F81">
            {campaign.actions.toNumber()}
          </Text>
          <Divider borderColor="#BFC1C6" />

          <Text fontSize={28} color="#1A4587" fontFamily="'Prompt', sans-serif">
            Total earn
          </Text>
          <Text fontSize={15} color="#5C6F81">
            {campaign.earned}
          </Text>
        </Box>
      </Box>
    </>
  );
};
