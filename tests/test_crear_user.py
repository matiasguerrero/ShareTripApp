import requests

# URL base de la API
base_url = 'http://192.168.0.157:8000/api/'  # Actualiza con la URL base de tu API

# Datos del nuevo usuario
new_user_data = {
    "dni": 13443,
    "email": "assdsdsdd@gmail.com",
    "password": "asd",
    "name": "pepe",
    "last_name": "gonzalez",
    "date_of_birth": "1999-02-02"
}

# Realizar solicitud de creación de usuario
users_url = base_url + 'users/'
response = requests.post(users_url, json=new_user_data)

if response.status_code == 201:
    # Creación de usuario exitosa
    print("Usuario creado exitosamente")
    print("Datos del usuario:")
    print(response.json())
else:
    # Error en la solicitud de creación de usuario
    print("Error en la solicitud de creación de usuario")
    print("Mensaje de error:", response.json())
