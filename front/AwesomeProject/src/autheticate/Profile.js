import React, { useContext } from 'react';
import { AuthContext } from '../utils/AuthProvider';
import { View, Button } from 'react-native';
import { StyleSheet } from 'react-native';

const Profile = () => {
  const { loggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    logout();
  };

  return (
    <View style={styles.container}>
    {/* Contenido del perfil */}
    {loggedIn && (
      <Button title="Cerrar sesión" onPress={handleLogout} />
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden', // Oculta la barra de desplazamiento
    backgroundColor: 'black',
  },
});

export default Profile;
