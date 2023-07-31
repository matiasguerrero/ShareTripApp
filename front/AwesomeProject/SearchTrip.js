import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput,Image, Keyboard, Dimensions, TouchableOpacity,Platform, UIManager, LayoutAnimation } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from './Icon';
import { useNavigation } from '@react-navigation/native';

// Habilitar las animaciones en Android (opcional)
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const SearchTrip = ({origin, setOrigin, destination, setDestination}) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const shouldShowContinueButton = (origin && destination);

  const navigator= useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
    //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsKeyboardOpen(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
    //LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsKeyboardOpen(false);
    });

  return () => {
    keyboardDidShowListener.remove();
    keyboardDidHideListener.remove();
  };
  }, []);

  useEffect(() => {
    setOrigin('');
    setDestination('');
  }, []);

  const handleViajePress = () => {
     navigator.navigate('DateTrip');
  };

  const handleOriginChange = (text) => {
    setOrigin(text);
  };

  const handleDestinationChange = (text) => {
    setDestination(text);
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
              <Text style={[styles.seleccioneText, isKeyboardOpen ? styles.seleccioneText_Keyboard : null]}>Indique su ruta</Text>
              <View style={[styles.textInputRow, isKeyboardOpen ? styles.email_keyboard : null]}>
                <Icon style={styles.icon} name={"location"} color={'rgba(204, 204, 204, 0.8)'} width={30} height={30} />
                <TextInput
                  style={styles.input}
                  placeholder="Origen"
                  placeholderTextColor="rgba(204, 204, 204, 0.8)"
                  value={origin}
                  onChangeText={handleOriginChange}
                />
              </View>
              <View style={[styles.textInputRow, isKeyboardOpen ? styles.email_keyboard : null]}>
                <Icon style={styles.icon} name={"location"} color={'rgba(204, 204, 204, 0.8)'} width={30} height={30} />
                <TextInput
                  style={styles.input}
                  placeholder="Destino"
                  placeholderTextColor="rgba(204, 204, 204, 0.8)"
                  value={destination}
                  onChangeText={handleDestinationChange}
                />
              </View>
            </View>
          </View>

          {shouldShowContinueButton && (
            <View style={[styles.bottomContainer,isKeyboardOpen ? styles.bottomContainer_keyboard : null]}>
              <TouchableOpacity onPress={handleViajePress} style={[styles.button,isKeyboardOpen ? styles.button_keyboard : null ]}>
                <Text style={styles.buttonText}>Continuar</Text>
              </TouchableOpacity>
            </View>
          )}
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
    backgroundColor: 'black',
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
  bottomContainer: {
    top: '15%',
    width: '90%',
    paddingHorizontal: 10,
  },
  bottomContainer_keyboard: {
    top: '0%',
    width: '50%',
    paddingHorizontal: 10,
  },
  button_keyboard:{
    height: 40,
    marginBottom: 10,
  },
  button: {
    height: 60,
    width: '100%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(240, 176, 10)' 
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
    marginRight: 3,
  },
  seleccioneText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  seleccioneText_Keyboard:{
    marginTop: 40,
    marginBottom: 50,
  },
  textInputRow:{
    flexDirection: 'row',
    borderBottomColor: 'rgba(204, 204, 204, 0.8)',
    borderBottomWidth: 1,
    marginBottom: 30,
  },
  input: {
    width: '80%',
    height: 40,
    color: 'white',
  },
  email_keyboard:{
    marginBottom: 70,  
  },
});

export default SearchTrip;
