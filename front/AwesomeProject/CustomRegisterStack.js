import React from 'react';
import { View } from 'react-native';
import { createStackNavigator} from '@react-navigation/stack';
import { StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import Icon from './Icon';
import { useNavigation } from '@react-navigation/native';
import { TransitionPresets } from '@react-navigation/stack';

const transitionConfig = {
    ...TransitionPresets.SlideFromRightIOS, // Utiliza la animación predeterminada de SlideFromRightAndroid
  };

const CustomRegisterStack = ({isKeyboardOpen}) => {
    const RegisterStack = createStackNavigator();
    const navigator= useNavigation();

    const handleContinueEmail = () => {
        navigator.navigate('EmailScreen');
        // Lógica adicional para el botón "Iniciar sesión"
      };

    const EmailScreen = () => {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: 'black'}}>
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
                <TouchableOpacity  style={[styles.button, { backgroundColor: 'rgb(240, 176, 10)' }]}>
                    <Text style={styles.buttonText}>Iniciar sesión</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'rgba(0, 0, 0, 0)' }]}>
                    <Text style={[styles.buttonText, { color: 'rgb(255, 255, 255)' }, { fontSize: 14 }]}>
                    ¿Has olvidado tu contraseña?
                    </Text>
                </TouchableOpacity>
                </View>
            )}
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
                marginleft={35}
              />
              <Text style={styles.buttonText}>Continuar con email</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLoginPress}
            style={[styles.buttonRegister, { backgroundColor: 'rgb(68,53,165)' }]}
          >
            <Icon
              style={styles.icon}
              name={"facebook"}
              color={"#ffffff"}
              width={20}
              height={20}
              marginleft={35}
            />
            <Text style={styles.buttonText}>Continuar con Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLoginPress}
            style={[styles.buttonRegister, { backgroundColor: 'rgb(255, 255, 255)' }]}
          >
            <Icon
              style={styles.icon}
              name={"apple"}
              color={"#000000"}
              width={20}
              height={20}
              marginleft={35}
            />
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

 

  return (
    <RegisterStack.Navigator
        initialRouteName="InitRegister"
        screenOptions={{
        headerShown: false,
        ...transitionConfig,
        cardStyle: { backgroundColor: 'black' },
        }}
        >
      <RegisterStack.Screen name="InitRegister" component={InitRegister} />
      <RegisterStack.Screen name="EmailScreen" component={EmailScreen} />
    </RegisterStack.Navigator>
  );
};

const styles = StyleSheet.create({
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
    email_keyboard:{
      marginBottom: 70,  
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

export default CustomRegisterStack;
