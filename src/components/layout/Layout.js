import { useEffect } from 'react';
import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useWallet } from '../../hooks/useWallet';

import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Feed from './Feed.js'

export default function Layout() {
  const { autoLoginWallet } = useWallet();
  useEffect(() => {
    (async () => {
      await autoLoginWallet();
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
    <Box position="relative" w="full" minH="100vh">
      <Navbar />

      <Container maxW="container.xl" pb={{ base: 48, md: 28 }}>
        <Outlet />
        <Feed />
      </Container>

      </Box>
    </>
  );
}
