import { FormEvent, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
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
import GitHubIcon from "@mui/icons-material/GitHub";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import GoogleIcon from "@mui/icons-material/Google";
import CloseIcon from "@mui/icons-material/Close";
import {
  signInWithFacebook,
  signInWithGithub,
  signInWithGoogle,
  registerWithEmailAndPassword,
} from "../../firebase";
import { styledFormItems } from "./utils/styledFormItems";
import {
  RegisterFormTypes,
  RegisterFormErrorTypes,
  RegisterState,
} from "./utils/interfaces";
import { validateRegister } from "./utils/validation";

const RegisterForm = ({ setShowRegisterModal }: RegisterState) => {
  const [registerForm, setRegisterForm] = useState<RegisterFormTypes>(
    {} as RegisterFormTypes
  );
  const [errors, setErrors] = useState<RegisterFormErrorTypes>(
    {} as RegisterFormErrorTypes
  );
  const handleClose = () => {
    setShowRegisterModal(false);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const errors = validateRegister(registerForm);
    setErrors(errors);
    if (Object.values(errors).includes(true)) {
      return;
    }
    if (
      await registerWithEmailAndPassword(
        registerForm.username,
        registerForm.email,
        registerForm.password
      )
    ) {
      setErrors({ ...errors, valid: true });
      return;
    }
    window.location.reload();
  };
  return (
    <div>
      <Dialog open={true} onClose={handleClose} sx={{ margin: "auto" }}>
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
            Register
            <DialogActions>
              <IconButton size="small" onClick={handleClose}>
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
                placeholder="Username"
                helperText={
                  !errors.username
                    ? "Set a unique Username, u can change it later"
                    : "Username is too Short"
                }
                error={errors.username}
                onChange={(event) =>
                  setRegisterForm({
                    ...registerForm,
                    username: event.target.value,
                  })
                }
              />
              <TextField
                placeholder="Email"
                helperText={
                  !errors.email
                    ? "We'll never share your email."
                    : "Email is incorrect"
                }
                error={errors.email}
                onChange={(event) =>
                  setRegisterForm({
                    ...registerForm,
                    email: event.target.value,
                  })
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
                  setRegisterForm({
                    ...registerForm,
                    password: event.target.value,
                  })
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
              Register
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
                Account already exist
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
export default RegisterForm;
