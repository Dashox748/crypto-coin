import { Box } from '@mui/material';
import React from 'react';
import { InputError, InputNote, PasswordInput } from './InputStyle';

interface InputProps {
  name: string;
  placeholder: string;
  note: string;
  register: any;
  error: string;
}

const InputText = ({ name, placeholder, note, register, error }: InputProps) => {
  return (
    <Box>
      <PasswordInput
        isError={!!error}
        {...register(`${name}`)}
        label={placeholder}
        variant="outlined"
        fullWidth
      />
      {!error ? <InputNote>{note}</InputNote> : <InputError>{error}</InputError>}
    </Box>
  );
};

export default InputText;
