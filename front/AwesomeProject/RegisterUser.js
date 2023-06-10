import React, { useState, useEffect } from 'react';
import { View, TextInput, BackHandler, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { AuthContext } from './AuthProvider';
import { register } from './api';
import { useNavigation } from '@react-navigation/native';
const CustomButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const RegisterUser = ({ onRegister}) => {
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date_of_birth, setDate] = useState('');
  const [errors, setErrors] = useState({
    dni: '',
    email: '',
    password: '',
    name: '',
    lastName: '',
    date_of_birth: '',
    cant:0,
  });

  const navigation = useNavigation();

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
        onRegister();
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

  return (
    <View style={styles.container}>
      <View style={styles.registerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Dni"
          onChangeText={text => setDni(text)}
        />
        {errors.dni && <Text style={styles.errorText}>{errors.dni}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text => setEmail(text)}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={text => setPassword(text)}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Name"
          secureTextEntry
          onChangeText={text => setName(text)}
        />
        {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Last name"
          secureTextEntry
          onChangeText={text => setLastName(text)}
        />
        {errors.lastName && <Text style={styles.errorText}>{errors.lastName}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Date of birth"
          secureTextEntry
          onChangeText={text => setDate(text)}
        />
        {errors.date_of_birth && <Text style={styles.errorText}>{errors.date_of_birth}</Text>}
        <CustomButton
                title="Registrar"
                onPress={() => handleRegister()}
        />
      </View>
    </View>
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
    marginHorizontal: 5,
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
});

export default RegisterUser;

