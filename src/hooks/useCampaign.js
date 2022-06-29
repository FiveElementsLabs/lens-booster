import { Contract } from 'ethers';
import { useSharedState } from '../context/store';

const CampaignJson = require('../abis/LensCampaign.json');

export const useCampaign = () => {
  const [{ provider }] = useSharedState();

  const getCampaignContract = async (campaignAddress) => {
    const signer = await provider?.getSigner();
    return new Contract(campaignAddress, CampaignJson, signer.addresses ? signer : provider);
  };
  const getAdvertiserPayouts = async (campaignAddress) => {
    const Campaign = await getCampaignContract(campaignAddress);
    try {
      const payouts = await Campaign.getPayouts();

      return payouts;
    } catch (e) {
      console.log('Error getting the payouts: ', e?.messagge);
    }
  };

  const getNumberOfActions = async (campaignAddress) => {
    const Campaign = await getCampaignContract(campaignAddress);

    try {
      let i = 0;
      let numberOfActions = [];
      while (true) {
        try {
          const userId = await Campaign.userIdPosted(i);
          if (!userId) break;
          const alreadyPayed = await Campaign.getInflenserPayed(userId);
          const toBePayed = await Campaign.getInflenserToBePayed(userId);
          numberOfActions.push({
            clicks: alreadyPayed[0].toNumber() + toBePayed[0].toNumber(),
            events: alreadyPayed[1].toNumber() + toBePayed[1].toNumber(),
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

  const getCampaignInfo = async (campaignAddress) => {
    const Campaign = await getCampaignContract(campaignAddress);

    try {
      const campaignInfo = await Campaign.getCampaignInfo();
      return campaignInfo;
    } catch (e) {
      console.log('Error getting the campaign info: ', e?.messagge);
    }
  };
  return { getAdvertiserPayouts, getNumberOfActions, getCampaignInfo };
};
