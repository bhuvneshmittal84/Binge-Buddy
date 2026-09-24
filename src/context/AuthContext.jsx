import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase";

const AuthContext = createContext(null);

function getErrorMessage(code) {
  switch (code) {
    case "auth/email-already-in-use":  return "This email is already registered.";
    case "auth/invalid-email":         return "Invalid email address.";
    case "auth/weak-password":         return "Password must be at least 6 characters.";
    case "auth/user-not-found":
    case "auth/wrong-password":
    case "auth/invalid-credential":    return "Invalid email or password.";
    default:                           return "Something went wrong. Please try again.";
  }
}

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase auth state — persists sessions automatically
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  /** Returns error string or null on success */
  const register = async (username, email, password) => {
    try {
      const { user: fbUser } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(fbUser, { displayName: username });
      // Force refresh so displayName is available immediately
      setUser({ ...fbUser, displayName: username });
      return null;
    } catch (err) {
      return getErrorMessage(err.code);
    }
  };

  /** Returns error string or null on success */
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return null;
    } catch (err) {
      return getErrorMessage(err.code);
    }
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
