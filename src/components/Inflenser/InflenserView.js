import { Box, Text, Flex, Heading } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useCampaignManager } from '../../hooks/useCampaignManager';
import { useSharedState } from '../../context/store';
import { useWallet } from '../../hooks/useWallet.js';

import Dashboard from './Dashboard.js';
import Campaigns from './Campaigns.js';

export default function InflenserView() {
  const { loginWallet } = useWallet();

  useEffect(() => {
    loginWallet();
  }, []);

  return (
    <>
      <Dashboard />
      <Campaigns />
    </>
  );
}
