import { Contract } from 'ethers';
import { useSharedState } from '../context/store';
import { addresses } from '../context/addresses';

const LensHubAbi = require('../abis/LensHub.json');

import { useProfile } from './useProfile';

export const getPublicationURI = () => {
  const [{ account, provider }, dispatch] = useSharedState();
  const { profiles } = useProfile();

  const getPubURI = async (profileId, postId) => {
    let URI;
    try {
      const signer = await provider?.getSigner();

      const LensHub = new Contract(addresses?.LensHub, LensHubAbi, signer.addresses ? signer : provider);

      URI = await LensHub.getContentURI(profileId, postId);
    } catch (e) {
      console.log('Failed with error: ', e?.message);
    }

    return URI;
  };

  const getDefaultProfile = async () => {
    let profileId;
    try {
      const signer = await provider?.getSigner();
      const LensHub = new Contract(addresses?.LensHub, LensHubAbi, signer.addresses ? signer : provider);
      if (account) profileId = await LensHub.defaultProfile(account);
    } catch (e) {
      console.log('Failed with error: ', e?.message);
    }
    return profileId;
  };
  return { getPubURI, getDefaultProfile };
};
