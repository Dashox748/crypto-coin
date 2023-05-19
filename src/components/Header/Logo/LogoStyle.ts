import styled from '@emotion/styled';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

export const LogoWrapper = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '15px',
});

export const SiteName = styled(Box)({
  fontSize: '40px',
  fontWeight: '700',
});

export const LogoImage = styled('img')({
  width: '50px',
  height: '50px',
});

export const LogoLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
});
