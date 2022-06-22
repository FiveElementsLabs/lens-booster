import { gql } from '@apollo/client/core';
import { BigNumber, utils } from 'ethers';
import ApolloClient from '../../lib/ApolloClient';
import { login } from '../authentication/login.js';
import { prettyJSON } from '../../lib/Helpers.js';
import { pollUntilIndexed } from '../indexer/has-tx-been-indexed.js';

const CREATE_PROFILE = `
  mutation($request: CreateProfileRequest!) { 
    createProfile(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
			__typename
    }
 }
`;

const createProfileRequest = (createProfileRequest) => {
  return ApolloClient.mutate({
    mutation: gql(CREATE_PROFILE),
    variables: {
      request: createProfileRequest,
    },
  });
};

export const createProfile = async (address, handle, signer) => {
  const createProfileResult = await createProfileRequest({ handle });
  prettyJSON('create profile: result', createProfileResult.data);

  const result = await pollUntilIndexed(createProfileResult.data.createProfile.txHash);

  const logs = result.txReceipt.logs;

  const topicId = utils.id('ProfileCreated(uint256,address,address,string,string,address,bytes,string,uint256)');

  const profileCreatedLog = logs.find((l) => l.topics[0] === topicId);

  let profileCreatedEventLog = profileCreatedLog.topics;

  const profileId = utils.defaultAbiCoder.decode(['uint256'], profileCreatedEventLog[1])[0];
  console.log('profile id', BigNumber.from(profileId).toHexString());

  return result.data;
};
