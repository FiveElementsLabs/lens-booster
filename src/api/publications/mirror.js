import { utils, ethers } from "ethers";
import { gql } from "@apollo/client/core";
import { login } from "../authentication/login";
import ApolloClient from "../../lib/ApolloClient";
import { omit } from "../../lib/Helpers";
import { uploadIpfs } from "../../lib/ipfs";
import { LENS_HUB_CONTRACT } from "../../lib/ConfigVars";
import { LENS_HUB_ABI } from "../../lib/ABIs";

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


  console.log("createMirror signer: ", signer);
  const signedTypeData = async (domain, types, value) => {
    return await signer._signTypedData(
      omit(domain, "__typename"),
      omit(types, "__typename"),
      omit(value, "__typename")
    );
  };

  console.log("create mirror: address", account);

  await login(account, signer);

  // For more info about the complete IPFS upload object:
  // See lib/ipfs on this repo,
  // See this example: https://github.com/aave/lens-api-examples/blob/master/src/ipfs.ts
  // And see the docs: https://docs.lens.dev/docs/create-post-typed-data

  const mirrorMetaData = {
    profileId: "0x05de",
    publicationId: "0x05de-0x01",
  };
  //const ipfsResult = await uploadIpfs(mirrorMetaData);
  //console.log("create post: ipfs result", ipfsResult);

  // hard coded to make the code example clear
  console.log(profileId)
  console.log(publicationId)

  const createMirrorRequest = {
    profileId: "0x05de",
    publicationId: publicationId,
    referenceModule: {
      followerOnlyReferenceModule: true,
    },
  };

  console.log(createMirrorRequest);

  const result = await createMirrorTypedData(createMirrorRequest);
  console.log("create mirror: createMirrorTypedData", result);

  const typedData = result.data.createMirrorTypedData.typedData;
  console.log("create mirror: typedData", typedData);

  const signature = await signedTypeData(
    typedData.domain,
    typedData.types,
    typedData.value
  );
  console.log("create mirror: signature", signature);

  const splitSignature = (signature) => {
    return utils.splitSignature(signature);
  };

  const { v, r, s } = splitSignature(signature);

  console.log("signer is: ", signer);

  const lensHub = new ethers.Contract(LENS_HUB_CONTRACT, LENS_HUB_ABI, signer);

  console.log("before tx");

  console.log('typedData: ', typedData);

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

  console.log("create mirror: tx hash", tx.hash);
  return tx.hash;
};
