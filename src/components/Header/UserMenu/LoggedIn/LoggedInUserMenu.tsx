import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import LoggedInUserMenuModal from './LoggedInUserMenuModal';
import Avatar from '@mui/material/Avatar';
import { UserMenuBox, UserMenuTooltip } from './LoggedInUserMenuStyle';

const LoggedInUserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <UserMenuBox>
      <UserMenuTooltip title="Account settings">
        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
          <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
        </IconButton>
      </UserMenuTooltip>
      <LoggedInUserMenuModal anchorEl={anchorEl} handleClose={handleClose} />
    </UserMenuBox>
  );
};

export default LoggedInUserMenu;
