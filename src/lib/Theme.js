import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

/*
 *  Extend the default theme to include custom
 *  colors, fonts, options, etc.
 */

const colors = {
  primary: '#0055FF',
  light_accent: '#ECF1FE',
  light_azure: '#F0F3FA',
  light_background: '#E6EBF1',
  dark_accent: '#ECF1FE',
  dark_azure: '#F0F3FA',
  dark_background: '#E6EBF1',
  yellow_accent: '#FF9900',
};

const styles = {
  global: (props) => ({
    body: {
      bg: mode('light_background', 'dark_background')(props),
      fontFamily: "'Roboto', sans-serif",
    },
  }),
};

const components = {
  Button: {
    variants: {
      brand: (props) => ({
        backgroundColor: mode('yellow_accent', 'primary')(props),
      }),
    },
  },
  Divider: {
    variants: {
      gray: {
        borderColor: 'gray.200',
      },
    },
  },
};

const config = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const fonts = {
  body: {
    fontFamily: `'Roboto', sans-serif`,
    fontWeight: '400',
  },
};

const Button = {
  variants: {
    classic: {
      bg: '#FF6827',
      color: 'white',
      fontSize: '16px',
      fontFamily: "'Prompt', sans-serif",
      _hover: {
        bg: '#FFA800',
      },
      _focus: {
        boxShadow: '0 0 0 0 #FFA800, 0 0 0 #FFA800',
      },
      _active: {
        bg: '#FFA800',
      },
    },
  },
  defaultProps: {
    variant: 'classic',
  },
};

const Text = {
  variants: {
    classic: {
      fontFamily: `'Roboto', sans-serif`,
      color: '#5C6F81',
      fontSize: '24px',
    },
    title: {
      fontFamily: "'Prompt', sans-serif",
      fontWeight: '600',
    },
    inflenserPageTitles: {
      fontFamily: "'Prompt', sans-serif",
      fontWeight: '500',
    },
  },
  defaultProps: {
    variant: 'classic',
  },
};

const Heading = {
  variants: {
    classic: {
      fontFamily: "'Prompt', sans-serif",
      fontSize: '30px',
      color: '#1A202C',
    },
  },
  defaultProps: {
    variant: 'classic',
  },
};

const Table = {};

const Theme = extendTheme({ colors, styles, components: { Button, Text, Heading }, config, fonts });

export default Theme;
