import { ethers, utils, Contract } from 'ethers';
import { useSharedState } from '../context/store';
const LensHubAbi = require('../abis/LensHub.json');

import { useProfile } from './useProfile';

export const getPublicationURI = () => {
  const [{ account, provider }, dispatch] = useSharedState();
  const { profiles } = useProfile();

  const getPubURI = async (profileId, postId) => {
    let URI;
    try {
      const signer = await provider?.getSigner();
      const LensHub = new Contract('0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d', LensHubAbi, signer);

      URI = await LensHub.getContentURI(profileId, postId);
    } catch (e) {
      console.log('Failed with error: ', e?.message);
    }

    return URI;
  };

  const getDefaultProfile = async () => {
    let profileId;
    try {
      const signer = await provider.getSigner();

      const LensHub = new Contract('0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d', LensHubAbi, signer);
      profileId = await LensHub.defaultProfile(account);
    } catch (e) {
      console.log('Failed with error: ', e?.message);
    }
    return profileId;
  };
  return { getPubURI, getDefaultProfile };
};
