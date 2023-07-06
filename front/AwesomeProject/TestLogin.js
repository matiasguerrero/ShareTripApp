import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, ImageBackground, Image, Text, TouchableOpacity, Dimensions } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
const TestLogin = ({ navigation }) => {

    const [isLoginPressed, setIsLoginPressed] = useState(true);
    const [isRegisterPressed, setIsRegisterPressed] = useState(false);
  
    const handleLoginPress = () => {
      setIsLoginPressed(true);
      setIsRegisterPressed(false);
      // Lógica adicional para el botón "Iniciar sesión"
    };
    const handleRegisterPress = () => {
        setIsRegisterPressed(true);
        setIsLoginPressed(false);
        // Lógica adicional para el botón "Registrarse"
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
      <View style={styles.overlayContainer}>
        <View style={styles.blackContainer}>
            <View style={styles.columnContainer}>
                <View style={styles.buttonRowContainer}>
                    <TouchableOpacity
                        onPress={handleLoginPress}
                        style={[
                            styles.button,
                            styles.buttonLeft,
                            { backgroundColor: isLoginPressed ? 'rgba(240, 176, 10, 1)' : 'rgb(49,48,48)' },
                            isLoginPressed && styles.borderLeft,
                            isRegisterPressed && styles.expandir_der,
                          ]}
                          > 

                        <Text style={[styles.buttonText]}>Iniciar sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleRegisterPress}
                        style={[
                            styles.button,
                            styles.buttonRight,
                            { backgroundColor: isRegisterPressed ? 'rgba(240, 176, 10, 1)' : 'rgb(49,48,48)' },
                            isRegisterPressed && styles.borderRight,
                            isLoginPressed && styles.expandir_izq,
                        ]}
                        >
                    <Text style={[styles.buttonText]}>Registrarse</Text>
                    </TouchableOpacity>

                </View>
                <Text style={styles.welcomeText}>Bienvenido a RUTAPP</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Correo electrónico"
                    placeholderTextColor="rgba(204, 204, 204, 0.8)"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    placeholderTextColor="rgba(204, 204, 204, 0.8)"
                />

                <View style={styles.bottomContainer}>
                    <TouchableOpacity onPress={handleLoginPress} style={[styles.button, { backgroundColor: 'rgb(240, 176, 10)' }]}>
                    <Text style={[styles.buttonText]}>Iniciar sesión</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleRegisterPress} style={[styles.button, { backgroundColor: 'rgba(0, 0, 0, 0)' }]}>
                        <Text style={[styles.buttonText, { color: 'rgb(255, 255, 255)' }, {fontSize: 14}]}>¿Has olvidado tu contraseña?</Text>
                    </TouchableOpacity>
                </View>
           </View>
        </View>
      </View>      
    </View>
  );
};
const windowHeight = Dimensions.get('window').height;
const imageHeight = windowHeight * 0.45; // Altura según el porcentaje deseado
const containerHeight = windowHeight * 0.55; // Altura del contenedor (55% de la altura de la ventana)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(27, 26, 22)',
  },
  headerContainer: {
    height: imageHeight,
    zIndex: 0,
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
  overlayContainer: {
    position: 'absolute',
    top: '30%',
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
    height: '85%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  columnContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonRowContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    width: '100%',
  },
  bottomContainer: {
    width: '95%',
    paddingHorizontal: 10,
    paddingBottom: 20,
    marginTop: 50,
  },
  button_doble: {
    height: 58,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  button: {
    height: 58,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  buttonLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingHorizontal: 10,
    width: '50%',
  },
  buttonRight: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    paddingHorizontal: 10,
    width: '45%',
    
 },
 borderLeft: {
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    zIndex: 1,
  },
  borderRight: {
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    zIndex: 1,
  },
  expandir_izq: {
    paddingLeft:30,
    marginLeft: -20,
    zIndex: 0,
  },
  expandir_der: {
    paddingRight:30,
    marginRight: -20,
    zIndex: 0,
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  input: {
    width: '80%',
    height: 40,
    borderBottomColor: 'rgba(204, 204, 204, 0.8)',
    borderBottomWidth: 1,
    marginBottom: 20,
    color: 'white',
  },
  welcomeText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 25,
  },
});

export default TestLogin;
