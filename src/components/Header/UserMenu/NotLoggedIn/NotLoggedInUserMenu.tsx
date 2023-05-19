import { Box } from '@mui/material';
import FormModal from '../Modals/FormModal';
import { loginInputs } from './InputsList/loginInputs';
import { loginSchema } from '../../../../../utils/schema/LoginSchema';
import React from 'react';
import { registerInputs } from './InputsList/registerInputs';
import { registerSchema } from '../../../../../utils/schema/RegisterSchema';
import { useAuth } from '../../../../hooks/useAuth';

const NotLoggedInUserMenu = () => {
  const { loginWithEmailAndPassword, registerWithEmailAndPassword } = useAuth();
  return (
    <Box sx={{ display: 'flex', gap: '10px' }}>
      <FormModal
        inputsList={loginInputs}
        title={'Login'}
        buttonType={'outlined'}
        onSubmit={loginWithEmailAndPassword}
        schema={loginSchema}
      />
      <FormModal
        inputsList={registerInputs}
        title={'Sign-up'}
        buttonType={'contained'}
        onSubmit={registerWithEmailAndPassword}
        schema={registerSchema}
      />
    </Box>
  );
};

export default NotLoggedInUserMenu;
