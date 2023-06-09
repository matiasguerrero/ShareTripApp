import React, { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { View, Button } from 'react-native';

const Profile = () => {
  const { loggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    // Lógica para cerrar sesión
    logout();
  };

  return (
    <View>
    {/* Contenido del perfil */}
    {loggedIn && (
      <Button title="Cerrar sesión" onPress={handleLogout} />
    )}
  </View>
  );
};

export default Profile;
