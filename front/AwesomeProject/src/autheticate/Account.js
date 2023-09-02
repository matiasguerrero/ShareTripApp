import React from "react"
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from "react-native"
import { Dimensions } from "react-native"
import { useState } from "react"
import Icon from "../utils/Icon"
import { TecladoContext } from "../utils/TecladoContext"
import { useContext } from "react"
import { useEffect } from "react"
import { Keyboard } from "react-native"
import { AuthContext } from "../utils/AuthProvider"

const windowHeight = Dimensions.get("window").height

const Account = () => {
  const { isKeyboardOpen } = useContext(TecladoContext)
  const { userData } = useContext(AuthContext)
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")

  const [contentHeight, setContentHeight] = useState("auto")

  const adjustScrollViewHeight = () => {
    const newHeight = isKeyboardOpen ? windowHeight * 0.6 : "auto"
    setContentHeight(newHeight)
    console.log(contentHeight)
  }

  useEffect(() => {
    if (userData.name) {
      setName(userData.name)
    }
    if (userData.last_name) {
      setLastName(userData.last_name)
    }
    if (userData.description) {
      setDescription(userData.description)
    }
    if (userData.date) {
      setDate(userData.date)
    }
  }, [userData.name, userData.last_name, userData.description, userData.date])

  useEffect(() => {
    console.log(userData)
  }, [isKeyboardOpen])

  return (
    <View style={styles.container}>
      <View style={styles.container_trip}>
        <View style={styles.container_image}>
          <View style={[styles.imageContainer]}>
            <Text style={styles.opinionText}>3.2</Text>
            <Icon
              name={"star"}
              color={"rgb(240, 176, 10)"}
              // 'rgba(204, 204, 204, 0.8)',
              width={13}
              height={13}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.circleContainer,
              isKeyboardOpen ? { width: 90, height: 90 } : null,
            ]}
          >
            <Image
              source={require("../../assets/retrato-hombre-reir.jpg")} // Ruta de la imagen relativa al archivo actual
              style={styles.imagen}
              resizeMode="cover"
            />
            <View style={styles.overlay}>
              <Icon
                name={"camera"}
                color={"rgb(204, 204, 204)"}
                width={"50%"}
                height={"50%"}
              />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.container_profile}>
          <View style={[styles.textContainer]}>
            <Text style={styles.seleccioneText}>Información de tu perfil</Text>
          </View>
          <View style={[styles.bottomContainer]}>
            <ScrollView
              contentContainerStyle={[
                styles.scrollContent,
                isKeyboardOpen ? { height: contentHeight } : null,
              ]}
            >
              <View
                style={[
                  styles.textInputRow,
                  isKeyboardOpen ? { marginBottom: "3%" } : null,
                ]}
              >
                <View style={styles.column}>
                  <Text style={styles.labelText}>Nombre</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Nombre"
                    placeholderTextColor="rgba(204, 204, 204,0.8)"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.textInputRow,
                  isKeyboardOpen ? { marginBottom: "3%" } : null,
                ]}
              >
                <View style={[styles.column]}>
                  <Text style={styles.labelText}>Apellido</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Apellido"
                    placeholderTextColor="rgba(204, 204, 204, 0.8)"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </View>

              <View
                style={[
                  styles.textInputRow,
                  isKeyboardOpen ? { marginBottom: "3%" } : null,
                ]}
              >
                <View style={[styles.column]}>
                  <Text style={styles.labelText}>Descripción</Text>
                  <TextInput
                    style={[
                      styles.input,
                      { height: 120 },
                      { padding: 10, textAlignVertical: "top" },
                    ]}
                    placeholder="Escribe unas palabras sobre ti"
                    placeholderTextColor="rgba(204, 204, 204, 0.8)"
                    multiline={true} // Habilita el modo multiline
                    value={description}
                    onChangeText={setDescription}
                  />
                </View>
              </View>
              <View style={[styles.textInputRow]}>
                <View style={styles.column}>
                  <Text style={styles.labelText}>Fecha de nacimiento</Text>
                  <TouchableOpacity style={styles.input}>
                    <Text
                      style={{
                        color: "rgba(204, 204, 204, 0.8)",
                        width: "100%",
                        paddingTop: 10,
                      }}
                    >
                      {date ? date : "Seleccione la fecha"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </View>
          <View
            style={[
              styles.alertaContainer,
              isKeyboardOpen ? styles.alertaContainer_keyboard : null,
            ]}
          >
            <TouchableOpacity
              style={[
                styles.buttonAlert,
                isKeyboardOpen ? styles.buttonAlert_keyboard : null,
              ]}
            >
              <Text style={styles.buttonText}>Guardar cambios</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  container_trip: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    alignItems: "center",
    flexDirection: "column",
    zIndex: 0,
  },
  container_profile: {
    width: "100%",
    height: "85%",
    top: "15%",
    alignItems: "center",
    backgroundColor: "rgb(49,48,48)",
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    zIndex: 0,
  },
  container_image: {
    position: "absolute",
    zIndex: 1,
    height: "auto",
    top: "2%",
    justifyContent: "center",
    alignItems: "center",
  },
  seleccioneText: {
    color: "rgb(255, 255, 255)",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "Inter",
  },
  text: {
    top: 10,
    width: "80%",
    color: "rgba(204, 204, 204, 0.8)",
    textAlign: "center",
  },
  bottomContainer: {
    width: "90%",
    height: "67%",
    alignItems: "center",
    marginTop: "5%",
    flexDirection: "row",
  },
  button: {
    height: 60,
    width: "80%",
    borderRadius: 40,
    justifyContent: "center",
    backgroundColor: "rgb(49,48,48)",
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: "normal",
    color: "#FFFFFF",
    fontSize: 15,
    textAlignVertical: "center",
    fontFamily: "Inter",
  },
  rowTrip: {
    flexDirection: "row",
    marginLeft: "10%",
  },
  circleContainer: {
    width: 120,
    height: 120,
    borderRadius: 100,
    marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginRight: 20,
  },
  row_trip: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 3,
  },
  icon_trip: {
    marginRight: 8,
  },
  text_trip: {
    color: "white",
    fontSize: "bold",
    fontSize: 13,
    textAlign: "center",
    fontFamily: "Inter",
  },
  iconContainer: {
    zIndex: 0,
    width: 30,
    height: 30,
  },
  diagonalLineContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    transform: [{ translateX: -10 }, { translateY: 10 }, { rotate: "45deg" }],
    zIndex: 2,
  },
  icon_container: {
    height: 30,
    zIndex: 0,
    marginRight: 30,
    marginLeft: 30,
    justifyContent: "center",
    flexDirection: "row",
  },
  icon_text: {
    color: "rgba(204, 204, 204, 0.8)",
    zIndex: 2,
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "Inter",
  },
  icon_text_2: {
    color: "rgba(204, 204, 204, 0.8)",
    zIndex: 2,
    fontSize: 10,
    fontWeight: "bold",
    fontFamily: "Inter",
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
  labelText: {
    color: "rgb(255, 255, 255)",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: "5%",
    marginBottom: "1%",
    fontFamily: "Inter",
  },
  textInputRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    zIndex: 0,
    marginBottom: "5%",
  },
  input: {
    color: "white",
    marginLeft: "5%",
    width: "90%",
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: "rgba(204, 204, 204, 0.8)",
    fontFamily: "Inter",
  },
  rowProfile: {
    width: "80%",
    flexDirection: "row",
    marginTop: "25%",
  },
  column: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  columnTripMoney: {
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  img: {
    width: "100%",
    height: "80%",
    borderRadius: 30,
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
  alertaContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  alertaContainer_keyboard: {
    position: "absolute",
    bottom: 0,
  },
  buttonAlert: {
    height: 50,
    width: "85%",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(240, 176, 10)",
  },
  buttonAlert_keyboard: {
    height: 40,
    width: "45%",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(240, 176, 10)",
  },
  scrollContent: {
    flexGrow: 1,
    width: "100%",
    alignItems: "center",
    height: "auto",
  },
  scroll: {
    width: "100%",
  },
  imagen: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
  },
  verticalLine: {
    width: 3,
    height: 30,
    backgroundColor: "black",
    marginHorizontal: 10,
  },
  car: {
    flexDirection: "row",
    marginTop: "2%",
  },
  text_car: {
    textDecorationLine: "underline",
    color: "rgb(240, 176, 10)",
    fontSize: 12,
    fontFamily: "Inter",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(204, 204, 204, 0.4)", // Fondo opaco transparente
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
  },
  textContainer: {
    marginTop: "15%",
    width: "80%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
})

export default Account
