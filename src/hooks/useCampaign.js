import { ethers, utils, Contract } from 'ethers';
import { useSharedState } from '../context/store';

const CampaignJson = require('../components/abis/LensCampaign.json');

export const useCampaign = () => {
  const [{ provider }, dispatch] = useSharedState();

  const getAdvertiserPayouts = async (campaignAddress) => {
    const signer = await provider.getSigner();
    const Campaign = new Contract(campaignAddress, CampaignJson, signer);

    try {
      const payouts = await Campaign.payouts();
      console.log('Campaign Contract: ', payouts);

      return {
        ...payouts,
      };
    } catch (e) {
      console.log('Error getting the payouts: ', e?.messagge);
    }
  };

  const getNumberOfActions = async (campaignAddress) => {
    const signer = await provider.getSigner();
    const Campaign = new Contract(campaignAddress, CampaignJson, signer);
    try {
      let i = 0;
      let numberOfActions = [];
      while (true) {
        try {
          const userId = await Campaign.userIdPosted(i);
          if (!userId) break;
          numberOfActions.push({
            clicks: Math.ceil(Math.random() * 100),
            events: Math.ceil(Math.random() * 100),
          });
          i++;
        } catch (e) {
          console.log('Error getting the userId: ', e?.messagge);
          break;
        }
      }

      return numberOfActions;
    } catch (e) {
      console.log('Error getting the actions: ', e?.messagge);
    }
  };

  const getCampaignDuration = async (campaignAddress) => {
    const signer = await provider.getSigner();
    const Campaign = new Contract(campaignAddress, CampaignJson, signer);
    try {
      const duration = await Campaign.campaignDuration();
      console.log('Campaign Contract: ', duration);
    } catch (e) {
      console.log('Error getting the campaign duration: ', e?.messagge);
    }

    return duration;
  };
  return { getAdvertiserPayouts, getNumberOfActions, getCampaignDuration };
};
