import React, { useState, useContext } from 'react';
import { View, Modal, TextInput, Button, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { AuthContext } from './AuthProvider';
import RegisterUser from './RegisterUser';

const CustomButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLogin, setShowLogin] = useState(true);

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      onLogin(); // Ejecuta la función onLogin si el inicio de sesión fue exitoso
    }
  };

  
  const openRegister = () => {
    //Abril UI Login
    setShowLogin(false);
  };

  const closeRegister = () => {
    //Abril UI Login
    setShowLogin(true);
  };


  const register = () => {
    openRegisterModal();
    console.log("entra");
    if (showRegisterModal == true){
      console.log("es true");
    }
  };

  return (
    <View style={styles.container}>
      {showLogin ? (
        <View style={styles.loginContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={text => setPassword(text)}
          />
          <CustomButton
                title="Ingresar"
                onPress={() => handleLogin()}
                style={styles.buttoncolor}
          />
          <CustomButton
                title="Register"
                onPress={() => openRegister()}
          />
        </View>
      ) : (
        <RegisterUser onRegister={closeRegister} />
      )}
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
  loginContainer: {
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
    width: '100%',
    marginBottom: 12,
  },
  buttoncolor: {
    backgroundColor: 'gold',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default LoginScreen;

