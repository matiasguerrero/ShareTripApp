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
import { useChatContext } from "../utils/ChatProvider"
import useWebSocketManager from "../utils/WebSocketManager"
import { AuthContext } from "../utils/AuthProvider"
import { useWebSocket } from "../utils/WebSocketContext"
import { memo } from "react"
import { FlatList } from "react-native"
import MessageItem from "./MessageItem"

const ChatScreen = () => {
  const navigation = useNavigation()
  const [messages, setMessages] = useState([]) // Lista de mensajes
  const [newMessage, setNewMessage] = useState("") // Nuevo mensaje ingresado
  const scrollViewRef = React.useRef()
  const { isKeyboardOpen } = useContext(TecladoContext)
  const {
    userChatActual,
    userIdChatActual,
    userMessages,
    addMessage,
    updateUserById,
  } = useChatContext()
  const { sendMessage } = useWebSocket()
  const { userData } = useContext(AuthContext)

  const userIndex = userMessages.findIndex(
    (userMessage) => userMessage.userId === userIdChatActual
  )

  const handleSendMessage = () => {
    if (newMessage) {
      // Agregar el nuevo mensaje a la lista de mensajes
      addMessage(
        userIdChatActual,
        newMessage,
        (isSender = true),
        formatDate(new Date().toString())
      ) //mensaje del usuario actual al receptor
      sendMessage(userData.id, userIdChatActual, newMessage)
      setNewMessage("") // Limpiar el campo de texto
    }
  }

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false })
    }
  }

  {
    /*
  useEffect(() => {
    // Encuentra el índice del usuario en userMessages
    const userIndex = userMessages.findIndex(
      (userMessage) => userMessage.userId === userIdChatActual
    )
    console.log(userIndex)
    if (userIndex !== -1) {
      // Obtiene los mensajes del usuario actual y los establece en el estado local
      console.log("entra a editar los mensajes")
      setMessages([...userMessages[userIndex].messages])
    }
  }, [userIdChatActual, userMessages])*/
  }

  useEffect(() => {
    console.log(userMessages[userIndex].messages)
  }, [userMessages])
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

  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
  })

  return (
    <View style={styles.container}>
      {renderHeader(userChatActual)}
      <View style={[styles.scroll, isKeyboardOpen ? { height: "75%" } : null]}>
        {userMessages[userIndex].messages.length > 0 ? (
          <FlatList
            ref={scrollViewRef}
            data={userMessages[userIndex].messages}
            renderItem={({ item }) => (
              <MessageItem
                message={item.message}
                time={"12:00"} // Reemplaza con la propiedad de tiempo adecuada de tu objeto de mensaje
                color={item.isSender ? "rgb(49,48,48)" : "rgb(103, 100, 100)"}
                width={layout.width} //Se envia el ancho del contenedor padre
                align={item.isSender ? "flex-end" : "flex-start"}
              />
            )}
            onContentSizeChange={scrollToBottom}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.scrollContent}
            onLayout={(event) => setLayout(event.nativeEvent.layout)} //Es necesario capturar el ancho del contenedor
          />
        ) : null}
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
