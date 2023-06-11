import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Dimensions, BackHandler} from 'react-native';
import { AuthContext } from './AuthProvider';
import { useNavigation } from '@react-navigation/native';
import ErrorModal from './ErrorModal';

const CustomButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const LoginScreen = ({}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


  const navigation = useNavigation();

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const handleLogin = async () => {
    try{
      const success = await login(email, password);
      console.log(success);
      if (success) {
        console.log("Logueo exitoso");
        //const previousRoute = navigation?.dangerouslyGetState()?.routes?.[navigation?.dangerouslyGetState().index - 1];
        navigation.navigate('HomeMain');
      } else {
        console.log("success dio otro valor");
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
      setErrorModalVisible(true);
    }
  };

  
  const openRegister = () => {
    //Abril UI Login
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
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
          <ErrorModal visible={errorModalVisible} message={errorMessage} onClose={closeErrorModal} />
   
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

