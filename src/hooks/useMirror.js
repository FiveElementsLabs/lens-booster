import { ethers, utils, Contract } from "ethers";
import { useSharedState } from "../context/store";
import { gql } from "@apollo/client/core";
import ApolloClient from "../lib/ApolloClient";
import { omit } from "../lib/Helpers";
const LensCampaignABI = require("../components/abis/LensCampaign.json");

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
  const [{ provider }, dispatch] = useSharedState();

  const createPost = async (profileId, contentURI) => {
    console.log("createPost start");
    console.log('profileId: ', profileId)
    console.log('contentURI: ', contentURI)
    const signer = await provider.getSigner();

    const signedTypeData = async (domain, types, value) => {
      return await signer._signTypedData(
        omit(domain, "__typename"),
        omit(types, "__typename"),
        omit(value, "__typename")
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

    const result = await createPostTypedData(createPostRequest);
    const typedData = result.data.createPostTypedData.typedData;

    const signature = await signedTypeData(
      typedData.domain,
      typedData.types,
      typedData.value
    );
    const { v, r, s } = splitSignature(signature);
    console.log("v", v);
    console.log("r", r);
    console.log("s", s);

    console.log(
      "LensCampaignAddress",
      process.env.REACT_APP_LENSCAMPAIGN_ADDRESS
    );
    const LensCampaign = new Contract(
      "0x26E50B44b75673CC68be0811afBeC40DD0b8814a",
      LensCampaignABI.abi,
      signer
    );
    console.log("before transaction");
    console.log(LensCampaign);
    const tx = await LensCampaign.handlePost(
      {
        profileId: typedData.value.profileId,
        contentURI: typedData.value.contentURI,
        collectModule: typedData.value.collectModule,
        collectModuleInitData: typedData.value.collectModuleInitData,
        referenceModule: typedData.value.referenceModule,
        referenceModuleInitData: typedData.value.referenceModuleInitData,
        sig: {
          v,
          r,
          s,
          deadline: typedData.value.deadline,
        },
      },
      {
        gasLimit: 3000000,
      }
    );
    console.log(tx.hash);

    try {
      await tx.wait();
      console.log("transaction success");
    } catch (e) {
      console.log(e);
    }
  };
  return { createPost };
};
