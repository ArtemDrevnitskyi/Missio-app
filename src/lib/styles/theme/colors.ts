import type { DeepPartial, Theme } from '@chakra-ui/react';

/** extend additional color here */
const extendedColors: DeepPartial<
  Record<string, Theme['colors']['blackAlpha']>
> = {
  primary: {
    100: '',
    200: '',
    300: 'rgba(177, 142, 255, 1)',
    400: '#7F56D9',
    500: '',
    600: '',
    700: '',
    800: '',
    900: '',
  },
  grey: {
    100: '#667085',
    200: 'rgba(255, 255, 255,0.13)',
  },
  secondary: {
    300: 'rgba(16, 24, 40, 0.6)',
    400: '#344054',
    500: '#101828',
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme['colors']> = {};

export const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};
