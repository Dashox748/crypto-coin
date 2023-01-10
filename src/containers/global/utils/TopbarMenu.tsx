import { auth, logout } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { lazy, useState, Suspense } from "react";
import useResponsive from "../../../utils/hooks/useResponsive";

const LoginForm = lazy(() => import("../../../components/Forms/LoginForm"));
const RegisterForm = lazy(
  () => import("../../../components/Forms/RegisterForm")
);
import { IconButton, Typography, Button, Box } from "@mui/material";

const TopbarMenu = () => {
  const down750px = useResponsive("down", 750);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [user] = useAuthState(auth);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
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
          <Box
            display="flex"
            gap="1rem"
            paddingX={down750px ? "20px" : "0"}
            marginBottom={down750px ? "30px" : "0"}
          >
            <Box flex="1">
              <Button
                fullWidth
                variant="outlined"
                sx={{
                  fontWeight: "600",
                  textTransform: "none",
                  fontSize: "15px",
                }}
                onClick={() => setShowLoginModal(!showLoginModal)}
              >
                Login
              </Button>
              {showLoginModal && (
                <Suspense>
                  <LoginForm setShowLoginModal={setShowLoginModal} />
                </Suspense>
              )}
            </Box>
            <Box flex="1">
              <Button
                fullWidth
                variant="contained"
                sx={{
                  fontWeight: "600",
                  textTransform: "none",
                  fontSize: "15px",
                  minWidth: "94px",
                }}
                onClick={() => setShowRegisterModal(!showRegisterModal)}
              >
                Sign-up
              </Button>
              {showRegisterModal && (
                <Suspense>
                  <RegisterForm setShowRegisterModal={setShowRegisterModal} />
                </Suspense>
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};

export default TopbarMenu;
