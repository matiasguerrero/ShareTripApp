import requests

# URL base de la API
base_url = 'http://192.168.0.3:80/api/'  # Actualiza con la URL base de tu API

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
    transport_url=base_url + 'transports/'
    transport_data = {
            'user': user["id"],
            'patent': 'AB43123',
            'model': 'Some Model'
        }
    response = requests.post(transport_url,headers=headers,data=transport_data)
    print(response.json())
    # Realizar solicitud de cierre de sesión
    logout_url = base_url + 'logout/'
    response = requests.post(logout_url, headers=headers, data=transport_data)


else:
    # Error en la solicitud de inicio de sesión
    print("Error en la solicitud de inicio de sesión")
    print("Mensaje:", data.get('message'))