import IconButton from '@mui/material/IconButton';
import * as React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useAuth } from '../../../../../../hooks/useAuth';

export const Github = () => {
  const { loginWithGithub } = useAuth();
  return (
    <IconButton size="small" onClick={() => loginWithGithub()}>
      <GitHubIcon sx={{ color: 'gray', height: '50px', width: '50px' }} />
    </IconButton>
  );
};
