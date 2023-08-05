import axios from 'axios';

const baseUrl = 'http://192.168.0.157:8000/api/'; // Actualiza con la URL base de tu API
// Función para iniciar sesión
export const login = async (email, password) => {
  try {
    const loginUrl = baseUrl + 'login/';
    const response = await axios.post(loginUrl, { email, password });
    const data = response.data;
    console.log(data);
    if (response.status === 200) {
      // Inicio de sesión exitoso
      const token = data.token;
      const userData=data.user;
      console.log(userData);
      return { success: true, token:token, userData:userData};
    } else {
      // Error en la respuesta del servidor
      return { success: false, error: 'Error de inicio de sesión' };
    }
  } catch (error) {
    // Error de conexión o de la solicitud
    return { success: false, error: 'Error en la solicitud de inicio de sesión' };
  }
};


export const logout = async (token) => {
  try {
    const logoutUrl = baseUrl + 'logout/';
    const headers = { Authorization: 'Token ' + token };
    const response = await axios.post(logoutUrl, null, { headers });

    if (response.status === 200) {
      // Cierre de sesión exitoso
      return { success: true };
    } else {
      // Error en la respuesta del servidor
      return { success: false, error: 'Error de cierre de sesión' };
    }
  } catch (error) {
    // Error de conexión o de la solicitud
    return { success: false, error: 'Error en la solicitud de cierre de sesión' };
  }
};

export const register = async (dni, email, password, name, lastName, date_of_birth) => {
  try {
    console.log("va a entrar");
    const usersUrl = baseUrl + 'users/';
    console.log({
      dni,
      email,
      password,
      name,
      lastName,
      date_of_birth,
    });
    const last_name=lastName;
    const response = await axios.post(usersUrl, {
      dni,
      email,
      password,
      name,
      last_name,
      date_of_birth,
    });
    console.log(response);
    console.log(response.status);
    if (response.status === 201) {
      // Creación de usuario exitosa
      return { success: true, data: response.data };
    } else {
      // Error en la respuesta del servidor
      return { success: false, error: 'Error en la solicitud de creación de usuario', status: response.status };
    }
  } catch (error) {
    // Error de conexión o de la solicitud
    return { success: false, error: 'Error en la solicitud de creación de usuario' };
  }
};
// Otras funciones para llamar a otros puntos finales de tu backend

// ...

