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
    // Verificar si el usuario ya existe en la lista
    const userExists = usersToChatWith.some(
      (existingUser) => existingUser.id === user.id
    )

    if (!userExists) {
      // Si el usuario no existe, agrégalo a la lista
      setUsersToChatWith((prevUsers) => [...prevUsers, user])
      setUserMessages((prevMessages) => [
        ...prevMessages,
        { userId: user.id, messages: [] },
      ])
    } else {
      console.log(`El usuario con ID ${user.id} ya existe en la lista.`)
    }
  }

  const updateUserById = (userId) => {
    setUsersToChatWith((prevUsers) =>
      prevUsers.map((user) => {
        if (user.id === userId) {
          // Encuentra el mensaje más reciente del usuario en userMessages
          const userMessage = userMessages.find((msg) => msg.userId === userId)
          const lastMessage = userMessage
            ? userMessage.messages[userMessage.messages.length - 1]
            : null

          // Actualiza lastmessage con el último mensaje
          return {
            ...user,
            lastMessage: lastMessage ? lastMessage.message : "", // Actualiza lastmessage con el último mensaje o una cadena vacía si no hay mensajes.
            time: lastMessage ? lastMessage.time : "", // Actualiza time con la hora del último mensaje o una cadena vacía si no hay mensajes.
          }
        }
        return user
      })
    )
  }

  // Agregar un mensaje para un usuario específico
  const addMessage = (userId, message, isSender, time) => {
    console.log("va a entrar a addmessage")
    setUserMessages((prevMessages) => {
      return prevMessages.map((userMessage) => {
        if (userMessage.userId === userId) {
          // Agregar el mensaje al usuario correspondiente
          console.log("encontro el usuario")
          return {
            ...userMessage,
            messages: [
              ...userMessage.messages,
              { message: message, isSender: isSender, time: time },
            ],
          }
        }
        return userMessage
      })
    })
    //Actualiza la lista de usuarios y su ultimo mensaje
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
        updateUserById,
      }}
    >
      {children}
    </ChatContext.Provider>
  )
}

export const useChatContext = () => {
  return useContext(ChatContext)
}
