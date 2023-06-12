import { Box, Heading, Text } from '@chakra-ui/react';
import type { BoxProps } from '@chakra-ui/react';
import type { ReactNode } from 'react';

interface MainProps extends BoxProps {
  heading?: string;
  subtext?: string;
  children: ReactNode;
}

function Main({ heading, subtext, children, ...rest }: MainProps) {
  return (
    <Box p={{ base: 4, md: 10 }} rounded={20} bg="grey.200" {...rest}>
      <Box mb={4}>
        <Heading mb={2}>{heading}</Heading>
        <Text color="grey.100" my={2}>
          {subtext}
        </Text>
      </Box>
      {children}
    </Box>
  );
}

export default Main;
