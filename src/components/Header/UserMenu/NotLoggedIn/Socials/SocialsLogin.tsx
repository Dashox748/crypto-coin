import { Box } from '@mui/material';import { Github } from './Providers/Github';
import { Facebook } from './Providers/Facebook';
import Google from './Providers/Google';
import Typography from '@mui/material/Typography';

const SocialsLogin = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', margin: 'auto' }}>
      <Typography color={'gray'} sx={{ margin: 'auto' }}>
        Or use Social Network
      </Typography>
      <Box>
        <Facebook />
        <Github />
        <Google />
      </Box>
    </Box>
  );
};

export default SocialsLogin;
