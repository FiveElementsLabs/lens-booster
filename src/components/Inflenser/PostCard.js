import { Box, Text, Link, Image, Flex, Avatar, Button, Select, option, useMediaQuery } from '@chakra-ui/react';
import { InfoOutlineIcon, TriangleDownIcon, TriangleUpIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

import { useEffect, useState } from 'react';
import moment from 'moment';

import { uploadIpfs, uploadIpfsRedirect } from '../../lib/ipfs';
import IFramely from '../shared/IFramely/index.tsx';
import { useMirror } from '../../hooks/useMirror';
import { getPublicationURI } from '../../hooks/getPublicationURI';
import { useCampaignManager } from '../../hooks/useCampaignManager';
import { useCampaign } from '../../hooks/useCampaign';
import { useSharedState } from '../../context/store';
import { fetchPublication } from '../../hooks/usePublication';

export default function PostCard({ publicationId }) {
  const { createPost } = useMirror();
  const { getDefaultProfile } = getPublicationURI();
  const { getCampaigns, getUserScore } = useCampaignManager();
  const { getAdvertiserPayouts, getNumberOfActions, getCampaignInfo } = useCampaign();
  const [{ provider, account }] = useSharedState();

  const [publication, setPublication] = useState(<></>);
  const [linkExternal, setLinkExternal] = useState('');
  const [arrayJsxPost2, setArrayJsxPost2] = useState(<></>);
  const [settingState, useSettingState] = useState(false);
  const [statsState, setStatsState] = useState(false);
  const [userProfileId, setUserProfileId] = useState('');
  const [userProfileScore, setUserProfileScore] = useState(-1);
  const [numberOfLines, setNumberOfLines] = useState(3);
  const [numberOfEvents, setNumberOfEvents] = useState(0);
  const [numberOfPosts, setNumberOfPosts] = useState(0);
  const [numberOfClicks, setNumberOfClicks] = useState(0);
  const [postPayout, setPostPayout] = useState(0);
  const [clickPayout, setClickPayout] = useState(0);
  const [actionPayout, setActionPayout] = useState(0);
  const [duration, setDuration] = useState(0);
  const [expired, setExpired] = useState(false);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [isLargerThan640] = useMediaQuery('(min-width: 640px)');
  let profileIdPostId = publicationId.split('-');

  const getExpiration = async () => {
    const campaigns = await getCampaigns(profileIdPostId[0], profileIdPostId[1]);

    const campaignInfo = await getCampaignInfo(campaigns);

    setExpired(Number(campaignInfo[3]) + Number(campaignInfo[2]) > Date.now() / 1000);
    return true;
  };

  const getPub = async () => {
    if (!(await getExpiration())) return;
    const fetchedData = await fetchPublication(publicationId);

    setArrayJsxPost2(fetchedData.arrayJsxPost);
    setPublication(fetchedData.fetchedPublication);
    setLinkExternal(fetchedData.linkExternal);
  };

  const getData = async () => {
    const userProfile = await getDefaultProfile();
    setUserProfileId(userProfile);
    const campaigns = await getCampaigns(profileIdPostId[0], profileIdPostId[1]);

    const numberOfAction = await getNumberOfActions(campaigns);
    const advertiserData = await getAdvertiserPayouts(campaigns);
    const campaignInfo = await getCampaignInfo(campaigns);

    let numberOfEventsSum = 0;
    let numberOfClicksSum = 0;

    for (let i = 0; i < numberOfAction.length; i++) {
      numberOfEventsSum += numberOfAction[i].events;
      numberOfClicksSum += numberOfAction[i].clicks;
    }
    setNumberOfEvents(numberOfEventsSum);
    setNumberOfClicks(numberOfClicksSum);
    setNumberOfPosts(numberOfAction.length);

    let userScore;
    try {
      userScore = await getUserScore(userProfile);
    } catch (error) {
      console.log(error);
    }
    setUserProfileScore(userScore);

    setPostPayout(Number(advertiserData[0]).toFixed(2) * (userScore || 1000));
    setClickPayout(Number(advertiserData[3]).toFixed(2));
    setActionPayout(Number(advertiserData[6]).toFixed(2));

    setDuration(moment().to(moment.unix(Number(campaignInfo[3]) + Number(campaignInfo[2]))));
    const budget =
      Number(Number(advertiserData[2]).toFixed(2)) +
      Number(Number(advertiserData[5]).toFixed(2)) +
      Number(Number(advertiserData[8]).toFixed(2));
    setRemainingBudget(budget);
  };

  useEffect(() => {
    getExpiration();
    getPub();
  }, [provider]);

  useEffect(() => {
    getData();
  }, [provider]);

  const handleCreatePost = async () => {
    if (userProfileScore.toString() === '0') window.location = 'https://discord.gg/bxfTM37Xyk';
    const content = publication.metadata.content;
    const campaignsAddress = await getCampaigns(profileIdPostId[0], profileIdPostId[1]);

    const url = content.match(/(((https?:\/\/)|(www\.))[^\s]+)/g) || [];
    const redirectObj = {
      urlToRedirect: url[0].slice(0, -1),
      inflenserId: userProfileId,
      campaignsAddress: campaignsAddress,
    };
    const redirectIpfs = await uploadIpfsRedirect(redirectObj);

    const urlIndex = content.indexOf(url[0]) || [];
    const newContent = `${content.substring(0, urlIndex)}https://lensbooster.xyz/redirect/${
      redirectIpfs.path
    }${content.substring(urlIndex + url[0].length - 1, content.length)}`;

    let publicationMetaData = JSON.parse(JSON.stringify(publication));
    publicationMetaData.metadata.content = `${newContent}\n\n #adv #lensbooster`;
    const ipfsContent = await uploadIpfs(publicationMetaData.metadata);
    await createPost(userProfileId.toHexString(), `https://ipfs.infura.io/ipfs/${ipfsContent.path}`, campaignsAddress);
  };

  return (
    <>
      {publication?.metadata && expired && userProfileScore != -1 && (
        <>
          <Flex
            bg="white"
            p={5}
            mt={5}
            borderRadius="20px"
            textAlign="left"
            color="black"
            minHeight="642px"
            display={{ base: 'block', md: 'flex' }}
            fontWeight={400}
          >
            <Box w={{ base: 'auto', md: '65%' }} fontSize="18px" mt={2}>
              <Flex marginBottom="1.5rem">
                <Avatar
                  src={
                    publication.profile.picture?.original?.url ||
                    'https://www.universodanza.org/wordpress/wp-content/uploads/2011/06/default-avatar.png'
                  }
                />
                <Box marginTop="auto" marginBottom="auto" marginLeft="1rem" fontSize="16px">
                  <Text variant="inflenserPageTitles">{publication.profile.name}</Text>
                  <Link
                    fontWeight={500}
                    _hover={{ textDecoration: 'none' }}
                    color="#1988F7"
                    href={`https://lenster.xyz/u/${publication.profile.handle}`}
                  >
                    @{publication.profile.handle}
                  </Link>
                </Box>
                <Box marginLeft="auto" color="#5C6F81">
                  {publication.createdAt && (
                    <Text fontSize={15} whiteSpace="nowrap">
                      {moment(publication.createdAt).fromNow()}
                    </Text>
                  )}
                </Box>
              </Flex>
              <Text whiteSpace="pre-line" color="#00203F" w="90%" fontSize="20px" noOfLines={[numberOfLines, 1000]}>
                {arrayJsxPost2.map((e) => e)}
              </Text>
              {!isLargerThan640 && (
                <Button
                  variant="showLessMore"
                  onClick={() => (numberOfLines == 100 ? setNumberOfLines(3) : setNumberOfLines(100))}
                  rightIcon={numberOfLines == 3 ? <ChevronDownIcon color="black" /> : <ChevronUpIcon color="black" />}
                >
                  {numberOfLines == 100 ? 'Show Less' : 'Show More'}
                </Button>
              )}
              {publication.metadata.media &&
                publication.metadata.media?.map((e) => {
                  return (
                    e?.original?.url && (
                      <Image marginTop="15px" w={{ base: '100%', md: '50%' }} src={e?.original?.url} />
                    )
                  );
                })}
              {linkExternal && (
                <Box width="100%">
                  <IFramely url={linkExternal} />
                </Box>
              )}
            </Box>
            <Box w={{ base: '100%', md: '35%' }} mt={{ base: 4, md: 2 }} position="relative">
              <Box
                marginLeft={{ base: 0, md: 5 }}
                mb={{ base: 4, md: 0 }}
                borderRadius={8}
                bg="#F0F3FA"
                fontWeight={500}
                h="fit-content"
                py={4}
              >
                <Box paddingLeft={6}>
                  <Flex gap="2">
                    <Box>
                      <InfoOutlineIcon color="#5C6F81" />
                    </Box>
                    <Box>
                      <Text variant="inflenserPageTitles" color="#1A4587">
                        Estimated payoff for inflenser
                      </Text>
                      <Text variant="inflenserPageTitles" color={'black'}>
                        10
                      </Text>
                    </Box>
                  </Flex>
                </Box>

                <Box paddingTop={2} paddingLeft={6}>
                  <Flex gap="2">
                    <Box>
                      <InfoOutlineIcon color="#5C6F81" />
                    </Box>
                    <Box>
                      <Text variant="inflenserPageTitles" color="#1A4587">
                        Remaining Budget
                      </Text>
                      <Text variant="inflenserPageTitles" color={'black'}>
                        {remainingBudget / 1e6} $
                      </Text>
                    </Box>
                  </Flex>
                </Box>

                <Box paddingTop={2} paddingLeft={6}>
                  <Flex gap="2">
                    <Box>
                      <InfoOutlineIcon color="#5C6F81" />
                    </Box>
                    <Box>
                      <Text variant="inflenserPageTitles" color="#1A4587">
                        Expiring
                      </Text>
                      <Text variant="inflenserPageTitles" color={'black'}>
                        {duration}
                      </Text>
                    </Box>
                  </Flex>
                </Box>

                <Box paddingTop={2} paddingLeft={6}>
                  <Flex gap="2">
                    <Box>
                      <InfoOutlineIcon color="#5C6F81" />
                    </Box>
                    <Box>
                      <Text variant="inflenserPageTitles" color="#1A4587">
                        # of posts by inflensers
                      </Text>
                      <Text variant="inflenserPageTitles" color={'black'}>
                        {numberOfPosts}
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
              <Box marginTop={4} mb={{ base: 4, md: 0 }} fontSize="20px">
                <Flex gap={4} fontWeight={500}>
                  <Box marginLeft={{ base: 0, md: 5 }} flexBasis="100%">
                    <Button
                      variant="postcardStats"
                      p={5}
                      rightIcon={
                        !settingState ? <TriangleDownIcon color="#FF6827" /> : <TriangleUpIcon color="#FF6827" />
                      }
                      borderBottomRadius={settingState ? '0' : '8px'}
                      onClick={() => useSettingState(!settingState)}
                    >
                      Stats
                    </Button>
                    <Box
                      color="#1A4587"
                      bg="#F0F3FA"
                      px={5}
                      pb={2}
                      lineHeight="20px"
                      display={settingState ? 'block' : 'none'}
                      borderBottomRadius="8px"
                      paddingTop={2}
                    >
                      <Flex gap="2" mb={3}>
                        <Box>
                          <InfoOutlineIcon color="#5C6F81" />
                        </Box>
                        <Box>
                          <Text variant="inflenserPageTitles" color="#1A4587">
                            Clicks
                          </Text>
                          <Text variant="inflenserPageTitles" color={'black'}>
                            {numberOfClicks}
                          </Text>
                        </Box>
                      </Flex>
                      <Flex gap="2" mb={3}>
                        <Box>
                          <InfoOutlineIcon color="#5C6F81" />
                        </Box>
                        <Box>
                          <Text variant="inflenserPageTitles" color="#1A4587">
                            Actions
                          </Text>
                          <Text variant="inflenserPageTitles" color={'black'}>
                            {numberOfEvents}
                          </Text>
                        </Box>
                      </Flex>
                      <Flex gap="2" mb={3}>
                        <Box>
                          <InfoOutlineIcon color="#5C6F81" />
                        </Box>
                        <Box>
                          <Text variant="inflenserPageTitles" color="#1A4587">
                            Re-Posts
                          </Text>
                          <Text variant="inflenserPageTitles" color={'black'}>
                            {numberOfPosts}
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                  <Box flexBasis="100%">
                    <Button
                      variant="postcardStats"
                      p={5}
                      rightIcon={
                        !statsState ? <TriangleDownIcon color="#FF6827" /> : <TriangleUpIcon color="#FF6827" />
                      }
                      borderBottomRadius={statsState ? '0' : '8px'}
                      onClick={() => setStatsState(!statsState)}
                    >
                      Metrics
                    </Button>
                    <Box
                      color="#1A4587"
                      bg="#F0F3FA"
                      px={5}
                      pb={2}
                      lineHeight="20px"
                      display={statsState ? 'block' : 'none'}
                      borderBottomRadius="8px"
                      paddingTop={2}
                    >
                      <Flex gap="2" mb={3}>
                        <Box>
                          <InfoOutlineIcon color="#5C6F81" />
                        </Box>
                        <Box>
                          <Text variant="inflenserPageTitles" color="#1A4587">
                            CpC
                          </Text>
                          <Text variant="inflenserPageTitles" color={'black'}>
                            {clickPayout / 1e6} $
                          </Text>
                        </Box>
                      </Flex>
                      <Flex gap="2" mb={3}>
                        <Box>
                          <InfoOutlineIcon color="#5C6F81" />
                        </Box>
                        <Box>
                          <Text variant="inflenserPageTitles" color="#1A4587">
                            CpA
                          </Text>
                          <Text variant="inflenserPageTitles" color={'black'}>
                            {actionPayout / 1e6} $
                          </Text>
                        </Box>
                      </Flex>
                      <Flex gap="2" mb={3}>
                        <Box>
                          <InfoOutlineIcon color="#5C6F81" />
                        </Box>
                        <Box>
                          <Text variant="inflenserPageTitles" color="#1A4587">
                            CpP
                          </Text>
                          <Text variant="inflenserPageTitles" color={'black'}>
                            {postPayout / 1e6} $
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                </Flex>
              </Box>
              <Box
                mt="auto"
                height="fit-content"
                position={{ base: 'static', md: 'absolute' }}
                bottom="0"
                left="20px"
                w="100%"
              >
                <Flex marginRight={{ base: 0, md: '15px' }} display={{ base: 'block', md: 'flex' }}>
                  <Box
                    bg="#F0F3FA"
                    color=" #5C6F81"
                    fontSize="15px"
                    fontStyle="italic"
                    display="flex"
                    padding="16px"
                    borderRadius="8px"
                    w={{ base: '100%', md: '60%' }}
                    mr="9px"
                    mb={{ base: 4, md: 0 }}
                  >
                    Sponsored content with&nbsp;
                    <Text fontSize="15px" fontStyle="italic" color="#1988F7" textDecorationLine="underline">
                      Booster
                    </Text>
                  </Box>
                  <Button
                    padding="15px 14px"
                    w={{ base: '100%', md: '38%' }}
                    h="auto"
                    onClick={() => handleCreatePost()}
                    disabled={userProfileId.toString() == '0'}
                  >
                    {userProfileScore.toString() == '0' && userProfileId.toString() != '0' ? 'BE WHITELISTED' : 'POST'}
                  </Button>
                </Flex>
              </Box>
            </Box>
          </Flex>
        </>
      )}
    </>
  );
}
