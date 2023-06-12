import type { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface CardProps extends BoxProps {
  children: ReactNode;
}

/**
 * Card component is a simple wrapper with a predefined styling.
 * It can be used to display content within a card-like UI element.
 */
function Card({ children, ...rest }: CardProps) {
  return (
    <Box
      bg="grey.200"
      borderWidth={1}
      borderColor="white"
      rounded={10}
      {...rest}
    >
      {children}
    </Box>
  );
}

export default Card;
