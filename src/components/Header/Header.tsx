import * as React from 'react';
import UserMenu from './UserMenu/UserMenu';
import { HeaderBox } from './HeaderStyle';
import Logo from './Logo/Logo';

export default function Header() {
  return (
    <HeaderBox>
      <Logo />
      <UserMenu />
    </HeaderBox>
  );
}
