import {
  Box,
  Text,
  Flex,
  Spacer,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Avatar,
  Heading,
  Divider,
  useMediaQuery,
} from '@chakra-ui/react';

import AdvertisersStats from './AdvertisersStats';
import AdvertisersStatsMobile from './AdvertisersStatsMobile';

import { useCampaignManager } from '../../hooks/useCampaignManager';
import { getPublicationURI } from '../../hooks/getPublicationURI';
import { useSharedState } from '../../context/store';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [isLargerThan640] = useMediaQuery('(min-width: 640px)');
  const { getUserStatsByCampaign } = useCampaignManager();
  const { getDefaultProfile } = getPublicationURI();
  const [{ provider }, dispatch] = useSharedState();

  const [campaignsPayed, setCampaignsPayed] = useState([]);
  const [totalEarn, setTotalEarn] = useState(0);
  const [totalMirror, setTotalMirror] = useState(0);
  const [totalClicks, setTotalClicks] = useState(0);
  const [totalEvents, setTotalEvents] = useState(0);

  useEffect(() => {
    const getUserStats = async () => {
      const userProfile = await getDefaultProfile();
      const campaings = await getUserStatsByCampaign(userProfile);
      let earnTotal = 0;
      let mirrorTotal = 0;
      let clickTotal = 0;
      let eventsTotal = 0;
      for (let i = 0; i < campaings.length; i++) {
        earnTotal += campaings[i].earned;
        mirrorTotal += campaings[i].mirrors;
        clickTotal += campaings[i].clicks.toNumber();
        eventsTotal += campaings[i].actions.toNumber();
      }
      setTotalEarn(earnTotal);
      setTotalClicks(clickTotal);
      setTotalEvents(eventsTotal);
      setTotalMirror(mirrorTotal);
      setCampaignsPayed(campaings);
    };

    getUserStats();
  }, [provider]);
  return (
    <>
      <Box mt={8} p={5} borderRadius="20px" boxShadow="lg" bg="white" fontFamily="'Prompt', sans-serif" width="auto">
        <Flex alignItems="center" display={{ base: 'block', md: 'flex' }}>
          <Text color="#FF6827" fontSize={26} textAlign="left" mb={{ base: '10px', md: '0' }}>
            Total earned
            <Text
              color="#FF6827"
              fontSize={30}
              textAlign="left"
              verticalAlign="center"
              fontWeight={600}
              lineHeight={{ base: 1, md: 1.5 }}
            >
              $ {totalEarn / 1e6}
            </Text>
          </Text>

          <Spacer />
          <Text color="#1A4587" fontSize={24} textAlign="left" mb={{ base: '10px', md: '0' }}>
            Total mirrors
            <Text color="#00203F" fontSize={24} verticalAlign="center" textAlign="left" fontWeight={600}>
              {totalMirror}
            </Text>
          </Text>
          <Spacer />
          <Text color="#1A4587" fontSize={24} textAlign="left" mb={{ base: '10px', md: '0' }}>
            Total clicks
            <Text color="#00203F" fontSize={24} textAlign="left" fontWeight={600}>
              {totalClicks}
            </Text>
          </Text>
          <Spacer />
          <Text color="#1A4587" fontSize={24} textAlign="left">
            Total events
            <Text color="#00203F" fontSize={24} textAlign="left" fontWeight={600}>
              {totalEvents}
            </Text>
          </Text>
          <Spacer />
        </Flex>
      </Box>

      {isLargerThan640 ? <AdvertisersStats /> : <AdvertisersStatsMobile />}
    </>
  );
}
