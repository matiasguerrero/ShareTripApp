import requests

# URL base de la API
base_url = 'http://192.168.0.3:80/api/'  # Actualiza con la URL base de tu API

# Datos de inicio de sesión
login_data = {
    'email': 'asd@gmail.com',
    'password': 'asd'
}

# Realizar solicitud de inicio de sesión
login_url = base_url + 'login/'
response = requests.post(login_url, data=login_data)
data = response.json()

if response.status_code == 200:
    # Inicio de sesión exitoso
    token = data.get('token')
    print("Inicio de sesión exitoso")
    print("Token:", token)

    # Realizar cualquier otra lógica o solicitudes autenticadas aquí

    # Realizar solicitud de cierre de sesión
    logout_url = base_url + 'logout/'
    headers = {'Authorization': 'Token ' + token}
    response = requests.post(logout_url, headers=headers)

    if response.status_code == 200:
        # Cierre de sesión exitoso
        print("Cierre de sesión exitoso")
    else:
        # Error en la solicitud de cierre de sesión
        print("Error en la solicitud de cierre de sesión")
else:
    # Error en la solicitud de inicio de sesión
    print("Error en la solicitud de inicio de sesión")
    print("Mensaje:", data.get('message'))
