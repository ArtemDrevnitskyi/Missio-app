import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Sidebar from './Sidebar';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box maxWidth="100vw" transition="0.5s ease-out">
      <Sidebar>{children}</Sidebar>
    </Box>
  );
};

export default Layout;
