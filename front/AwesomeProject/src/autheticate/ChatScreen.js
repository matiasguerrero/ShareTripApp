import React, { useContext } from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  TextInput,
} from "react-native"
import Icon from "../utils/Icon"
import { useState, useEffect } from "react"
import { useNavigation } from "@react-navigation/native"
import { TecladoContext } from "../utils/TecladoContext"
const ChatScreen = () => {
  const navigation = useNavigation()
  const [messages, setMessages] = useState([]) // Lista de mensajes
  const [newMessage, setNewMessage] = useState("") // Nuevo mensaje ingresado
  const scrollViewRef = React.useRef()
  const { isKeyboardOpen } = useContext(TecladoContext)

  const handleSendMessage = () => {
    if (newMessage) {
      // Agregar el nuevo mensaje a la lista de mensajes
      setMessages([...messages, newMessage])
      setNewMessage("") // Limpiar el campo de texto
    }
  }

  useEffect(() => {
    // Desplazarse automáticamente hacia abajo al agregar un nuevo mensaje
    scrollViewRef.current.scrollToEnd({ animated: true })
  }, [messages])

  const handleBack = () => {
    navigation.goBack()
  }

  const renderHeader = (nombre) => {
    return (
      <View
        style={[
          {
            width: "100%",
            height: "10%",
          },
        ]}
      >
        <View style={[styles.button]}>
          <View style={styles.rowTrip}>
            <TouchableOpacity onPress={handleBack} style={styles.backContainer}>
              <Icon
                style={[styles.icon, { marginTop: 1 }]}
                name={"back"}
                color={"rgb(240, 176, 10)"}
                width={"60%"}
                height={"60%"}
              />
            </TouchableOpacity>
            <View style={styles.circleContainer}>
              <Image
                source={require("../../assets/retrato-hombre-reir.jpg")} // Ruta de la imagen relativa al archivo actual
                style={styles.imagen}
                resizeMode="contain"
              />
            </View>

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
        </View>
      </View>
    )
  }

  const renderMessage = (message, time, color, align, index) => {
    return (
      <View
        key={index}
        style={[styles.container_message, { justifyContent: align }]}
      >
        <View style={[styles.message, { backgroundColor: color }]}>
          <Text style={styles.text_message}>{message}</Text>
          <Text style={styles.time_message}>{time}</Text>
        </View>
        <View></View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {renderHeader("Carlos")}
      <View style={[styles.scroll, isKeyboardOpen ? { height: "75%" } : null]}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={[styles.scrollContent]}
        >
          {messages.map((message, index) =>
            renderMessage(
              message,
              "12:00",
              index % 2 == 0 ? "rgb(49,48,48)" : "rgb(103, 100, 100)",
              index % 2 == 0 ? "flex-end" : "flex-start",
              index
            )
          )}
        </ScrollView>
      </View>
      <View
        style={[
          styles.container_textInput,
          isKeyboardOpen ? { marginTop: 0 } : null,
        ]}
      >
        <View style={styles.container_message_input}>
          <TextInput
            placeholder="Escriba su mensaje..."
            placeholderTextColor={"rgb(49,48,48)"}
            style={styles.textInput}
            value={newMessage}
            onChangeText={(text) => setNewMessage(text)}
          ></TextInput>
          <TouchableOpacity
            onPress={handleSendMessage}
            style={styles.container_send_input}
          >
            <Icon
              style={[styles.icon, { marginTop: 1 }]}
              name={"trip"}
              color={"rgb(240, 176, 10)"}
              width={"70%"}
              height={"70%"}
            />
          </TouchableOpacity>
        </View>
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
  backContainer: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    marginLeft: 7,
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
    alignItems: "center",
  },
  scroll: {
    width: "100%",
    height: "80%",
    paddingTop: 10,
  },
  imagen: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  container_textInput: {
    width: "100%",
    height: 60,
    backgroundColor: "rgb(49,48,48)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    position: "absolute",
    bottom: 0,
  },
  textInput: {
    width: "85%",
    height: "100%",
    padding: 10,
    color: "white",
  },
  container_message_input: {
    flexDirection: "row",
    width: "95%",
    height: "80%",
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  container_send_input: {
    width: "15%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  container_message: {
    flexDirection: "row",
    width: "95%",
    alignItems: "center",
    marginBottom: 10,
  },
  message: {
    flexDirection: "row",
    maxWidth: "80%",
    borderRadius: 10,
    alignItems: "flex-end",
  },
  text_message: {
    flexDirection: "column",
    color: "white",
    padding: 10,
    maxWidth: "90%",
  },
  time_message: {
    flexDirection: "column",
    color: "rgba(204, 204, 204,0.8)",
    fontSize: 10,
    height: "100%",
    alignItems: "center",
    textAlign: "right",
    paddingBottom: 5,
    paddingRight: 5,
  },
})

export default ChatScreen
