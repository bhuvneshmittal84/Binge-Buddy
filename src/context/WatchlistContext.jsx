import React, { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useAuth } from "./AuthContext";

const WatchlistContext = createContext(null);

export function WatchlistProvider({ children }) {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);

  // Real-time Firestore listener — updates instantly across tabs/devices
  useEffect(() => {
    if (!user) {
      setWatchlist([]);
      return;
    }
    const ref = collection(db, "users", user.uid, "watchlist");
    const unsubscribe = onSnapshot(ref, (snapshot) => {
      const items = snapshot.docs.map((d) => d.data());
      // Sort newest first
      items.sort((a, b) => (b.addedAt?.seconds || 0) - (a.addedAt?.seconds || 0));
      setWatchlist(items);
    });
    return unsubscribe;
  }, [user]);

  const isInWatchlist = (id) =>
    watchlist.some((item) => String(item.id) === String(id));

  const addToWatchlist = async (item) => {
    if (!user) return;
    const ref = doc(db, "users", user.uid, "watchlist", String(item.id));
    await setDoc(ref, { ...item, addedAt: serverTimestamp() });
  };

  const removeFromWatchlist = async (id) => {
    if (!user) return;
    const ref = doc(db, "users", user.uid, "watchlist", String(id));
    await deleteDoc(ref);
  };

  const toggleWatchlist = (item) => {
    if (isInWatchlist(item.id)) {
      removeFromWatchlist(item.id);
    } else {
      addToWatchlist(item);
    }
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, isInWatchlist, addToWatchlist, removeFromWatchlist, toggleWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => useContext(WatchlistContext);
