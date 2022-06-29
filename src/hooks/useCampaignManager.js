import { Contract } from 'ethers';
import { addresses } from '../context/addresses';
import { useSharedState } from '../context/store';
import { getPublication } from './getPublication';

const CampaignManagerJson = require('../abis/CampaignManager.json');
const CampaignJson = require('../abis/LensCampaign.json');
const LensHubJson = require('../abis/LensHub.json');

export const useCampaignManager = () => {
  const [{ provider }, dispatch] = useSharedState();

  const getCampaigns = async (userId, postId) => {
    const signer = await provider?.getSigner();
    const CampaignManager = new Contract(
      addresses.CampaignManager,
      CampaignManagerJson,
      signer.addresses ? signer : provider
    );

    try {
      const campaignAddress = await CampaignManager.addressesCampaign(userId, postId);

      return campaignAddress;
    } catch (e) {
      console.log('Error getting the campaign address: ', e?.messagge);
    }
  };

  const getCampaignsPublicationID = async () => {
    const signer = await provider?.getSigner();

    const CampaignManager = new Contract(
      addresses?.CampaignManager,
      CampaignManagerJson,
      signer.addresses ? signer : provider
    );

    let i = 0;
    let pub = [];
    while (true) {
      try {
        const campaignAddress = await CampaignManager.addressesCampaignAd(i);
        if (!campaignAddress) break;
        const Campaign = new Contract(campaignAddress, CampaignJson, signer.addresses ? signer : provider);
        const campaignInfo = await Campaign.getCampaignInfo();
        pub.push([campaignInfo[1].toHexString() + '-' + campaignInfo[0].toHexString()]);
        i++;
      } catch (e) {
        console.log('Error fetching all pubids: ', e?.messagge);
        break;
      }
    }

    return pub;
  };

  const getUserStatsByCampaign = async (defaultProfile) => {
    const signer = await provider?.getSigner();
    const LensHub = new Contract(addresses.LensHub, LensHubJson, signer.addresses ? signer : provider);
    const CampaignManager = new Contract(
      addresses.CampaignManager,
      CampaignManagerJson,
      signer.addresses ? signer : provider
    );
    let i = 0;

    let campaignsPayed = [];

    while (true) {
      try {
        const campaignAddresses = await CampaignManager.addressesCampaignAd(i);
        const userScore = await CampaignManager.inflencerId(defaultProfile.toHexString());
        if (!campaignAddresses) break;
        const Campaign = new Contract(campaignAddresses, CampaignJson, signer.addresses ? signer : provider);
        const inflenserProfile = await Campaign.getInflenserPayed(defaultProfile);
        const inflenserInfo = await Campaign.getInflenserInfo(defaultProfile);
        const payouts = await Campaign.getPayouts();
        const campaignInfo = await Campaign.getCampaignInfo();
        const publicationId = defaultProfile.toHexString() + '-' + inflenserInfo[2].toHexString();

        const pub = (await getPublication(publicationId)).data.publication;
        const pubCampaign = await getPublication(campaignInfo[0].toHexString() + '-' + campaignInfo[1].toHexString());

        campaignsPayed.push({
          name: pubCampaign?.profile?.name || pub.profile.name,
          picture: pubCampaign?.profile?.picture?.original?.url || pub.profile.picture?.original?.url,
          earned:
            payouts[0].toNumber() * userScore + payouts[3] * inflenserProfile[0] + payouts[6] * inflenserProfile[1],
          clicks: inflenserProfile[0],
          actions: inflenserProfile[1],
          mirrors: pub.stats.totalAmountOfMirrors,
        });

        i++;
      } catch (e) {
        console.log('Error getting the userId: ', e?.messagge);
        break;
      }
    }

    return campaignsPayed;
  };

  const getUserScore = async (defaultProfile) => {
    const signer = await provider?.getSigner();
    const CampaignManager = new Contract(
      addresses.CampaignManager,
      CampaignManagerJson,
      signer.addresses ? signer : provider
    );
    let userScore = 0;
    if (defaultProfile) userScore = await CampaignManager.inflencerId(defaultProfile.toHexString());

    return userScore;
  };

  return { getCampaigns, getUserStatsByCampaign, getCampaignsPublicationID, getUserScore };
};
