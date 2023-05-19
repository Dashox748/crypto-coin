import { styled } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const ModalForm = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
});

export const SubmitButton = styled(Button)({
  fontWeight: '600',
  textTransform: 'none',
  fontSize: '15px',
});

export const SubmitError = styled(Typography)({
  color: 'rgb(211, 47, 47)',
  fontSize: '18px',
  margin:'0 auto'
});
