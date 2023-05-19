import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import InputField from './Inputs/InputField';
import {ModalForm, SubmitButton, SubmitError} from './FormStyle';
import { useState } from 'react';

interface InputProps {
  name: string;
  placeholder: string;
  note: string;
  type: string;
}

const Form = ({ inputs, onSubmit, schema, title }: any) => {
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (fieldValues: any) => {
    setSubmitError(await onSubmit(fieldValues));
  };

  return (
    <ModalForm component="form" onSubmit={handleSubmit(handleFormSubmit)}>
      {inputs.map((input: InputProps) => {
        return (
          <InputField
            name={input.name}
            placeholder={input.placeholder}
            note={input.note}
            type={input.type}
            key={input.name}
            register={register}
            errors={errors[input.name]}
          />
        );
      })}
      {submitError && <SubmitError>{submitError}</SubmitError>}
      <SubmitButton variant="contained" type="submit">
        {title}
      </SubmitButton>
    </ModalForm>
  );
};

export default Form;
