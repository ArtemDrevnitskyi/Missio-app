import type { ComponentStyleConfig } from '@chakra-ui/react';

export const Button: ComponentStyleConfig = {
  baseStyle: {
    py: 4,
    rounded: 10,
  },
  variants: {
    primary: {
      bg: 'primary.400',
    },
    secondary: {
      bg: 'secondary.500',
    },
  },
};
