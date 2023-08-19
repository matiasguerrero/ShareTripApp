import React from "react"
import { View, StyleSheet } from "react-native"
import { Text, TouchableOpacity, Image, ScrollView } from "react-native"
import Icon from "../utils/Icon"
import { useNavigation } from "@react-navigation/native"
const ChatList = () => {
  const dorado = "rgb(240, 176, 10)"
  const gris = "rgba(204, 204, 204,0.8)"
  const navigation = useNavigation()
  function formatDate(date) {
    const currentDate = new Date()
    const inputDate = new Date(date)
    const diffInDays = Math.floor(
      (currentDate - inputDate) / (1000 * 60 * 60 * 24)
    )

    if (diffInDays === 0) {
      const options = {
        timeZone: "America/Argentina/Buenos_Aires",
        hour: "2-digit",
        minute: "2-digit",
      }
      return inputDate.toLocaleTimeString("es-ES", options)
    } else if (diffInDays === 1) {
      return "Ayer"
    } else if (diffInDays >= 2) {
      const day = inputDate.getDate()
      const month = inputDate.getMonth() + 1 // Sumamos 1 ya que los meses en Date son 0-indexados
      const year = inputDate.getFullYear() % 100 // Obtenemos los últimos dos dígitos del año
      return `${day}/${month}/${year}`
    }
  }

  const handlePress = () => {
    navigation.navigate("ChatScreen")
  }
  const renderTripButton = (
    nombre,
    hasNotification,
    cantMessages,
    lastMessage,
    time
  ) => {
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
          {renderTripButton(
            "Carlos",
            true,
            2,
            "Hola, ¿cómo estás? bien y vos bien bien que ehacias nada y vos",
            formatDate("2021-05-01T12:00:00.000Z")
          )}
          {renderTripButton(
            "Carlos",
            false,
            2,
            "Hola, ¿cómo estás?",
            formatDate("2023-08-18T10:00:00.000Z")
          )}
          {renderTripButton(
            "Carlos",
            true,
            2,
            "Hola, ¿cómo estás?",
            formatDate("2023-08-17T10:00:00.000Z")
          )}
          {renderTripButton(
            "Carlos",
            true,
            2,
            "Hola, ¿cómo estás? bien y vos bien bien que ehacias nada y vos",
            formatDate("2021-05-01T12:00:00.000Z")
          )}
          {renderTripButton(
            "Carlos",
            false,
            2,
            "Hola, ¿cómo estás?",
            formatDate("2023-08-18T10:00:00.000Z")
          )}
          {renderTripButton(
            "Carlos",
            false,
            2,
            "Hola, ¿cómo estás?",
            formatDate("2023-08-17T10:00:00.000Z")
          )}
          {renderTripButton(
            "Carlos",
            false,
            2,
            "Hola, ¿cómo estás? bien y vos bien bien que ehacias nada y vos",
            formatDate("2021-05-01T12:00:00.000Z")
          )}
          {renderTripButton(
            "Carlos",
            true,
            2,
            "Hola, ¿cómo estás?",
            formatDate("2023-08-18T10:00:00.000Z")
          )}
          {renderTripButton(
            "Carlos",
            true,
            2,
            "Hola, ¿cómo estás?",
            formatDate("2023-08-17T10:00:00.000Z")
          )}
          {renderTripButton(
            "Carlos",
            true,
            2,
            "Hola, ¿cómo estás? bien y vos bien bien que ehacias nada y vos",
            formatDate("2021-05-01T12:00:00.000Z")
          )}
          {renderTripButton(
            "Carlos",
            true,
            2,
            "Hola, ¿cómo estás?",
            formatDate("2023-08-18T10:00:00.000Z")
          )}
          {renderTripButton(
            "Carlos",
            true,
            2,
            "Hola, ¿cómo estás?",
            formatDate("2023-08-17T10:00:00.000Z")
          )}
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
