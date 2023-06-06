import React, { useContext, useState } from 'react';
import { View, Modal, TouchableOpacity, Text, StyleSheet } from 'react-native';
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
    const [showLoginModal, setShowLoginModal] = useState(false);
  
    const handleButtonClick = async (button) => {
      setSelectedButton(button);
    };
  
    const handleLogin = async () => {
        await login();
        closeLoginModal(); // Cerrar el modal después de iniciar sesión
    };
  
    const openLoginModal = () => {
      //Abril UI Login
      setShowLoginModal(true);
    };
  
    const closeLoginModal = () => {
      //Cerrar UI Login
      setShowLoginModal(false);
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
                    openLoginModal(); //Si no esta logueado, habilito para abrir el modelo de login
                 }
              }}
              style={selectedButton === 'registrar' ? styles.selectedButton : null}
            />
          </View>
  
          {selectedButton === 'buscar' && <SearchContainer />}
          {selectedButton === 'registrar' && !loggedIn && (
            <Modal visible={showLoginModal} animationType="slide">
               <View style={styles.modalContainer}>
                <LoginScreen onLogin={handleLogin} onClose={closeLoginModal} />
              </View>
            </Modal>
          )}
          {selectedButton === 'registrar' && loggedIn && (
            <Register />
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

export default HomeButton;
