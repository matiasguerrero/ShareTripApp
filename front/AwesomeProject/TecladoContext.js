// TecladoContext.js

import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { Keyboard } from 'react-native';
const TecladoContext = createContext();

const TecladoProvider = ({ children }) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardOpen, console.log("Disparo abrir"));
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardClose, console.log("Disparo cerrar"));

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


  const handleKeyboardOpen = () => {
    setIsKeyboardOpen(true);
    console.log("teclado en true");
  };

  const handleKeyboardClose = () => {
    setIsKeyboardOpen(false);
    console.log("teclado en false");
  };

  return (
    <TecladoContext.Provider
      value={{
        isKeyboardOpen,
        handleKeyboardOpen,
        handleKeyboardClose,
      }}
    >
      {children}
    </TecladoContext.Provider>
  );
};

export { TecladoContext, TecladoProvider };
