import {Box} from '@mui/material'
import { InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import React from 'react';
import { InputError, InputNote, PasswordInput } from './InputStyle';

interface InputProps {
  name: string;
  placeholder: string;
  note: string;
  register: any;
  error: string;
}

const InputPassword = ({ name, placeholder, note, register, error }: InputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <Box>
      <PasswordInput
        isError={!!error}
        {...register(`${name}`)}
        label={placeholder}
        variant="outlined"
        fullWidth
        type={showPassword ? 'text' : 'password'}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleClickShowPassword} edge="end">
                {showPassword ? (
                  <VisibilityOff sx={{ color: 'lightgray' }} />
                ) : (
                  <Visibility sx={{ color: 'lightgray' }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {!error ? <InputNote>{note}</InputNote> : <InputError>{error}</InputError>}
    </Box>
  );
};

export default InputPassword;
