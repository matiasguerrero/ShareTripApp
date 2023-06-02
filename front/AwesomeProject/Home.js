import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import SearchContainer from './SearchContainer';

const colorDorado = 'rgb(218, 165, 32)';
const colorDoradoselecc= 'rgb(255, 215, 0)';
const screenWidth = Dimensions.get('window').width;

// Pantallas
const HomeScreen = () => (
  <View style={styles.container}>
    <View style={styles.centerContainer}>
     <SearchContainer />
    </View>
  </View>
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

const Home = () => (
  <View style={styles.container}>
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = 'home';
          return <AntDesign name={iconName} size={size} color={color} />;
        } else if (route.name === 'Profile') {
          iconName = 'user';
          return <FontAwesome name={iconName} size={size} color={color} />;
        } else if (route.name === 'MyTrips') {
          iconName = 'car';
          return <FontAwesome name={iconName} size={size} color={color} />;
        } else if (route.name === 'Chat') {
          iconName = 'chat';
          return <MaterialIcons name={iconName} size={size} color={color} />;
        }
      },
      tabBarActiveTintColor: colorDoradoselecc,
      tabBarInactiveTintColor: colorDorado,
      tabBarLabelStyle: {
        fontSize: 12,
      },
      tabBarStyle: {
        backgroundColor: 'black',
        borderTopWidth: 0,
        elevation: 0, // Eliminar el sombreado de la barra de navegación
     
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="MyTrips" component={MyTripsScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
  </View>

);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 50,
  },
});

export default Home;
