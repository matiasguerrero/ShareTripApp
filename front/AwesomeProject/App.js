import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import HomeMain from './HomeMain';
import LoginScreen from './LoginScreen';
import RegisterUser from './RegisterUser';
import { AuthProvider } from './AuthProvider';
import { Animated } from 'react-native';
import { enableScreens } from 'react-native-screens';
import MainApp from './MainApp';
import TestLogin from './TestLogin';
import { useState } from 'react';
import HomeApp from './HomeApp';
import CustomCalendar from './CustomCalendar';
import { TecladoProvider } from './TecladoContext';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { View } from 'react-native';

enableScreens();

const MainStack = createStackNavigator();

const AuthStack = createStackNavigator();

const verticalSlideUpAnimation = (props) => {
  const { current } = props;
  const translateY = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0], // Ajusta este valor según la distancia deseada
  });

  return {
    cardStyle: {
      transform: [{ translateY }],
    },
  };
};


const forFadeFromBottom = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
    transform: [
      {
        translateY: Animated.multiply(
          current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [200, 0],
            extrapolate: 'clamp',
          }),
          -1
        ),
      },
    ],
  },
});

const AuthNavigator = () => (
  <AuthStack.Navigator initialRouteName="Tab_Home">
    <AuthStack.Screen name="Tab_Home" options={{ headerShown: false }}>
      {props => <HomeApp {...props} />}
    </AuthStack.Screen>
  </AuthStack.Navigator>
);

const MainNavigator =({selectedButton, setSelectedButton}) => (
  <MainStack.Navigator initialRouteName="MainApp"  screenOptions={{
    headerShown: false,
    cardStyleInterpolator: forFadeFromBottom,
      cardStyle: { backgroundColor: 'transparent' },
  }}>
    <MainStack.Screen name="MainApp" options={{ headerShown: false }}>
      {props => <MainApp {...props} setSelectedButton={setSelectedButton}/>}
    </MainStack.Screen>

    <MainStack.Screen name="Login" options={{ headerShown: false }}>
      {props => <TestLogin {...props} selectedButton={selectedButton} setSelectedButton={setSelectedButton}/>}
    </MainStack.Screen>
  </MainStack.Navigator>
);

const App = () => {
  const [selectedButton, setSelectedButton] = useState('login');
  const { loggedIn } = useContext(AuthContext);
 

  return (
    <TecladoProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <View style={{ flex: 1 }}>
          {loggedIn ? (
            <AuthNavigator />
          ) : (
            <MainNavigator setSelectedButton={setSelectedButton} selectedButton={selectedButton}/>
          )}
        </View>
      </NavigationContainer>
    </TecladoProvider>
  );
}

const AppWithAuthProvider = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithAuthProvider;

