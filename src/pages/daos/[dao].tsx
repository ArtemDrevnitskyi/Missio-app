import {
  Text,
  Button,
  SimpleGrid,
  VStack,
  Center,
  Spinner,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Card from '~/lib/components/Card';
import Main from '~/lib/layout/Main';
import supabase from '~/utils/superbase';
import type { Database } from '~/utils/superbase.types';

type Proposals = Database['public']['Tables']['proposal']['Row'];
type DAO = Database['public']['Tables']['dao']['Row'];

const Home = () => {
  const router = useRouter();
  const { dao } = router.query;

  const [proposals, setProposals] = useState<Proposals[]>();
  const [currentDao, setCurrentDao] = useState<DAO>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dao) {
      const fetchDaoData = async () => {
        setLoading(true);
        const { data } = await supabase
          .from('proposals')
          .select(`*`)
          .eq('dao_id', dao);

        const { data: res } = await supabase
          .from('daos')
          .select(`*`)
          .eq('id', dao)
          .single();

        setCurrentDao(res as DAO);

        setProposals(data as Proposals[]);
        setLoading(false);
      };

      fetchDaoData();
    }
  }, [dao]);

  return (
    <Main
      heading={currentDao?.name}
      subtext={currentDao?.description as string}
    >
      {loading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <SimpleGrid columns={[1, null, 1]} spacing={8}>
          {proposals?.map(({ id, title, description }) => {
            return (
              <Card key={id} p={4}>
                <VStack spacing={10} align="flex-start">
                  <Text>{title}</Text>
                  <Text>{description}</Text>
                  <Button
                    variant="primary"
                    onClick={() => router.push(`/missios/${id}`)}
                  >
                    Voice your opinion
                  </Button>
                </VStack>
              </Card>
            );
          })}
        </SimpleGrid>
      )}
    </Main>
  );
};

export default Home;
