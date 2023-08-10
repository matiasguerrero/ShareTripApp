import React from 'react';
import { View } from 'react-native';
import SelectedHome from './SelectedHome';
import ContainerPublishTrip from './ContainerPublishTrip';
import { createStackNavigator } from '@react-navigation/stack';
const SelectedHomeStack = createStackNavigator();
import { TransitionPresets } from '@react-navigation/stack';
import ContainerSearch from './ContainerSearchTrip';


const transitionConfig = {
    ...TransitionPresets.SlideFromRightIOS, // Utiliza la animación predeterminada de SlideFromRightAndroid
  };


const ContainerSelected = () => {
  return (
    <SelectedHomeStack.Navigator
    initialRouteName="SelectedHome"
    screenOptions={{
      headerShown: false,
      ...transitionConfig, // assuming you have this defined elsewhere
      cardStyle: { backgroundColor: 'transparent' },
    }}
  >
    <SelectedHomeStack.Screen name="SelectedHome" options={{ headerShown: false }}>
      {props => <SelectedHome {...props} />}
    </SelectedHomeStack.Screen>
    <SelectedHomeStack.Screen name="ContainerPublishTrip" options={{ headerShown: false }}>
      {props => <ContainerPublishTrip {...props} />}
    </SelectedHomeStack.Screen>
    <SelectedHomeStack.Screen name="ContainerSearchTrip" options={{ headerShown: false }}>
      {props => <ContainerSearch {...props} />}
    </SelectedHomeStack.Screen>
    </SelectedHomeStack.Navigator>
  );
};

export default ContainerSelected;
