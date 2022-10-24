import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { logInWithEmailAndPassword } from "../../firebase";
import { signInWithGoogle } from "../../firebase";

function LoginPopup({ handleClose }) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [email, setEmail] = useState("");
  const [password, setPassowrd] = useState("");
  const [showError, setShowError] = useState({
    emailValidationLocal: false,
    passwordValidationLocal: false,
    databaseValidation: false,
  });

  const handleLoginWithForm = async () => {
    if (!re.test(email) && password.length < 5) {
      setShowError({
        emailValidationLocal: true,
        passwordValidationLocal: true,
        databaseValidation: false,
      });
      return;
    } else if (!re.test(email)) {
      setShowError({
        emailValidationLocal: true,
        passwordValidationLocal: false,
        databaseValidation: false,
      });
      return;
    } else if (password.length < 5) {
      setShowError({
        emailValidationLocal: false,
        passwordValidationLocal: true,
        databaseValidation: false,
      });
      return;
    }
    if ((await logInWithEmailAndPassword(email, password)) === true) {
      handleClose("login");
    }
  };
  const handleLoginWithSocials = async (withWhat) => {
    if (withWhat === "google") {
      if ((await signInWithGoogle()) === true) {
        handleClose("login");
      }
    }
  };

  return (
    <>
      <Form style={{ padding: "2rem" }} onSubmit={handleLoginWithForm}>
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
            <Form.Text className="text-danger">Email is not correct</Form.Text>
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
          login
        </Button>
        <Form.Group
          className="mb-1 mt-3 flex-column text-muted"
          controlId="formGroupPassword"
        >
          <Form.Label className="d-flex align-content-center align-items-center justify-content-center  ">
            Or use Social Network
          </Form.Label>
          <div className="d-flex align-content-center align-items-center justify-content-center gap-4 ">
            <h1 className="bi bi-facebook"></h1>
            <h1 className="bi bi-github"></h1>
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

export default LoginPopup;
