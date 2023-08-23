import { useState, useEffect } from "react"
import { useChatContext } from "./ChatProvider"
import { AuthContext } from "../utils/AuthProvider"

function useWebSocketManager() {
  const [ws, setWs] = useState(null)
  const [isConeccted, setIsConeccted] = useState(false)
  const { addMessage } = useChatContext()
  /*useEffect(() => {
    // Esta función se ejecutará cuando el componente se desmonte
    return () => {
      if (ws) {
        // Cerrar la conexión WebSocket antes de desmontar el componente
        ws.close()
      }
    }
  }, [ws]) // Asegura que se ejecute cuando ws cambie*/

  const connectWebSocket = (userId) => {
    const newWs = new WebSocket(`ws://192.168.0.157:8080?userId=${userId}`)
    setWs(newWs)
    newWs.onopen = function (event) {
      console.log("WebSocket connection opened.")
      setIsConeccted(true)
    }
    newWs.onmessage = function (event) {
      // Procesar el mensaje y pasar a los componentes
      console.log("WebSocket message received:", event.data)
      try {
        const data = JSON.parse(event.data)
        if (data.hasOwnProperty("type")) {
          if (data.type === "conexion") {
            console.log("Conexion establecida" + data.message)
            return
          }
          if (data.type === "message") {
            console.log("Mensaje recibido" + data.message)
            addMessage(data.user, data.message)
            console.log("Agregado " + data.user + " " + data.message)
            return
          }
        }
      } catch (error) {
        console.log(event.data)
        console.error("Error al analizar el mensaje JSON:", error)
      }
    }

    newWs.onclose = function (event) {
      console.log("WebSocket connection closed.")
      setIsConeccted(false)
    }
  }

  const sendMessage = (user, recipient, text) => {
    if (!isConeccted) {
      // Conectar si la conexión no está abierta
      connectWebSocket(user)
    } else {
      messageData = { user: user, recipient: recipient, text: text }
      ws.send(JSON.stringify(messageData))
      // Otros procesamientos y actualizaciones
    }
  }

  const closeWebSocket = () => {
    if (ws) {
      ws.close()
      setIsConeccted(false)
      setWs(null) // Limpiar la referencia al WebSocket cerrado
    }
  }

  return {
    ws,
    connectWebSocket,
    sendMessage,
    closeWebSocket,
    isConeccted,
  }
}

export default useWebSocketManager
