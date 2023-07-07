import React from 'react';
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {LinearGradient} from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from './Icon';

const HomeTab = () => (
  //<View style={styles.container}>
  //  <View style={styles.centerContainer}>
   //  <SearchContainer />
    //</View>
  //</View>
  <ImageBackground
    source={require('./assets/fondo.png')} // Ruta de tu imagen de fondo
    resizeMode="cover"
    style={styles.backgroundImage}
  >
    <LinearGradient
      colors={['rgba(0, 0, 0, 0.85)', 'rgba(0, 0, 0, 0.8)', 'rgba( 240, 176, 10, 0.3)']} // Colores del degradado: desde negro a amarillo
      start={{ x: 0, y: 1 }} // Coordenadas de inicio del degradado (esquina inferior izquierda)
      end={{ x: 0, y: 0 }} // Coordenadas de fin del degradado (esquina superior izquierda)
      style={styles.gradientOverlay}
      >

      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
              source={require('./assets/logo.png')} // Ruta de tu imagen del logo
              resizeMode="contain" // Ajusta la imagen al tamaño del contenedor manteniendo la proporción
              style={styles.logo}
          />
        </View>
      </View>
    </LinearGradient>
  </ImageBackground>

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
  const handleLoginPress = () => {
    // Lógica para el botón "Iniciar sesión"
  };

  const handleRegisterPress = () => {
    // Lógica para el botón "Registrarse"
    setSelectedButton("Register");
    navigation.navigate("Login");
  };

  const navigation = useNavigation();

  const goLogin =() =>{
    setSelectedButton("Login");
    navigation.navigate("Login");
  }

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
              iconName = 'car';
              return  <Icon style={styles.icon} name={"location"} color={focused ? colorDoradoselecc : color} width={30} height={30} />;
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
            borderTopWidth: 0,
            elevation: 0, // Eliminar el sombreado de la barra de navegación
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          },
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
  },
  contentContainer: {
    flexGrow: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  logo:{
    width: '70%',
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  bottomContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 30,
    paddingBottom: 20,
  },
  button: {
    height: 58,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: 'normal',
    color: '#FFFFFF',
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  icon:{
    
  },
});

export default HomeApp;
