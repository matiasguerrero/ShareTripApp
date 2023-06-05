import axios from 'axios';

const baseUrl = 'http://192.168.0.4:80/api/'; // Actualiza con la URL base de tu API

// Función para iniciar sesión
export const login = async (email, password) => {
  try {
    const loginUrl = baseUrl + 'login/';
    const response = await axios.post(loginUrl, { email, password });
    const data = response.data;
    if (response.status === 200) {
      // Inicio de sesión exitoso
      const token = data.token;
      return { success: true, token };
    } else {
      // Error en la respuesta del servidor
      return { success: false, error: 'Error de inicio de sesión' };
    }
  } catch (error) {
    // Error de conexión o de la solicitud
    return { success: false, error: 'Error en la solicitud de inicio de sesión' };
  }
};

// Otras funciones para llamar a otros puntos finales de tu backend

// ...

