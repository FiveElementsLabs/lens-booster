import { utils, ethers } from 'ethers';
import { gql } from '@apollo/client/core';
import { login } from '../authentication/login';
import ApolloClient from '../../lib/ApolloClient';
import { omit } from '../../lib/Helpers';
import { LENS_HUB_CONTRACT } from '../../lib/ConfigVars';
import { LENS_HUB_ABI } from '../../lib/ABIs';

const CREATE_MIRROR_TYPED_DATA = `
mutation($request: CreateMirrorRequest!) { 
  createMirrorTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        MirrorWithSig {
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
      profileIdPointed
      pubIdPointed
      referenceModule
      referenceModuleData
    }
   }
 }
}
`;

const createMirrorTypedData = (createMirrorTypedDataRequest) => {
  return ApolloClient.mutate({
    mutation: gql(CREATE_MIRROR_TYPED_DATA),
    variables: {
      request: createMirrorTypedDataRequest,
    },
  });
};

export const createMirror = async (signer, account, profileId, publicationId, postMetaData) => {
  //   if (!postMetaData.profileId) {
  //     throw new Error("No Profile ID");
  //   }

  const signedTypeData = async (domain, types, value) => {
    return await signer._signTypedData(
      omit(domain, '__typename'),
      omit(types, '__typename'),
      omit(value, '__typename')
    );
  };

  // For more info about the complete IPFS upload object:
  // See lib/ipfs on this repo,
  // See this example: https://github.com/aave/lens-api-examples/blob/master/src/ipfs.ts
  // And see the docs: https://docs.lens.dev/docs/create-post-typed-data

  //const ipfsResult = await uploadIpfs(mirrorMetaData);
  //console.log("create post: ipfs result", ipfsResult);

  const createMirrorRequest = {
    profileId: profileId,
    //publicationId: publicationId,
    publicationId: publicationId,
    referenceModule: {
      followerOnlyReferenceModule: true,
    },
  };

  console.log(createMirrorRequest);

  const result = await createMirrorTypedData(createMirrorRequest);

  const typedData = result.data.createMirrorTypedData.typedData;

  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);

  const splitSignature = (signature) => {
    return utils.splitSignature(signature);
  };

  const { v, r, s } = splitSignature(signature);

  const lensHub = new ethers.Contract(LENS_HUB_CONTRACT, LENS_HUB_ABI, signer);

  const tx = await lensHub.mirrorWithSig({
    profileId: '0x05de',
    profileIdPointed: typedData.value.profileId,
    pubIdPointed: typedData.value.pubIdPointed,
    collectModule: typedData.value.collectModule,
    collectModuleData: typedData.value.collectModuleData,
    referenceModule: typedData.value.referenceModule,
    referenceModuleData: typedData.value.referenceModuleData,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });

  return tx.hash;
};
