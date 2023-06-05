import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';

const Register = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleSearch = () => {
    // Lógica para buscar el destino y origen
    // Puedes realizar la acción que desees con los valores de origin y destination
    console.log('Buscar:', origin, destination);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={origin}
        onChangeText={text => setOrigin(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Auto"
        value={destination}
        onChangeText={text => setDestination(text)}
      />
      <CustomButton title="Publicar viaje" style={styles.botton} onPress={handleSearch} />
    </View>
  );
};

const CustomButton = ({ title, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const screenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: screenWidth * 0.9, // Ancho del contenedor del texto (90% del ancho de la pantalla)
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
    button: {
      backgroundColor: 'black',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
      fontWeight: 'bold',
      textAlign: 'center',
    },
});

export default Register;
