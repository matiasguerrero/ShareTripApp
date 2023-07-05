import React from 'react';
import { View, StyleSheet, ImageBackground, Text, TouchableOpacity, Dimensions } from 'react-native';

const TestLogin = ({ navigation }) => {
  const handleLoginPress = () => {
    // Lógica para el botón "Iniciar sesión"
  };

  const handleRegisterPress = () => {
    // Lógica para el botón "Registrarse"
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require('./assets/fondo.png')} // Ruta de tu imagen de fondo
          resizeMode="cover"
          style={styles.backgroundImage}
        />
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity onPress={handleLoginPress} style={[styles.button, { backgroundColor: 'rgb(240, 176, 10)' }]}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegisterPress} style={[styles.button, { backgroundColor: 'transparent' }]}>
          <Text style={styles.buttonText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const windowHeight = Dimensions.get('window').height;
const imageHeight = windowHeight * 0.5; // 30% del alto de la ventana

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    height: imageHeight,
    alignItems: 'flex-end',
  },
  bottomContainer: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  button: {
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});

export default TestLogin;
