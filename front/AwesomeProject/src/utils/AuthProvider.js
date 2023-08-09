import React, { useState, createContext } from 'react';
import { login, logout as logoutApi } from './api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');
  const [userData, setUserData]= useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async (email, password) => {
    if (!email || !password) {
      throw new Error("Por favor ingrese el correo electrónico y la contraseña.");
    }
    const response = await login(email, password);
    if (response.success) {
      setToken(response.token);
      setUserData(response.userData);
      setLoggedIn(true);
      return { success: true}
    } else {
      console.log('Error de inicio de sesión:', response.error);
      throw new Error(response.error);
      return { success: false}
    }
  };

  const handleLogout = async () => {
    const response = await logoutApi(token);
    if (response.success) {
      setToken('');
      setLoggedIn(false);
      console.log('Cierre de sesión exitoso');
    } else {
      console.log('Error de cierre de sesión:', response.error);
    }
  };

  return (
    <AuthContext.Provider value={{ token, userData, loggedIn, login: handleLogin, logout: handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

