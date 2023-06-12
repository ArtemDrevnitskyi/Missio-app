import { Button, Heading, Stack, Text, VStack } from '@chakra-ui/react';
import Image from 'next/image';

import GraphImage from '~/assets/png/graph.png';
import Card from '~/lib/components/Card';
import Main from '~/lib/layout/Main';

const Home = () => {
  const proposals = [
    'CIP-191: The Billboard',
    'CIP-1001a: The Consensus Solution ',
    'CIP-XXX: This is an old DAO proposal placeholder',
    'CIP-XXX: This is a DAO proposal placeholder',
    'CIP-XXX: This is a new DAO proposal placeholder',
  ];
  return (
    <Main>
      <Card p={4}>
        <Heading fontSize={22} p={2}>
          CityDAO Engagement
        </Heading>
        <Image alt="graph" src={GraphImage} style={{ width: '100%' }} />
      </Card>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        w="full"
        mt={5}
        spacing={5}
      >
        <Card p={4} w="100%">
          <Heading fontSize={22} mb={4}>
            Recent Proposals
          </Heading>
          <VStack
            align="flex-start"
            __css={{
              '&>*:not(:last-child)': {
                borderBottom: '1px solid rgba(255,255,255,0.5)',
              },
            }}
          >
            {proposals.map((proposal) => (
              <Text w="100%" py={1}>
                {proposal}
              </Text>
            ))}
          </VStack>
          <Button variant="primary" mt={2}>
            View All
          </Button>
        </Card>
        <Card p={4} w="100%">
          <Heading fontSize={22} mb={4}>
            Top Members
          </Heading>
          <VStack
            align="flex-start"
            __css={{
              '&>*:not(:last-child)': {
                borderBottom: '1px solid rgba(255,255,255,0.5)',
              },
            }}
          >
            {proposals.map((proposal) => (
              <Text w="100%" py={1}>
                {proposal}
              </Text>
            ))}
          </VStack>
          <Button variant="primary" mt={2}>
            View All
          </Button>
        </Card>
      </Stack>
    </Main>
  );
};

export default Home;
