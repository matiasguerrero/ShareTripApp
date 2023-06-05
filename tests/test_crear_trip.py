import requests
import datetime
# URL base de la API
base_url = 'http://192.168.0.4:80/api/'  # Actualiza con la URL base de tu API

# Datos de inicio de sesión
login_data = {
    'email': 'admin@gmail.com',
    'password': 'admin'
}

# Realizar solicitud de inicio de sesión
login_url = base_url + 'login/'
response = requests.post(login_url, data=login_data)
data = response.json()

if response.status_code == 200:
    # Inicio de sesión exitoso
    token = data.get('token')
    user=data.get('user')
    print("Inicio de sesión exitoso")
    print("Token:", token)
    print("User:", user)
    
    #Headers 
    headers = {'Authorization': 'Token ' + token}
    # Realizar cualquier otra lógica o solicitudes autenticadas aquí
    trip_url=base_url + 'trips/'

    now=datetime.datetime.now(datetime.timezone.utc)
    # Crea un diccionario con la fecha y hora en formato JSON
    
    trip_data = {
            "start_datetime":now.isoformat(),
            "end_datetime":now.isoformat(),
            "state":"estado",
            "user_driver":user["id"],
            "fee_passenger":3434.3,
            "transport":"AB43123",
            "total_passengers":3
        }

    response = requests.post(trip_url,headers=headers,data=trip_data)
    print(response.json())
    # Realizar solicitud de cierre de sesión
    logout_url = base_url + 'logout/'
    response = requests.post(logout_url, headers=headers, data=trip_data)


else:
    # Error en la solicitud de inicio de sesión
    print("Error en la solicitud de inicio de sesión")
    print("Mensaje:", data.get('message'))