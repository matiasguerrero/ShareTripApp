import React, { useContext } from "react"
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import Icon from "../utils/Icon"
import { Dimensions } from "react-native"
import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { useChatContext } from "../utils/ChatProvider"
const windowHeight = Dimensions.get("window").height

const renderTripButton = (nombre, icon, showLine) => {
  return (
    <View style={[{ width: "100%" }, { alignItems: "center" }]}>
      <View style={styles.button}>
        <View style={styles.rowTrip}>
          <View style={styles.iconContainer}>
            <Icon
              name={icon}
              color={"rgba(204, 204, 204, 0.8)"}
              width={30}
              height={30}
            />
            {showLine && (
              <View style={styles.diagonalLineContainer}>
                <View style={styles.diagonalLine} />
              </View>
            )}
          </View>
          <Text style={[styles.buttonText, { marginLeft: 10 }]}>{nombre}</Text>
        </View>
      </View>
    </View>
  )
}

const Datatrip = () => {
  const [contentHeight, setContentHeight] = useState("auto")
  const [trips, setTrips] = useState([])
  const [asientos, setAsientos] = useState(0)
  const navigation = useNavigation()
  const { setUserChatActual, addChatUser, setUserIdChatActual } =
    useChatContext()

  const increasePress = () => {
    //avigator.navigate('CustomCalendar');
    setAsientos(asientos + 1)
  }

  const decreasePress = () => {
    cantidad = asientos - 1
    if (cantidad < 0) {
      cantidad = 0
    }
    setAsientos(cantidad)
  }

  useEffect(() => {
    // Aquí realizarías la lógica para obtener los viajes disponibles
    // y actualizar el estado de 'trips' con los datos obtenidos.
    const fetchTrips = async () => {
      // Lógica para obtener los viajes disponibles ->    const data = await getDatatrips(); // Ejemplo: función asincrónica para obtener los viajes

      //Test con mas de 50% de la pantalla
      const data = [
        renderTripButton("Permite mascotas", "huella", false),
        renderTripButton("No permite mascotas", "huella", true),
        renderTripButton("Prohibido fumar", "smoking", true),
        renderTripButton("Permite maletas", "suitcase"),
        renderTripButton("Juan Perez", "circle-check"),
      ]

      //Test con menos del 50%
      //const data = [ renderTripButton('Juan Perez', 3.2),renderTripButton('Juan Perez', 3.2)];

      //Test sin viajes
      //const data=[];
      setTrips(data)
    }

    fetchTrips()
  }, [])

  const handleContentSizeChange = (contentWidth, height) => {
    value = Math.min(height, windowHeight * 0.36)
    if (value == height) {
      console.log("es menor a 60")
      value = "auto"
    }
    setContentHeight(value)
  }

  const handleChatMessage = async () => {
    //Espera que renderice la pantalla de chat y cargue la pila
    setUserChatActual("Juan Perez")
    setUserIdChatActual("10")
    addChatUser({
      id: "10",
      name: "Juan Perez",
      hasNotification: false,
      cantMessages: 0,
      lastMessage: "",
      time: new Date().toISOString(),
    })

    await navigation.navigate("Chat")
    // Ahora puedes navegar a "ChatScreen"
    navigation.navigate("ChatScreen")
  }
  return (
    <View style={styles.container}>
      <View style={styles.container_trip}>
        <View style={styles.container_header}>
          <TouchableOpacity
            onPress={handleChatMessage}
            style={styles.header_chat}
          >
            <Icon
              name={"comments-solid"}
              color={"white"}
              width={40}
              height={40}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.container_profile}>
          <View style={styles.rowProfile}>
            <View style={[styles.columnTrip]}>
              <View style={styles.row_trip}>
                <Icon
                  style={[styles.icon_trip]}
                  name={"clock"}
                  color={"rgb(240, 176, 10)"}
                  width={15}
                  height={15}
                />
                <Text style={styles.text_trip}>07:30 origen</Text>
              </View>
              <View style={styles.verticalLine}></View>
              <View style={styles.row_trip}>
                <Icon
                  style={[styles.icon_trip]}
                  name={"clock"}
                  color={"rgb(240, 176, 10)"}
                  width={15}
                  height={15}
                />
                <Text style={styles.text_trip}>10:30 destino</Text>
              </View>
            </View>
            <View style={styles.columnTripMoney}>
              <Icon
                name={"money"}
                color={"rgb(240, 176, 10)"}
                width={20}
                height={20}
              />
              <Text style={styles.text_trip}>2500</Text>
            </View>
          </View>

          <View style={styles.textInputRow}>
            <TouchableOpacity
              style={styles.button_icon}
              onPress={decreasePress}
            >
              <Text style={styles.button_icon_text}>-</Text>
            </TouchableOpacity>
            <View style={styles.icon_container}>
              <Icon
                name={"user-solid"}
                color={"rgba(204, 204, 204, 0.8)"}
                width={30}
                height={"100%"}
              />
              <Text style={[styles.icon_text, { color: "rgb(240, 176, 10)" }]}>
                {asientos}
              </Text>
              <Text style={styles.icon_text_2}>/{asientos}</Text>
            </View>
            <TouchableOpacity
              style={styles.button_icon}
              onPress={increasePress}
            >
              <Text style={styles.button_icon_text}>+</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.car}>
            <TouchableOpacity>
              <Text style={styles.text_car}>Toyota Etios</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container_image}>
          <View style={styles.imageContainer}>
            <Text style={styles.opinionText}>3.2</Text>
            <Icon
              name={"star"}
              color={"rgb(240, 176, 10)"}
              width={13}
              height={13}
            />
          </View>
          <View style={styles.circleContainer}>
            <Image
              source={require("../../assets/retrato-hombre-reir.jpg")} // Ruta de la imagen relativa al archivo actual
              style={styles.imagen}
              resizeMode="contain"
            />
          </View>
          <View style={styles.imageContainer}>
            <Text style={styles.imageNameText}>Juan Perez</Text>
          </View>
        </View>
        <View style={[styles.bottomContainer, { height: contentHeight }]}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            onContentSizeChange={handleContentSizeChange}
          >
            {trips.length > 0 ? (
              <View style={styles.scroll}>
                {/* Renderizar los viajes disponibles */}
                {trips.map((trip, index) => (
                  <View key={index}>{trip}</View>
                ))}
              </View>
            ) : (
              <Text style={[styles.seleccioneText, { marginBottom: 30 }]}>
                No hay viajes disponibles
              </Text>
            )}
          </ScrollView>
        </View>
        <View style={styles.alertaContainer}>
          <TouchableOpacity style={[styles.buttonAlert]}>
            <Text style={styles.buttonText}>Reservar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const buttonContainerHeight = windowHeight * 0.6

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  container_trip: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    flexDirection: "column",
    zIndex: 0,
  },
  container_header: {
    width: "100%",
    height: "15%",
    zIndex: 0,
    alignItems: "flex-end",
  },
  header_chat: {
    zIndex: 2,
    width: 40,
    height: 40,
    top: "55%",
    marginRight: 10,
  },
  container_profile: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "rgb(49,48,48)",
    height: "30%",
    borderRadius: 30,
    zIndex: 0,
    marginBottom: 20,
  },
  container_image: {
    position: "absolute",
    zIndex: 1,
    height: "auto",
    top: "5%",
    justifyContent: "center",
    alignItems: "center",
  },
  seleccioneText: {
    color: "rgb(255, 255, 255)",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    top: 10,
    width: "80%",
    color: "rgba(204, 204, 204, 0.8)",
    textAlign: "center",
  },
  bottomContainer: {
    width: "90%",
    alignItems: "center",
    top: 0,
    height: "45%",
    flexDirection: "row",
    paddingTop: 10,
  },
  button: {
    height: 60,
    width: "80%",
    borderRadius: 40,
    justifyContent: "center",
    backgroundColor: "rgb(49,48,48)",
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "normal",
    color: "#FFFFFF",
    fontSize: 15,
    textAlignVertical: "center",
  },
  rowTrip: {
    flexDirection: "row",
    marginLeft: "10%",
  },
  circleContainer: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: 20,
  },
  row_trip: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 3,
  },
  icon_trip: {
    marginRight: 8,
  },
  text_trip: {
    color: "white",
    fontSize: "bold",
    fontSize: 13,
    textAlign: "center",
  },
  iconContainer: {
    zIndex: 0,
    width: 30,
    height: 30,
  },
  diagonalLineContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    transform: [{ translateX: -10 }, { translateY: 10 }, { rotate: "45deg" }],
    zIndex: 2,
  },
  diagonalLine: {
    width: "100%",
    height: 2,
    backgroundColor: "red",
  },
  icon_container: {
    height: 30,
    zIndex: 0,
    marginRight: 30,
    marginLeft: 30,
    justifyContent: "center",
    flexDirection: "row",
  },
  icon_text: {
    color: "rgba(204, 204, 204, 0.8)",
    zIndex: 2,
    fontSize: 10,
    fontWeight: "bold",
  },
  icon_text_2: {
    color: "rgba(204, 204, 204, 0.8)",
    zIndex: 2,
    fontSize: 10,
    fontWeight: "bold",
  },
  button_icon: {
    width: 70,
    height: 30,
    justifyContent: "center",
  },
  button_icon_text: {
    color: "rgba(204, 204, 204, 0.8)",
    textAlign: "center",
  },
  textInputRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "5%",
  },
  rowProfile: {
    width: "80%",
    flexDirection: "row",
    marginTop: "25%",
  },
  columnTrip: {
    flexDirection: "column",
  },
  columnTripMoney: {
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  img: {
    width: "100%",
    height: "80%",
    borderRadius: 30,
  },
  opinionText: {
    fontWeight: "normal",
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
    marginRight: 5,
  },
  imageNameText: {
    fontWeight: "normal",
    color: "#FFFFFF",
    fontSize: 13,
    textAlignVertical: "center",
    textAlign: "center",
  },
  alertaContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    top: "5%",
  },
  buttonAlert: {
    height: 50,
    width: "85%",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(240, 176, 10)",
  },
  scrollContent: {
    flexGrow: 1,
    width: "100%",
    paddingBottom: 20,
  },
  scroll: {
    width: "100%",
  },
  imagen: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  verticalLine: {
    width: 3,
    height: 30,
    backgroundColor: "black",
    marginHorizontal: 10,
  },
  car: {
    flexDirection: "row",
    marginTop: "2%",
  },
  text_car: {
    textDecorationLine: "underline",
    color: "rgb(240, 176, 10)",
    fontSize: 12,
  },
})

export default Datatrip
