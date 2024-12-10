import axios from "axios";
import { MY_BASE_URL } from "./config";

export default class PatientService {
  // Método para obtener pacientes filtrados por id_terapeuta
  static async getPatients(id_terapeuta) {
    try {
      const response = await axios.get(MY_BASE_URL + "paciente/", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          id_terapeuta, // Enviar el id_terapeuta como parámetro de consulta
        },
      });
      return response; // Retorna los datos de la respuesta en caso de éxito
    } catch (error) {
      if (error.response) {
        // Si la respuesta del servidor está disponible
        if (error.response.status === 404) {
          console.error("No hay pacientes");
          return { message: "No hay pacientes" }; // O maneja el error de otra manera
        } else {
          console.error(`Error: ${error.response.status}`);
        }
      } else {
        console.error("Error en la conexión:", error.message);
      }
      throw error; // Lanza el error para que lo maneje la función que llama
    }
  }

  // Método para añadir un nuevo paciente
  static async addPaciente(pacienteData) {
    try {
      const response = await axios.post(MY_BASE_URL + "paciente/add", pacienteData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response; // Retorna los datos de la respuesta en caso de éxito
    } catch (error) {
      if (error.response) {
        // Si la respuesta del servidor está disponible
        console.error(`Error al añadir paciente: ${error.response.data.message}`);
      } else {
        console.error("Error en la conexión:", error.message);
      }
      throw error; // Lanza el error para que lo maneje la función que llama
    }
  }
}
