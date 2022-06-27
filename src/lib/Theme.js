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
    postcardStats: {
      justifyContent: 'space-between',
      fontFamily: "'Prompt', sans-serif",
      color: '#1A4587',
      w: '100%',
      align: 'left',
      _focus: {
        boxShadow: '0 0 0 0 rgba(88, 144, 255, .75), 0 0 0 rgba(0, 0, 0, .15)',
      },
      _hover: { bg: '#F0F3FA' },
      _active: {
        bg: '#F0F3FA',
        transform: 'scale(1)',
        borderColor: '#F0F3FA',
      },
      bg: '#F0F3FA',
      fontSize: '20px',
    },
    showLessMore: {
      mt: '10px',
      fontStyle: 'italic',
      bg: 'white',
      fontSize: '15px',
      _focus: {
        boxShadow: '0 0 0 0 rgba(88, 144, 255, .75), 0 0 0 rgba(0, 0, 0, .15)',
      },
      _hover: { bg: 'white' },
      _active: {
        bg: 'white',
        transform: 'scale(1)',
        borderColor: 'white',
      },
      justifyContent: 'center',
      marginLeft: 'auto',
      paddingInlineStart: '0',
      paddingInlineEnd: '0',
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

const Table = {
  parts: ['tr', 'td', 'th'],
  variants: {
    classic: {
      tr: {
        textTransform: 'none',
        fontFamily: "'Prompt', sans-serif",
        fontSize: '16px',
        color: '#1A4587',
        fontWeight: '500',
      },
      td: {
        textTransform: 'none',
        fontFamily: `'Roboto', sans-serif`,
        fontSize: '15px',
        color: '#00203F',
        fontWeight: '500',
      },
      th: {
        textTransform: 'inherit',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        color: 'inherit',
        fontWeight: 'inherit',
      },
    },
  },
  defaultProps: {
    variant: 'classic',
  },
};

const Td = {
  variants: {
    classic: {
      textTransform: 'none',
      fontFamily: `'Roboto', sans-serif`,
    },
  },
  defaultProps: {
    variant: 'classic',
  },
};

const Theme = extendTheme({ colors, styles, components: { Button, Text, Heading, Table }, config, fonts });

export default Theme;
