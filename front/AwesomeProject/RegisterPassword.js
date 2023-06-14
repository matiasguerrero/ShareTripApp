import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import ErrorModal from './ErrorModal';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { register } from './api';
import { AuthContext } from './AuthProvider';
import moment from 'moment';

const CustomButton = ({ title, onPress, style }) => {
    return (
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        {isLoading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
        )}
      </TouchableOpacity>
    );
  };

const Password = ({dni, date_of_birth, name, lastName, email, password, setPassword}) => {

  const { login } = useContext(AuthContext);
  const [confirm_password, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();


  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setPassword('');
    });
  
    // Función de limpieza adicional para restablecer el valor de date_of_birth
    const cleanup = () => {
      setPassword(''); // Restablece el valor de date_of_birth a null o cualquier otro valor inicial
    };
  
    // Devuelve una función de limpieza que se ejecutará antes de que el componente se desmonte
    return () => {
      unsubscribe();
      cleanup();
    };
  }, [navigation]);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const togglePasswordVisibility = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const openErrorModal = () => {
    setErrorModalVisible(true);
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const formatDate = (date) => {
    return moment(date).format('YYYY-MM-DD');
  };

  const handleLogin = async () => {
    try{
      const success = await login(email, password);
      if (success) {
        console.log("Logueo exitoso");
        //const previousRoute = navigation?.dangerouslyGetState()?.routes?.[navigation?.dangerouslyGetState().index - 1];
        navigation.navigate('HomeMain');
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(error.message);
      setErrorModalVisible(true);
    }
  };

  const handleRegister= async () => {
    setIsLoading(true);
    date_format=formatDate(date_of_birth);
    const response = await register(parseInt(dni), email, password, name, lastName, date_format);
    console.log(response);
    if (response.success) {
      console.log("Registro exitoso");
      handleLogin();
    } else {
      setErrorMessage(response.error);
      setErrorModalVisible(true);
  }
  setIsLoading(false);
};

  const handleSavePassword = () => {
    const passwordRegex= /^(?=.*[A-Z])(?=.*\d).{8,}$/; //Al menos 1 mayuscula, un numero y minimo 8 carac

  
    if (!passwordRegex.test(password)) {
      setErrorMessage('Su contraseña debe contener un número, una mayúscula y al menos 8 caracteres');
      openErrorModal();
      return;
    }
  
    if (!passwordRegex.test(confirm_password)) {
      setErrorMessage('Su contraseña debe contener un número, una maýuscula y al menos 8 caracteres');
      openErrorModal();
      return;
    }

    if (password !== confirm_password) {
      setErrorMessage('Sus contraseñas no coinciden');
      openErrorModal();
      return;
    }
    //navigation.navigate('Register_Email');
    handleRegister();
    // Lógica adicional si ambos nombres y apellidos son válidos
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.registerContainer}>
        <Text style={styles.heading}>Registrate</Text>
        <Text style={styles.subHeading}>Ingrese su contraseña</Text>
        <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            placeholder="Password"
            style={styles.input}
        />
         <Text style={styles.subHeading}>Re ingrese su contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={text => setConfirmPassword(text)}
          blurOnSubmit={false}
          secureTextEntry={secureTextEntry}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.row}>
            <Text style={styles.buttonText}>Mostrar </Text>
            <MaterialCommunityIcons
              name={secureTextEntry ? 'eye-off' : 'eye'}
              size={24}
              color={secureTextEntry ? 'gold' : 'gold'}
            />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button]} onPress={handleSavePassword}>
                {isLoading ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Registrarme</Text>
                )}
        </TouchableOpacity>
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
  row:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
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

export default Password;
