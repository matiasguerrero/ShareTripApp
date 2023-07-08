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
  <AuthStack.Navigator initialRouteName="Login">
    <AuthStack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
    <AuthStack.Screen name="Register" component={RegisterUser} options={{ headerShown: false }} />
  </AuthStack.Navigator>
);

const App = () => {
  const [selectedButton, setSelectedButton] = useState('login');

 

  return (
    /*
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <MainStack.Navigator initialRouteName="HomeMain"  screenOptions={{
          headerShown: false,
          cardStyleInterpolator: forFadeFromBottom,
            cardStyle: { backgroundColor: 'transparent' },
        }}>
          <MainStack.Screen name="AuthUI" component={AuthNavigator} options={{ headerShown: false }} />
          <MainStack.Screen name="HomeMain" component={HomeMain} options={{ headerShown: false }} />
        </MainStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
    */

    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <MainStack.Navigator initialRouteName="CustomCalendar"  screenOptions={{
          headerShown: false,
          cardStyleInterpolator: forFadeFromBottom,
            cardStyle: { backgroundColor: 'transparent' },
        }}>
          <MainStack.Screen name="MainApp" options={{ headerShown: false }}>
            {props => <MainApp {...props} setSelectedButton={setSelectedButton}/>}
          </MainStack.Screen>

          <MainStack.Screen name="Login" options={{ headerShown: false }}>
            {props => <TestLogin {...props} selectedButton={selectedButton}/>}
          </MainStack.Screen>

          <MainStack.Screen name="Tab_Home" options={{ headerShown: false }}>
            {props => <HomeApp {...props} selectedButton={selectedButton}/>}
          </MainStack.Screen>

          <MainStack.Screen name="CustomCalendar" options={{ headerShown: false }}>
          {(props) => <CustomCalendar {...props} selectedButton={selectedButton} />}

          </MainStack.Screen>

        </MainStack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;

