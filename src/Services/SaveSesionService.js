import axios from "axios";
import { MY_BASE_URL } from "./config.js";

export default class SaveSesionService {
  
  static async getSesiones() {
    try {
      const response = await axios.get(`${MY_BASE_URL}/sesion/`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener sesiones:', error.message);
      throw error;
    }
  }

  static async getSesion(id_intento) {
    try {
      const response = await axios.get(`${MY_BASE_URL}/sesion/${id_intento}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('Sesión no encontrada');
        return null;
      }
      console.error('Error al obtener sesión:', error.message);
      throw error;
    }
  }

  static async addSesion(sesion) {
    try {
        const response = await axios.post(MY_BASE_URL + 'sesion/add', sesion, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al añadir sesión:', error.message);
      throw error;
    }
  }

  static async updateSesion(id_intento, sesion) {
    try {
      const response = await axios.put(`${MY_BASE_URL}/sesion/update/${id_intento}`, sesion, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar sesión:', error.message);
      throw error;
    }
  }

  static async deleteSesion(id_intento) {
    try {
      const response = await axios.delete(`${MY_BASE_URL}/sesion/delete/${id_intento}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar sesión:', error.message);
      throw error;
    }
  }
}
