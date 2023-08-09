import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from '../utils/Icon';
import { Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;


const AvailableTrip = () => {
    const [contentHeight, setContentHeight] = useState('auto');
    const [trips, setTrips] = useState([]);

    const navigator=useNavigation();

    const handlePress = () => {
        navigator.navigate("DataTrip");
    }

    const renderTripButton = (nombre, opiniones) => {
        return (
        <View style={[{width: '100%'},{alignItems: 'center'}]}>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
            <View style={styles.rowTrip}>
              <View style={styles.circleContainer}>
                  <Image
                      source={require('../../assets/retrato-hombre-reir.jpg')} // Ruta de la imagen relativa al archivo actual
                      style={styles.imagen}
                      resizeMode='contain'
                  />        
              </View>
      
              <View style={styles.column}>
                <View style={styles.rowTrip}>
                  <Text style={styles.buttonText}>{nombre}</Text>
                  <View style={styles.iconContainer}>
                      <Icon
                      style={styles.icon}
                      name={'circle-check'}
                      color={'rgb(240, 176, 10)'}
                      width={20}
                      height={20}
                      />
                  </View>
                </View>
                
                <View style={styles.row_trip}>
                    <Icon style={[styles.icon_trip]} name={"clock"} color={'rgb(240, 176, 10)'} width={12} height={12} />
                    <Text style={styles.text_trip}>07:30 origen</Text>
                </View>
              </View>
      
              <View style={styles.opinionContainer}>
                  <Text style={styles.opinionText}>{opiniones}</Text>
                  <Icon
                  style={styles.icon}
                  name={'star'}
                  color={'rgb(240, 176, 10)'}
                  width={13}
                  height={13}
                  />
              </View>
            </View>
        </TouchableOpacity>
        </View>
        );
    };
    useEffect(() => {
      // Aquí realizarías la lógica para obtener los viajes disponibles
      // y actualizar el estado de 'trips' con los datos obtenidos.
      const fetchTrips = async () => {
        // Lógica para obtener los viajes disponibles ->    const data = await getAvailableTrips(); // Ejemplo: función asincrónica para obtener los viajes
        
        //Test con mas de 50% de la pantalla
        const data = [ renderTripButton('Juan Perez', 3.2),renderTripButton('Juan Perez', 3.2),
        renderTripButton('Juan Perez', 3.2),renderTripButton('Juan Perez', 3.2),renderTripButton('Juan Perez', 3.2),renderTripButton('Juan Perez', 3.2),renderTripButton('Juan Perez', 3.2),]
        
        //Test con menos del 50%
        //const data = [ renderTripButton('Juan Perez', 3.2),renderTripButton('Juan Perez', 3.2)];
        
        //Test sin viajes
        //const data=[];
        setTrips(data);
      };
  
      fetchTrips();
    }, []);

    const handleContentSizeChange = (contentWidth, height) => {
        value=Math.min(height, windowHeight * 0.5);
        if (value == height){
            console.log("es menor a 60");
            value='auto';
        }
        setContentHeight(value);
        };
    
    return (
     <View style={styles.container}>
       <View style={styles.container_trip}>
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.seleccioneText}>Viernes 30 Jun</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
                <Text style={[styles.text,{color: "rgba(204, 204, 204, 0.8)"}]}>
                    origen ------- {'>'} destino
                </Text>
            </View>
            <View style={[styles.bottomContainer, { height: contentHeight }]}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    onContentSizeChange={handleContentSizeChange}
                >
                
                {trips.length > 0 ? (
                <View style={styles.scroll} >
                    {/* Renderizar los viajes disponibles */}
                    {trips.map((trip, index) => (
                    <View key={index}>{trip}</View>
                    ))}
                </View>
                ) : (
                <Text style={[styles.seleccioneText,{marginBottom:30}]}>No hay viajes disponibles</Text>
                )}

                   
                   
                </ScrollView>
            </View>
            <View style={styles.alertaContainer}>
                <TouchableOpacity style={[styles.buttonAlert]}>
                    <Text style={styles.buttonText}>Crear alerta de viaje</Text>
                </TouchableOpacity>
            </View>
       </View>
    </View>
  );
};

const buttonContainerHeight = windowHeight * 0.6;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  container_trip:{
    position: 'absolute',
    top: '10%',
    width: '90%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  seleccioneText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  text: {
    top: 10,
    width: '80%',
    color: 'rgba(204, 204, 204, 0.8)',
    textAlign: 'center',
  },
  bottomContainer: {
    width: '100%',
    alignItems: 'center',
    top: '20%',
    flexDirection: 'row',
    marginBottom: 50,
  },
  button: {
    height: 60,
    width: '90%',
    borderRadius: 40,
    justifyContent: 'center',
    backgroundColor: 'rgb(49,48,48)',
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: 'normal',
    color: '#FFFFFF',
    fontSize: 16,
    textAlignVertical: 'center',
  },
  rowTrip:{
    flexDirection: 'row',
  },
  circleContainer: {
    width: 45,
    height: 45,
    borderRadius: 100,
    marginLeft: 20,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon:{
  },
  iconContainer:{
    justifyContent: 'center',
    marginLeft: 7,
  },
  opinionContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    height: '100%',
    flexDirection: 'row',
    
  },
  opinionText:{
    fontWeight: 'normal',
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    marginRight: 5,
  },
  alertaContainer:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    flexDirection: 'row',
  },
  buttonAlert: {
    height: 50,
    width: '70%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'rgb(240, 176, 10)' 
  },
  scrollContent:{
    flexGrow: 1,
    width: '100%',
    paddingBottom: 20,
  },
  scroll:{
    width: '100%',
  },
  imagen:{
    width: '100%',
    height: '100%',
    borderRadius: 100,
  },
  column:{
    flexDirection: 'column',
  },
  icon_trip:{
    marginRight: 6,
  },
  text_trip:{
    color: 'white',
    fontSize:'bold',
    fontSize: 10,
    textAlign: 'center',
  },
  row_trip: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 3,
    marginTop: 2,
  },
});

export default AvailableTrip;
