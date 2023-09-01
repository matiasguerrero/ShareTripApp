import React, { PureComponent } from "react"
import { View, Text, StyleSheet } from "react-native"

class MessageItem extends PureComponent {
  render() {
    const { message, time, color, align, width } = this.props

    return (
      <View
        style={[
          styles.container_message,
          { width: width * 0.95, justifyContent: align },
        ]}
      >
        <View style={[styles.message, { backgroundColor: color }]}>
          <Text style={styles.text_message}>{message}</Text>
          <Text style={styles.time_message}>{time}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container_message: {
    flexDirection: "row",
    marginBottom: 10,
  },
  message: {
    flexDirection: "row",
    maxWidth: "80%",
    borderRadius: 10,
  },
  text_message: {
    flexDirection: "column",
    color: "white",
    padding: 10,
    maxWidth: "90%",
  },
  time_message: {
    flexDirection: "column",
    color: "rgba(204, 204, 204,0.8)",
    fontSize: 10,
    height: "100%",
    textAlignVertical: "bottom",
    paddingBottom: 5,
    paddingRight: 5,
  },
})

export default MessageItem
