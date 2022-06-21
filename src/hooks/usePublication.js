import { getPublication } from './getPublication';
import { Box, Link, Image } from '@chakra-ui/react';

export const fetchPublication = async (publicationId) => {
  const fetchedPublication = await getPublication(publicationId);
  let arrayJsxPost = [];

  let index = 0;
  let lastIndex = 0;
  let lastUrlIndex = 0;

  const url = fetchedPublication.data.publication.metadata.content.match(/(((https?:\/\/)|(www\.))[^\s]+)/g) || [];
  const urlIndex =
    url?.map((u) => {
      return fetchedPublication.data.publication.metadata.content.indexOf(u);
    }) || [];

  if (!url) {
    urlIndex.push(-1);
    url.push('');
  }

  while (index != -1) {
    let appIndex = fetchedPublication.data.publication.metadata.content.indexOf('@', index + 1);

    let hashtagIndex = fetchedPublication.data.publication.metadata.content.indexOf('#', index + 1);

    index = Math.min(appIndex != -1 ? appIndex : Infinity, hashtagIndex != -1 ? hashtagIndex : Infinity);

    let spaceIndex = fetchedPublication.data.publication.metadata.content.indexOf(' ', index);

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
            fontWeight={600}
            _hover={{ textDecoration: 'none' }}
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
            fontWeight={600}
            _hover={{ textDecoration: 'none' }}
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
            fontWeight={600}
            _hover={{ textDecoration: 'none' }}
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
              fontWeight={600}
              _hover={{ textDecoration: 'none' }}
              color="#1988F7"
              href={`https://lenster.xyz/search?q=${fetchedPublication.data.publication.metadata.content
                .substring(index, spaceIndex)
                .trim()
                .slice(1)
                .toLowerCase()}&type=pubs&src=link_click`}
            >
              {fetchedPublication.data.publication.metadata.content.substring(index - 1, spaceIndex).toUpperCase()}
            </Link>
            {['lenster', 'bitcoin', 'ethereum', 'lens'].includes(
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
                src={`https://assets.lenster.xyz/images/hashflags/${fetchedPublication.data.publication.metadata.content
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

  /*  setArrayJsxPost2(arrayJsxPost);
  setPublication(fetchedPublication.data.publication); */

  return { linkExternal: url[0], fetchedPublication: fetchedPublication.data.publication, arrayJsxPost: arrayJsxPost };
};
