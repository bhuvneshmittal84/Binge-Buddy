import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const WatchlistContext = createContext(null);

const storageKey = (userId) => `bb_watchlist_${userId}`;

export function WatchlistProvider({ children }) {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);

  // Load watchlist whenever user changes
  useEffect(() => {
    if (user) {
      try {
        const saved = localStorage.getItem(storageKey(user.id));
        setWatchlist(saved ? JSON.parse(saved) : []);
      } catch {
        setWatchlist([]);
      }
    } else {
      setWatchlist([]);
    }
  }, [user]);

  // Persist watchlist changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(storageKey(user.id), JSON.stringify(watchlist));
    }
  }, [watchlist, user]);

  const isInWatchlist = (id) => watchlist.some((item) => item.id === id);

  const addToWatchlist = (item) => {
    if (!user) return;
    if (!isInWatchlist(item.id)) {
      setWatchlist((prev) => [item, ...prev]);
    }
  };

  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
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
