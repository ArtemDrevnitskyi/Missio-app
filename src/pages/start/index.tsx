import { Text, Heading, Flex, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

import supabase from '~/utils/superbase';

const Home = () => {
  const router = useRouter();

  async function signInWithDiscord() {
    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
    });

    if (data) {
      router.push('/daos');
    }
  }
  return (
    <Flex my="auto" justify="center" minH="90vh" w="full" h="full">
      <Flex
        my="auto"
        justify="center"
        flexDirection="column"
        textAlign="center"
        px={8}
        h={240}
        w={900}
        bg="white"
        justifyContent="center"
      >
        <Heading fontSize={25} color="black">
          Welcome to <br /> Missio!
        </Heading>

        <Text fontSize={18} color="black" my={4}>
          Connect
        </Text>
        <Button
          variant="secondary"
          py={6}
          _hover={{
            bg: 'secondary.400',
          }}
          _focus={{
            bg: 'secondary.400',
          }}
          onClick={() => signInWithDiscord()}
        >
          Sign in with Discord
        </Button>
      </Flex>
    </Flex>
  );
};

export default Home;
