import React from 'react';
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import {  TransitionPresets ,createStackNavigator } from '@react-navigation/stack';
import { useState } from 'react';
import Icon from './Icon';
import CustomCalendar from './CustomCalendar';

import SelectedHome from './SelectedHome';
import SearchTrip from './SearchTrip';
import DateTrip from './DateTrip';
import AsientosDisp from './AsientosDisp';
import AvailableTrip from './AvailableTrip';
import Datatrip from './DataTrip';
import TimeTrip from './TimeTrip';
import CarTrip from './CarTrip';

const transitionConfig = {
  ...TransitionPresets.SlideFromRightIOS, // Utiliza la animación predeterminada de SlideFromRightAndroid
};

const HomeAppStack = createStackNavigator();



const HomeTab = () => (
  //<View style={styles.container}>
  //  <View style={styles.centerContainer}>
   //  <SearchContainer />
    //</View>
  //</View>
  
  <HomeAppStack.Navigator initialRouteName="SelectedHome" screenOptions={{
    headerShown: false,
    ...transitionConfig,
      cardStyle: { backgroundColor: 'transparent' },
  }}>
    <HomeAppStack.Screen name="SelectedHome" options={{ headerShown: false }}>
        {props => <SelectedHome {...props}/>}
    </HomeAppStack.Screen>
    <HomeAppStack.Screen name="SearchTrip" options={{ headerShown: false }}>
        {props => <SearchTrip {...props}/>}
    </HomeAppStack.Screen>
    <HomeAppStack.Screen name="DateTrip" options={{ headerShown: false }}>
        {props => <DateTrip {...props}/>}
    </HomeAppStack.Screen>
    <HomeAppStack.Screen name="AsientosDisp" options={{ headerShown: false }}>
          {(props) => <AsientosDisp {...props}/>}
    </HomeAppStack.Screen>
    <HomeAppStack.Screen name="AvailableTrip" options={{ headerShown: false }}>
          {(props) => <AvailableTrip {...props}/>}
    </HomeAppStack.Screen>
    <HomeAppStack.Screen name="DataTrip" options={{ headerShown: false }}>
          {(props) => <Datatrip {...props}/>}
    </HomeAppStack.Screen>
    <HomeAppStack.Screen name="TimeTrip" options={{ headerShown: false }}>
          {(props) => <TimeTrip {...props}/>}
    </HomeAppStack.Screen>
    <HomeAppStack.Screen name="CarTrip" options={{ headerShown: false }}>
          {(props) => <CarTrip {...props}/>}
    </HomeAppStack.Screen>
  </HomeAppStack.Navigator>
);

const ProfileScreen = () => (
  <View style={styles.container}>
    <Text>Profile Screen</Text>
  </View>
);

const MyTripsScreen = () => (
  <View style={styles.container}>
    <Text>Mis Viajes Screen</Text>
  </View>
);

const ChatScreen = () => (
  <View style={styles.container}>
    <Text>Chat Screen</Text>
  </View>
);


// Configuración de la barra de navegación inferior
const Tab = createBottomTabNavigator();
const colorDorado = 'rgb(255,236,61)';
const colorDoradoselecc= 'rgb(255, 215, 0)';

const HomeApp = ({setSelectedButton} ) => {
 
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
              return  <Icon style={styles.icon} name={"home"} color={focused ? colorDoradoselecc : color} width={30} height={30} />;
            } else if (route.name === 'Profile') {
              iconName = 'user';
              return  <Icon style={styles.icon} name={"user-solid"} color={focused ? colorDoradoselecc : color} width={30} height={30}/>;
            } else if (route.name === 'Mis viajes') {
              iconName = 'trip';
              return  <Icon style={styles.icon} name={"trip"} color={focused ? colorDoradoselecc : color} width={30} height={30} />;
            } else if (route.name === 'Chat') {
              iconName = 'chat';
              return  <Icon style={styles.icon} name={"chat"} color={focused ? colorDoradoselecc : color} width={30} height={30} />;
            }
          },
          tabBarActiveTintColor: colorDoradoselecc,
          tabBarInactiveTintColor: colorDorado,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopWidth: 0, // Elimina el borde superior de la barra de pestañas   
            borderTopColor: 'black',  
            elevation: 0, // Eliminar el sombreado de la barra de navegación
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen name="Home" component={HomeTab} options={{ headerShown: false, tabBarLabel: ""}} />
        <Tab.Screen name="Mis viajes" component={MyTripsScreen} options={{ headerShown: false, tabBarLabel: "" }} />
        <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false, tabBarLabel: "" }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false, tabBarLabel: "" }} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden', // Oculta la barra de desplazamiento
    backgroundColor: 'black',
  },
});

export default HomeApp;
