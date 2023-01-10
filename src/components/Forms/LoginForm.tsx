import { FormEvent, useState } from "react";
import {
  signInWithFacebook,
  signInWithGithub,
  signInWithGoogle,
  logInWithEmailAndPassword,
} from "../../firebase";
import {
  Box,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  Button,
  Dialog,
  IconButton,
  TextField,
} from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";

import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import CloseIcon from "@mui/icons-material/Close";

import { styledFormItems } from "./utils/styledFormItems";
import {
  LoginFormTypes,
  LoginFormErrorTypes,
  LoginState,
} from "./utils/interfaces";
import { validateLogin } from "./utils/validation";

const LoginForm = ({ setShowLoginModal }: LoginState) => {
  const [loginForm, setLoginForm] = useState<LoginFormTypes>(
    {} as LoginFormTypes
  );
  const [errors, setErrors] = useState<LoginFormErrorTypes>(
    {} as LoginFormErrorTypes
  );

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const errors = validateLogin(loginForm);
    setErrors(errors);
    if (Object.values(errors).includes(true)) {
      return;
    }
    if (await logInWithEmailAndPassword(loginForm.email, loginForm.password)) {
      setErrors({ ...errors, valid: true });
    }
  };
  return (
    <div>
      <Dialog
        open={true}
        onClose={handleCloseLoginModal}
        sx={{ margin: "auto" }}
      >
        <DialogContent sx={{ background: "rgb(49, 53, 63)" }}>
          <DialogTitle
            variant="h4"
            color="white"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "16px 10px",
            }}
          >
            Login
            <DialogActions>
              <IconButton size="small" onClick={handleCloseLoginModal}>
                <CloseIcon
                  sx={{ color: "gray", height: "30px", width: "30px" }}
                />
              </IconButton>
            </DialogActions>
          </DialogTitle>
          <form
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            onSubmit={(event) => handleSubmit(event)}
          >
            <ThemeProvider theme={styledFormItems}>
              <TextField
                placeholder="Email"
                helperText={
                  !errors.email
                    ? "We'll never share your email."
                    : "Email is incorrect"
                }
                error={errors.email}
                onChange={(event) =>
                  setLoginForm({ ...loginForm, email: event.target.value })
                }
              />
              <TextField
                placeholder="Password"
                helperText={
                  !errors.password
                    ? "Set A Strong password"
                    : "password is too short"
                }
                error={errors.password}
                onChange={(event) =>
                  setLoginForm({ ...loginForm, password: event.target.value })
                }
              />
            </ThemeProvider>
            <Button
              variant="contained"
              type="submit"
              sx={{
                fontWeight: "600",
                textTransform: "none",
                fontSize: "15px",
              }}
            >
              Login
            </Button>
            {!errors.valid ? (
              <Typography
                variant="subtitle1"
                sx={{ margin: "0 auto", color: "gray" }}
              >
                Or use Social Network
              </Typography>
            ) : (
              <Typography
                variant="subtitle1"
                sx={{ margin: "0 auto", color: "#d32f2f" }}
              >
                Password Or Email is wrong
              </Typography>
            )}
          </form>
          <Box display="flex" justifyContent="center" fontSize="25px">
            <IconButton size="small" onClick={() => signInWithFacebook()}>
              <FacebookRoundedIcon
                sx={{ color: "gray", height: "50px", width: "50px" }}
              />
            </IconButton>
            <IconButton size="small" onClick={() => signInWithGithub()}>
              <GitHubIcon
                sx={{ color: "gray", height: "50px", width: "50px" }}
              />
            </IconButton>
            <IconButton size="small" onClick={() => signInWithGoogle()}>
              <GoogleIcon
                sx={{ color: "gray", height: "50px", width: "50px" }}
              />
            </IconButton>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default LoginForm;
