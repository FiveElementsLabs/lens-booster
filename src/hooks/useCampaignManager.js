import { withDefaultSize } from '@chakra-ui/react';
import { ethers, utils, Contract } from 'ethers';
import { addresses } from '../context/addresses';
import { useSharedState } from '../context/store';

const CampaignManagerJson = require('../components/abis/CampaignManager.json');
const CampaignJson = require('../components/abis/LensCampaign.json');

export const useCampaignManager = () => {
  const [{ provider }, dispatch] = useSharedState();

  const getCampaigns = async (userId, postId) => {
    const signer = await provider?.getSigner();
    console.log(addresses.CampaignManager);
    const CampaignManager = new Contract(addresses.CampaignManager, CampaignManagerJson, signer);

    try {
      const campaignAddress = await CampaignManager.addressesCampaign(userId, postId);
      console.log(`Campaign address found at ${campaignAddress}`);

      return campaignAddress;
    } catch (e) {
      console.log('Error getting the campaign address: ', e?.messagge);
    }
  };

  const getUserStatsByCampaign = async (userId) => {
    const signer = await provider.getSigner();
    const CampaignManager = new Contract(addresses.CampaignManager, CampaignManagerJson, signer);
    let i = 0;
    while (true) {
      try {
        console.log('inside while');
        const campaignAddresses = await CampaignManager.addressesCampaignAd(i);
        console.log('new campaign address: ', campaignAddresses);

        if (!campaignAddresses) break;
        console.log('new campaign address: ', campaignAddresses);
        const Campaign = new Contract(campaignAddresses, CampaignJson, signer);
        console.log('userId: ', userId);
        const payed = await Campaign.payedProfile(userId);
        console.log('payed: ', payed);
        if (!payed) break;

        console.log(Campaign.address);
        // a
        i++;
      } catch (e) {
        console.log('Error getting the userId: ', e?.messagge);
        break;
      }
    }
  };

  return { getCampaigns, getUserStatsByCampaign };
};
