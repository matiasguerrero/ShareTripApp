import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Keyboard, ImageBackground , Image, Text, TouchableOpacity, Dimensions,Platform, UIManager, LayoutAnimation } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Icon from './Icon';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const TestLogin = ({selectedButton}) => {
   

    const [isLoginPressed, setIsLoginPressed] = useState(false);
    const [isRegisterPressed, setIsRegisterPressed] = useState(true);

    const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        if (selectedButton === 'Login') {
          setIsLoginPressed(true);
          setIsRegisterPressed(false);
        } else if (selectedButton === 'Register') {
          setIsLoginPressed(false);
          setIsRegisterPressed(true);
        }
      }, [selectedButton]);
    
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
  
    const [buttonWidth, setButtonWidth] = useState(0);

    const handleButtonLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        const { marginLeft } = width * 0.2;
        setButtonWidth(marginLeft);
    };

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

      const verTerminosYPoliticas =() =>{
        navigation.navigate('Tab_Home');
      }
  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer, isKeyboardOpen ? styles.headerContainerKeyboard : null]}>
        <ImageBackground
          source={require('./assets/fondo.png')} // Ruta de tu imagen de fondo
          style={[styles.backgroundImage, , isKeyboardOpen ? styles.backgroundImageKeyboard : null]}
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
        <View style={[styles.blackContainer, isKeyboardOpen ? styles.blackContainer_Keyboard : null]}>
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
                
                {isLoginPressed && (<> 
                    <Text style={styles.welcomeText}>Bienvenido a RUTAPP</Text> 
                    <TextInput
                        style={[styles.input, isKeyboardOpen ? styles.email_keyboard : null]}
                        placeholder="Correo electrónico"
                        placeholderTextColor="rgba(204, 204, 204, 0.8)"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor="rgba(204, 204, 204, 0.8)"
                        secureTextEntry={true}
                    />

                    {!isKeyboardOpen && ( 
                        <View style={styles.bottomContainer}>
                            <TouchableOpacity onPress={handleLoginPress} style={[styles.button, { backgroundColor: 'rgb(240, 176, 10)' }]}>
                                <Text style={styles.buttonText}>Iniciar sesión</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleRegisterPress} style={[styles.button, { backgroundColor: 'rgba(0, 0, 0, 0)' }]}>
                                <Text style={[styles.buttonText, { color: 'rgb(255, 255, 255)' }, { fontSize: 14 }]}>
                                ¿Has olvidado tu contraseña?
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                 </>)}

                {isRegisterPressed && (<>
                    <Text style={styles.welcomeText}>Bienvenido a RUTAPP</Text> 
                    <Text style={styles.registerText}>¿Como quieres registrarte?</Text> 
                    <View style={styles.bottomContainerRegister}>
                        <TouchableOpacity onPress={handleLoginPress} style={[styles.buttonRegister, { backgroundColor: 'rgb(74,122,246)' }]}>
                            <View style={styles.buttorInputRow}>
                                <Icon style={[styles.icon ,{top: 3}]} name={"email"} color={"#ffffff"} width={20} height={20} marginleft={35}/>
                                <Text style={styles.buttonText}>Continuar con email</Text>
                            </View>
                        </TouchableOpacity> 	
                        <TouchableOpacity onPress={handleLoginPress} style={[styles.buttonRegister, { backgroundColor: 'rgb(68,53,165)' }]} onLayout={handleButtonLayout}>
                            <Icon style={styles.icon} name={"facebook"} color={"#ffffff"} width={20} height={20} marginleft={35}/>
                            <Text style={styles.buttonText}>Continuar con facebook</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleLoginPress} style={[styles.buttonRegister, { backgroundColor: 'rgb(255, 255, 255)' }]}>
                            <Icon style={styles.icon} name={"apple"} color={"#000000"} width={20} height={20} marginleft={35}/>
                            <Text style={styles.buttonTextBlack}>Continuar con Apple</Text>
                        </TouchableOpacity>
                         
                    </View>

                    <View style={styles.terminosYPoliticas}>
                        <Text style={styles.textTerminos}>
                        Al registrarte, aceptas nuestros {' '} 
                        <TouchableOpacity onPress={verTerminosYPoliticas}>
                            <Text style={styles.textTerminosGold}>Términos y Condiciones</Text>
                        </TouchableOpacity>
                          y nuestra {' '} 
                        <TouchableOpacity onPress={verTerminosYPoliticas}>
                            <Text style={styles.textTerminosGold}>Política de privacidad</Text>
                        </TouchableOpacity>
                        </Text>
                    </View>

                    <TouchableOpacity onPress={handleLoginPress} style={[styles.button, { backgroundColor: 'rgba(0, 0, 0, 0)' }]}>
                        <Text style={[styles.buttonText, { color: 'rgb(255, 255, 255)', fontSize: 15 }]}>¿Ya tienes cuenta? <Text style={[styles.underlineText, { color: 'rgb(240, 176, 10)', fontSize: 15}]}>Inicia sesión</Text></Text>
                    </TouchableOpacity>
                 
                 
                </>)}

           </View>
        </View>
      </View>      
    </View>
  );
};
const windowHeight = Dimensions.get('window').height;
const imageHeight = windowHeight * 0.45; // Altura según el porcentaje deseado
const imageHeightKeyboard = windowHeight * 0.20; // Altura del contenedor (55% de la altura de la ventana)

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
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
  },
  headerContainerKeyboard:{
    height:imageHeightKeyboard,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  backgroundImage: {
    width: '100%',
    height: 750,
    position: 'absolute',
    bottom: 0, // Ajusta la posición vertical de la imagen
    alignItems: 'center',
  },
  backgroundImageKeyboard:{
    height: 500,
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
    top: '27%',
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
  blackContainer_Keyboard:{
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius:0,
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
    marginBottom: 20,
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
  buttonTextBlack: {
    color: '#000000',
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
  bottomContainerRegister: {
    width: '95%',
    paddingHorizontal: 10,
    marginTop: 40,
  },
  buttonRegister:{
    height: 45,
    borderRadius: 40,
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
  },
  buttorInputRow:{
    flexDirection: 'row',
  },
  icon: {
    marginRight: 6,
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
    marginTop: 20,
    color: 'white',
  },
  email_keyboard:{
    marginBottom: 70,  
  },
  welcomeText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 22,
    fontWeight: 'bold',
  },
  registerText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  terminosYPoliticas:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
  },
  textTerminos:{
    color: 'rgb(255, 255, 255)', 
    fontSize: 10,
    textAlign: 'center',
  },
  textTerminosGold:{
    color : 'rgb(240,176,10)',
    fontSize: 10,
    marginBottom: -3,
  }
});

export default TestLogin;
