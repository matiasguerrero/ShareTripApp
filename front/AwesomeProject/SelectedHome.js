import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity,Image } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const SelectedHome = () => {
  const handleViajePress = () => {
    navigation.navigate("SearchTrip");
  };
  const handleLoadViajePress = () => {
    navigation.navigate("AsientosDisp");
  };

  const navigation = useNavigation();

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
        <View style={styles.overlayContainer}>
          <View style={styles.blackContainer}>
            <View style={styles.columnContainer}>
              <Text style={styles.seleccioneText}>Seleccione una opción</Text> 
              <TouchableOpacity onPress={handleViajePress} style={[styles.button, { backgroundColor: 'rgb(49, 48, 48)' }]}>
                  <Text style={styles.buttonText}>Buscar viaje</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLoadViajePress} style={[styles.button, { backgroundColor: 'rgb(49, 48, 48)' }]}>
                  <Text style={styles.buttonText}>Cargar viaje</Text>
              </TouchableOpacity>
            </View>
          </View>
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
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  blackContainer: {
    width: '90%',
    height: '40%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  columnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  button: {
    height: 70,
    width: '95%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: 'normal',
    color: '#FFFFFF',
    fontSize: 16,
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  icon:{
    
  },
  seleccioneText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SelectedHome;
