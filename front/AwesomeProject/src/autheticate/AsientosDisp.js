import React from "react"
import { useEffect, useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import Icon from "../utils/Icon"
import { useNavigation } from "@react-navigation/native"
import { TecladoContext } from "../utils/TecladoContext"
import { useContext } from "react"
const AsientosDisp = ({ asientos, setAsientos }) => {
  const { isKeyboardOpen } = useContext(TecladoContext)

  const navigator = useNavigation()

  useEffect(() => {
    setAsientos(0)
  }, [])

  const increasePress = () => {
    //avigator.navigate('CustomCalendar');
    setAsientos(asientos + 1)
  }

  const decreasePress = () => {
    cantidad = asientos - 1
    if (cantidad < 0) {
      cantidad = 0
    }
    setAsientos(cantidad)
  }

  const handleContinuePress = () => {
    navigator.navigate("CostTrip")
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/fondo.png")} // Ruta de tu imagen de fondo
        resizeMode="cover"
        style={[
          styles.backgroundImage,
          isKeyboardOpen ? styles.backgroundImage_Keyboard : null,
        ]}
      >
        <LinearGradient
          colors={[
            "rgba(0, 0, 0, 0.85)",
            "rgba(0, 0, 0, 0.8)",
            "rgba( 240, 176, 10, 0.3)",
          ]} // Colores del degradado: desde negro a amarillo
          start={{ x: 0, y: 1 }} // Coordenadas de inicio del degradado (esquina inferior izquierda)
          end={{ x: 0, y: 0 }} // Coordenadas de fin del degradado (esquina superior izquierda)
          style={styles.gradientOverlay}
        />
      </ImageBackground>

      <View style={styles.container_2}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/logo.png")} // Ruta de tu imagen del logo
            resizeMode="contain" // Ajusta la imagen al tamaño del contenedor manteniendo la proporción
            style={styles.logo}
          />
        </View>

        <View
          style={[
            styles.overlayContainer,
            isKeyboardOpen ? styles.overlayContainer_Keyboard : null,
          ]}
        >
          <View
            style={[
              styles.blackContainer,
              isKeyboardOpen ? styles.blackContainer_Keyboard : null,
            ]}
          >
            <View style={styles.columnContainer}>
              <Text style={styles.seleccioneText}>
                Cantidad de asientos disponibles
              </Text>
              <View style={styles.textInputRow}>
                <TouchableOpacity
                  style={styles.button_icon}
                  onPress={decreasePress}
                >
                  <Text style={styles.button_icon_text}>-</Text>
                </TouchableOpacity>
                <View style={styles.icon_container}>
                  <Icon
                    style={[styles.icon]}
                    name={"user-solid"}
                    color={"rgba(204, 204, 204, 0.8)"}
                    width={30}
                    height={"100%"}
                  />
                  <Text style={styles.icon_text}>{asientos}</Text>
                </View>
                <TouchableOpacity
                  style={styles.button_icon}
                  onPress={increasePress}
                >
                  <Text style={styles.button_icon_text}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "rgb(240, 176, 10)" }]}
            onPress={handleContinuePress}
          >
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const windowHeight = Dimensions.get("window").height
const imageHeightKeyboard = windowHeight * 0.2 // Altura del contenedor (55% de la altura de la ventana)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden", // Oculta la barra de desplazamiento
    zIndex: 0,
  },
  container_2: {
    flex: 1,
    overflow: "hidden", // Oculta la barra de desplazamiento
    zIndex: 1,
    width: "100%",
  },
  contentContainer: {
    flexGrow: 1,
  },
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  backgroundImage_Keyboard: {
    bottom: "63%",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  logo: {
    width: "70%",
  },
  logoText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  overlayContainer_Keyboard: {
    top: "30%",
  },
  blackContainer: {
    width: "90%",
    height: "40%",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  blackContainer_Keyboard: {
    width: "100%",
    height: "50%",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    flex: 1,
  },
  columnContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    height: "100%",
    flexDirection: "column",
  },
  bottomContainer: {
    width: "100%",
    top: "60%",
    zIndex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 70,
    width: "90%",
    marginTop: 30,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "normal",
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Inter",
  },
  underlineText: {
    textDecorationLine: "underline",
  },
  icon_container: {
    width: 40,
    height: 30,
    zIndex: 0,
    marginRight: 30,
    marginLeft: 30,
    justifyContent: "center",
  },
  icon_text: {
    color: "rgba(204, 204, 204, 0.8)",
    zIndex: 1,
    fontSize: 10,
    fontWeight: "bold",
    position: "absolute",
    width: "100%",
    top: 0,
    left: 28,
    right: 0,
    bottom: 0,
  },
  button_icon: {
    width: 70,
    height: 30,
    justifyContent: "center",
  },
  button_icon_text: {
    color: "rgba(204, 204, 204, 0.8)",
    textAlign: "center",
  },
  icon: {
    borderBottomColor: "rgba(204, 204, 204, 0.8)",
    zIndex: 1,
  },
  seleccioneText: {
    color: "rgb(255, 255, 255)",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 60,
    textAlign: "center",
    fontFamily: "Inter",
  },
  seleccioneText_Keyboard: {
    marginTop: 20,
    marginBottom: 50,
  },
  textInputRow: {
    flexDirection: "row",
    borderBottomColor: "rgba(204, 204, 204, 0.8)",
    marginBottom: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    top: 10,
    width: "80%",
    height: 40,
  },
  email_keyboard: {
    marginBottom: 70,
  },
})

export default AsientosDisp
