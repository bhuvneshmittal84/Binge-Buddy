import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("bb_current_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Persist current session
  useEffect(() => {
    if (user) {
      localStorage.setItem("bb_current_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("bb_current_user");
    }
  }, [user]);

  /** Returns error string or null on success */
  const register = (username, password) => {
    username = username.trim();
    if (!username || username.length < 3)
      return "Username must be at least 3 characters.";
    if (!password || password.length < 6)
      return "Password must be at least 6 characters.";

    const users = JSON.parse(localStorage.getItem("bb_users") || "[]");
    if (users.find((u) => u.username.toLowerCase() === username.toLowerCase()))
      return "Username already taken.";

    const newUser = { id: Date.now().toString(), username, password };
    users.push(newUser);
    localStorage.setItem("bb_users", JSON.stringify(users));

    // Auto-login
    const { password: _pw, ...safeUser } = newUser;
    setUser(safeUser);
    return null;
  };

  /** Returns error string or null on success */
  const login = (username, password) => {
    username = username.trim();
    const users = JSON.parse(localStorage.getItem("bb_users") || "[]");
    const found = users.find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password
    );
    if (!found) return "Invalid username or password.";
    const { password: _pw, ...safeUser } = found;
    setUser(safeUser);
    return null;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
