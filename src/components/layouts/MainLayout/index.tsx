/** @jsx jsx */
import {
  jsx,
  IconButton,
  Heading,
  Box,
  Flex,
  MenuButton,
  Menu,
  MenuItem,
  MenuList,
  Button,
  useColorMode,
  HStack,
} from '@chakra-ui/core';
import { useState, FC, useCallback } from 'react';
import { mode } from '@chakra-ui/theme-tools';
import { AiOutlineMenu, AiOutlineUpload, AiOutlineHighlight, AiOutlineUser } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import NextLink from 'next/link';

import { Sider } from 'components/Sider';
import { Header } from '../../core/Header';
import { Gravatar } from '../../Gravatar';
import { fetcher } from '../../../libs/fetcher';
import { SidebarMenu, SidebarMenuItem } from '../../core/SidebarMenu';
import useUser from '../../../libs/useUser';

export const MainLayout: FC = ({ children }) => {
  const { user, mutateUser } = useUser({ redirectTo: `${process.env.linkPrefix}/login` });
  const [collapsed, setCollapsed] = useState(false);
  const { colorMode, toggleColorMode } = useColorMode();

  const toggle = () => {
    setCollapsed((prev) => !prev);
  };

  const logout = useCallback(() => {
    mutateUser(
      fetcher('/account/logout', {
        method: 'POST',
      }),
    );
  }, []);

  return (
    <>
      <Header>
        <IconButton
          aria-label="Menu toggle"
          variant="ghost"
          onClick={toggle}
          icon={<AiOutlineMenu sx={{ width: '20px', height: '20px' }} />}
        />
        <Box sx={{ mx: 3, width: '1px', height: '20px', bg: 'gray.300' }} />
        <Flex sx={{ flex: 1, justifyContent: 'space-between' }}>
          <Heading as="h1" size="lg">
            <img src="/images/logo.svg" sx={{ width: '32px', mr: 2, mt: -2, display: 'inline-block' }} />
            Linia
          </Heading>
          <HStack spacing="24px">
            <Button variant="ghost" onClick={toggleColorMode}>
              {colorMode === 'light' ? <FaMoon /> : <FaSun />}
            </Button>
            {user && (
              <Box>
                <Menu>
                  <MenuButton>
                    <Gravatar size="sm" email={user.email} />
                  </MenuButton>
                  <MenuList>
                    <NextLink href="/user-settings" as={`${process.env.linkPrefix}/user-settings`} passHref>
                      <MenuItem as="a">Settings</MenuItem>
                    </NextLink>
                    <MenuItem onClick={logout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            )}
          </HStack>
        </Flex>
      </Header>
      <div
        sx={{
          pt: '78px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Sider sx={{ zIndex: 1, position: 'relative' }} collapsed={collapsed}>
          {user && (
            <SidebarMenu>
              <NextLink href="/" as={`${process.env.linkPrefix}/`} passHref>
                <SidebarMenuItem collapsed={collapsed} icon={<AiOutlineUpload />}>
                  Upload
                </SidebarMenuItem>
              </NextLink>
              <NextLink href="/highlights" as={`${process.env.linkPrefix}/highlights`} passHref>
                <SidebarMenuItem collapsed={collapsed} icon={<AiOutlineHighlight />}>
                  Highlights
                </SidebarMenuItem>
              </NextLink>
            </SidebarMenu>
          )}
          {user?.roleId === 1 ? (
            <SidebarMenu>
              <NextLink href="/users" as={`${process.env.linkPrefix}/users`} passHref>
                <SidebarMenuItem collapsed={collapsed} icon={<AiOutlineUser />}>
                  Users
                </SidebarMenuItem>
              </NextLink>
            </SidebarMenu>
          ) : null}
        </Sider>
        <main
          sx={{
            position: 'relative',
            bg: mode('white', 'gray.800')({ colorMode }),
            flex: 1,
            zIndex: 0,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div sx={{ p: 3, flex: 1 }}>{user && children}</div>
          <footer
            sx={{
              p: 3,
              bg: mode('white', 'gray.800')({ colorMode }),
              color: mode('gray.800', 'whiteAlpha.900')({ colorMode }),
              flex: 0,
            }}
          >
            Linia &copy; 2020
          </footer>
        </main>
      </div>
    </>
  );
};
