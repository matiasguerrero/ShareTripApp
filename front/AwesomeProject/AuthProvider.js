import React, { useState, createContext } from 'react';
import { login } from './api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (email, password) => {
    const response = await login(email, password);
    if (response.success) {
      setToken(response.token);
      setLoggedIn(true);
      console.log(response.token);
    } else {
      console.log('Error de inicio de sesión:', response.error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, loggedIn, login: handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
