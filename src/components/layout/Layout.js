import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@chakra-ui/react';
import { useSharedState } from '../../context/store';
import { useWallet } from '../../hooks/useWallet';
import { checkJwtExpiration } from '../../lib/Helpers';
import { login } from '../../api/authentication/login';
import { getAuthenticationToken, removeAuthenticationToken } from '../../lib/State';

import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

export default function Layout() {
  const [{ account, provider }] = useSharedState();
  const { autoLoginWallet, getDefaultProvider } = useWallet();
  useEffect(() => {
    (async () => !account && window.localStorage.getItem('walletConnected') && (await autoLoginWallet()))();
  }, []);

  useEffect(() => {
    (async () => !account && !window.localStorage.getItem('walletConnected') && (await getDefaultProvider()))();
  }, []);

  useEffect(() => {
    account &&
      (async () => {
        const signer = await provider.getSigner();
        console.log(getAuthenticationToken());
        console.log(await checkJwtExpiration());
        if (!getAuthenticationToken() && !(await checkJwtExpiration())) if (signer) await login(account, signer);
      })();
  }, [provider, account]);

  return (
    <>
      <Box position="relative" w="full" minH="100vh">
        <Navbar />

        <Container maxW="container.xl" pb={{ base: 16, md: 28 }}>
          <Outlet />
        </Container>

        <Footer />
      </Box>
    </>
  );
}
