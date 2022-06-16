import { Box, Avatar, Button, Text, Divider, Flex } from '@chakra-ui/react';

import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useCampaignManager } from '../../hooks/useCampaignManager';
import { useCampaign } from '../../hooks/useCampaign';
import { useEffect } from 'react';
import { useSharedState } from '../../context/store';

export default function AdvertisersStatsMobile() {
  const { getCampaigns, getUserStatsByCampaign } = useCampaignManager();
  const { getAdvertiserPayouts, getNumberOfActions } = useCampaign();
  const [{ provider }, dispatch] = useSharedState();

  const ads = [];

  useEffect(() => {
    const getUserStats = async () => {
      const stats = await getUserStatsByCampaign('0x1');
      console.log(stats);
    };
    getUserStats();
  }, [provider]);

  return (
    <>
      {ads.length && (
        <Box mt={4} p={5} borderRadius="20px" boxShadow="lg" bg="#ffffff" color="#5C6F81">
          {console.log('ads: ', ads)}
          {ads.map((ad) => (
            <>
              <AdStats advertisers={ad} />
              {console.log('ad: ', ad)}
              <Divider borderColor="#BFC1C6" />
            </>
          ))}
        </Box>
      )}
    </>
  );
}

const AdStats = ({ ...ad }) => {
  const [settingState, setSettingState] = useState(false);
  const [advertisers, setAdvertisers] = useState(ad.advertisers);
  const [{ provider }, dispatch] = useSharedState();

  const [payoutsData, setPayoutsData] = useState([]);
  const [numberOfActions, setNumberOfActions] = useState([]);
  const [numberOfEvents, setNumberOfEvents] = useState(0);
  const [numberOfClicks, setNumberOfClicks] = useState(0);
  const [ads, setAds] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const campaigns = await getCampaigns('0x4a', '0x03ff');

      const numberOfAction = await getNumberOfActions(campaigns);
      const advertiserData = await getAdvertiserPayouts(campaigns);
      let numberOfEventsSum = 0;
      let numberOfClicksSum = 0;
      for (let i = 0; i < numberOfAction.length; i++) {
        numberOfEventsSum += numberOfAction[i].events;
        numberOfClicksSum += numberOfAction[i].clicks;
      }
      setNumberOfEvents(numberOfEventsSum);
      setNumberOfClicks(numberOfClicksSum);
      setNumberOfActions(numberOfAction);
      setPayoutsData(advertiserData);

      setAds([
        {
          name: 'InterFC',
          title: 'Fan Token summer special promotion',
          earned: '$ 236.50',
          mirrors: numberOfAction.length.toString(),
          clicks: numberOfClicksSum.toString(),
          events: numberOfEventsSum.toString(),
          totalEarn: '$ 432.78',
        },
      ]);
      console.log(numberOfClicksSum);
    };

    //get();
    getData();
  }, [provider]);

  return (
    <>
      {' '}
      <Box py={1}>
        {console.log('advertisers: ', advertisers)}
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
            <Avatar
              name="InterFC"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/FC_Internazionale_Milano_2021.svg/1200px-FC_Internazionale_Milano_2021.svg.png"
              size="sm"
              mr={2}
              fontWeight={600}
            />
            {advertisers.name}
          </Flex>
        </Button>

        <Box display={settingState ? 'block' : 'none'} textAlign="left">
          <Text fontSize={28} color="#1A4587" fontFamily="'Prompt', sans-serif">
            Campaing title
          </Text>
          <Text fontSize={15} color="#00203F">
            {advertisers.title}
          </Text>
          <Divider borderColor="#BFC1C6" />

          <Text fontSize={28} color="#1A4587" fontFamily="'Prompt', sans-serif">
            Earned
          </Text>
          <Text fontSize={15} color="#5C6F81">
            {advertisers.earned}
          </Text>
          <Divider borderColor="#BFC1C6" />

          <Text fontSize={28} color="#1A4587" fontFamily="'Prompt', sans-serif">
            Mirrors
          </Text>
          <Text fontSize={15} color="#5C6F81">
            {advertisers.mirrors}
          </Text>
          <Divider borderColor="#BFC1C6" />

          <Text fontSize={28} color="#1A4587" fontFamily="'Prompt', sans-serif">
            Clicks
          </Text>
          <Text fontSize={15} color="#5C6F81">
            {advertisers.clicks}
          </Text>
          <Divider borderColor="#BFC1C6" />

          <Text fontSize={28} color="#1A4587" fontFamily="'Prompt', sans-serif">
            Events
          </Text>
          <Text fontSize={15} color="#5C6F81">
            {advertisers.events}
          </Text>
          <Divider borderColor="#BFC1C6" />

          <Text fontSize={28} color="#1A4587" fontFamily="'Prompt', sans-serif">
            Total earn
          </Text>
          <Text fontSize={15} color="#5C6F81">
            {advertisers.totalEarn}
          </Text>
          <Divider borderColor="#BFC1C6" />
        </Box>
      </Box>
    </>
  );
};
