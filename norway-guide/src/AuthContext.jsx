import { createContext, useContext, useState, useEffect } from 'react';
import { useApolloClient } from '@apollo/client';

//hold info of user,login ifo..
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);//Gets JWT token from localstorage in case the user was already logged in
  const client = useApolloClient();

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    client.resetStore();
  };
// returns true if token exists
  const isAuthenticated = () => {
    return !!token;
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);