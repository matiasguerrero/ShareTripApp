import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import ErrorModal from './ErrorModal';
import { useNavigation } from '@react-navigation/native';
const CustomButton = ({ title, onPress, style }) => {
    return (
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

const Email = ({email, setEmail}) => {

  const navigation = useNavigation();

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const openErrorModal = () => {
    setErrorModalVisible(true);
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const handleSaveEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setErrorMessage('Su email no es válido');
      openErrorModal();
      return;
    }
  
    navigation.navigate('Register_Password')
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.registerContainer}>
        <Text style={styles.heading}>Registrate</Text>
        <Text style={styles.subHeading}>Ingrese su email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          type="email"
          onChangeText={text => setEmail(text)}
          blurOnSubmit={false}
        />
        <CustomButton
                title="Siguiente"
                onPress={() => handleSaveEmail()}
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

export default Email;
