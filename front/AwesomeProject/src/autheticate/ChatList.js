import React, { useContext } from "react"
import { View, StyleSheet } from "react-native"
import { Text, TouchableOpacity, Image, ScrollView } from "react-native"
import Icon from "../utils/Icon"
import { useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { useChatContext } from "../utils/ChatProvider"
import { AuthContext } from "../utils/AuthProvider"
import { useWebSocket } from "../utils/WebSocketContext"

const ChatList = () => {
  const dorado = "rgb(240, 176, 10)"
  const gris = "rgba(204, 204, 204,0.8)"
  const navigation = useNavigation()
  const {
    usersToChatWith,
    userIdChatActual,
    setUserChatActual,
    userMessages,
    updateUserById,
  } = useChatContext()
  const { userData } = useContext(AuthContext)

  const { ws, isConnected, connectWebSocket, closeWebSocket } = useWebSocket()

  useEffect(() => {
    if (!isConnected) connectWebSocket(userData.id)
    return () => {
      // Esta función se ejecutará cuando el componente se desmonte
      if (isConnected) {
        // Cerrar la conexión WebSocket antes de desmontar el componente
        closeWebSocket()
      }
    }
  }, [])

  useEffect(() => {
    // Aquí puedes realizar acciones después de que userMessages se haya actualizado
    //console.log(JSON.stringify(userMessages))
    updateUserById(userIdChatActual)
  }, [userMessages])

  const renderTripButton = (
    nombre,
    hasNotification,
    cantMessages,
    lastMessage,
    time
  ) => {
    const handlePress = () => {
      setUserChatActual(nombre)
      navigation.navigate("ChatScreen")
    }

    return (
      <View
        style={[
          {
            width: "100%",
            height: 70,
          },
        ]}
      >
        <TouchableOpacity onPress={handlePress} style={[styles.button]}>
          <View style={styles.rowTrip}>
            <View style={styles.circleContainer}>
              <Image
                source={require("../../assets/retrato-hombre-reir.jpg")} // Ruta de la imagen relativa al archivo actual
                style={styles.imagen}
                resizeMode="contain"
              />
            </View>

            <View style={styles.column}>
              <View style={[styles.rowTrip, { alignItems: "center" }]}>
                <Text style={styles.buttonText}>{nombre}</Text>
                <View style={styles.iconContainer}>
                  <Icon
                    style={[styles.icon, { marginTop: 1 }]}
                    name={"circle-check"}
                    color={"rgb(240, 176, 10)"}
                    width={16}
                    height={16}
                  />
                </View>
              </View>

              <View style={[styles.row_trip]}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.text_trip}
                >
                  {lastMessage}
                </Text>
              </View>
            </View>

            <View style={styles.opinionContainer}>
              <Text
                style={[
                  styles.opinionText,
                  !hasNotification ? { color: gris } : null,
                ]}
              >
                {time}
              </Text>
              {hasNotification && (
                <View style={styles.circleContainerNotif}>
                  <Text style={styles.notifText}>{cantMessages}</Text>
                </View>
              )}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.rowSeleccionText}>
        <Text style={[styles.seleccioneText]}>Mensajes</Text>
      </View>
      <View style={styles.scroll}>
        <ScrollView contentContainerStyle={[styles.scrollContent]}>
          {usersToChatWith.map((user, index) => (
            <View key={index}>
              {renderTripButton(
                user.name,
                user.hasNotification,
                user.cantMessages,
                user.lastMessage,
                user.time
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
  },
  container_trip: {
    position: "absolute",
    top: "10%",
    width: "90%",
    alignItems: "center",
    flexDirection: "column",
  },
  rowSeleccionText: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    marginLeft: "5%",
    marginTop: "5%",
  },
  seleccioneText: {
    color: "rgb(255, 255, 255)",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
  },
  text: {
    top: 10,
    width: "80%",
    color: "rgba(204, 204, 204, 0.8)",
    textAlign: "center",
  },
  bottomContainer: {
    width: "100%",
    alignItems: "center",
    top: "20%",
    flexDirection: "row",
    marginBottom: 50,
  },
  button: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    marginBottom: 20,
    borderBottomColor: "rgb(49,48,48)",
    borderBottomWidth: 1,
  },
  buttonText: {
    fontWeight: "normal",
    color: "#FFFFFF",
    fontSize: 16,
    textAlignVertical: "center",
  },
  rowTrip: {
    flexDirection: "row",
    width: "100%",
  },
  circleContainer: {
    width: 45,
    height: 45,
    borderRadius: 100,
    marginLeft: "2%",
    marginRight: "2%",
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainerNotif: {
    width: 18,
    height: 18,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(240, 176, 10)",
  },
  icon: {},
  iconContainer: {
    justifyContent: "center",
    marginLeft: 7,
  },
  opinionContainer: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    position: "absolute",
    right: 10,
    height: "100%",
    flexDirection: "column",
  },
  opinionText: {
    color: "rgb(240, 176, 10)",
    fontSize: 11,
    fontWeight: "normal",
    textAlignVertical: "center",
  },
  alertaContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    flexDirection: "row",
  },
  buttonAlert: {
    height: 50,
    width: "70%",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "rgb(240, 176, 10)",
  },
  scrollContent: {
    flexGrow: 1,
    width: "100%",
  },
  scroll: {
    marginTop: "5%",
    width: "100%",
    height: "90%",
  },
  imagen: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  column: {
    flexDirection: "column",
    maxWidth: "70%",
  },
  icon_trip: {
    marginRight: 6,
  },
  text_trip: {
    color: "white",
    fontSize: 11,
    textAlign: "left",
    color: "rgba(204, 204, 204,0.8)",
  },
  row_trip: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  notifText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 10,
    textAlignVertical: "center",
  },
})

export default ChatList
