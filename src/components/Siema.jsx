import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Modal from "react-bootstrap/Modal";

import {
  getFirestore,
  query,
  getDocs,
  getDoc,
  collection,
  where,
  addDoc,
  setDoc,
  get,
  doc,
  deleteDoc,
} from "firebase/firestore";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Siema({
  auth,
  logInWithEmailAndPassword,
  logout,
  db,
  registerWithEmailAndPassword,
}) {
  const [show, setShow] = useState(false);
  const [showw, setShoww] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassowrd] = useState("");
  const [username, setUsername] = useState("");
  const [favoruites, setFavourites] = useState([]);

  console.log("siema")

  const loginFormHandle = (e) => {
    e.preventDefault();

    logInWithEmailAndPassword(login, password);
    setLogin("");
    setPassowrd("");
    setUsername("");
    setShoww(!showw);
  };
  const registerFormHandle = (e) => {
    e.preventDefault();
    registerWithEmailAndPassword(username, login, password);
    setLogin("");
    setPassowrd("");
    setUsername("");
    setShow(!show);
  };

  const checkdata2 = async (uid) => {
    const dbRef = collection(db, "users");
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  };
  const checkdata = async (uid) => {
    const findDocId = async (uid) => {
      let x = "";
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        x = doc.id;
      });
      return x;
    };
    const docRef = collection(db, "users", await findDocId(uid), "favourite");
    const querySnapshot = await getDocs(docRef);
    const newRecord = [];
    querySnapshot.forEach((doc) => {
      newRecord.push(doc.data());
    });
    setFavourites(newRecord);
    //        setFavourites(querySnapshot)
    //        console.log(querySnapshot)
  };

  const addFavourite = async (uid) => {
    let x = "";
    const dbRef = collection(db, "users");
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      x = doc.id;
    });
    const docRef = doc(db, "users", x, "favourite", "bitcoin");
    setDoc(docRef, {
      fullName: "Etherum",
      shortName: "Eth",
      keyToApi: "eth",
    });
  };

  const deleteFavourite = async (uid) => {
    const findDocId = async (uid) => {
      let x = "";
      const q = query(collection(db, "users"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        x = doc.id;
      });
      return x;
    };
    const docRef = doc(
      db,
      "users",
      await findDocId(uid),
      "favourite",
      "bitcoin"
    );
    deleteDoc(docRef)
      .then(() => {
        console.log("Entire Document has been deleted successfully.");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [user] = useAuthState(auth);

  const checkUser = async (uid) => {
    // db.ref("/users");
  };
  return (
    <div>
      {user === null ? (
        <div>
          <Button variant="primary" onClick={() => setShow(!show)}>
            Register
          </Button>
          <Button variant="primary" onClick={() => setShoww(!show)}>
            Login
          </Button>

          <Modal show={show}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Form style={{ width: "500px" }} onSubmit={registerFormHandle}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={login}
                    onChange={(event) => setLogin(event.target.value)}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassowrd(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Modal>
          <Modal show={showw}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Form style={{ width: "500px" }} onSubmit={loginFormHandle}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={login}
                    onChange={(event) => setLogin(event.target.value)}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event) => setPassowrd(event.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Modal>
        </div>
      ) : (
        <button onClick={() => logout()}>Wyloguj</button>
      )}
      <button onClick={() => console.log(user.uid)}>check</button>
      <button onClick={() => checkdata(user.uid)}>check</button>
      <button onClick={() => addFavourite(user.uid)}>fav</button>
      <button onClick={() => deleteFavourite(user.uid)}>delete</button>
      {favoruites.map((value) => (
        <div>1{value.fullName}</div>
      ))}
    </div>
  );
}

export default Siema;
