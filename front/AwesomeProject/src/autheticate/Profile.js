import React, { useContext } from "react"
import { AuthContext } from "../utils/AuthProvider"
import { View, Button } from "react-native"
import { StyleSheet } from "react-native"
import { Text, Image, TouchableOpacity } from "react-native"
import Icon from "../utils/Icon"
import { useNavigation } from "@react-navigation/native"

const Profile = () => {
  const { userData, logout } = useContext(AuthContext)

  const navigation = useNavigation()

  const handleLogout = () => {
    // Lógica para cerrar sesión
    logout()
  }

  const handleAccount = () => {
    navigation.navigate("AccountHome")
  }

  const renderTextButton = (icon, nombre) => {
    return (
      <View style={styles.rowTrip}>
        <View style={styles.iconContainer}>
          <Icon
            name={icon}
            color={"rgb(240, 176, 10)"}
            width={30}
            height={30}
          />
        </View>
        <Text style={[styles.buttonText, { color: "rgb(240, 176, 10)" }]}>
          {nombre}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {/* Contenido del perfil */}

      <View style={styles.container_image}>
        <View style={styles.imageContainer}>
          <Text style={styles.opinionText}>3.2</Text>
          <Icon
            name={"star"}
            color={"rgb(240, 176, 10)"}
            width={13}
            height={13}
          />
        </View>
        <View style={styles.circleContainer}>
          <Image
            source={require("../../assets/retrato-hombre-reir.jpg")} // Ruta de la imagen relativa al archivo actual
            style={styles.imagen}
            resizeMode="contain"
          />
        </View>
        <View style={styles.imageContainer}>
          <Text style={styles.imageNameText}>
            {userData.name} {userData.last_name}
          </Text>
        </View>
      </View>
      <View style={styles.container_account}>
        <View style={styles.container_inside_account}>
          <TouchableOpacity
            onPress={handleAccount}
            style={[styles.buttonAccount]}
          >
            {renderTextButton("user-solid", "Cuenta")}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonAccount]}>
            {renderTextButton("car", "Mi vehículo")}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonAccount]}>
            {renderTextButton("visa", "Tarjeta de crédito/débito")}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container_settings}>
        <View style={styles.container_inside_settings}>
          <TouchableOpacity style={[styles.buttonAccount, { height: "35%" }]}>
            {renderTextButton("circle-question", "Ayuda")}
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonAccount, { height: "35%" }]}>
            {renderTextButton("settings", "Ajustes")}
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.alertaContainer}>
        <TouchableOpacity onPress={handleLogout} style={[styles.buttonAlert]}>
          <Text style={styles.buttonText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden", // Oculta la barra de desplazamiento
    backgroundColor: "black",
  },
  container_image: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  container_account: {
    width: "100%",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
  container_inside_account: {
    width: "90%",
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "rgb(49,48,48)",
    borderRadius: 40,
  },
  buttonAccount: {
    height: "25%",
    width: "90%",
    justifyContent: "center",
    marginBottom: "2%",
    borderRadius: 10,
  },
  rowTrip: {
    flexDirection: "row",
  },
  iconContainer: {
    width: 30,
    height: 30,
    marginRight: "2%",
  },
  container_settings: {
    width: "100%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  container_inside_settings: {
    width: "90%",
    height: "85%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "rgb(49,48,48)",
    borderRadius: 40,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  imagen: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  opinionText: {
    fontWeight: "normal",
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    textAlignVertical: "center",
    textAlign: "center",
    marginRight: 5,
    fontFamily: "Inter",
  },
  imageNameText: {
    fontWeight: "normal",
    color: "#FFFFFF",
    fontSize: 16,
    textAlignVertical: "center",
    textAlign: "center",
    fontFamily: "Inter",
  },
  circleContainer: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  alertaContainer: {
    width: "100%",
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonAlert: {
    height: "50%",
    width: "85%",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(240, 176, 10)",
  },
  buttonText: {
    fontWeight: "normal",
    color: "#FFFFFF",
    fontSize: 15,
    textAlignVertical: "center",
    fontFamily: "Inter",
  },
})

export default Profile
