import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';
import { AuthContext } from './AuthProvider';

const CustomButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const RegisterUser = ({onRegister}) => {
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date_of_birth, setDate] = useState('');

  const handleRegister = async () => {
      onRegister();
  };
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Dni"
        onChangeText={text => setDni(text)}
      />
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
      <TextInput
        style={styles.input}
        placeholder="Name"
        secureTextEntry
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last name"
        secureTextEntry
        onChangeText={text => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of birth"
        secureTextEntry
        onChangeText={text => setDate(text)}
      />
      <CustomButton
              title="Registrar"
              onPress={() => handleRegister()}
      />
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
  input: {
    height: 40,
    borderColor: 'gold',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    color: 'gold',
    width: '100%',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    width: '100%'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RegisterUser;

