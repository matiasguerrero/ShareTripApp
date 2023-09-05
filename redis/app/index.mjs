import http from "http"
import ws from "websocket"
import redis from "redis"
const APPID = process.env.APPID
const redisSVIdentifier = "SV:" + APPID
let connections = []
const WebSocketServer = ws.server

const subscriber = redis.createClient({
  port: 6379,
  host: "redis_internal",
})

const publisher = redis.createClient({
  port: 6379,
  host: "redis_internal",
})

const redisCentralUsers = redis.createClient({
  port: 6379,
  host: "redis_internal",
})

function sendMessageToUser(userId, recipient, message) {
  // Buscar la conexión correspondiente al userId
  console.log("Parametros a enviar:" + userId + " " + recipient + " " + message)
  const targetConnection = connections.find((c) => c.userId === recipient)

  if (targetConnection) {
    // Encontramos la conexión, enviamos el mensaje
    targetConnection.send(
      JSON.stringify({ type: "message", user: userId, message: message })
    )
  } else {
    console.log(`No se encontró una conexión para el usuario ${recipient}`)
  }
}

function closeConexionsToUser(userId) {
  console.log("Cerrando conexion a " + userId)
  const targetConnection = connections.find((c) => c.userId === userId)

  if (targetConnection) {
    // Encontramos la conexión, enviamos el mensaje
    targetConnection.close()
  } else {
    console.log(`No se encontró una conexión para el usuario ${userId}`)
    console.log("Va a borrar")
    redisCentralUsers.del(`user:${userId}:appid`, (err, reply) => {
      if (err) {
        console.error("Error deleting user:", err)
      } else {
        console.log(`Deleted user from redis:${userId}:appid`)
      }
    })
  }
}

subscriber.on("subscribe", function (channel, count) {
  console.log(`Server ${APPID} subscribed successfully to channel ${channel}`)
  //publisher.publish("livechat", "a message")
})

subscriber.on("message", function (channel, message) {
  try {
    //when we receive a message I want t
    const messageData = JSON.parse(message)
    console.log(
      `Server ${APPID} received message in channel ${channel} msg: ${messageData.message}`
    )

    if (channel === redisSVIdentifier) {
      // Enviar el mensaje a una conexion particular
      if ("conexion" in messageData) {
        // El objeto messageData contiene un campo llamado "conexion"
        // Puedes realizar las acciones correspondientes aquí
        if (messageData.conexion === "close") {
          closeConexionsToUser(messageData.user)
        }
      } else {
        console.log(
          "Voy a enviar " +
            messageData.user +
            " " +
            messageData.recipient +
            " " +
            messageData.message
        )
        sendMessageToUser(
          messageData.user,
          messageData.recipient,
          messageData.message
        )
      }
    } else {
      //connections.forEach((c) => c.send(APPID + ":" + message))
      console.log("El mensaje no era para un usuario de este server")
    }

    // Función para enviar un mensaje a una conexión específica por userId
  } catch (ex) {
    console.log("ERR::" + ex)
  }
})

//subscriber.subscribe("livechat")

subscriber.subscribe(redisSVIdentifier)

//create a raw http server (this will help us create the TCP which will then pass to the websocket to do the job)
const httpserver = http.createServer()

//pass the httpserver object to the WebSocketServer library to do all the job, this class will override the req/res
const websocket = new WebSocketServer({
  httpServer: httpserver,
})

httpserver.listen(8080, "0.0.0.0", () =>
  console.log("My server is listening on port 8080")
)

function getUserIdFromURL(url) {
  const searchParams = new URLSearchParams(url.search)
  return searchParams.get("userId")
}

function handleWebSocketRequest(request) {
  return new Promise((resolve, reject) => {
    const userId = getUserIdFromURL(request.resourceURL)

    // Consulta Redis para verificar si el usuario ya está conectado
    redisCentralUsers.get(`user:${userId}:appid`, (err, userAPPID) => {
      console.log("hace el get si existe")
      if (err) {
        console.error("Error getting user APPID:", err)
        reject(err) // Rechaza la promesa en caso de error
      } else {
        if (userAPPID) {
          // El usuario ya está conectado en otro servidor
          console.log("va a publicar el evento", userAPPID)
          publisher.publish(
            userAPPID,
            JSON.stringify({
              conexion: "close",
              user: userId,
            })
          )

          // Consulta periódicamente si la otra instancia cerró la conexión
          const checkInterval = setInterval(() => {
            redisCentralUsers.get(
              `user:${userId}:appid`,
              (err, updatedUserAPPID) => {
                if (err) {
                  console.error("Error checking user APPID:", err)
                } else {
                  if (!updatedUserAPPID) {
                    // La otra instancia ha cerrado la conexión, el usuario puede conectarse
                    clearInterval(checkInterval) // Detiene la consulta periódica
                    const con = request.accept(null, request.origin)
                    con.userId = userId

                    // Resto del código...
                    resolve(con) // Resuelve la promesa con la conexión WebSocket
                  }
                }
              }
            )
          }, 1000) // Consulta cada segundo (ajusta el intervalo según tus necesidades)
        } else {
          // El usuario no está conectado en otro servidor, continúa con la conexión
          const con = request.accept(null, request.origin)
          con.userId = userId

          // Resto del código...
          resolve(con) // Resuelve la promesa con la conexión WebSocket
        }
      }
    })
  })
}

//when a legit websocket request comes listen to it and get the connection .. once you get a connection thats it!
websocket.on("request", (request) => {
  const userId = getUserIdFromURL(request.resourceURL) // Extrae userId de la URL

  handleWebSocketRequest(request).then((con) => {
    con.on("open", () => console.log("opened"))
    con.on("close", () => {
      console.log("CLOSED!!!")
      if (userId) {
        redisCentralUsers.del(`user:${userId}:appid`, (err, reply) => {
          if (err) {
            console.error("Error deleting user:", err)
          } else {
            console.log(`Deleted user:${userId}:appid`)
          }
        })
      }
      console.log("closed connection")
    })
    con.on("message", (message) => {
      //publish the message to redis
      console.log(`${APPID} Received message ${message.utf8Data}`)

      const messageData = JSON.parse(message.utf8Data) // Analiza la cadena JSON
      const user = messageData.user
      const recipient = messageData.recipient
      const text = messageData.text

      let userAPPID = null

      console.log("ANTES DE PUBLICAR" + user + " " + recipient + " " + text)
      // Obtener el APPID asociado al usuario, es ASYNC
      redisCentralUsers.get(`user:${recipient}:appid`, (err, userAPPID) => {
        if (err) {
          console.error("Error getting user APPID:", err)
        } else {
          if (!userAPPID) {
            console.log(
              `No se encontró ningún APPID para el usuario ${recipient}`
            )
          } else {
            console.log(`APPID para el usuario ${recipient}:`, userAPPID)

            // Ahora puedes usar la variable userAPPID según tus necesidades
            if (userAPPID === APPID) {
              sendMessageToUser(user, recipient, text)
            } else {
              if (userAPPID === null) {
                console.log("No se encontró un APPID para el usuario")
              } else {
                publisher.publish(
                  userAPPID,
                  JSON.stringify({
                    user: user,
                    recipient: recipient,
                    message: text,
                  })
                )
              }
            }
          }
        }
      })

      //publisher.publish("livechat", message.utf8Data)
    })

    setTimeout(
      () =>
        con.send(
          JSON.stringify({
            type: "conexion",
            message: `Connected successfully to server ${APPID}`,
          })
        ),
      5000
    )

    if (userId) {
      // Almacenar el APPID del servidor en Redis para este usuario
      redisCentralUsers.set(
        `user:${userId}:appid`,
        redisSVIdentifier,
        (err, reply) => {
          if (err) {
            console.error("Error setting user APPID:", err)
          } else {
            console.log(`Set user:${userId}:appid to ${redisSVIdentifier}`)
          }
        }
      )
    }
    connections.push(con)
  })
})

//client code
//let ws = new WebSocket("ws://localhost:8080");
//ws.onmessage = message => console.log(`Received: ${message.data}`);
//ws.send("Hello! I'm client")

/*
    //code clean up after closing connection
    subscriber.unsubscribe();
    subscriber.quit();
    publisher.quit();
    */
