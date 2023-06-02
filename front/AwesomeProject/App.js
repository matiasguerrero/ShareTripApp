import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Home />
    </NavigationContainer>
  );
}

export default App;
