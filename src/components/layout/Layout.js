import { useEffect } from 'react';
import { Box, Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { useWallet } from '../../hooks/useWallet';

import Navbar from "../navbar/Navbar";

export default function Layout() {
  return (
    <>
    <Box position="relative" w="full" minH="100vh">
      <Navbar />

      <Container maxW="container.xl" pb={{ base: 48, md: 28 }}>
        <Outlet />
      </Container>

      </Box>
    </>
  );
}
