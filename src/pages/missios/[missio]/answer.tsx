import { Text, SimpleGrid, VStack, Stack, Box, Button } from '@chakra-ui/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Standard } from '@typebot.io/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Card from '~/lib/components/Card';
import Main from '~/lib/layout/Main';
import supabase from '~/utils/superbase';
import type { Database } from '~/utils/superbase.types';

type Proposals = Database['public']['Tables']['proposal']['Row'];

const Home = () => {
  const router = useRouter();
  const { missio } = router.query;

  const [proposal, setProposal] = useState<Proposals>();

  useEffect(() => {
    const getMissio = async () => {
      const { data } = await supabase
        .from('proposals')
        .select(`*`)
        .eq('id', missio)
        .single();
      setProposal(data as Proposals);
    };

    getMissio();
  }, [missio, router]);

  // console.log(proposal);

  const [truncate, setTruncate] = useState(true);

  return (
    <Main heading={proposal?.title} subtext={proposal?.author}>
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={10}
        w="full"
        m={0}
      >
        <VStack p={0}>
          <Card p={4} mb={8} w="full">
            <VStack spacing={10} align="flex-start">
              <Text noOfLines={truncate ? 4 : 200}>{proposal?.summary}</Text>
              <Button
                alignSelf="flex-end"
                onClick={() => setTruncate(!truncate)}
              >
                View {!truncate ? ' Less' : ' More'}
              </Button>
            </VStack>
          </Card>
          <Card p={4} mb={8} w="full">
            <VStack spacing={4} align="flex-start">
              {/* <Text>{proposal?.summary}</Text> */}
              <Box
                border="1px solid white"
                bg="secondary.300"
                rounded={10}
                h={400}
                w="full"
                // p={6}
              >
                <Standard
                  typebot="basic-chat-gpt-copy-vzgwk0d"
                  style={{
                    width: '100%',
                    height: '400px',
                  }}
                />
              </Box>
            </VStack>
          </Card>
        </VStack>
        <SimpleGrid
          columns={[1, null, 1]}
          minChildWidth={{ base: 'full', md: 300 }}
          spacing={8}
        >
          {proposal?.questions.map((question) => {
            return (
              <Card key={proposal.questions.indexOf(question)} p={4}>
                <VStack spacing={10} align="flex-start">
                  <Text>{question}</Text>
                </VStack>
              </Card>
            );
          })}
        </SimpleGrid>
      </Stack>
    </Main>
  );
};

export default Home;
