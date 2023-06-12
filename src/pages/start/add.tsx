import { Text, Heading, Box, Flex, Button } from '@chakra-ui/react';
// import { useRouter } from 'next/router';

const Home = () => {
  return (
    <Flex my="auto" justify="center" minH="90vh" w="full" h="full">
      <Box my="auto" textAlign="center">
        <Heading fontSize={50}>
          Welcome to <br /> Missio!
        </Heading>
        <Text fontSize={28}>
          You have not added any DAOs yet.
          <br /> Click below to add your DAOs
        </Text>
        <Button variant="primary" mt={4}>
          Add a DAO
        </Button>
      </Box>
    </Flex>
  );
};

export default Home;
