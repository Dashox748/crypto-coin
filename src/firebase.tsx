import {initializeApp} from "firebase/app";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    signOut,
    updateProfile,
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
import {GithubAuthProvider, FacebookAuthProvider} from "firebase/auth";

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

const logInWithEmailAndPassword = async (email: string, password: string) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return false;
    } catch (err) {
        return true;
    }
};
const registerWithEmailAndPassword = async (
    name: string,
    email: string,
    password: string
) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await updateUserProfile(auth.currentUser, name)
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
        return false;
    } catch (err) {
        return true;
    }
};
const sendPasswordReset = async (email: string) => {
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

const updateUserProfile = async (user: any, name: string) => {
    await updateProfile(user, {
        displayName: name
    })
}
//const  updateUserProfile(user: User, name: string) {
//    updateProfile((user), {
//        displayName: name, photoURL: `https://gravatar.com/avatar${md5(user.email)}?d=identicon`
//    })
// Functions to menage database

const checkData = async (uid: string) => {
    const findDocId = async (uid: string) => {
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
    const newRecord: any = [];
    querySnapshot.forEach((doc) => {
        newRecord.push(doc.data());
    });

    return newRecord;
};

const addFavourite = async (
    uid: string,
    fullName: string,
    shortName: string,
    keyToApi: string,
    imageUrl: string
) => {
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
const deleteFavourite = async (uid: string, fullName: string) => {
    const findDocId = async (uid: string) => {
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
