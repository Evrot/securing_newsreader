import { createContext, useContext, useState } from "react";

// Create context
const AuthContext = createContext();

// Custom hook for easier usage
export const useAuth = () => {
  return useContext(AuthContext);
};

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Login function
  const login = (username, role) => {
    // role must be either "regular" or "admin"
    if (role !== "regular" && role !== "admin") {
      throw new Error("Invalid role. Must be 'regular' or 'admin'.");
    }

    const userData = {
      username,
      role,
      isAuthenticated: true,
    };

    setUser(userData);
  };

  // Logout function
  const logout = () => {
    setUser(null);
  };

  // Check if current user is admin
  const isAdmin = () => user?.role === 'admin';

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin, 
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};