import React, { createContext, useContext, useState } from "react"
import { useChatContext } from "./ChatProvider"
const WebSocketContext = createContext()

export const WebSocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null)
  const [isConnected, setIsConnected] = useState(false)
  const { addMessage } = useChatContext()

  const connectWebSocket = (userId) => {
    const newWs = new WebSocket(`ws://192.168.0.157:8080?userId=${userId}`)
    setWs(newWs)

    newWs.onopen = function (event) {
      console.log("WebSocket connection opened.")
      setIsConnected(true)
    }

    newWs.onclose = function (event) {
      console.log("WebSocket connection closed.")
      setIsConnected(false)
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
            addMessage(data.user, data.message, (isSender = false)) //mensaje de un receptor al usuario actual
            console.log("Agregado " + data.user + " " + data.message)
            return
          }
        }
      } catch (error) {
        console.log(event.data)
        console.error("Error al analizar el mensaje JSON:", error)
      }
    }
  }

  const sendMessage = (user, recipient, text) => {
    if (!isConnected) {
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
      setIsConnected(false)
      setWs(null)
    }
  }

  return (
    <WebSocketContext.Provider
      value={{
        ws,
        isConnected,
        connectWebSocket,
        closeWebSocket,
        sendMessage,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  )
}

export const useWebSocket = () => {
  return useContext(WebSocketContext)
}
