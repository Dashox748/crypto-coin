import Box from '@mui/material/Box';
import styled from '@emotion/styled';
import Tooltip from '@mui/material/Tooltip';
import { SxProps } from '@mui/system';

export const UserMenuBox = styled(Box)({});

export const UserMenuTooltip = styled(Tooltip)({
  display: 'flex',
  alignItems: 'center',
  textAlign: 'center',
});

export const menuPaperStyles: SxProps = {
  background: '#373b42',
  color: '#ffffff',
  overflow: 'visible',
  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
  mt: 1.5,
  '& .MuiAvatar-root': {
    width: 32,
    height: 32,
    ml: -0.5,
    mr: 1,
  },
  '&:before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    top: 0,
    right: 14,
    width: 10,
    height: 10,
    bgcolor: '#373b42',
    transform: 'translateY(-50%) rotate(45deg)',
    zIndex: 0,
  },
};
