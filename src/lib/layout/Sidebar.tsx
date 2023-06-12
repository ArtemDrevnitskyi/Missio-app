/* eslint-disable no-console */
import {
  HStack,
  IconButton,
  Box,
  CloseButton,
  Flex,
  Button,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Divider,
  VStack,
  Avatar,
} from '@chakra-ui/react';
import type { BoxProps, FlexProps } from '@chakra-ui/react';
import type { User } from '@supabase/supabase-js';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import type { IconType } from 'react-icons';
import {
  FiHome,
  FiCompass,
  FiSettings,
  FiMenu,
  FiSearch,
  FiStar,
} from 'react-icons/fi';

import NewMissioIcon from '~/assets/svg/NewMissioIcon.svg';
import SignoutIcon from '~/assets/svg/signout.svg';
import supabase from '~/utils/superbase';

interface LinkItemProps {
  name: string;
  href: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', href: '/home', icon: FiHome },
  { name: 'Missios', href: '/missios', icon: FiCompass },
  { name: 'Tasks', icon: FiStar, href: '/tasks' },
  // { name: 'DAO Pools', href: '/pools', icon: FiTrendingUp },
  // { name: 'Rate', icon: FiSettings, href: '/rate' },
  // { name: 'My Profile', icon: FiUser, href: '/profile' },
];

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: string;
  isactive: boolean;
}
const NavItem = ({ icon, href, children, isactive, ...rest }: NavItemProps) => {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <Link
      as={NextLink}
      href={href}
      w="100%"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        minW="full"
        w="full"
        align="center"
        p="2"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isactive ? 'secondary.400' : 'transparent'}
        _hover={{
          bg: 'primary.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

// interface IconNavItemProps extends FlexProps {
//   icon: IconType;
//   href: string;
// }
// const IconNavItem = ({ icon, href, children, ...rest }: IconNavItemProps) => {
//   return (
//     // eslint-disable-next-line jsx-a11y/anchor-is-valid

//     <Link
//       as={NextLink}
//       href={href}
//       style={{ textDecoration: 'none' }}
//       _focus={{ boxShadow: 'none' }}
//     >
//       <Flex
//         align="center"
//         p="4"
//         m="w"
//         borderRadius="lg"
//         role="group"
//         cursor="pointer"
//         _hover={{
//           bg: 'cyan.400',
//           color: 'white',
//         }}
//         {...rest}
//       >
//         {icon && (
//           <Icon
//             fontSize="16"
//             _groupHover={{
//               color: 'white',
//             }}
//             as={icon}
//           />
//         )}
//       </Flex>
//     </Link>
//   );
// };

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  type UserDao = {
    id: number;
    daos: {
      id: number;
      name: string;
    };
  };
  const router = useRouter();
  const [user, setUser] = useState<User | null>();
  const [userDaos, setUserDaos] = useState<UserDao[] | null>();

  useEffect(() => {
    const getProfile = async () => {
      const profile = await supabase.auth.getUser();

      if (profile) {
        setUser(profile.data.user);
        const { data: dao } = await supabase
          .from('user_daos')
          .select(`id, daos (id, name)`)
          .eq('user_id', profile.data.user?.id);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setUserDaos(dao);
        console.log(profile.data.user, dao);
      }
    };

    getProfile();
  }, []);

  useEffect(() => {
    const channel = supabase
      .channel('*')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'user_daos' },
        (payload) => console.log(payload)
      )
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          const { data: res } = await supabase
            .from('user_daos')
            .select(`id, daos (id, name)`)
            .eq('user_id', user?.id);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          setUserDaos(res);
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
    // console.log('imi');
  }, [userDaos, user]);

  async function signout() {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/start');
  }

  async function signInWithDiscord() {
    const { data } = await supabase.auth.signInWithOAuth({
      provider: 'discord',
    });

    if (data) {
      router.push('/daos');
    }
  }
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 80 }}
      // w={{ base: 'full', md: '19%' }}
      pos="fixed"
      // h="full"
      {...rest}
    >
      <Flex
        h="20"
        display={{ base: 'flex', md: 'none' }}
        alignItems="center"
        mx="8"
        justifyContent="space-between"
      >
        <CloseButton onClick={onClose} />
      </Flex>
      <HStack w="100%">
        <Box p={2} borderRightWidth={1} h="100vh">
          <Button rounded={5} my="auto" p={3} bg="secondary.400">
            <Icon
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={FiSearch}
            />
          </Button>

          <Button
            rounded={5}
            p={3}
            bg="secondary.400"
            my={4}
            onClick={() => router.push('/daos')}
          >
            <Image src={NewMissioIcon} style={{ width: 16 }} alt="new missio" />
          </Button>
          <VStack my="auto" align="flex-start" spacing={4}>
            {userDaos?.map((dao: UserDao) => {
              return (
                <Link as={NextLink} href={`/daos/${dao.daos.id}`} key={dao.id}>
                  <Avatar name={dao.daos.name.trim()} />
                </Link>
              );
            })}
          </VStack>
        </Box>
        <Flex
          flexDirection="column"
          h="100vh"
          w="full"
          pr={2}
          justifyContent="space-between"
        >
          <Box>
            <Text
              fontSize="2xl"
              mt={2}
              px={4}
              fontFamily="monospace"
              fontWeight="bold"
            >
              Logo
            </Text>
            {LinkItems.map(({ name, href, icon }) => (
              <NavItem
                key={name}
                isactive={
                  href === '/'
                    ? router.asPath === '/'
                    : router.asPath.includes(href)
                }
                icon={icon}
                href={href}
              >
                {name}
              </NavItem>
            ))}
          </Box>
          <VStack alignItems="flex-start" mb={10} spacing={4}>
            <NavItem
              isactive={router.asPath.includes('/settings')}
              icon={FiSettings}
              href="/settings"
            >
              Settings
            </NavItem>
            <Divider />
            {!user ? (
              <Button onClick={() => signInWithDiscord()} w="100%">
                Connect
              </Button>
            ) : (
              <HStack>
                <Avatar src={user.user_metadata.avatar_url} />
                <VStack align="flex-start" spacing={0}>
                  <HStack justify="space-between" w="100%">
                    <Text>{user.user_metadata.full_name}</Text>
                    <Button
                      p={0}
                      bg="transparent"
                      alignSelf="flex-end"
                      onClick={() => signout()}
                      // onClick={async () => {
                      //   await supabase.auth.signOut();
                      // }}
                    >
                      <Image src={SignoutIcon} alt="signout" />
                    </Button>
                  </HStack>
                  <Text fontSize={12}>{user.email}</Text>
                </VStack>
              </HStack>
            )}
          </VStack>
        </Flex>
      </HStack>
    </Box>
  );
};

// const IconBarContent = () => {
//   return (
//     <Box
//       bg={useColorModeValue('white', 'gray.900')}
//       borderRight="1px"
//       borderRightColor={useColorModeValue('gray.200', 'gray.700')}
//       w={{ base: 'full', md: 60 }}
//       pos="fixed"
//       h="full"
//       // {...rest}
//     >
//       <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
//         <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
//           Logo
//         </Text>
//         <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
//       </Flex>
//       {LinkItems.map((link) => (
//         <NavItem key={link.name} icon={link.icon} href={link.href}>
//           {link.name}
//         </NavItem>
//       ))}
//     </Box>
//   );
// };

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')} w="100%">
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
        // mr={201}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 80 }} w="75%" p="4">
        {children}
      </Box>
    </Box>
  );
}
