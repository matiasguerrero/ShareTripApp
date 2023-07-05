import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ImageBackground, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
const TestLogin = ({ navigation }) => {

  const handleLoginPress = () => {
    // Lógica para el botón "Iniciar sesión"
  };

  const handleRegisterPress = () => {
    // Lógica para el botón "Registrarse"
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require('./assets/fondo.png')} // Ruta de tu imagen de fondo
          style={styles.backgroundImage}
        >
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.7)', 'rgba( 244, 178, 5, 0.5)', 'rgba( 244, 178, 5, 1)']} // Colores del degradado: desde negro a amarillo
            start={{ x: 0, y: 1 }} // Coordenadas de inicio del degradado (esquina inferior izquierda)
            end={{ x: 0, y: 0 }} // Coordenadas de fin del degradado (esquina superior izquierda)
            style={styles.gradientOverlay}
          />
        </ImageBackground>
        <View style={styles.logoContainer}>
            <Image
                    source={require('./assets/logo.png')} // Ruta de tu imagen del logo
                    resizeMode="contain" // Ajusta la imagen al tamaño del contenedor manteniendo la proporción
                    style={styles.logo}
            />
        </View>
      </View>      
    </View>
  );
};
const windowHeight = Dimensions.get('window').height;
const imageHeight = windowHeight * 0.45; // Altura según el porcentaje deseado

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(27, 26, 22)',
  },
  headerContainer: {
    height: imageHeight,

    alignItems: 'center',
    overflow: 'hidden', // Evita que la imagen se desborde del contenedor
  },
  backgroundImage: {
    width: '100%',
    height: 750,
    position: 'absolute',
    bottom: 0, // Ajusta la posición vertical de la imagen
    alignItems: 'center',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  logoContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: '90%',
  },
});

export default TestLogin;
