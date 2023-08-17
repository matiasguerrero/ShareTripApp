import React from "react"
import ContainerPublishTrip from "./ContainerPublishTrip"
import { createStackNavigator } from "@react-navigation/stack"
const ProfileHomeStack = createStackNavigator()
import { TransitionPresets } from "@react-navigation/stack"
import ContainerSearch from "./ContainerSearchTrip"
import Profile from "./Profile"
import Account from "./Account"

const transitionConfig = {
  ...TransitionPresets.ModalSlideFromBottomIOS, // Utiliza la animación predeterminada de ModalSlideFromBottomIOS
}

const ContainerProfile = () => {
  return (
    <ProfileHomeStack.Navigator
      initialRouteName="ProfileHome"
      screenOptions={{
        headerShown: false,
        ...transitionConfig, // assuming you have this defined elsewhere
        cardStyle: { backgroundColor: "transparent" },
      }}
    >
      <ProfileHomeStack.Screen
        name="ProfileHome"
        options={{ headerShown: false }}
      >
        {(props) => <Profile {...props} />}
      </ProfileHomeStack.Screen>
      <ProfileHomeStack.Screen
        name="AccountHome"
        options={{ headerShown: false }}
      >
        {(props) => <Account {...props} />}
      </ProfileHomeStack.Screen>
    </ProfileHomeStack.Navigator>
  )
}

export default ContainerProfile
