import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import { useAuth } from '../../../../../../hooks/useAuth';

export const Facebook = () => {
  const { loginWithFacebook } = useAuth();
  return (
    <IconButton size="small" onClick={() => loginWithFacebook()}>
      <FacebookRoundedIcon sx={{ color: 'gray', height: '50px', width: '50px' }} />
    </IconButton>
  );
};
