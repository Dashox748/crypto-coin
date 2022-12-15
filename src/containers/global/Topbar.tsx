import {Box, IconButton, Typography} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useState} from "react";
import InputBase from '@mui/material/InputBase';
import LoginForm from "../../components/LoginForm/LoginForm";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import {auth, logout} from "../../firebase";
import {useAuthState} from "react-firebase-hooks/auth";


const Topbar = () => {
    const [user] = useAuthState(auth);


    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    console.log(user)
    return (
        <AppBar position="sticky" sx={{background: "transparent", boxShadow: "none", marginTop: "15px"}}>
            <Container maxWidth={false}>
                <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                    <Typography variant="h4" fontWeight="600" textAlign="center">Most Popular</Typography>
                    <InputBase
                        sx={{
                            m:2,
                            flex: 1,
                            maxWidth: "500px",
                            background: "#1B2028",
                            borderRadius: "10px",
                            padding: "6px 25px",
                            color: "gray"
                        }}
                        placeholder="Search any coin..."
                    />
                    <Box sx={{flexGrow: 0, display: "flex", gap: "15px"}}>
                        {user ? <><Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                            </IconButton>
                        </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem>
                                    <Typography textAlign="center">Profile</Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Typography textAlign="center">Account</Typography>
                                </MenuItem>
                                <MenuItem>
                                    <Typography textAlign="center">Settings</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => {
                                    logout()
                                    handleCloseUserMenu()
                                }}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu></> : <>
                            <LoginForm/>
                            <RegisterForm/>
                        </>}

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default Topbar