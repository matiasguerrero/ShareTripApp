import React from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';

// Pantallas
const HomeScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Home Screen</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Profile Screen</Text>
  </View>
);

const MyTripsScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Mis Viajes Screen</Text>
  </View>
);

const ChatScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Chat Screen</Text>
  </View>
);

// Configuración de la barra de navegación inferior
const Tab = createBottomTabNavigator();

const Home = () => (
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
      tabBarActiveTintColor: 'red',
      tabBarInactiveTintColor: 'golden',
      tabBarLabelStyle: {
        fontSize: 12,
      },
      tabBarStyle: {
        backgroundColor: 'black',
      },
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
    <Tab.Screen name="MyTrips" component={MyTripsScreen} options={{ headerShown: false }} />
    <Tab.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
  </Tab.Navigator>
);

export default Home;
