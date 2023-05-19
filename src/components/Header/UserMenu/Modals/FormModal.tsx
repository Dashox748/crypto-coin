import * as React from 'react';
import { Box } from '@mui/material';
import Form from '../../../reusable/Form/Form';
import Typography from '@mui/material/Typography';
import { CloseModalIcon, FormDialog, ModalHeader, TitleButton } from './FormModalStyle';
import IconButton from '@mui/material/IconButton';
import SocialsLogin from '../NotLoggedIn/Socials/SocialsLogin';
import { useAuth } from '../../../../hooks/useAuth';

export default function FormModal({ title, inputsList, onSubmit, schema, buttonType }: any) {
  const { isLoading } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <TitleButton variant={buttonType} onClick={handleClickOpen} disabled={isLoading}>
        {title}
      </TitleButton>
      <FormDialog open={open} onClose={handleClose} fullScreen={false}>
        <ModalHeader>
          <Typography variant="h4" color="white">
            {title}
          </Typography>
          <IconButton size="small" onClick={handleClose}>
            <CloseModalIcon />
          </IconButton>
        </ModalHeader>
        <Form inputs={inputsList} onSubmit={onSubmit} schema={schema} title={title} />
        <SocialsLogin />
      </FormDialog>
    </Box>
  );
}
