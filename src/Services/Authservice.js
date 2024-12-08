import axios from "axios"
import {MY_BASE_URL} from "../Services/config.js"
export default class Authservice{
    static async postUser(user){
      try {
        const response = await axios.post(MY_BASE_URL + 'auth/', user, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response; // Retorna los datos de la respuesta en caso de éxito
      } catch (error) {
        if (error.response) {
          // Si la respuesta del servidor está disponible
          if (error.response.status === 404) {
            console.error('Terapeuta no encontrado');
            return error.response; // O maneja el error de otra manera
          } else {
            console.error(`Error: ${error.response.status}`);
          }
        } else {
          console.error('Error en la conexión:', error.message);
        }
        throw error; // Lanza el error para que lo maneje la función que llama
      }
    }
}