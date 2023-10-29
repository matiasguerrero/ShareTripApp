// TecladoContext.js

import React, { createContext, useState, useRef } from 'react';
import { Animated } from 'react-native';
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
  const keyboardOffset = useRef(new Animated.Value(0)).current;

  const startAnimation = (toValue) =>
  Animated.timing(keyboardOffset, { toValue, duration: 200,useNativeDriver: true }).start();

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
    startAnimation(0);
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
