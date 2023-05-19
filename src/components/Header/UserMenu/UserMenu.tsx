import * as React from 'react';
import LoggedInUserMenu from './LoggedIn/LoggedInUserMenu';
import NotLoggedInUserMenu from './NotLoggedIn/NotLoggedInUserMenu';
import { useAuth } from '../../../hooks/useAuth';

const UserMenu = () => {
  const { user } = useAuth();

  if (user) return <LoggedInUserMenu />;
  return <NotLoggedInUserMenu />;
};

export default UserMenu;
