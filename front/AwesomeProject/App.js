import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeMain from './HomeMain';
import LoginScreen from './LoginScreen';
import RegisterUser from './RegisterUser';
import { AuthProvider } from './AuthProvider';

const MainStack = createStackNavigator();

const AuthStack = createStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator initialRouteName="Login">
    <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <AuthStack.Screen name="Register" component={RegisterUser} options={{ headerShown: false }} />
  </AuthStack.Navigator>
);

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <MainStack.Navigator initialRouteName="HomeMain">
          <MainStack.Screen name="AuthUI" component={AuthNavigator} options={{ headerShown: false }} />
          <MainStack.Screen name="HomeMain" component={HomeMain} options={{ headerShown: false }} />
        </MainStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;

