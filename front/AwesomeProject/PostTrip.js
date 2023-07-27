import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Modal } from 'react-native';
import { useState } from 'react';
import Icon from './Icon';

const PostTrip = () => {

    const [modalVisible, setModalVisible] = useState(false);
  const navigator= useNavigation();
  const handlePublish = () => {
    setModalVisible(true);
  };

  const handleContinuePress = () => {
    setModalVisible(false);
    navigator.navigate('SelectedHome');
  };
  return (
    <View style={styles.container}>
        <Text style={styles.seleccioneText}>Detalles de la publicación </Text>
        <View style={styles.gray_container}>
            <View style={styles.container_trip}>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.seleccioneText}>Viernes 30 Jun</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.text}>
                        origen ------- {'>'} destino
                    </Text>
                </View>

                <View style={styles.row_trip}>
                    <View style={styles.col_trip}>
                        <View style={styles.row_time}>
                            <Icon style={[styles.icon_trip]} name={"clock"} color={'rgb(240, 176, 10)'} width={15} height={15} />
                            <Text style={styles.text_trip}>07:30 origen</Text>
                        </View>
                        <View style={styles.verticalLine}></View>
                        <View style={styles.row_time}>
                            <Icon style={[styles.icon_trip]} name={"clock"} color={'rgb(240, 176, 10)'} width={15} height={15} />
                            <Text style={styles.text_trip}>10:30 destino</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.row_asientos}>
                    <View style={styles.icon_container}>
                        <Icon style={[styles.icon]} name={"user-solid"} color={'rgba(204, 204, 204, 0.8)'} width={30} height={'100%'} />
                        <Text style={styles.icon_text}>
                            {1}
                        </Text>
                    </View>
                    <Text style={styles.text_trip}>Asientos disponibles</Text>
                </View>

                <View style={styles.row_data}>
                    <View style={styles.container_data}>
                        <Text style={[styles.text, {marginBottom: 20}]}>
                            Tipo de vehículo: Auto
                        </Text>
                        <Text style={[styles.text, {marginBottom: 20}]}>
                            Modelo: Toyota Etios
                        </Text>
                        <Text style={[styles.text, {marginBottom: 20}]}>
                            Patente: AF56443
                        </Text>
                        <Text style={[styles.text, {marginBottom: 20}]}>
                            Costo: $2500
                        </Text>
                    </View>
                </View>

                <View style={[styles.bottomContainer]}>
                    <TouchableOpacity onPress={handlePublish} style={styles.button}>
                        <Text style={styles.buttonText}>Publicar</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>

        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalGeneralContainer}>
            <View style={styles.modalContainer}>
                <Icon style={[styles.icon_trip]} name={"circle-check"} color={'#57D637'} width={100} height={100} />
                <Text style={styles.modalOptionText}>Publicación confirmada</Text>
                <View style={styles.container_cancel}>
                    <TouchableOpacity style={styles.modalCancel} onPress={handleContinuePress}>
                        <Text style={styles.buttonText}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </View>
        </Modal>

    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  gray_container:{
    width: '85%',
    height: '80%',
    backgroundColor: '#313030',
    borderRadius: 40,
  },
  seleccioneText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 30,
  },
  container_trip:{
    flexDirection: 'column',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  row_trip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 3,
    marginTop: 30,
  },
  col_trip:{
    flexDirection: 'column',
  },
  row_time:{
    flexDirection: 'row', 
    alignItems: 'center',
  },
  icon_trip:{
    marginRight: 8,
  },
  text_trip:{
    color: 'white',
    fontSize:'bold',
    fontSize: 13,
    textAlign: 'center',
  },
  verticalLine: {
    width: 3,
    height: 40,
    backgroundColor: 'black',
    marginLeft: 5,
  },
  icon_container:{
    height: 30,
    zIndex:0,
    justifyContent: 'center',
    marginRight: 10,
  },
  icon:{
    borderBottomColor: 'rgba(204, 204, 204, 0.8)',
    zIndex: 1,
  },
  icon_text:{
    color: 'rgb(240, 176, 10)',
    zIndex: 1,
    fontSize: 10,
    fontWeight: 'bold',
    position: 'absolute',
    width: '100%',
    top: 5,
    left: 24,
    right: 0,
    bottom: 0,
  },
  row_asientos:{
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop: 30,
  },
  row_data:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  container_data:{
    flexDirection: 'column',
  },
  bottomContainer: {
    width: '75%',
    marginTop: 10,
  },
  button: {
    height: 60,
    width: '100%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(240, 176, 10)' 
  },
  buttonText: {
    fontWeight: 'normal',
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalGeneralContainer:{
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '70%',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOption: {
    padding: 10,
  },
  modalOptionText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  container_cancel:{
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  modalCancel: {
    borderRadius: 40,
    backgroundColor: 'rgb(240, 176, 10)',
    alignItems: 'center',
    padding: 10,
    width: '50%',
  },
});

export default PostTrip;
