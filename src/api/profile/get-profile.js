import { gql } from '@apollo/client/core';
import ApolloClient from '../../lib/ApolloClient';
import { login } from '../authentication/login';
import { prettyJSON } from '../../lib/Helpers';


const GET_PROFILE = `
query Profiles {
    profiles(request: { handles: ["luduvigo.lens"], limit: 1 }) {
      items {
        id
        name
        bio
        attributes {
          displayType
          traitType
          key
          value
        }
        metadata
        isDefault
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          ... on ProfileFollowModuleSettings {
           type
          }
          ... on RevertFollowModuleSettings {
           type
          }
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
`;

const getProfileRequest = request => {
    return ApolloClient.query({
        query: gql(GET_PROFILE),
        variables: {
            request,
        },
    });
};

export const getProfile = async () => {
    // console.log('profile of: address', address);


    const profileFromProfileIds = await getProfileRequest();

    prettyJSON('profile: result', profileFromProfileIds.data);

    return profileFromProfileIds.data;
};

