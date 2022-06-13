import { Box, Text, Link, Image, Flex, Avatar } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { getIpfs } from "../../lib/ipfs";
import { getPublication } from "../../hooks/getPublication";
import Markup from "../shared/Markup";
import IFramely from "../shared/IFramely/index.tsx";

export default function PostCard({ publicationId }) {
  //https://ipfs.infura.io/ipfs/QmVSNBUEKM5JVnus1bhzrc9Wg6UXZpCcmKAWZYszU3sWYa
  const STATIC_ASSETS = "https://assets.lenster.xyz/images";
  const [publication, setPublication] = useState(<></>);
  const [linkExternal, setLinkExternal] = useState("");
  const [arrayJsxPost2, setArrayJsxPost2] = useState(<></>);

  useEffect(() => {
    const fetchPublication = async () => {
      const fetchedPublication = await getPublication(publicationId);
      let arrayJsxPost = [];
      /*
      <Text> asjdajsdjajs <Link>@lens</Link> ahshdahsdh </Text>
      */
      const hashflags = ["lenster", "bitcoin", "ethereum", "lens"];
      let indexAt = [];
      let index = 0;
      let lastIndex = 0;
      let lastUrlIndex = 0;
      const urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
      const url =
        fetchedPublication.data.publication.metadata.content.match(urlRegex) ||
        [];
      const urlIndex =
        url?.map((u) => {
          return fetchedPublication.data.publication.metadata.content.indexOf(
            u
          );
        }) || [];

      if (!url) {
        urlIndex.push(-1);
        url.push("");
      }
      if (urlIndex != -1) setLinkExternal(url[0]);
      while (index != -1) {
        let appIndex =
          fetchedPublication.data.publication.metadata.content.indexOf(
            "@",
            index + 1
          );

        let hashtagIndex =
          fetchedPublication.data.publication.metadata.content.indexOf(
            "#",
            index + 1
          );

        index = Math.min(
          appIndex != -1 ? appIndex : Infinity,
          hashtagIndex != -1 ? hashtagIndex : Infinity
        );

        let spaceIndex =
          fetchedPublication.data.publication.metadata.content.indexOf(
            " ",
            index
          );
        //indexAt.push({ startIndex: index, endIndex: spaceIndex }); // push the index of the @
        if (index == -1 || index == Infinity) {
          if (
            fetchedPublication.data.publication.metadata.content.length >
              urlIndex[lastUrlIndex] &&
            lastIndex < urlIndex[lastUrlIndex]
          ) {
            arrayJsxPost.push(
              <>
                {fetchedPublication.data.publication.metadata.content.substring(
                  lastIndex,
                  urlIndex[lastUrlIndex]
                )}
              </>
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
          if (
            lastIndex < urlIndex[lastUrlIndex] &&
            index > urlIndex[lastUrlIndex]
          ) {
            arrayJsxPost.push(
              <>
                {fetchedPublication.data.publication.metadata.content.substring(
                  lastIndex,
                  urlIndex[lastUrlIndex]
                )}
              </>
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
            arrayJsxPost.push(
              <>
                {fetchedPublication.data.publication.metadata.content.substring(
                  lastIndex,
                  index
                )}
              </>
            );
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
                {fetchedPublication.data.publication.metadata.content.substring(
                  index,
                  spaceIndex
                )}
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
                  {fetchedPublication.data.publication.metadata.content
                    .substring(index - 1, spaceIndex)
                    .toUpperCase()}
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

  return (
    <>
      {publication?.metadata && (
        <>
          <Flex
            bg="white"
            p={5}
            mt={8}
            borderRadius="20px"
            textAlign="left"
            color="black"
          >
            <Box w="60%" fontSize="18px">
              <Flex marginBottom="1.5rem">
                <Avatar
                  src={
                    publication.profile.picture?.original?.url ||
                    "https://www.universodanza.org/wordpress/wp-content/uploads/2011/06/default-avatar.png"
                  }
                />
                <Box
                  marginTop="auto"
                  marginBottom="auto"
                  marginLeft="1rem"
                  fontSize="16px"
                >
                  <Text fontWeight={600} fontFamily="'Prompt', sans-serif">
                    {publication.profile.name}
                  </Text>
                  <Link
                    color="#1988F7"
                    href={`https://lenster.xyz/u/${publication.profile.handle}`}
                  >
                    @{publication.profile.handle}
                  </Link>
                </Box>
              </Flex>
              <Text whiteSpace="pre-line" color="#00203F">
                {arrayJsxPost2.map((e) => e)}
              </Text>
              {publication.metadata.media &&
                publication.metadata.media?.map((e) => {
                  return (
                    e?.original?.url && (
                      <Image
                        marginTop="15px"
                        src="https://media3.giphy.com/media/du3J3cXyzhj75IOgvA/giphy.gif?cid=9f0f64258o8ftf4l9rs78i2724f66gvjf46puhgkua0r3v5y&rid=giphy.gif&ct=g"
                      />
                    )
                  );
                })}
              {linkExternal && (
                <Box width="80%">
                  <IFramely url={linkExternal} />
                </Box>
              )}
            </Box>
            <Box>
              <Text>Hello word data</Text>
            </Box>
            {/* https://ipfs.infura.io/ipfs/QmfH6CowXn26mom62Rt5LezGhMa4gKcTDHmkk9uK2rGbgi */}
          </Flex>
        </>
      )}
    </>
  );
}
