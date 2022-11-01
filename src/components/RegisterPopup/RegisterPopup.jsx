import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  signInWithGoogle,
  signInWithGithub,
  registerWithEmailAndPassword,
  signInWithFacebook,
} from "../../firebase";

function RegisterPopup({ handleClose }) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [showError, setShowError] = useState({
    usernameValidationLocal: false,
    emailValidationLocal: false,
    passwordValidationLocal: false,
    databaseValidation: false,
  });
  const [showUsed, setShowUsed] = useState("");
  const handleRegisterWithForm = async () => {
    if (!re.test(email) && password.length < 5) {
      setShowError({
        emailValidationLocal: true,
        passwordValidationLocal: true,
        databaseValidation: false,
      });
      setShowUsed("Email is not correct");
      return;
    } else if (!re.test(email)) {
      setShowError({
        emailValidationLocal: true,
        passwordValidationLocal: false,
        databaseValidation: false,
      });
      setShowUsed("Email is not correct");
      return;
    } else if (password.length < 5) {
      setShowError({
        emailValidationLocal: false,
        passwordValidationLocal: true,
        databaseValidation: false,
      });
      setShowUsed("Email is not correct");
      return;
    }
    if (await registerWithEmailAndPassword(username, email, password)) {
      handleClose("registerWithPopup");
    } else {
      setShowError({
        emailValidationLocal: true,
        passwordValidationLocal: false,
        databaseValidation: false,
      });
      setShowUsed("Email is already used");
    }
  };
  const handleLoginWithSocials = async (withWhat) => {
    if (withWhat === "google") {
      if ((await signInWithGoogle()) === true) {
        handleClose("register");
      }
    }
    if (withWhat === "github") {
      if ((await signInWithGithub()) === true) {
        handleClose("register");
      }
    }
    if (withWhat === "facebook") {
      if ((await signInWithFacebook()) === true) {
        handleClose("register");
      }
    }
  };
  return (
    <>
      <Form
        style={{ width: "500px", padding: "2rem" }}
        onSubmit={handleRegisterWithForm}
      >
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />

          <Form.Text className="text-muted">
            Unique Username, u can change it later
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={showError.emailValidationLocal ? "inputError" : ""}
          />
          {showError.emailValidationLocal ? (
            <Form.Text className="text-danger">{showUsed}</Form.Text>
          ) : (
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassowrd(event.target.value)}
            className={showError.passwordValidationLocal ? "inputError" : ""}
          />
          {showError.passwordValidationLocal ? (
            <Form.Text className="text-danger">Password is too short</Form.Text>
          ) : (
            <Form.Text className="text-muted">Set A Strong password</Form.Text>
          )}
        </Form.Group>

        <Button variant="primary" type="submit" style={{ width: "100%" }}>
          Register
        </Button>
        <Form.Group
          className="mb-1 mt-3 flex-column text-muted"
          controlId="formGroupPassword"
        >
          <Form.Label className="d-flex align-content-center align-items-center justify-content-center  ">
            Or use Social Network
          </Form.Label>
          <div className="d-flex align-content-center align-items-center justify-content-center gap-4 ">
            <h1
              className="bi bi-facebook"
              onClick={() => handleLoginWithSocials("facebook")}
            ></h1>
            <h1
              className="bi bi-github"
              onClick={() => handleLoginWithSocials("github")}
            ></h1>
            <h1
              className="bi bi-google"
              onClick={() => handleLoginWithSocials("google")}
            ></h1>
          </div>
        </Form.Group>
      </Form>
    </>
  );
}

export default RegisterPopup;
