import React, { createContext, useContext, useState } from "react"

// Crea el contexto
const ChatContext = createContext()

// Proveedor del contexto
export const ChatProvider = ({ children }) => {
  const [userChatActual, setUserChatActual] = useState("")
  const [userIdChatActual, setUserIdChatActual] = useState("")
  const [usersToChatWith, setUsersToChatWith] = useState([])
  const [userMessages, setUserMessages] = useState([]) // Array para almacenar los mensajes por usuario

  // agregar usuarios a la lista
  const addChatUser = (user) => {
    setUsersToChatWith((prevUsers) => [...prevUsers, user])
    setUserMessages((prevMessages) => [
      ...prevMessages,
      { userId: user.id, messages: [] },
    ])
  }

  // Agregar un mensaje para un usuario específico
  const addMessage = (userId, message, isSender) => {
    console.log("va a entrar a addmessage")
    console.log("Antes de agregar el mensaje:", userMessages)
    setUserMessages((prevMessages) => {
      return prevMessages.map((userMessage) => {
        if (userMessage.userId === userId) {
          // Agregar el mensaje al usuario correspondiente
          console.log("encontro el usuario")
          return {
            ...userMessage,
            messages: [
              ...userMessage.messages,
              { message: message, isSender: isSender },
            ],
          }
        }
        return userMessage
      })
    })

    console.log("Después de agregar el mensaje:", userMessages)
  }

  return (
    <ChatContext.Provider
      value={{
        userChatActual,
        setUserChatActual,
        userIdChatActual,
        setUserIdChatActual,
        usersToChatWith,
        addChatUser,
        userMessages,
        setUserMessages,
        addMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChatContext = () => {
  return useContext(ChatContext)
}
