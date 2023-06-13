import React, { useState, useEffect, useCallback, useRef } from 'react';
import { View, TextInput, ScrollView, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { register } from './api';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Dni from './RegisterDni';
import Name from './RegisterName';
import Email from './RegisterEmail';
import Password from './RegisterPassword';
const CustomButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const RegisterStack = createStackNavigator();

const RegisterUser = ({}) => {
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date_of_birth, setDate] = useState('');
  const dniTextInput = useRef(null);

  const [showButton, setShowButton] = useState(false); // Estado para controlar la visibilidad del botón


  const navigation = useNavigation();

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const openErrorModal = () => {
    setErrorModalVisible(true);
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const handleRegister = async () => {
    setErrors(prevErrors => ({cant:0})); // Vaciar los errores antes de ejecutar validateFields
    console.log(errors);
    setTimeout(() => {
      const validationErrors = validateFields();
      // Resto del código...
    }, 0);
    if (errors.cant === 0) {
      // No hay errores de validación, realizar el registro
      const result = await register(dni, email, password, name, lastName, date_of_birth);
      if (result.success) {
        // Registro exitoso
        console.log('Usuario registrado exitosamente');
        console.log('Datos del usuario:', result.data);
      } else {
        // Error en el registro
        console.log('Error en el registro:', result.error);
      }
    }
    console.log(errors.dni);
    console.log("va a cerrar");
    onRegister();
  };

  const validateFields = () => {
    cant=0;
    if (dni.trim() === '') {
      errors.dni = 'El DNI es requerido';
      cant+=1;
      console.log("error");
    }

    if (email.trim() === '') {
      errors.email = 'El correo electrónico es requerido';
      cant+=1;
    }

    if (password.trim() === '') {
      errors.password = 'La contraseña es requerida';
      cant+=1;
    }

    if (name.trim() === '') {
      errors.name = 'El nombre es requerido';
      cant+=1;
    }

    if (lastName.trim() === '') {
      errors.lastName = 'El apellido es requerido';
      cant+=1;
    }

    if (date_of_birth.trim() === '') {
      errors.date_of_birth = 'La fecha de nacimiento es requerida';
      cant+=1;
    }
    errors.cant=cant;
    setErrors(errors);
    return errors;
  };

  const inputRef = useRef(null);

   const dniRef = useRef('');


  return (
    <RegisterStack.Navigator initialRouteName="Register_Dni">
      <RegisterStack.Screen name="Register_Dni" options={{ headerShown: false }}>
        {props => <Dni {...props} dni={dni} setDni={setDni} />}
      </RegisterStack.Screen>
      <RegisterStack.Screen name="Register_Names" options={{ headerShown: false }}>
        {props => <Name {...props} name={name} setName={setName} lastName={lastName} setLastName={setLastName} />}
      </RegisterStack.Screen>
      <RegisterStack.Screen name="Register_Email" options={{ headerShown: false }}>
        {props => <Email {...props} email={email} setEmail={setEmail} />}
      </RegisterStack.Screen>
      <RegisterStack.Screen name="Register_Password" options={{ headerShown: false }}>
        {props => <Password {...props} password={password} setPassword={setPassword} />}
      </RegisterStack.Screen>
    </RegisterStack.Navigator>

  );
};

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    width: screenWidth,
  },
  registerContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
  input: {
    height: 40,
    borderColor: 'gold',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    color: 'gold',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
  heading: {
    color: 'yellow',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    width: '100%',
  },
  subHeading: {
    color: 'yellow',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    width: '100%',
  },
});

export default RegisterUser;

