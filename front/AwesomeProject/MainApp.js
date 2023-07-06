import React from 'react';
import { View, Image, StyleSheet, ImageBackground, Text, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
const MainApp = () => {
  const handleLoginPress = () => {
    // Lógica para el botón "Iniciar sesión"
  };

  const handleRegisterPress = () => {
    // Lógica para el botón "Registrarse"
  };

  const navigation = useNavigation();

  const goLogin =() =>{
    navigation.navigate("Login");
  }
  return (
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
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={goLogin} style={[styles.button, { backgroundColor: 'rgb(240, 176, 10)' }]}>
              <Text style={[styles.buttonText, {fontSize: 18}]}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleRegisterPress} style={[styles.button, { backgroundColor: 'rgba(0, 0, 0, 0)' }]}>
                <Text style={[styles.buttonText, { color: 'rgb(255, 255, 255)', fontSize: 15 }]}>¿No tienes cuenta? <Text style={[styles.underlineText, { color: 'rgb(240, 176, 10)', fontSize: 15}]}>Regístrate</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
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
    marginTop: 70,
  },
  logo:{
    width: '90%',
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
});

export default MainApp;
