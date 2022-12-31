import { auth, logout } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { lazy, useState, Suspense } from "react";

const LoginForm = lazy(() => import("../../../components/Forms/LoginForm"));
const RegisterForm = lazy(
  () => import("../../../components/Forms/RegisterForm")
);
import { IconButton, Typography, Button, Box } from "@mui/material";

const TopbarMenu = () => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [user] = useAuthState(auth);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const handleOpenUserMenu = (event: any) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <>
      {user ? (
        <>
          <Typography>{user?.displayName}</Typography>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="witam" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
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
            <MenuItem
              onClick={() => {
                logout();
                handleCloseUserMenu();
              }}
            >
              <Typography textAlign="center">Logout</Typography>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <Box>
            <Button
              variant="outlined"
              sx={{
                fontWeight: "600",
                textTransform: "none",
                fontSize: "15px",
              }}
              onClick={() => setShowLogin(!showLogin)}
            >
              Login
            </Button>
            {showLogin && (
              <Suspense>
                <LoginForm setShowLogin={setShowLogin} />
              </Suspense>
            )}
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{
                fontWeight: "600",
                textTransform: "none",
                fontSize: "15px",
              }}
              onClick={() => setShowRegister(!showRegister)}
            >
              Sign-up
            </Button>
            {showRegister && (
              <Suspense>
                <RegisterForm setShowRegister={setShowRegister} />
              </Suspense>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default TopbarMenu;
