import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import {ThemeProvider, createTheme} from '@mui/material/styles';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import GoogleIcon from '@mui/icons-material/Google';
import {Box, IconButton, Typography} from "@mui/material";


const theme = createTheme({
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    fontSize: '1rem',
                },
                input: {
                    background: "#1B2028",
                    outline: "none",
                    border: "none",
                    borderRadius: "5px",
                    height: "20px",
                    width: "400px",
                    color: "white",
                }
            },
        },
    }
});


const LoginForm = () => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined"
                    sx={{fontWeight: "600", textTransform: "none", fontSize: "15px"}}
                    onClick={handleClickOpen}>Login</Button>
            <Dialog open={open} onClose={handleClose} sx={{margin: "auto", top: "-350px"}}>
                <DialogContent sx={{background: "rgb(49, 53, 63)"}}>
                    <DialogTitle variant="h4" color="white">Login</DialogTitle>
                    <form style={{display: "flex", flexDirection: "column", gap: "15px"}}>
                        <ThemeProvider theme={theme}>
                            <TextField placeholder="Email" helperText="We'll never share your email."/>
                            <TextField placeholder="Password" helperText="Set A Strong password "/>
                        </ThemeProvider>
                        <Button variant="contained"
                                sx={{fontWeight: "600", textTransform: "none", fontSize: "15px"}}>Login</Button>
                        <Typography variant="h7" sx={{margin: "0 auto", color: "gray"}}>Or use Social
                            Network</Typography>
                    </form>
                    <Box display="flex" justifyContent="center" fontSize="25px">
                        <IconButton size="small">
                            <FacebookRoundedIcon sx={{color: "gray", height: "50px", width: "50px"}}/>
                        </IconButton>
                        <IconButton size="small">
                            <GitHubIcon sx={{color: "gray", height: "50px", width: "50px"}}/>
                        </IconButton>
                        <IconButton size="small">
                            <GoogleIcon sx={{color: "gray", height: "50px", width: "50px"}}/>
                        </IconButton>
                    </Box>


                    <DialogActions>
                        <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div>
    );
}
export default LoginForm