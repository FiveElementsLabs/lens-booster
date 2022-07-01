import { useColorMode } from "@chakra-ui/react";

export default function Logo({ lightLogo, darkLogo, width }) {
  const { colorMode } = useColorMode();
  return colorMode === "light" ? (
    <img width={width} height="auto" src={lightLogo} alt="LensBooster logo" />
  ) : (
    <img width={width} height="auto" src={lightLogo} alt="LensBooster logo" />
  );
}
