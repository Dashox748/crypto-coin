import * as yup from 'yup';

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/^\S+@\S+\.\S+$/, 'Invalid email address')
    .required('Login is required'),
  password: yup
    .string()
    .matches(/^[a-zA-Z0-9]{6,}$/, 'Password must contain at least 6 characters')
    .required('Password is required'),
});
