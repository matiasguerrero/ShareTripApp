import React, { useContext, useState, useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AuthContext } from './AuthProvider';
import SearchContainer from './SearchContainer';
import Register from './Register';
import LoginScreen from './LoginScreen';
import { useNavigation } from '@react-navigation/native';

const CustomButton = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = () => {
  const { loggedIn, login } = useContext(AuthContext);
  const [selectedButton, setSelectedButton] = useState('buscar');

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // Este código se ejecuta cuando se vuelve a enfocar la pantalla HomeMain

      // Aquí puedes realizar cualquier lógica necesaria para reiniciar el estado de HomeMain al estado inicial
      // Por ejemplo, puedes restablecer los valores de los estados o realizar una acción específica

      // Ejemplo:
      // setSomeState(initialStateValue);
      setSelectedButton("buscar");
      // Otra opción es navegar a otra pantalla y luego volver a HomeMain en su estado inicial
      // navigation.navigate('HomeMain');
    });

    // Devuelve una función de limpieza que se ejecutará antes de que el componente HomeMain se desmonte
    return unsubscribe;
  }, [navigation]); // Dependencia: navigation



  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const openLoginModal = () => {
    //navigation.navigate('Login'); // Navegar a la pantalla de login
    navigation.navigate('AuthUI', { screen: 'Login' });
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
            onPress={() => {
              handleButtonClick('registrar');
              if (!loggedIn) {
                openLoginModal(); // Abrir el modal de login si no está logueado
              }
              else{
                <Register />
              }
            }}
            style={selectedButton === 'registrar' ? styles.selectedButton : null}
            
          />
        </View>

        {selectedButton === 'buscar' && <SearchContainer />}
        {selectedButton === 'registrar' && loggedIn && (<Register /> )}
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
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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

export default HomeScreen;
