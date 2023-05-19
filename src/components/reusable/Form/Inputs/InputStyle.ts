import { styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import {Box} from '@mui/material'
interface PasswordInputProps {
  isError: boolean;
}

export const PasswordInput = styled(TextField)(({ isError }: PasswordInputProps) => ({
  background: 'rgb(27, 32, 40)',
  borderRadius: '4px',
  '& label': {
    color: '#6f7277',
  },
  '& label.Mui-focused': {
    color: 'lightgray',
  },
  '& .MuiOutlinedInput-root': {
    color: 'lightgray',
    '& fieldset': {
      borderColor: isError && 'red',
    },
    '&:hover fieldset': {
      borderColor: isError && 'red',
    },
    '&.Mui-focused fieldset': {
      borderColor: isError && 'red',
    },
  },
}));

export const InputNote = styled(Box)({
  color: 'rgb(108, 117, 125)',
  fontSize: '14px',
  marginLeft: '9px',
});
export const InputError = styled(Box)({
  color: 'rgb(211, 47, 47)',
  fontSize: '14px',
  marginLeft: '9px',
});
