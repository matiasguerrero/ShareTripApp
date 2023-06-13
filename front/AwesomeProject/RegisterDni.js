import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import ErrorModal from './ErrorModal';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment/moment';

const CustomButton = ({ title, onPress, style, style_text }) => {
    return (
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={[style_text]}>{title}</Text>
      </TouchableOpacity>
    );
  };

const Dni = React.memo(({dni, setDni, date_of_birth, setDate}) => {

  const navigation = useNavigation();

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  

  const openErrorModal = () => {
    setErrorModalVisible(true);
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const handleSaveData = () => {
    const inputDni = dni;

  // Verificar que tenga exactamente 8 dígitos numéricos
    const regex = /^\d{7,8}$/;
    if (!regex.test(inputDni)) {
      setErrorMessage('Su DNI no es válido');
      openErrorModal();
      return;
    }

    if (date_of_birth == null){
        setErrorMessage('Seleccione su fecha de nacimiento');
        openErrorModal();
        return;
    }
    navigation.navigate('Register_Names');
  };

  const formatDate = (date) => {
    return moment(date).format('DD-MM-YYYY');
  };
  
  const handleDateChange = (event,date_of_birth) => {
    // Formatear la fecha al formato "dd-mm-yyyy"
    if (event.type === 'dismissed') {
        console.log("entro");
        setShowPicker(false); // Cancel button pressed
      } else {
        setShowPicker(false);
        console.log("muestra");
        console.log(date_of_birth);
        const formattedDate = formatDate(date_of_birth);
        console.log(formattedDate);
        setDate(date_of_birth);
        console.log(formattedDate);
        console.log("muestra2");
    }
  };


  const pressDate = () => {
    setShowPicker(true);
  }

  const handlePickerClose = () => {
    console.log("entra");
    setShowPicker(false);
    setDate(new Date());
  };

  return (
    <View style={styles.container}>
      <View style={styles.registerContainer}>
        <Text style={styles.heading}>Registrate</Text>
        <Text style={styles.subHeading}>Ingrese su número de DNI</Text>
        <TextInput
          style={styles.input}
          placeholder="Dni"
          keyboardType="numeric"
          maxLength={8}
          onChangeText={text => setDni(text)}
          blurOnSubmit={false}
        />
         <Text style={styles.subHeading}>Seleccione su fecha de nacimiento</Text>
        {showPicker && (
        <DateTimePicker
          value={date_of_birth || new Date()}
          mode="date"
          placeholder="Seleccionar fecha"
          format="DD-MM-YYYY" // Utilizar el formato "dd-mm-yyyy" para la visualización
          onChange={handleDateChange}
        />)}

        <TouchableOpacity onPress={pressDate} style={styles.button_date}>
                <Text style={[styles.buttonText]}>
                {date_of_birth ? date_of_birth.toLocaleDateString() : 'Seleccionar fecha'}
                </Text>
        </TouchableOpacity>
        <CustomButton
                title="Siguiente"
                onPress={() => handleSaveData()}
                style_text={styles.buttonText}
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
  button_date:{
    backgroundColor: 'gold',
    marginBottom: 16,
    padding: 10,
    borderRadius: 5,
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
