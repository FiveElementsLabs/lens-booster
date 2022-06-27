import { Box, Container } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';

import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';

export default function Layout() {
  return (
    <>
      <Box position="absolute" w="full" minH="100vh">
        <Navbar />

        <Container w="90%" maxW="container.2xl" pb={{ base: 16, md: 28 }}>
          <Outlet />
        </Container>

        <Footer />
      </Box>
    </>
  );
}
