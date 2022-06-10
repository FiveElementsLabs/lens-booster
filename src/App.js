import React from "react";
import {
  ChakraProvider,
  Box,
  // Text,
  // Link,
  // VStack,
  // Code,
  Grid,
  theme,
} from "@chakra-ui/react";

import Theme from "./lib/Theme";
//import { ColorModeSwitcher } from './ColorModeSwitcher';
import Router from "./Router";
//import { Logo } from './Logo';

function App() {
  return (
    <ChakraProvider theme={Theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh">
          <Router />
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
