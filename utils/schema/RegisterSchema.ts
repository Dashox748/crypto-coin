import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9]{4,}$/, 'Username must contain at least 4 characters')
    .required('Username is required'),
  email: yup
    .string()
    .matches(/^\S+@\S+\.\S+$/, 'Invalid email address')
    .required('Login is required'),
  password: yup
    .string()
    .matches(/^[a-zA-Z0-9]{6,}$/, 'Password must contain at least 6 characters')
    .required('Password is required'),
});
