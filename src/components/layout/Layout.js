import { Box, Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

export default function Layout() {
  return (
    <>
      <Box position="absolute" w="full" minH="100vh">
        <Navbar />

        <Container maxW="container.xl" pb={{ base: 16, md: 28 }}>
          <Outlet />
        </Container>

        <Footer />
      </Box>
    </>
  );
}
