import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  updatePassword,
} from "firebase/auth";
import toast from "react-hot-toast";
import store from "./../store";
import { login as loginHandle, logout as logoutHandle } from "../store/auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAYG2zHIfznjfXW-0Bg2g2FP5dMnpOJ3Yo",
  authDomain: "authentication-app-d0ad0.firebaseapp.com",
  projectId: "authentication-app-d0ad0",
  storageBucket: "authentication-app-d0ad0.appspot.com",
  messagingSenderId: "567083400147",
  appId: "1:567083400147:web:4a5d3fa29c8c6ac9f78d26",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    toast.error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    toast.error(error.message);
    return null;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    toast.error(error.message);
    return false;
  }
};

export const update = async (data) => {
  try {
    await updateProfile(auth.currentUser, data);
    toast.success("Profile Güncellendi");
    return true;
  } catch (error) {
    toast.error(error.message);
    return false;
  }
};

export const resetPassword = async (password) => {
  try {
    await updatePassword(auth.currentUser, password);
    toast.success("Parolanız Güncellendi");
    return true;
  } catch (error) {
    toast.error(error.message);
    return false;
  }
};

export const emailVerification = async () => {
  try {
    await sendEmailVerification(auth.currentUser);
    toast.success("E-posta doğrulama linki gönderildi");
    return true;
  } catch (error) {
    toast.error(error.message);
    return false;
  }
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    store.dispatch(
      loginHandle({
        displayName: user.displayName,
        email: user.email,
        emailVerified: user.emailVerified,
        photoURL: user.photoURL,
        uid: user.uid,
      })
    );
  } else {
    store.dispatch(logoutHandle());
  }
});

export default app;
