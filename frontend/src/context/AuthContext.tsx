import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  username: string;
  email: string;
  isAdmin: boolean;
  userId: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (userData: User, token: string) => void;
  logout: () => void;
  loading: boolean; // ✅ Add loading flag
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // ✅ loading state

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        const decoded = JSON.parse(atob(savedToken.split(".")[1]));
        setUser({
          email: decoded.email,
          username: decoded.username,
          isAdmin: decoded.isAdmin,
          userId: decoded.id,
        });
        setToken(savedToken);
      } catch (err) {
        console.error("Invalid token on reload", err);
        localStorage.removeItem("token");
      }
    }
    setLoading(false); // ✅ mark as done loading
  }, []);

  const login = (userData: User, token: string) => {
    localStorage.setItem("token", token);
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
