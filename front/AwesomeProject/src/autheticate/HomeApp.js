import React from "react"
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { useNavigation } from "@react-navigation/native"

import Icon from "../utils/Icon"
import { AuthContext } from "../utils/AuthProvider"
import { useContext } from "react"
import ContainerSelected from "./ContainerSelected"
import ContainerProfile from "./ContainerProfile"
import ContainerChat from "./ContainerChat"
import { ChatProvider } from "../utils/ChatProvider"
const HomeTab = () => (
  //<View style={styles.container}>
  //  <View style={styles.centerContainer}>
  //  <SearchContainer />
  //</View>
  //</View>
  <ContainerSelected />
)

const MyTripsScreen = () => (
  <View style={styles.container}>
    <Text>Mis Viajes Screen</Text>
  </View>
)

const ChatScreen = () => <ContainerChat />

const ProfileScreen = () => <ContainerProfile />

// Configuración de la barra de navegación inferior
const Tab = createBottomTabNavigator()
const colorDorado = "rgb(255,236,61)"
const colorDoradoselecc = "rgb(255, 215, 0)"

const HomeApp = () => {
  const navigation = useNavigation()

  const { logout } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size, focused }) => {
            let iconName

            if (route.name === "Home") {
              iconName = "home"
              return (
                <Icon
                  style={styles.icon}
                  name={"home"}
                  color={focused ? colorDoradoselecc : color}
                  width={30}
                  height={30}
                />
              )
            } else if (route.name === "Profile") {
              iconName = "user"
              return (
                <Icon
                  style={styles.icon}
                  name={"user-solid"}
                  color={focused ? colorDoradoselecc : color}
                  width={30}
                  height={30}
                />
              )
            } else if (route.name === "Mis viajes") {
              iconName = "trip"
              return (
                <Icon
                  style={styles.icon}
                  name={"trip"}
                  color={focused ? colorDoradoselecc : color}
                  width={30}
                  height={30}
                />
              )
            } else if (route.name === "Chat") {
              iconName = "chat"
              return (
                <Icon
                  style={styles.icon}
                  name={"chat"}
                  color={focused ? colorDoradoselecc : color}
                  width={30}
                  height={30}
                />
              )
            }
          },
          tabBarActiveTintColor: colorDoradoselecc,
          tabBarInactiveTintColor: colorDorado,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "black",
            borderTopWidth: 0, // Elimina el borde superior de la barra de pestañas
            borderTopColor: "black",
            elevation: 0, // Eliminar el sombreado de la barra de navegación
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          },
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeTab}
          options={{ headerShown: false, tabBarLabel: "" }}
        />
        <Tab.Screen
          name="Mis viajes"
          component={MyTripsScreen}
          options={{ headerShown: false, tabBarLabel: "" }}
        />
        <Tab.Screen
          name="Chat"
          lazy={true} //Renderizado cada vez que entra a la pantalla y destruccion al salir
          component={ChatScreen}
          options={{ headerShown: false, tabBarLabel: "" }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen} // Asegúrate de proporcionar el componente Profile
          options={{ headerShown: false, tabBarLabel: "" }}
        />
      </Tab.Navigator>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden", // Oculta la barra de desplazamiento
    backgroundColor: "black",
  },
})

export default HomeApp
