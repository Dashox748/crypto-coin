import { styled } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';

export const FormDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    background: 'rgb(49, 53, 63)',
    display: 'flex',
    flexDirection: 'column',
    width: '450px',
    padding: '20px',
    gap: '20px',
  },
});

export const TitleButton = styled(Button)({
  fontWeight: '600',
  textTransform: 'none',
  fontSize: '15px',
});

export const ModalHeader = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const CloseModalIcon = styled(CloseIcon)({
  color: 'gray',
  height: '30px',
  width: '30px',
});
