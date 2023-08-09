import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, Keyboard, Dimensions, TouchableOpacity, Modal } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import Icon from '../utils/Icon';
import { useNavigation } from '@react-navigation/native';
import CustomCalendar from '../utils/CustomCalendar';
const DateTrip = ({startDate, setStartDate, endDate, setEndDate}) => {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [modalStartVisible, setModalStartVisible] = useState(false);
  const [modalEndVisible, setModalEndVisible] = useState(false);

  const navigator= useNavigation();
  const shouldShowContinueButton = (startDate || (endDate && startDate));


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

  useEffect(() => {
    setStartDate(null);
    setEndDate(null);
  }, []);

  const toggleModalStart = () => {
    setModalStartVisible(!modalStartVisible);
  };
  
  const toggleModalEnd = () => {
    setModalEndVisible(!modalEndVisible);
  };

  const handleStartCalendarPress = () => {
    //avigator.navigate('CustomCalendar');
    toggleModalStart();
  };

  const handleEndCalendarPress = () => {
    //avigator.navigate('CustomCalendar');
    toggleModalEnd();
  };
  
  const handleContinuePress = () => {
    navigator.navigate('TimeTrip');
 };
  return (
  
    <View style={styles.container}>
      <Modal visible={modalStartVisible} onRequestClose={() => toggleModalStart()}>
        <View style={styles.modalContainer}>
          <CustomCalendar maxMonthsToRender={3} setToggleModal={toggleModalStart} setDate={setStartDate}></CustomCalendar>
        </View>
      </Modal>
      <Modal visible={modalEndVisible} onRequestClose={() => toggleModalEnd()}>
        <View style={styles.modalContainer}>
          <CustomCalendar maxMonthsToRender={3} setToggleModal={toggleModalEnd} setDate={setEndDate}></CustomCalendar>
        </View>
      </Modal>
      <ImageBackground
        source={require('../../assets/fondo.png')} // Ruta de tu imagen de fondo
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
            source={require('../../assets/logo.png')} // Ruta de tu imagen del logo
            resizeMode="contain" // Ajusta la imagen al tamaño del contenedor manteniendo la proporción
            style={styles.logo}
          />
        </View>

        <View style={[styles.overlayContainer, isKeyboardOpen ? styles.overlayContainer_Keyboard : null]}>
          <View style={[styles.blackContainer, isKeyboardOpen ? styles.blackContainer_Keyboard : null]}>
            <View style={styles.columnContainer}>
              <Text style={[styles.seleccioneText, isKeyboardOpen ? styles.seleccioneText_Keyboard : null]}>Indique la fecha en la que desea viajar</Text>
              <TouchableOpacity onPress={handleStartCalendarPress}>
                <View style={[styles.textInputRow, isKeyboardOpen ? styles.email_keyboard : null]}>
                  <Icon style={styles.icon} name={"calendar"} color={'rgba(204, 204, 204, 0.8)'} width={30} height={30} />
                  <Text
                    style={[styles.text,{color: "rgba(204, 204, 204, 0.8)"}]}>
                      {startDate ? startDate.toLocaleDateString() : "Ida"}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleEndCalendarPress}>
                <View style={[styles.textInputRow, isKeyboardOpen ? styles.email_keyboard : null]}>
                  <Icon style={styles.icon} name={"calendar"} color={'rgba(204, 204, 204, 0.8)'} width={30} height={30} />
                  <Text
                    style={[styles.text,{color: "rgba(204, 204, 204, 0.8)"}]}>
                      {endDate ? endDate.toLocaleDateString() : "Vuelta (opcional)"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {shouldShowContinueButton && (
            <View style={styles.bottomContainer}>
              <TouchableOpacity onPress={handleContinuePress} style={[styles.button, { backgroundColor: 'rgb(240, 176, 10)' }]}>
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
  },
  container_2: {
    flex: 1,
    overflow: 'hidden', // Oculta la barra de desplazamiento
    zIndex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
  button: {
    height: 60,
    width: '100%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
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
