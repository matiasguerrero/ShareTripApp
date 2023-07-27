import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const PostTrip = () => {

  const navigator= useNavigation();
  
  return (
    <View style={styles.container}>
      {/* Aquí puedes agregar el contenido de tu componente PostTrip */}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default PostTrip;
