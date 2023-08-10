// TecladoContext.js

import React, { createContext, useState } from 'react';
import { useEffect } from 'react';
import { Keyboard } from 'react-native';
import { LayoutAnimation } from 'react-native';
import { Platform } from 'react-native';
import { UIManager } from 'react-native';
const TecladoContext = createContext();

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const TecladoProvider = ({ children }) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardOpen);
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', handleKeyboardClose);

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);


  const handleKeyboardOpen = () => {
    //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsKeyboardOpen(true);

  };

  const handleKeyboardClose = () => {
    //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsKeyboardOpen(false);
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
