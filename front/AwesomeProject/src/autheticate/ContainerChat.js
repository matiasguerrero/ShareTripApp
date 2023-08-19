import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
const ChatHomeStack = createStackNavigator()
import { TransitionPresets } from "@react-navigation/stack"
import ChatList from "./ChatList"
import ChatScreen from "./ChatScreen"

const transitionConfig = {
  ...TransitionPresets.ModalSlideFromBottomIOS, // Utiliza la animación predeterminada de ModalSlideFromBottomIOS
}

const ContainerChat = () => {
  return (
    <ChatHomeStack.Navigator
      initialRouteName="ChatList"
      screenOptions={{
        headerShown: false,
        ...transitionConfig, // assuming you have this defined elsewhere
        cardStyle: { backgroundColor: "transparent" },
      }}
    >
      <ChatHomeStack.Screen name="ChatList" options={{ headerShown: false }}>
        {(props) => <ChatList {...props} />}
      </ChatHomeStack.Screen>
      <ChatHomeStack.Screen name="ChatScreen" options={{ headerShown: false }}>
        {(props) => <ChatScreen {...props} />}
      </ChatHomeStack.Screen>
    </ChatHomeStack.Navigator>
  )
}

export default ContainerChat
