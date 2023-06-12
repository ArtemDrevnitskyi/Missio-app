import {
  Text,
  Button,
  SimpleGrid,
  VStack,
  Spinner,
  Center,
  HStack,
} from '@chakra-ui/react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { motion } from 'framer-motion';
import { debounce } from 'lodash';
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import Card from '~/lib/components/Card';
import Main from '~/lib/layout/Main';
import supabase from '~/utils/superbase';
import type { Database } from '~/utils/superbase.types';

type Proposals = Database['public']['Tables']['proposal']['Row'];

const Home = ({ proposals }: { proposals: Proposals[] }) => {
  const router = useRouter();

  // const [proposal, setProposal] = useState<Proposals>();

  // useEffect(() => {
  //   const getMissio = async () => {
  //     const { data } = await supabase
  //       .from('proposals')
  //       .select(`*`)
  //       .eq('id', missio)
  //       .single();
  //     setProposal(data as Proposals);
  //   };

  //   getMissio();
  // }, [missio]);

  const PAGE_COUNT = 20;
  const containerRef = useRef(null);
  const [loadedTickets, setLoadedTickets] = useState(proposals);
  const [offset, setOffset] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isInView, setIsInView] = useState(false);

  const handleScroll = () => {
    if (containerRef.current && typeof window !== 'undefined') {
      const container = containerRef.current;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { bottom } = container.getBoundingClientRect();
      const { innerHeight } = window;
      setIsInView(() => bottom <= innerHeight);
    }
  };

  useEffect(() => {
    const handleDebouncedScroll = debounce(() => handleScroll(), 200);
    window.addEventListener('scroll', handleDebouncedScroll);
    return () => {
      window.removeEventListener('scroll', handleDebouncedScroll);
    };
  }, []);

  const fetchTickets = async () => {
    const from = offset * PAGE_COUNT;
    const to = from + PAGE_COUNT - 1;

    const { data } = await supabase
      .from('proposals')
      .select('*')
      .range(from, to)
      .order('id', { ascending: false });

    // console.log(data, from, to);

    return data;
  };

  const loadMoreTickets = async () => {
    setIsLoading(true);
    setOffset((prev) => prev + 1);
    const newTickets = await fetchTickets();

    setLoadedTickets((prevTickets) => [
      ...prevTickets,
      ...(newTickets as Proposals[]),
    ]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (isInView) {
      loadMoreTickets();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView]);

  return (
    <Main
      heading="CityDAO Missio's"
      subtext="Voice your opinions and view Missio Insights"
    >
      <SimpleGrid columns={[1, null, 1]} spacing={8} ref={containerRef}>
        {loadedTickets.map(({ id, title, description }, i) => {
          const recalculatedDelay =
            i >= PAGE_COUNT * 2 ? (i - PAGE_COUNT * (offset - 1)) / 15 : i / 15;

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                ease: [0.25, 0.25, 0, 1],
                delay: recalculatedDelay,
              }}
            >
              <Card key={id} p={4}>
                <VStack spacing={6} align="flex-start">
                  // Set title header
                  <Text fontSize="xl" fontWeight="bold">
                    {title}
                  </Text>
                  <HStack spacing={4}>
                    <Button
                      variant="primary"
                      onClick={() => router.push(`missios/${id}`)}
                    >
                      Voice your opinion
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        // Add the desired action for the new button here
                      }}
                    >
                      View Insights
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                        fill="currentColor"
                      >
                        <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
                      </svg>
                    </Button>
                  </HStack>
                </VStack>
              </Card>
            </motion.div>
          );
        })}
      </SimpleGrid>
      {isLoading && (
        <Center mt={2}>
          <Spinner />
        </Center>
      )}
    </Main>
  );
};

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext | { req: NextApiRequest; res: NextApiResponse }
) => {
  // Create authenticated Supabase Client
  const baseClient = createServerSupabaseClient(ctx);

  const { data: proposals } = await baseClient
    .from('proposals')
    .select('*')
    .limit(20)
    .order('created_at', { ascending: false });

  return {
    props: {
      proposals,
    },
  };
};

export default Home;
