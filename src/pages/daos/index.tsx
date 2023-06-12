import {
  Button,
  SimpleGrid,
  VStack,
  HStack,
  Heading,
  useToast,
  Avatar,
  Stack,
} from '@chakra-ui/react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useUser } from '@supabase/auth-helpers-react';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import Card from '~/lib/components/Card';
import Main from '~/lib/layout/Main';
import supabase from '~/utils/superbase';
import type { Database } from '~/utils/superbase.types';

type DAO = Database['public']['Tables']['dao']['Row'];

const Explore = ({ daos }: { daos: DAO[] }) => {
  const router = useRouter();
  const toast = useToast();

  const user = useUser();
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<number>();

  const AddDao = useCallback(
    async (id: number, name: string) => {
      setLoading(true);
      setSelected(id);
      const { data: fetch } = await supabase
        .from('user_daos')
        .select('*')
        .eq('dao_id', id)
        .eq('user_id', user?.id);

      if (fetch && fetch?.length < 1) {
        const { data } = await supabase
          .from('user_daos')
          .insert([{ dao_id: id, user_id: user?.id }])
          .single();

        if (data) {
          toast({
            position: 'top-right',
            title: `${name} Added Successfully!`,
            description: 'DAO Added to sidebar.',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }
      } else {
        toast({
          position: 'top-right',
          title: `${name} Already Added!`,
          description: 'DAO already exists in sidebar.',
          status: 'info',
          duration: 5000,
          isClosable: true,
        });
      }
      setLoading(false);
    },
    [user?.id, toast, setLoading]
  );

  return (
    <Main
      heading={`Welcome back, ${user?.user_metadata.full_name}`}
      subtext="Track, manage and forecast your customers and orders."
    >
      <SimpleGrid columns={[1, null, 1]} spacing={8}>
        {daos.map(({ id, name }) => {
          return (
            <Card key={id}>
              <VStack spacing={4} align="flex-start">
                <Stack
                  bg="transparent"
                  mt={4}
                  w="full"
                  roundedTop={10}
                  align="center"
                >
                  <Avatar name={name.trim()} size="2xl" />
                </Stack>
                <Heading as="h2" px={4} fontSize={22} alignSelf="center">
                  {name}
                </Heading>
                <HStack p={4} alignSelf="center">
                  <Button
                    // isLoading
                    variant="primary"
                    onClick={() => router.push(`daos/${id}`)}
                  >
                    Explore
                  </Button>
                  <Button
                    variant="primary"
                    borderWidth={1}
                    borderColor="primary.400"
                    _disabled={{
                      borderWidth: '1px !important',
                      color: 'primary.400',
                    }}
                    isLoading={!!(selected === id && loading)}
                    onClick={() => AddDao(id, name)}
                  >
                    Add to Sidebar
                  </Button>
                </HStack>
              </VStack>
            </Card>
          );
        })}
      </SimpleGrid>
    </Main>
  );
};

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext | { req: NextApiRequest; res: NextApiResponse }
) => {
  // Create authenticated Supabase Client
  const baseClient = createServerSupabaseClient(ctx);

  const { data: daos } = await baseClient.from('daos').select('*');

  return {
    props: {
      daos,
    },
  };
};

export default Explore;
