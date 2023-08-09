import React from 'react';
import { View, Modal, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const CustomButton = ({ title, onPress, style }) => {
    return (
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={styles.buttonText}>{title}</Text>
      </TouchableOpacity>
    );
  };

const ErrorModal = ({ visible, message, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>¡Error!</Text>
          <Text>{message}</Text>
          <CustomButton
                title="Cerrar"
                onPress={() => onClose()}
                style={styles.buttoncolor}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'green',
        marginTop: 10,
        padding: 10,
        borderRadius: 5,
        alignSelf: 'stretch',
        marginBottom: 0,
      },
      buttoncolor: {
        backgroundColor: 'gold',
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
      },
  });

export default ErrorModal;
