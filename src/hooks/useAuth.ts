import { useCallback, useEffect, useState } from 'react';
import { auth } from '../../firebase/config/ClientApp';
import {
  FacebookAuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
  User,
} from 'firebase/auth';
import { useLocalStorage } from './useLocalStorage';

interface LoginCredentialProps {
  email: string;
  password: string;
}

interface RegisterCredentialProps {
  username: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const [user, setUser] = useLocalStorage('user', null);
  const [isLoading, setIsLoading] = useState(true);

  const handleUserChange = useCallback(
    (user: User) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || null,
          photoURL: user.photoURL || null,
        });
      } else {
        setUser(null);
      }
    },
    [setUser],
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      handleUserChange(user as User);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, [handleUserChange]);

  const handleLogout = useCallback(async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const registerWithEmailAndPassword = async (registerValues: RegisterCredentialProps) => {
    if (!registerValues) return;
    const { username, email, password } = registerValues;
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateDisplayName(user, username);
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        return 'Email already in use';
      } else {
        return 'Something Went Wrong';
      }
    }
  };

  const loginWithEmailAndPassword = async (loginValues: LoginCredentialProps) => {
    if (!loginValues) return;
    const { email, password } = loginValues;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return null;
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        return 'User not found';
      }
      if (err.code === 'auth/wrong-password') {
        return 'Wrong password';
      }
      if (err.code === 'auth/too-many-requests') {
        return 'Too many requests';
      } else {
        return 'Something Went Wrong';
      }
    }
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      return user;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const loginWithFacebook = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      return user;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const loginWithGithub = async () => {
    const provider = new GithubAuthProvider();
    try {
      const { user } = await signInWithPopup(auth, provider);
      return user;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const updateDisplayName = async (user: User, displayName: string) => {
    if (!user) return;
    await updateProfile(user, { displayName });
    const updatedUser = await handleUserChange(user);
    console.log(updatedUser); // should log the updated display name
  };

  return {
    isLoading,
    user,
    handleLogout,
    loginWithGoogle,
    loginWithFacebook,
    loginWithGithub,
    loginWithEmailAndPassword,
    registerWithEmailAndPassword,
  };
};
