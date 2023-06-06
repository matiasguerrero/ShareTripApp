import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Home from './Home';
import { AuthProvider } from './AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Home />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
