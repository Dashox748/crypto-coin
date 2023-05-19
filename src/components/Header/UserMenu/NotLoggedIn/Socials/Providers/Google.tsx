import IconButton from '@mui/material/IconButton';
import GoogleIcon from '@mui/icons-material/Google';
import * as React from 'react';
import { useAuth } from '../../../../../../hooks/useAuth';

const Google = () => {
  const { loginWithGoogle } = useAuth();
  return (
    <IconButton size="small" onClick={() => loginWithGoogle()}>
      <GoogleIcon sx={{ color: 'gray', height: '50px', width: '50px' }} />
    </IconButton>
  );
};

export default Google;
