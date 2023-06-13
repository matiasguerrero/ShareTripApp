import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import ErrorModal from './ErrorModal';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomButton = ({ title, onPress, style }) => {
    return (
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

const Password = ({password, setPassword}) => {

  const [confirm_password, setConfirmPassword] = useState('');

  const navigation = useNavigation();

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
        <CustomButton
                title="Siguiente"
                onPress={() => handleSavePassword()}
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
