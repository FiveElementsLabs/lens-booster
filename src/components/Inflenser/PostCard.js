import { Box, Text, Link, Image, Flex, Avatar, Button, Select, option, useMediaQuery } from '@chakra-ui/react';
import { InfoOutlineIcon, TriangleDownIcon, TriangleUpIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

import { useEffect, useState } from 'react';
import moment from 'moment';

import { getIpfs } from '../../lib/ipfs';
import { getPublication } from '../../hooks/getPublication';
import IFramely from '../shared/IFramely/index.tsx';
import { useMirror } from '../../hooks/useMirror';
import { getPublicationURI } from '../../hooks/getPublicationURI';

export default function PostCard({ publicationId }) {
  const { createPost } = useMirror();

  //https://ipfs.infura.io/ipfs/QmVSNBUEKM5JVnus1bhzrc9Wg6UXZpCcmKAWZYszU3sWYa
  const STATIC_ASSETS = 'https://assets.lenster.xyz/images';
  const [publication, setPublication] = useState(<></>);
  const [linkExternal, setLinkExternal] = useState('');
  const [arrayJsxPost2, setArrayJsxPost2] = useState(<></>);
  const [settingState, useSettingState] = useState(false);
  const [statsState, setStatsState] = useState(false);
  const [postUri, setPostUri] = useState('');
  const [userProfileId, setUserProfileId] = useState('');
  const [numberOfLines, setNumberOfLines] = useState('');
  const [isLargerThan640] = useMediaQuery('(min-width: 640px)');

  const { getPubURI, getDefaultProfile } = getPublicationURI();
  let profileIdPostId = publicationId.split('-');

  useEffect(() => {
    const fetchPublication = async () => {
      const fetchedPublication = await getPublication(publicationId);
      setNumberOfLines(3);
      let arrayJsxPost = [];
      /*
      <Text> asjdajsdjajs <Link>@lens</Link> ahshdahsdh </Text>
      */
      const hashflags = ['lenster', 'bitcoin', 'ethereum', 'lens'];
      let indexAt = [];
      let index = 0;
      let lastIndex = 0;
      let lastUrlIndex = 0;
      const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
      const url = fetchedPublication.data.publication.metadata.content.match(urlRegex) || [];
      const urlIndex =
        url?.map((u) => {
          return fetchedPublication.data.publication.metadata.content.indexOf(u);
        }) || [];

      if (!url) {
        urlIndex.push(-1);
        url.push('');
      }
      if (urlIndex != -1) setLinkExternal(url[0]);
      while (index != -1) {
        let appIndex = fetchedPublication.data.publication.metadata.content.indexOf('@', index + 1);

        let hashtagIndex = fetchedPublication.data.publication.metadata.content.indexOf('#', index + 1);

        index = Math.min(appIndex != -1 ? appIndex : Infinity, hashtagIndex != -1 ? hashtagIndex : Infinity);

        let spaceIndex = fetchedPublication.data.publication.metadata.content.indexOf(' ', index);
        //indexAt.push({ startIndex: index, endIndex: spaceIndex }); // push the index of the @
        if (index == -1 || index == Infinity) {
          if (
            fetchedPublication.data.publication.metadata.content.length > urlIndex[lastUrlIndex] &&
            lastIndex < urlIndex[lastUrlIndex]
          ) {
            arrayJsxPost.push(
              <>{fetchedPublication.data.publication.metadata.content.substring(lastIndex, urlIndex[lastUrlIndex])}</>
            );
            arrayJsxPost.push(
              <Link
                color="#1988F7"
                href={fetchedPublication.data.publication.metadata.content.substring(
                  urlIndex[lastUrlIndex],
                  urlIndex[lastUrlIndex] + url[lastUrlIndex].length
                )}
              >
                {fetchedPublication.data.publication.metadata.content.substring(
                  urlIndex[lastUrlIndex],
                  urlIndex[lastUrlIndex] + url[lastUrlIndex].length
                )}
              </Link>
            );
            arrayJsxPost.push(
              <>
                {fetchedPublication.data.publication.metadata.content.substring(
                  urlIndex[lastUrlIndex] + url[lastUrlIndex].length,
                  fetchedPublication.data.publication.metadata.content.length
                )}
              </>
            );
          } else {
            arrayJsxPost.push(
              <>
                {fetchedPublication.data.publication.metadata.content.substring(
                  lastIndex,
                  fetchedPublication.data.publication.metadata.content.length
                )}
              </>
            );
          }
          break;
        } else {
          if (lastIndex < urlIndex[lastUrlIndex] && index > urlIndex[lastUrlIndex]) {
            arrayJsxPost.push(
              <>{fetchedPublication.data.publication.metadata.content.substring(lastIndex, urlIndex[lastUrlIndex])}</>
            );

            arrayJsxPost.push(
              <Link
                color="#1988F7"
                href={fetchedPublication.data.publication.metadata.content.substring(
                  urlIndex[lastUrlIndex],
                  urlIndex[lastUrlIndex] + url[lastUrlIndex].length
                )}
              >
                {fetchedPublication.data.publication.metadata.content.substring(
                  urlIndex[lastUrlIndex],
                  urlIndex[lastUrlIndex] + url[lastUrlIndex].length
                )}
              </Link>
            );
            arrayJsxPost.push(
              <>
                {fetchedPublication.data.publication.metadata.content.substring(
                  urlIndex[lastUrlIndex] + url[lastUrlIndex].length,
                  index
                )}
              </>
            );
            lastUrlIndex++;
          } else {
            arrayJsxPost.push(<>{fetchedPublication.data.publication.metadata.content.substring(lastIndex, index)}</>);
          }
        }

        if (index != -1 && index != Infinity) {
          if (index == appIndex) {
            arrayJsxPost.push(
              <Link
                color="#1988F7"
                href={`https://lenster.xyz/u/${fetchedPublication.data.publication.metadata.content
                  .substring(index, spaceIndex)
                  .trim()
                  .slice(1)}`}
              >
                {fetchedPublication.data.publication.metadata.content.substring(index, spaceIndex)}
              </Link>
            );
          } else {
            arrayJsxPost.push(
              <Box display="inline-flex">
                <Link
                  color="#1988F7"
                  href={`https://lenster.xyz/search?q=${fetchedPublication.data.publication.metadata.content
                    .substring(index, spaceIndex)
                    .trim()
                    .slice(1)
                    .toLowerCase()}&type=pubs&src=link_click`}
                >
                  {fetchedPublication.data.publication.metadata.content.substring(index - 1, spaceIndex).toUpperCase()}
                </Link>
                {hashflags.includes(
                  fetchedPublication.data.publication.metadata.content
                    .substring(index, spaceIndex)
                    .trim()
                    .slice(1)
                    .toLowerCase()
                ) && (
                  <Image
                    height={4}
                    marginTop="auto"
                    marginBottom="auto"
                    src={`${STATIC_ASSETS}/hashflags/${fetchedPublication.data.publication.metadata.content
                      .substring(index, spaceIndex)
                      .trim()
                      .slice(1)
                      .toLowerCase()}.png`}
                  />
                )}
              </Box>
            );
          }
        }
        lastIndex = spaceIndex;
      }

      setArrayJsxPost2(arrayJsxPost);
      setPublication(fetchedPublication.data.publication);
    };

    fetchPublication();
  }, []);

  useEffect(() => {
    const getURI = async () => {
      const URI = await getPubURI(profileIdPostId[0], profileIdPostId[1]);
      setPostUri(URI);
    };
    const getUserProfileId = async () => {
      const userProfile = await getDefaultProfile();
      setUserProfileId(userProfile);
    };

    getURI();
    getUserProfileId();
  }, []);

  return (
    <>
      {publication?.metadata && (
        <>
          <Flex
            bg="white"
            p={5}
            mt={5}
            borderRadius="20px"
            textAlign="left"
            color="black"
            minHeight="630px"
            display={{ base: 'block', md: 'flex' }}
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
                  <Text fontWeight={600} fontFamily="'Prompt', sans-serif">
                    {publication.profile.name}
                  </Text>
                  <Link color="#1988F7" href={`https://lenster.xyz/u/${publication.profile.handle}`}>
                    @{publication.profile.handle}
                  </Link>
                </Box>
                <Box marginLeft="auto" color="#5C6F81" fontSize={15}>
                  {publication.createdAt && <Text whiteSpace="nowrap">{moment(publication.createdAt).fromNow()}</Text>}
                </Box>
              </Flex>
              <Text whiteSpace="pre-line" color="#00203F" w="90%" noOfLines={[numberOfLines, 1000]}>
                {arrayJsxPost2.map((e) => e)}
              </Text>
              {!isLargerThan640 && (
                <Button
                  mt="10px"
                  fontStyle="italic"
                  bg="white"
                  fontSize="15px"
                  onClick={() => (numberOfLines == 100 ? setNumberOfLines(3) : setNumberOfLines(100))}
                  _focus={{
                    boxShadow: '0 0 0 0 rgba(88, 144, 255, .75), 0 0 0 rgba(0, 0, 0, .15)',
                  }}
                  _hover={{ bg: 'white' }}
                  _active={{
                    bg: 'white',
                    transform: 'scale(1)',
                    borderColor: 'white',
                  }}
                  rightIcon={numberOfLines == 3 ? <ChevronDownIcon color="black" /> : <ChevronUpIcon color="black" />}
                  justifyContent="center"
                  marginLeft="auto"
                  paddingInlineStart={0}
                  paddingInlineEnd={0}
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
                      <Text fontFamily="'Prompt', sans-serif" color="#1A4587">
                        Estimated payoff for inflenser
                      </Text>
                      <Text fontFamily="'Roboto', sans-serif" color={'black'} fontWeight={600}>
                        10 $
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
                      <Text fontFamily="'Prompt', sans-serif" color="#1A4587">
                        Remaining Budget
                      </Text>
                      <Text fontFamily="'Roboto', sans-serif" color={'black'} fontWeight={600}>
                        10 $
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
                      <Text fontFamily="'Prompt', sans-serif" color="#1A4587">
                        Duration
                      </Text>
                      <Text fontFamily="'Roboto', sans-serif" color={'black'} fontWeight={600}>
                        10 $
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
                      <Text fontFamily="'Prompt', sans-serif" color="#1A4587">
                        # of posts by inflensers
                      </Text>
                      <Text fontFamily="'Roboto', sans-serif" color={'black'} fontWeight={600}>
                        10 $
                      </Text>
                    </Box>
                  </Flex>
                </Box>
              </Box>
              <Box marginTop={4} mb={{ base: 4, md: 0 }}>
                <Flex gap={4} fontWeight={500}>
                  <Box marginLeft={{ base: 0, md: 5 }} flexBasis="100%">
                    <Button
                      justifyContent="space-between"
                      p={5}
                      fontFamily="'Prompt', sans-serif"
                      color="#1A4587"
                      w="100%"
                      align="left"
                      rightIcon={
                        !settingState ? <TriangleDownIcon color="#FF6827" /> : <TriangleUpIcon color="#FF6827" />
                      }
                      _focus={{
                        boxShadow: '0 0 0 0 rgba(88, 144, 255, .75), 0 0 0 rgba(0, 0, 0, .15)',
                      }}
                      _hover={{ bg: '#F0F3FA' }}
                      _active={{
                        bg: '#F0F3FA',
                        transform: 'scale(1)',
                        borderColor: '#F0F3FA',
                      }}
                      borderBottomRadius={settingState ? '0' : '8px'}
                      bg="#F0F3FA"
                      onClick={() => useSettingState(!settingState)}
                    >
                      Settings
                    </Button>
                    <Box
                      color="#1A4587"
                      bg="#F0F3FA"
                      px={5}
                      pb={2}
                      lineHeight="20px"
                      display={settingState ? 'block' : 'none'}
                      fontSize={17}
                    >
                      <Flex gap="2" mb={3}>
                        <Box>
                          <InfoOutlineIcon color="#5C6F81" />
                        </Box>
                        <Box>
                          <Text fontFamily="'Prompt', sans-serif" color="#1A4587">
                            Mirror
                          </Text>
                          <Text fontFamily="'Roboto', sans-serif" color={'black'} fontWeight={600}>
                            10 $
                          </Text>
                        </Box>
                      </Flex>
                      <Flex gap="2" mb={3}>
                        <Box>
                          <InfoOutlineIcon color="#5C6F81" />
                        </Box>
                        <Box>
                          <Text fontFamily="'Prompt', sans-serif" color="#1A4587">
                            Mirror
                          </Text>
                          <Text fontFamily="'Roboto', sans-serif" color={'black'} fontWeight={600}>
                            10 $
                          </Text>
                        </Box>
                      </Flex>
                      <Flex gap="2" mb={3}>
                        <Box>
                          <InfoOutlineIcon color="#5C6F81" />
                        </Box>
                        <Box>
                          <Text fontFamily="'Prompt', sans-serif" color="#1A4587">
                            Mirror
                          </Text>
                          <Text fontFamily="'Roboto', sans-serif" color={'black'} fontWeight={600}>
                            10 $
                          </Text>
                        </Box>
                      </Flex>
                    </Box>
                  </Box>
                  <Box flexBasis="100%">
                    <Button
                      justifyContent="space-between"
                      p={5}
                      fontFamily="'Prompt', sans-serif"
                      color="#1A4587"
                      w="100%"
                      rightIcon={
                        !statsState ? <TriangleDownIcon color="#FF6827" /> : <TriangleUpIcon color="#FF6827" />
                      }
                      _focus={{
                        boxShadow: '0 0 0 0 rgba(88, 144, 255, .75), 0 0 0 rgba(0, 0, 0, .15)',
                      }}
                      _active={{
                        bg: '#F0F3FA',
                        transform: 'scale(1)',
                        borderColor: '#F0F3FA',
                      }}
                      _hover={{ bg: '#F0F3FA' }}
                      borderBottomRadius={statsState ? '0' : '8px'}
                      bg="#F0F3FA"
                      onClick={() => setStatsState(!statsState)}
                    >
                      Stats
                    </Button>
                    <Box
                      color="#1A4587"
                      bg="#F0F3FA"
                      px={5}
                      pb={2}
                      lineHeight="20px"
                      display={statsState ? 'block' : 'none'}
                      fontSize={17}
                    >
                      <Flex gap="2" mb={3}>
                        <Box>
                          <InfoOutlineIcon color="#5C6F81" />
                        </Box>
                        <Box>
                          <Text fontFamily="'Prompt', sans-serif" color="#1A4587">
                            Mirror
                          </Text>
                          <Text fontFamily="'Roboto', sans-serif" color={'black'} fontWeight={600}>
                            10 $
                          </Text>
                        </Box>
                      </Flex>
                      <Flex gap="2" mb={3}>
                        <Box>
                          <InfoOutlineIcon color="#5C6F81" />
                        </Box>
                        <Box>
                          <Text fontFamily="'Prompt', sans-serif" color="#1A4587">
                            Mirror
                          </Text>
                          <Text fontFamily="'Roboto', sans-serif" color={'black'} fontWeight={600}>
                            10 $
                          </Text>
                        </Box>
                      </Flex>
                      <Flex gap="2" mb={3}>
                        <Box>
                          <InfoOutlineIcon color="#5C6F81" />
                        </Box>
                        <Box>
                          <Text fontFamily="'Prompt', sans-serif" color="#1A4587">
                            Mirror
                          </Text>
                          <Text fontFamily="'Roboto', sans-serif" color={'black'} fontWeight={600}>
                            10 $
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
                    <Text color="#1988F7" textDecorationLine="underline">
                      Booster
                    </Text>
                  </Box>

                  <Button
                    bg="#FF6827"
                    color="white"
                    fontSize="16px"
                    padding="15px 14px"
                    w={{ base: '100%', md: '38%' }}
                    h="auto"
                    onClick={() => createPost(userProfileId.toHexString(), postUri)}
                  >
                    POST
                  </Button>
                </Flex>
              </Box>
            </Box>

            {/* https://ipfs.infura.io/ipfs/QmfH6CowXn26mom62Rt5LezGhMa4gKcTDHmkk9uK2rGbgi */}
          </Flex>
        </>
      )}
    </>
  );
}
