import { Text, Heading, Box, Flex } from '@chakra-ui/react';
// import { useRouter } from 'next/router';

const Home = () => {
  return (
    <Flex my="auto" justify="center" minH="90vh" w="full" h="full">
      <Box my="auto" textAlign="center">
        <Heading fontSize={50}>
          Welcome to <br /> Missio!
        </Heading>
        <Text fontSize={28}>Connect to start</Text>
      </Box>
    </Flex>
  );
};

export default Home;
