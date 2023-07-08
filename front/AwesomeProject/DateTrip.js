import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Keyboard, Dimensions, TouchableOpacity } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from './Icon';
import { useNavigation } from '@react-navigation/native';
const DateTrip = () => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const navigator= useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
    setIsKeyboardOpen(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
    setIsKeyboardOpen(false);
    });

  return () => {
    keyboardDidShowListener.remove();
    keyboardDidHideListener.remove();
  };
  }, []);


  const handleCalendarPress = () => {
    navigator.navigate('CustomCalendar');
  };
  
  return (
  
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/fondo.png')} // Ruta de tu imagen de fondo
        resizeMode="cover"
        style={[
          styles.backgroundImage,
          isKeyboardOpen ? styles.backgroundImage_Keyboard : null,
        ]}
      >
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.85)', 'rgba(0, 0, 0, 0.8)', 'rgba( 240, 176, 10, 0.3)']} // Colores del degradado: desde negro a amarillo
          start={{ x: 0, y: 1 }} // Coordenadas de inicio del degradado (esquina inferior izquierda)
          end={{ x: 0, y: 0 }} // Coordenadas de fin del degradado (esquina superior izquierda)
          style={styles.gradientOverlay}
        />
      </ImageBackground>

      <View style={styles.container_2}>
        <View style={styles.logoContainer}>
          <Image
            source={require('./assets/logo.png')} // Ruta de tu imagen del logo
            resizeMode="contain" // Ajusta la imagen al tamaño del contenedor manteniendo la proporción
            style={styles.logo}
          />
        </View>

        <View style={[styles.overlayContainer, isKeyboardOpen ? styles.overlayContainer_Keyboard : null]}>
          <View style={[styles.blackContainer, isKeyboardOpen ? styles.blackContainer_Keyboard : null]}>
            <View style={styles.columnContainer}>
              <Text style={[styles.seleccioneText, isKeyboardOpen ? styles.seleccioneText_Keyboard : null]}>Indique la fecha en la que desea viajar</Text>
              <TouchableOpacity onPress={handleCalendarPress}>
                <View style={[styles.textInputRow, isKeyboardOpen ? styles.email_keyboard : null]}>
                  <Icon style={styles.icon} name={"calendar"} color={'rgba(204, 204, 204, 0.8)'} width={30} height={30} />
                  <Text
                    style={[styles.text,{color: "rgba(204, 204, 204, 0.8)"}]}>
                    Ida
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCalendarPress}>
                <View style={[styles.textInputRow, isKeyboardOpen ? styles.email_keyboard : null]}>
                  <Icon style={styles.icon} name={"calendar"} color={'rgba(204, 204, 204, 0.8)'} width={30} height={30} />
                  <Text
                    style={[styles.text,{color: "rgba(204, 204, 204, 0.8)"}]}>
                    Vuelta {'('}opcional{')'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>

  
  );
};

const windowHeight = Dimensions.get('window').height;
const imageHeightKeyboard = windowHeight * 0.20; // Altura del contenedor (55% de la altura de la ventana)

const styles = StyleSheet.create({
   container: {
    flex: 1,
    overflow: 'hidden', // Oculta la barra de desplazamiento
    zIndex: 0,
  },
  container_2: {
    flex: 1,
    overflow: 'hidden', // Oculta la barra de desplazamiento
    zIndex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundImage_Keyboard:{
    bottom: '63%',
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
  overlayContainer_Keyboard:{
    top: '30%',
  },
  blackContainer: {
    width: '90%',
    height: '40%',
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
  },
  blackContainer_Keyboard:{
    width: '100%',
    height: '50%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius:0,
    flex: 1,
  },
  columnContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    height: '100%',
    flexDirection: 'column',
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
    borderBottomColor: 'rgba(204, 204, 204, 0.8)',
    borderBottomWidth: 1,
    marginRight: 5,
  },
  seleccioneText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  seleccioneText_Keyboard:{
    marginTop: 20,
    marginBottom: 50,
  },
  textInputRow:{
    flexDirection: 'row',
    borderBottomColor: 'rgba(204, 204, 204, 0.8)',
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  text: {
    top: 10,
    width: '80%',
    height: 40,
  },
  email_keyboard:{
    marginBottom: 70,  
  },
});

export default DateTrip;
