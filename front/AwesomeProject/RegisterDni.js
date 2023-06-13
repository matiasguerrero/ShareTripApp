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

const Dni = React.memo(({dni, setDni}) => {

  const navigation = useNavigation();

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const openErrorModal = () => {
    setErrorModalVisible(true);
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const handleSaveDni = () => {
    const inputDni = dni;

  // Verificar que tenga exactamente 8 dígitos numéricos
    const regex = /^\d{8}$/;
    if (!regex.test(inputDni)) {
      setErrorMessage('El DNI debe tener 8 dígitos numéricos');
      openErrorModal();
      return;
    }
    navigation.navigate('Register_Names');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.registerContainer}>
        <Text style={styles.heading}>Registrate</Text>
        <Text style={styles.subHeading}>Ingrese tu numero de DNI</Text>
        <TextInput
          style={styles.input}
          placeholder="Dni"
          keyboardType="numeric"
          maxLength={8}
          onChangeText={text => setDni(text)}
          blurOnSubmit={false}
        />
        <CustomButton
                title="Siguiente"
                onPress={() => handleSaveDni()}
          />
        <ErrorModal visible={errorModalVisible} message={errorMessage} onClose={closeErrorModal} />
      </View>
    </View>
  );
});

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

export default Dni;
