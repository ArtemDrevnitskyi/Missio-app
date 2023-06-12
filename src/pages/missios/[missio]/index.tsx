import {
  Text,
  Button,
  SimpleGrid,
  VStack,
  Spinner,
  Center,
} from '@chakra-ui/react';
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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const missioDetail = async () => {
      const { data } = await supabase
        .from('proposals')
        .select(`*`)
        .eq('id', missio)
        .single();
      setProposal(data as Proposals);
      setLoading(false);
    };

    missioDetail();
  }, [missio]);

  return (
    <Main heading={proposal?.title} subtext={proposal?.author}>
      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <>
          <Card p={4} mb={8}>
            <VStack spacing={10} align="flex-start">
              <Text>{proposal?.description}</Text>
            </VStack>
          </Card>
          <SimpleGrid columns={[1, null, 2]} spacing={8}>
            {proposal?.questions.map((question) => {
              return (
                <Card key={proposal.questions.indexOf(question)} p={4}>
                  <VStack spacing={10} align="flex-start">
                    <Text>{question}</Text>
                    <Button
                      variant="primary"
                      onClick={() =>
                        router.push(
                          `${missio}/answer?que=${proposal.questions.indexOf(
                            question
                          )}`
                        )
                      }
                    >
                      Answer
                    </Button>
                  </VStack>
                </Card>
              );
            })}
          </SimpleGrid>
        </>
      )}
    </Main>
  );
};

export default Home;
