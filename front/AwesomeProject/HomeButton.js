import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AuthContext } from './AuthProvider';
import SearchContainer from './SearchContainer';
import Register from './Register';
import LoginScreen from './LoginScreen';

const CustomButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const HomeButton = () => {
  const { loggedIn, login } = useContext(AuthContext);
  const [selectedButton, setSelectedButton] = useState('buscar');

  const handleButtonClick = async (button) => {
    setSelectedButton(button);
  };

  const handleLogin = async () => {
    await login();
    setSelectedButton('registrar');
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContainer}>
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Buscar Viaje"
            onPress={() => handleButtonClick('buscar')}
            style={selectedButton === 'buscar' ? styles.selectedButton : null}
          />
          <CustomButton
              title="Registrar Viaje"
              onPress={() => handleButtonClick('registrar')}
              style={selectedButton === 'registrar' ? styles.selectedButton : null}
            />
        </View>

        {selectedButton === 'buscar' && <SearchContainer />}
        {selectedButton === 'registrar' && (
          loggedIn ? <Register /> : <LoginScreen onLogin={handleLogin} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'blue',
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
  selectedButton: {
    backgroundColor: 'green',
  },
});

export default HomeButton;
