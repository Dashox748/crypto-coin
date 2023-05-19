import React from 'react';
import InputPassword from './InputPassword';
import InputText from './InputText';

interface InputProps {
  name: string;
  placeholder: string;
  note: string;
  type: string;
  register: any;
  errors: any;
}

const InputField = ({ name, placeholder, note, type, register, errors }: InputProps) => {
  if (type === 'password')
    return (
      <InputPassword
        name={name}
        placeholder={placeholder}
        note={note}
        register={register}
        error={errors?.message}
      />
    );

  return (
    <InputText
      name={name}
      placeholder={placeholder}
      note={note}
      register={register}
      error={errors?.message}
    />
  );
};

export default InputField;
