import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Keyboard, ImageBackground , Image, Text, TouchableOpacity, Dimensions,Platform, UIManager, LayoutAnimation } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import { Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Icon from './Icon';
import { TecladoContext } from './TecladoContext';
import { useContext } from 'react';
import CustomCalendar from './CustomCalendar';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const PasswordScreen = () => {
  const { isKeyboardOpen } = useContext(TecladoContext);
  const [password_register, setPassword_Register] = useState('');
  const [password_confirm_register, setPassword_Confirm_Register] = useState('');
  const shouldShowContinueButton= (password_register && password_confirm_register);

  const handlePasswordRegisterChange = (text) => {
    setPassword_Register(text);
  };
  const handleConfirmPasswordRegisterChange = (text) => {
    setPassword_Confirm_Register(text);
  };
  const handlePressContinue = () => {
    navigator.navigate("CodeEmailScreen");
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

const NameScreen = () => {
  const { isKeyboardOpen } = useContext(TecladoContext);
  const [name_register, setName_Register] = useState('');
  const [surname_register, setSurName_Register] = useState('');
  const shouldShowContinueButton= (name_register && surname_register);

  const handleNameRegisterChange = (text) => {
    setName_Register(text);
  };
  const handleSurNameRegisterChange = (text) => {
    setSurName_Register(text);
  };
  const handlePressContinue = () => {
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

const EmailScreen = () => {
  const { isKeyboardOpen } = useContext(TecladoContext);
  const [email_register, setEmail_Register] = useState('');
  const shouldShowContinueButton= (email_register);

  const handleEmailRegisterChange = (text) => {
    setEmail_Register(text);
  };

  const handlePressContinue = () =>{
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

const CodeEmailScreen = () => {
  const { isKeyboardOpen } = useContext(TecladoContext);
  const [code_email_register, setCodeEmail_Register] = useState('');
  const shouldShowContinueButton= (code_email_register);

  const handleCodeEmailRegisterChange = (text) => {
    setCodeEmail_Register(text);
  };

  const handlePressContinue = () =>{
    navigator.navigate('Tab_Home');
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
                    <Text style={styles.buttonText}>Registrarse</Text>
                  </TouchableOpacity>
                </View>
              )}
      </View>
      
    </View>
  );
};

const TestLogin = ({selectedButton}) => {
   

    const [isLoginPressed, setIsLoginPressed] = useState(true);
    const [isRegisterPressed, setIsRegisterPressed] = useState(false);
    const [isContinueEmailPressed, setIsContinueEmailPressed] = useState(false);
    const { isKeyboardOpen } = useContext(TecladoContext);
    const [date_register, setDate_Register] = useState('');
    const [modalVisible, setModalStartVisible] = useState(false);

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

    const GetCustomComponent = () => {
        return (
          <View>
            <Text>Este es un componente personalizado</Text>
            {/* Aquí puedes poner el contenido personalizado que desees */}
          </View>
        );
    };
    
  const InitRegister = ({
    handleLoginPress,
    verTerminosYPoliticas,
  }) => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>
        <Text style={styles.welcomeText}>Bienvenido a RUTAPP</Text>
        <Text style={styles.registerText}>¿Cómo quieres registrarte?</Text>
        <View style={styles.bottomContainerRegister}>
          <TouchableOpacity
            onPress={handleContinueEmail}
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
              <Icon
                style={styles.icon}
                name={"apple"}
                color={"#000000"}
                width={20}
                height={20}
                marginleft={'10%'}
              />
              <Text style={styles.buttonTextBlack}>Continuar con Apple</Text>
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

  const handleContinueEmail = () => {
    navigator.navigate('EmailScreen');
    // Lógica adicional para el botón "Iniciar sesión"
  };
  
  
  const toggleModalStart = () => {
    setModalStartVisible(!modalVisible);
  };
  
  return (
    
    <View style={styles.container}>
      <Modal visible={modalVisible} onRequestClose={() => toggleModalStart()}>
          <View style={styles.modalContainer}>
            <CustomCalendar maxMonthsToRender={3} setToggleModal={toggleModalStart} setDate={setDate_Register}></CustomCalendar>
          </View>
      </Modal>
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

                    
                      <View style={[styles.bottomContainer, isKeyboardOpen ? styles.bottomContainer_keyboard : null]}>
                            <TouchableOpacity onPress={handleLoginPress} style={[styles.button, { backgroundColor: 'rgb(240, 176, 10)' }, isKeyboardOpen ? styles.button_keyboard : null]}>
                                <Text style={styles.buttonText}>Iniciar sesión</Text>
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
                        {props => <InitRegister {...props} verTerminosYPoliticas={verTerminosYPoliticas}/>}
                      </RegisterStack.Screen>
                      <RegisterStack.Screen name="EmailScreen" options={{ headerShown: false }}>
                        {props => <EmailScreen {...props}/>}
                      </RegisterStack.Screen>
                      <RegisterStack.Screen name="nameScreen" options={{ headerShown: false }}>
                        {props => <NameScreen {...props}/>}
                      </RegisterStack.Screen>
                      <RegisterStack.Screen name="DateScreen" options={{ headerShown: false }}>
                        {props => <DateScreen {...props} date_register={date_register} setToggleModal={toggleModalStart}/>}
                      </RegisterStack.Screen>
                      <RegisterStack.Screen name="PasswordScreen" options={{ headerShown: false }}>
                        {props => <PasswordScreen {...props}/>}
                      </RegisterStack.Screen>
                      <RegisterStack.Screen name="CodeEmailScreen" options={{ headerShown: false }}>
                        {props => <CodeEmailScreen {...props}/>}
                      </RegisterStack.Screen>
                   </RegisterStack.Navigator>
                  </View>
                )}       

                {
                    /*
                    <RegisterStack.Navigator
                      initialRouteName="EmailScreen"
                      screenOptions={{
                      headerShown: false,
                      ...transitionConfig,
                      cardStyle: { backgroundColor: 'black', width: '100%', height: '100%' },
                      }}
                      >
                    <RegisterStack.Screen name="EmailScreen" component={EmailScreen} />
                    </RegisterStack.Navigator>
                    */
                  }
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
