import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Keyboard, ImageBackground , Image, Text, TouchableOpacity, Dimensions,Platform, UIManager, LayoutAnimation } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Icon from '../utils/Icon';
import { TecladoContext } from '../utils/TecladoContext';
import { useContext } from 'react';
import CustomCalendar from '../utils/CustomCalendar';
import ErrorModal from '../utils/ErrorModal';
import { ActivityIndicator } from 'react-native';
import moment from 'moment';
import { register } from '../utils/api';
import { AuthContext } from '../utils/AuthProvider';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const InitRegister = ({ handleLoginPress, verTerminosYPoliticas,}) => {

  const handlePressContinue = () => {
    navigator.navigate("EmailScreen");
  };
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>
      <Text style={styles.welcomeText}>Bienvenido a RUTAPP</Text>
      <Text style={styles.registerText}>¿Cómo quieres registrarte?</Text>
      <View style={styles.bottomContainerRegister}>
        <TouchableOpacity
          onPress={handlePressContinue}
          style={[styles.buttonRegister, { backgroundColor: 'rgb(74,122,246)' }]}
        >
          <View style={styles.buttorInputRow}>
            <Icon
              style={[styles.icon, { top: 3 }]}
              name={"email"}
              color={"#ffffff"}
              width={20}
              height={20}
              marginleft={'10%'}
            />
            <Text style={styles.buttonText}>Continuar con email</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLoginPress}
          style={[styles.buttonRegister, { backgroundColor: 'rgb(68,53,165)' }]}
        >
          <View style={styles.buttorInputRow}>
            <Icon
              style={styles.icon}
              name={"facebook"}
              color={"#ffffff"}
              width={20}
              height={20}
              marginleft={'10%'}
            />
            <Text style={styles.buttonText}>Continuar con Facebook</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLoginPress}
          style={[styles.buttonRegister, { backgroundColor: 'rgb(255, 255, 255)' }]}
        >
          <View style={styles.buttorInputRow}>
            {Platform.OS === 'android' ? (
              <Icon
              style={styles.icon}
              name={"google"}
              width={20}
              height={20}
              marginleft={'10%'}
              />
          
              ):
              <Icon
              style={styles.icon}
              name={"apple"}
              color={"#000000"}
              width={20}
              height={20}
              marginleft={'10%'}
              />
            }
            {Platform.OS === 'android' ? (
                <Text style={styles.buttonTextBlack}>Continuar con Google</Text>
              ) : <Text style={styles.buttonTextBlack}>Continuar con Apple</Text>
            }
          </View>
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

      <TouchableOpacity
        onPress={handleLoginPress}
        style={[styles.button, { backgroundColor: 'rgba(0, 0, 0, 0)' }]}
      >
        <Text
          style={[
            styles.buttonText,
            { color: 'rgb(255, 255, 255)', fontSize: 15 },
          ]}
        >
          ¿Ya tienes cuenta?{' '}
          <Text
            style={[
              styles.underlineText,
              { color: 'rgb(240, 176, 10)', fontSize: 15 },
            ]}
          >
            Inicia sesión
          </Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const PasswordScreen = ({password_register, setPassword_Register, password_confirm_register, setPassword_Confirm_Register, openErrorModal, setErrorMessage}) => {
  const { isKeyboardOpen } = useContext(TecladoContext);
  const shouldShowContinueButton= (password_register && password_confirm_register);

  const handlePasswordRegisterChange = (text) => {
    setPassword_Register(text);
  };
  const handleConfirmPasswordRegisterChange = (text) => {
    setPassword_Confirm_Register(text);
  };


  const handlePressContinue = () => {
    const passwordRegex= /^(?=.*[A-Z])(?=.*\d).{8,}$/; //Al menos 1 mayuscula, un numero y minimo 8 carac

  
    if (!passwordRegex.test(password_register)) {
      setErrorMessage('Su contraseña debe contener un número, una mayúscula y al menos 8 caracteres');
      openErrorModal();
      return;
    }
  
    if (!passwordRegex.test(password_confirm_register)) {
      setErrorMessage('Su contraseña debe contener un número, una maýuscula y al menos 8 caracteres');
      openErrorModal();
      return;
    }

    if (password_register !== password_confirm_register) {
      setErrorMessage('Sus contraseñas no coinciden');
      openErrorModal();
      return;
    }

    // Lógica adicional si ambos nombres y apellidos son válidos
    navigator.navigate("DniScreen");
  };

  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.welcomeText}>Bienvenido a RUTAPP</Text>
      <View style={{flexDirection: 'column', width: '100%', alignItems: 'center'}}>
              <Text style={[styles.seleccioneTextBoth, isKeyboardOpen ? styles.seleccioneTextBoth_Keyboard : null]}>Ingresa una contraseña</Text>
              <View style={[styles.textInputRow, {marginBottom: 20}, isKeyboardOpen ? styles.inputName_keyboard : null]}>
                <View style={{flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center'}}>
                  <TextInput
                          style={[styles.inputEmail, {marginBottom: 20}, isKeyboardOpen ? styles.inputName_keyboard : null]}
                          placeholder="Contraseña"
                          placeholderTextColor="rgba(204, 204, 204, 0.8)"
                          onChangeText={handlePasswordRegisterChange}
                          value={password_register}
                          secureTextEntry={true} 
                  />
                  <TextInput
                          style={[styles.inputEmail, isKeyboardOpen ? styles.inputName_keyboard : null]}
                          placeholder="Confirmar contraseña "
                          placeholderTextColor="rgba(204, 204, 204, 0.8)"
                          onChangeText={handleConfirmPasswordRegisterChange}
                          value={password_confirm_register}
                          secureTextEntry={true} 
                  />
                </View>
              </View>
              {shouldShowContinueButton && (
                <View style={[styles.bottomContainerEmail,isKeyboardOpen ? styles.bottomContainerEmail_keyboard : null]}>
                  <TouchableOpacity onPress={handlePressContinue} style={[styles.button, { backgroundColor: 'rgba(240, 176, 10, 1)' }, isKeyboardOpen ? styles.button_keyboard : null ]}>
                    <Text style={styles.buttonText}>Continuar</Text>
                  </TouchableOpacity>
                </View>
              )}
      </View>
      
    </View>
  );
};

const NameScreen = ({name_register, setName_Register, surname_register, setSurName_Register, openErrorModal, setErrorMessage}) => {
  const { isKeyboardOpen } = useContext(TecladoContext);
  const shouldShowContinueButton= (name_register && surname_register);

  const handleNameRegisterChange = (text) => {
    setName_Register(text);
  };
  const handleSurNameRegisterChange = (text) => {
    setSurName_Register(text);
  };
  const handlePressContinue = () => {
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóú]+$/;
    const lastNameRegex = /^[A-Za-zÁÉÍÓÚáéíóú]+$/;
    
  
    if (!nameRegex.test(name_register)) {
      setErrorMessage('Su nombre no es válido');
      openErrorModal();
      return;
    }
  
    if (!lastNameRegex.test(surname_register)) {
      setErrorMessage('Su apellido no es válido');
      openErrorModal();
      return;
    }
    navigator.navigate("DateScreen");
  };

  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.welcomeText}>Bienvenido a RUTAPP</Text>
      <View style={{flexDirection: 'column', width: '100%', alignItems: 'center'}}>
              <Text style={[styles.seleccioneTextBoth, isKeyboardOpen ? styles.seleccioneTextBoth_Keyboard : null]}>Ingresá tu nombre y apellido</Text>
              <View style={[styles.textInputRow, {marginBottom: 20}, isKeyboardOpen ? styles.inputName_keyboard : null]}>
                <View style={{flexDirection: 'column', width: '100%', height: '100%', alignItems: 'center'}}>
                  <TextInput
                          style={[styles.inputEmail, {marginBottom: 20}, isKeyboardOpen ? styles.inputName_keyboard : null]}
                          placeholder="Nombre"
                          placeholderTextColor="rgba(204, 204, 204, 0.8)"
                          onChangeText={handleNameRegisterChange}
                          value={name_register}
                  />
                  <TextInput
                          style={[styles.inputEmail, isKeyboardOpen ? styles.inputName_keyboard : null]}
                          placeholder="Apellido"
                          placeholderTextColor="rgba(204, 204, 204, 0.8)"
                          onChangeText={handleSurNameRegisterChange}
                          value={surname_register}
                  />
                </View>
              </View>
              {shouldShowContinueButton && (
                <View style={[styles.bottomContainerEmail,isKeyboardOpen ? styles.bottomContainerEmail_keyboard : null]}>
                  <TouchableOpacity onPress={handlePressContinue} style={[styles.button, { backgroundColor: 'rgba(240, 176, 10, 1)' }, isKeyboardOpen ? styles.button_keyboard : null ]}>
                    <Text style={styles.buttonText}>Continuar</Text>
                  </TouchableOpacity>
                </View>
              )}
      </View>
      
    </View>
  );
};

const EmailScreen = ({email_register, setEmail_Register, openErrorModal, setErrorMessage}) => {
  const { isKeyboardOpen } = useContext(TecladoContext);
  const shouldShowContinueButton= (email_register);

  const handleEmailRegisterChange = (text) => {
    setEmail_Register(text);
  };

  const handlePressContinue = () =>{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email_register)) {
      setErrorMessage('Su email no es válido');
      openErrorModal();
      return;
    }

    navigator.navigate("nameScreen");
  }

  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.welcomeText}>Bienvenido a RUTAPP</Text>
      <View style={{flexDirection: 'column', width: '100%', alignItems: 'center'}}>
              <Text style={[styles.seleccioneText, isKeyboardOpen ? styles.seleccioneText_Keyboard : null]}>¿Cuál es tu email?</Text>
              <View style={[styles.textInputRow, isKeyboardOpen ? styles.inputEmail_keyboard : null]}>
                <TextInput
                        style={[styles.inputEmail, isKeyboardOpen ? styles.inputEmail_keyboard : null]}
                        placeholder="Correo electrónico"
                        placeholderTextColor="rgba(204, 204, 204, 0.8)"
                        onChangeText={handleEmailRegisterChange}
                        value={email_register}
                        keyboardType="email-address" // Set the keyboardType to 'email-address'
                        autoCapitalize="none" // Prevent auto capitalization of the email address
                        
                />
              </View>
              {shouldShowContinueButton && (
                <View style={[styles.bottomContainerEmail,isKeyboardOpen ? styles.bottomContainerEmail_keyboard : null]}>
                  <TouchableOpacity onPress={handlePressContinue} style={[styles.button, { backgroundColor: 'rgba(240, 176, 10, 1)' }, isKeyboardOpen ? styles.button_keyboard : null ]}>
                    <Text style={styles.buttonText}>Continuar</Text>
                  </TouchableOpacity>
                </View>
              )}
      </View>
      
    </View>
  );
};

const DateScreen = ({date_register, setToggleModal}) => {
  const { isKeyboardOpen } = useContext(TecladoContext);
  
  const shouldShowContinueButton= (date_register);

  const handlePressContinue = () =>{
    navigator.navigate("PasswordScreen");
  }

  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.welcomeText}>Bienvenido a RUTAPP</Text>
      <View style={{flexDirection: 'column', width: '100%', alignItems: 'center'}}>
              <Text style={[styles.seleccioneText, isKeyboardOpen ? styles.seleccioneText_Keyboard : null]}>Ingresa tu fecha de nacimiento</Text>
              <TouchableOpacity onPress={setToggleModal}>
                <View style={[styles.textInputRow,  {borderBottomColor: "rgba(204, 204, 204, 0.8)"}, {justifyContent: 'center'}, isKeyboardOpen ? styles.inputEmail_keyboard : null]}>
                  <Text style={[styles.inputEmail, {textAlignVertical: 'center'}, {color: "rgba(204, 204, 204, 0.8)"}, isKeyboardOpen ? styles.inputEmail_keyboard : null]}>
                    {date_register ? date_register.toLocaleDateString() : "DD/MM/YYYY"}
                  </Text>
                </View>
              </TouchableOpacity>

              {shouldShowContinueButton && (
                <View style={[styles.bottomContainerEmail,isKeyboardOpen ? styles.bottomContainerEmail_keyboard : null]}>
                  <TouchableOpacity onPress={handlePressContinue} style={[styles.button, { backgroundColor: 'rgba(240, 176, 10, 1)' }, isKeyboardOpen ? styles.button_keyboard : null ]}>
                    <Text style={styles.buttonText}>Continuar</Text>
                  </TouchableOpacity>
                </View>
              )}
      </View>
      
    </View>
  );
};

const DniScreen = ({dni_register, setDniRegister, openErrorModal, setErrorMessage}) => {
  const { isKeyboardOpen } = useContext(TecladoContext);
  const shouldShowContinueButton= (dni_register);

  const handleDniRegisterChange = (text) => {
    setDniRegister(text);
  };


  const handlePressContinue = () => {
    const sixDigitRegex = /^\d{8}$/;
 
    if (!sixDigitRegex.test(dni_register)) {
      setErrorMessage('El DNI debe tener exactamente 8 dígitos numéricos.');
      openErrorModal();
      return;
    }
  
    navigator.navigate("CodeEmailScreen");
  }
  

  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.welcomeText}>Bienvenido a RUTAPP</Text>
      <View style={{flexDirection: 'column', width: '100%', alignItems: 'center'}}>
              <Text style={[styles.seleccioneText, isKeyboardOpen ? styles.seleccioneText_Keyboard : null]}>Ingrese tu número de DNI</Text>
              <View style={[styles.textInputRow, isKeyboardOpen ? styles.inputEmail_keyboard : null]}>
                <TextInput
                        style={[styles.inputEmail, isKeyboardOpen ? styles.inputEmail_keyboard : null]}
                        placeholder="Número de DNI"
                        placeholderTextColor="rgba(204, 204, 204, 0.8)"
                        onChangeText={handleDniRegisterChange}
                        value={dni_register}
                        keyboardType="numeric" // Teclado numérico
                        maxLength={8} // Limitar a 6 caracteres
                />
              </View>
              {shouldShowContinueButton && (
                <View style={[styles.bottomContainerEmail,isKeyboardOpen ? styles.bottomContainerEmail_keyboard : null]}>
                  <TouchableOpacity onPress={handlePressContinue} style={[styles.button, { backgroundColor: 'rgba(240, 176, 10, 1)' }, isKeyboardOpen ? styles.button_keyboard : null ]}>
                    <Text style={styles.buttonText}>Continuar</Text>
               
                  </TouchableOpacity>
                </View>
              )}
      </View>
      
    </View>
  );
};

const CodeEmailScreen = ({code_email_register, setCodeEmail_Register, openErrorModal, setErrorMessage, dni, email, password, name, lastName, date_format,handleLoginPress,setEmail_Login, setPassword_Login}) => {
  const { isKeyboardOpen } = useContext(TecladoContext);
  const shouldShowContinueButton= (code_email_register);
  const [isLoading, setIsLoading] = useState(false);
  

  const handleCodeEmailRegisterChange = (text) => {
    setCodeEmail_Register(text);
  };

  const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
  };

  const handleRegister= async (dni, email, password, name, lastName, date_of_birth) => {
    setIsLoading(true);
    date_format=formatDate(date_of_birth);
    const response = await register(parseInt(dni), email, password, name, lastName, date_format);
    console.log(response);
    if (response.success) {
      console.log("Registro exitoso");
      setEmail_Login(email);
      setPassword_Login(password);
      handleLoginPress();
      
    } else {
      setErrorMessage(response.error);
      openErrorModal();
  }
  setIsLoading(false);
};

  const handlePressContinue = () => {
    const sixDigitRegex = /^\d{6}$/;
 
    if (!sixDigitRegex.test(code_email_register)) {
      setErrorMessage('El código debe tener exactamente 6 dígitos numéricos.');
      openErrorModal();
      return;
    }
  
    handleRegister(dni, email, password, name, lastName, date_format);
  }
  

  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.welcomeText}>Bienvenido a RUTAPP</Text>
      <View style={{flexDirection: 'column', width: '100%', alignItems: 'center'}}>
              <Text style={[styles.seleccioneText, isKeyboardOpen ? styles.seleccioneText_Keyboard : null]}>Confirma el código que enviamos al email</Text>
              <View style={[styles.textInputRow, isKeyboardOpen ? styles.inputEmail_keyboard : null]}>
                <TextInput
                        style={[styles.inputEmail, isKeyboardOpen ? styles.inputEmail_keyboard : null]}
                        placeholder="Código de 6 dígitos"
                        placeholderTextColor="rgba(204, 204, 204, 0.8)"
                        onChangeText={handleCodeEmailRegisterChange}
                        value={code_email_register}
                        keyboardType="numeric" // Teclado numérico
                        maxLength={6} // Limitar a 6 caracteres
                />
              </View>
              {shouldShowContinueButton && (
                <View style={[styles.bottomContainerEmail,isKeyboardOpen ? styles.bottomContainerEmail_keyboard : null]}>
                  <TouchableOpacity onPress={handlePressContinue} style={[styles.button, { backgroundColor: 'rgba(240, 176, 10, 1)' }, isKeyboardOpen ? styles.button_keyboard : null ]}>
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <Text style={styles.buttonText}>Registrarme</Text>
                  )}
                  </TouchableOpacity>
                </View>
              )}
      </View>
      
    </View>
  );
};

const TestLogin = ({selectedButton, setSelectedButton}) => {
   

    const [isLoginPressed, setIsLoginPressed] = useState(true);
    const [isRegisterPressed, setIsRegisterPressed] = useState(false);
    const [isContinueEmailPressed, setIsContinueEmailPressed] = useState(false);
    const { isKeyboardOpen } = useContext(TecladoContext);
    const { login} = useContext(AuthContext);
    const [date_register, setDate_Register] = useState('');
    const [modalVisible, setModalStartVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [email_register, setEmail_Register] = useState('');
    const [name_register, setName_Register] = useState('');
    const [surname_register, setSurName_Register] = useState('');
    const [password_register, setPassword_Register] = useState('');
    const [password_confirm_register, setPassword_Confirm_Register] = useState('');
    const [code_email_register, setCodeEmail_Register] = useState('');
    const [dni_register, setDniRegister] = useState('');

    const [email_login, setEmail_Login] = useState('');
    const [password_login, setPassword_Login] = useState('');

    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (selectedButton === 'Login') {
          setIsLoginPressed(true);
          setIsRegisterPressed(false);
        } else if (selectedButton === 'Register') {
          setIsLoginPressed(false);
          setIsRegisterPressed(true);
        }
      }, [selectedButton]);

  
    const [buttonWidth, setButtonWidth] = useState(0);

    const RegisterStack = createStackNavigator();
    const transitionConfig = {
      ...TransitionPresets.SlideFromRightIOS,
    };

    const forFadeFromBottom = ({ current }) => ({
      cardStyle: {
        opacity: current.progress,
        transform: [
          {
            translateY: Animated.multiply(
              current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [200, 0],
                extrapolate: 'clamp',
              }),
              -1
            ),
          },
        ],
      },
    });

    navigator=useNavigation();
  

    const handleButtonLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        const { marginLeft } = width * 0.2;
        setButtonWidth(marginLeft);
    };

    const handleLogin = async () => {
      try{
        setIsLoading(true);
        const success = await login(email_login, password_login);
        console.log(success);
        if (success) {
          console.log("Logueo exitoso");
          //const previousRoute = navigation?.dangerouslyGetState()?.routes?.[navigation?.dangerouslyGetState().index - 1];
        } else {
          console.log("success dio otro valor");
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
        setErrorMessage(error.message);
        openErrorModal();
        setIsLoading(false);
      }
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
    };
    
  
  const toggleModalStart = () => {
    setModalStartVisible(!modalVisible);
  };

  const openErrorModal = () => {
    setErrorModalVisible(true);
  };
  
  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };
  

  const handleEmailLoginChange = (text) => {
    setEmail_Login(text);
  };

  const handlePasswordLoginChange = (text) => {
    setPassword_Login(text);
  };
  return (
    
    <View style={styles.container}>
      <ErrorModal visible={errorModalVisible} message={errorMessage} onClose={closeErrorModal} />
      <Modal visible={modalVisible} onRequestClose={() => toggleModalStart()}>
          <View style={styles.modalContainer}>
            <CustomCalendar maxMonthsToRender={3} setToggleModal={toggleModalStart} setDate={setDate_Register}></CustomCalendar>
          </View>
      </Modal>
      <View style={[styles.headerContainer, isKeyboardOpen ? styles.headerContainerKeyboard : null]}>
        <ImageBackground
          source={require('../../assets/fondo.png')} // Ruta de tu imagen de fondo
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
                    source={require('../../assets/logo.png')} // Ruta de tu imagen del logo
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
                        onChangeText={handleEmailLoginChange}
                        value={email_login}
                        keyboardType="email-address" // Set the keyboardType to 'email-address'
                        autoCapitalize="none" // Prevent auto capitalization of the email address
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor="rgba(204, 204, 204, 0.8)"
                        secureTextEntry={true}
                        onChangeText={handlePasswordLoginChange}
                        value={password_login}
                        autoCapitalize="none" // Prevent auto capitalization of the email address
                    />

                    
                      <View style={[styles.bottomContainer, isKeyboardOpen ? styles.bottomContainer_keyboard : null]}>
                            <TouchableOpacity onPress={handleLogin} style={[styles.button, { backgroundColor: 'rgb(240, 176, 10)' }, isKeyboardOpen ? styles.button_keyboard : null]}>
                                {isLoading ? (
                                  <ActivityIndicator size="small" color="#ffffff" />
                                ) : (
                                  <Text style={styles.buttonText}>Iniciar sesión</Text>
                                )}
                            </TouchableOpacity>
                      </View>
                     
                    {!isKeyboardOpen && ( 
                      <View style={{width: '90%'}}>
                          <TouchableOpacity onPress={handleRegisterPress} style={[styles.button, { backgroundColor: 'rgba(0, 0, 0, 0)' }]}>
                                <Text style={[styles.buttonText, { color: 'rgb(255, 255, 255)' }, { fontSize: 14 }]}>
                                ¿Has olvidado tu contraseña?
                                </Text>
                            </TouchableOpacity>
                       </View>
                    )}
                  
                </>)}

                {isRegisterPressed && (
                  <View style={[styles.viewRegisterEmail, isKeyboardOpen ? styles.viewRegisterEmailKeyboard : null]}>
                    <RegisterStack.Navigator
                      initialRouteName="InitRegister"
                      screenOptions={{
                      headerShown: false,
                      ...transitionConfig,
                      cardStyle: { backgroundColor: 'black' },
                      }}
                      >
                      <RegisterStack.Screen name="InitRegister" options={{ headerShown: false }}>
                        {props => <InitRegister {...props} handleLoginPress={handleLoginPress}verTerminosYPoliticas={verTerminosYPoliticas}/>}
                      </RegisterStack.Screen>
                      <RegisterStack.Screen name="EmailScreen" options={{ headerShown: false }}>
                        {props => <EmailScreen {...props} email_register={email_register} setEmail_Register={setEmail_Register} openErrorModal={openErrorModal} setErrorMessage={setErrorMessage}/>}
                      </RegisterStack.Screen>
                      <RegisterStack.Screen name="nameScreen" options={{ headerShown: false }}>
                        {props => <NameScreen {...props} 
                        name_register={name_register}setName_Register={setName_Register}
                        surname_register={surname_register}  setSurName_Register={setSurName_Register}
                        openErrorModal={openErrorModal} setErrorMessage={setErrorMessage}/>}
                      </RegisterStack.Screen>
                      <RegisterStack.Screen name="DateScreen" options={{ headerShown: false }}>
                        {props => <DateScreen {...props} date_register={date_register} setToggleModal={toggleModalStart}/>}
                      </RegisterStack.Screen>
                      <RegisterStack.Screen name="PasswordScreen" options={{ headerShown: false }}>
                        {props => <PasswordScreen {...props} password_register={password_register} setPassword_Register={setPassword_Register}
                         password_confirm_register={password_confirm_register} setPassword_Confirm_Register={setPassword_Confirm_Register}
                         openErrorModal={openErrorModal} setErrorMessage={setErrorMessage}/>}
                      </RegisterStack.Screen>
                      <RegisterStack.Screen name="DniScreen" options={{ headerShown: false }}>
                        {props => <DniScreen {...props} dni_register={dni_register} setDniRegister={setDniRegister} openErrorModal={openErrorModal} setErrorMessage={setErrorMessage}/>}
                      </RegisterStack.Screen>
                      <RegisterStack.Screen name="CodeEmailScreen" options={{ headerShown: false }}>
                        {props => <CodeEmailScreen {...props} code_email_register={code_email_register} setCodeEmail_Register={setCodeEmail_Register} openErrorModal={openErrorModal} setErrorMessage={setErrorMessage}
                         dni={dni_register} email={email_register} password={password_register} name={name_register} lastName={surname_register} date_format={date_register} handleLoginPress={handleLoginPress}
                        setEmail_Login={setEmail_Login} setPassword_Login={setPassword_Login}/>}
                      </RegisterStack.Screen>
                   </RegisterStack.Navigator>
                  </View>
                )}       
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
    height: '88%',
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
    height: '100%',
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
    marginTop: 50,
  },
  bottomContainer_keyboard: {
    width: '50%',
    paddingHorizontal: 10,
    marginTop: 20,
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
    width: '90%',
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
    width: '90%',
    alignItems: 'center',
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
    marginTop: 20,
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
  },
  viewRegisterEmail:{
    width: '100%', height: '70%', marginBottom: 20,
  },
  viewRegisterEmailKeyboard:{
    height: '72%', marginBottom: 0
  },
  inputEmail: {
    width: '80%',
    height: 40,
    borderBottomColor: 'rgba(204, 204, 204, 0.8)',
    borderBottomWidth: 1,
    marginBottom: 30,
    marginTop: 20,
    color: 'white',
  },
  inputEmail_keyboard:{
    marginTop: 20,
    marginBottom: '7%',
  },
  inputName_keyboard:{
    marginTop: '3%',
    marginBottom: '4%',
  },
  seleccioneText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
    width: '80%',
    textAlign: 'center'
  },
  seleccioneText_Keyboard:{
    marginTop: 30,
    marginBottom: 0,
  },
  seleccioneTextBoth: {
    color: 'rgb(255, 255, 255)',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
    width: '80%',
    textAlign: 'center'
  },
  seleccioneTextBoth_Keyboard:{
    marginTop: 10,
    fontSize: 16,
    marginBottom: 0,
  },
  textInputRow:{
    flexDirection: 'row',
    borderBottomColor: 'rgba(204, 204, 204, 0.8)',
    marginBottom: 30,
  },
  bottomContainerEmail: {
    width: '90%',
    paddingHorizontal: 10,
  },
  bottomContainerEmail_keyboard: {
    width: '50%',
    paddingHorizontal: 10,
  },
  button_keyboard:{
    height: 40,
  },
  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

export default TestLogin;
