import { Text, Button, SimpleGrid, VStack, HStack } from '@chakra-ui/react';

import Card from '~/lib/components/Card';
import Main from '~/lib/layout/Main';

const tasksLists = [
  {
    name: 'discord',
    description: 'Connect to Discord',
    points: 15,
    actionText: 'Connect',
  },
  {
    name: 'twitter',
    description: 'Connect to Twitter',
    points: 15,
    actionText: 'Connect',
  },
  {
    name: 'rate',
    description: 'Rate 10 Missios',
    points: 15,
    actionText: 'Claim',
  },
  {
    name: 'rate-25',
    description: 'Rate 25 Missios',
    points: 30,
    actionText: 'Go',
  },

  {
    name: 'give',
    description: 'Give your first Missio',
    points: 15,
    actionText: 'Claim',
  },
  {
    name: 'give-10',
    description: 'Givr 10 Missios',
    points: 30,
    actionText: 'Claim',
  },
  {
    name: 'rate-50',
    description: 'Rate 50 Missios',
    points: 80,
    actionText: 'Go',
  },
  {
    name: 'rate-100',
    description: 'Rate 100 Missios',
    points: 100,
    actionText: 'Go',
  },
];

const Tasks = () => {
  return (
    <Main
      heading="Welcome back, degen"
      subtext="Track, manage and forecast your customers and orders."
    >
      <SimpleGrid columns={[1, 2, 3]} spacing={8}>
        {tasksLists.map(({ name, description, points, actionText }) => {
          return (
            <Card key={name} p={4}>
              <HStack w="full" justify="space-between" align="flex-start">
                <VStack spacing={10} align="flex-start">
                  <Text>{description}</Text>
                  <Button variant="primary">{actionText}</Button>
                </VStack>
                <Text
                  borderWidth={1}
                  borderColor="black"
                  px={3}
                  py={2}
                  rounded={10}
                  color="gray.400"
                >
                  {points}XP
                </Text>
              </HStack>
            </Card>
          );
        })}
      </SimpleGrid>
    </Main>
  );
};

export default Tasks;
