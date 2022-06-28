import { ethers, utils, Contract } from 'ethers';
import { useSharedState } from '../context/store';
import { gql } from '@apollo/client/core';
import ApolloClient from '../lib/ApolloClient';
import { omit } from '../lib/Helpers';
import Lens from '../components/icons/Lens';
import { removeAuthenticationToken } from '../lib/State';
import { login } from '../api/authentication/login';

const LensCampaignABI = require('../abis/LensCampaign.json');

const CREATE_POST_TYPED_DATA = `
 mutation($request: CreatePublicPostRequest!) { 
    createPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
      }
    }
   }
 }
`;

const createPostTypedData = (createPostTypedDataRequest) => {
  return ApolloClient.mutate({
    mutation: gql(CREATE_POST_TYPED_DATA),
    variables: {
      request: createPostTypedDataRequest,
    },
  });
};

export const useMirror = () => {
  const [{ provider, account }, dispatch] = useSharedState();

  const createPost = async (profileId, contentURI, campaignsAddress) => {
    const signer = await provider.getSigner();

    const signedTypeData = async (domain, types, value) => {
      return await signer._signTypedData(
        omit(domain, '__typename'),
        omit(types, '__typename'),
        omit(value, '__typename')
      );
    };

    const splitSignature = (signature) => {
      return utils.splitSignature(signature);
    };
    // hard coded to make the code example clear
    const createPostRequest = {
      profileId: profileId,
      contentURI: contentURI,
      collectModule: {
        freeCollectModule: {
          followerOnly: false,
        },
      },
      referenceModule: {
        followerOnlyReferenceModule: false,
      },
    };
    let result;
    try {
      const result = await createPostTypedData(createPostRequest);
    } catch (error) {
      if (error.message == 'User does not own profile') {
        removeAuthenticationToken();
        await login(account, signer);
      }
      result = await createPostTypedData(createPostRequest);
    }
    const typedData = result.data.createPostTypedData.typedData;

    const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
    const { v, r, s } = splitSignature(signature);
    const LensCampaign = new Contract(campaignsAddress, LensCampaignABI, signer);
    const sig = {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    };

    const tx = await LensCampaign.handlePost(
      typedData.value.profileId,
      {
        profileId: typedData.value.profileId,
        contentURI: typedData.value.contentURI,
        collectModule: typedData.value.collectModule,
        collectModuleInitData: typedData.value.collectModuleInitData,
        referenceModule: typedData.value.referenceModule,
        referenceModuleInitData: typedData.value.referenceModuleInitData,
        sig,
      },
      {
        gasLimit: 1000000,
      }
    );

    try {
      await tx.wait();
      console.log('transaction success');
    } catch (e) {
      console.log(e);
    }
  };
  return { createPost };
};
