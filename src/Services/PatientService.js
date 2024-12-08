import axios from "axios"
import {MY_BASE_URL} from "./config"
export default class PatientService{
    static async getPatients(){
      try {
        const response = await axios.get(MY_BASE_URL + 'paciente/', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        return response; // Retorna los datos de la respuesta en caso de éxito
      } catch (error) {
        if (error.response) {
          // Si la respuesta del servidor está disponible
          if (error.response.status === 404) {
            console.error('No hay pacientes');
            return { message: 'No hay pacientes' }; // O maneja el error de otra manera
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