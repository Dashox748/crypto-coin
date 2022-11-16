import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { GithubAuthProvider, FacebookAuthProvider } from "firebase/auth";

// Initalize App

const firebaseConfig = {
  apiKey: "AIzaSyBCx4KYG3yX55WzCvlKr_YhctfGFK4xddI",
  authDomain: "cryptocurrencies-3b723.firebaseapp.com",
  projectId: "cryptocurrencies-3b723",
  storageBucket: "cryptocurrencies-3b723.appspot.com",
  messagingSenderId: "548210707437",
  appId: "1:548210707437:web:c416ae054f27ac2102b5e4",
  measurementId: "G-FHLNF29BJW",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

//Login and Register options

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    return true;
  } catch (err) {
    console.error(err);
  }
};

const signInWithGithub = async () => {
  try {
    const res = await signInWithPopup(auth, githubProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "github",
        email: user.email,
      });
    }
    return true;
  } catch (err) {
    console.error(err);
  }
};
const signInWithFacebook = async () => {
  try {
    const res = await signInWithPopup(auth, facebookProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "facebook",
        email: user.email,
      });
    }
    return true;
  } catch (err) {
    console.error(err);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return true;
  } catch (err) {
    alert(err);
    return false;
  }
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    sendEmailVerification(auth.currentUser);
    await signOut(auth);
    return true;
  } catch (err) {
    return false;
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (err) {
    return false;
  }
};
const logout = () => {
  signOut(auth);
};

// Functions to menage database

const checkData = async (uid) => {
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

  return newRecord;
};

const addFavourite = async (uid, fullName, shortName, keyToApi, imageUrl) => {
  let x = "";
  const q = query(collection(db, "users"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    x = doc.id;
  });
  const docRef = doc(db, "users", x, "favourite", fullName);
  await setDoc(docRef, {
    fullName: fullName,
    shortName: shortName,
    keyToApi: keyToApi,
    image: imageUrl,
  });
};
const deleteFavourite = async (uid, fullName) => {
  const findDocId = async (uid) => {
    let x = "";
    const q = query(collection(db, "users"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      x = doc.id;
    });
    return x;
  };
  const docRef = doc(db, "users", await findDocId(uid), "favourite", fullName);
  deleteDoc(docRef).catch((error) => {
    console.log(error);
  });
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithGithub,
  signInWithFacebook,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  checkData,
  addFavourite,
  deleteFavourite,
};
