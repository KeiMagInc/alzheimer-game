import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SaveSesionService from "../../../Services/SesionService"; // Importa el servicio
import "../../../PatientHistory.css";

const PatientHistory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { patient } = location.state || {}; // Obtiene datos del paciente del estado de navegación

  const [sessions, setSessions] = useState([]); // Estado para almacenar las sesiones
  const [loading, setLoading] = useState(true); // Estado para manejar el cargado
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    console.log(patient)
    if (patient && patient.id) {
      fetchSessions(patient.id); // Llama a la API para obtener las sesiones
    }
  }, [patient]);

  // Función para obtener las sesiones de un paciente usando el nuevo API
  const fetchSessions = async (id_paciente) => {
    setLoading(true);
    console.log('asasdas')
    try {
      const patientSessions = await SaveSesionService.getSesionesByPaciente(id_paciente); // Llama al nuevo método
      setSessions(patientSessions); // Actualiza las sesiones en el estado
      setLoading(false);
    } catch (err) {
      console.error("Error al obtener sesiones:", err.message);
      setError("Error al cargar el historial del paciente.");
      setLoading(false);
    }
  };

  // Función para eliminar una sesión
  const handleDeleteSession = async (id_intento) => {
    try {
      await SaveSesionService.deleteSesion(id_intento); // Llama al API para eliminar la sesión
      setSessions((prevSessions) => prevSessions.filter((s) => s.id_intento !== id_intento)); // Actualiza el estado local
    } catch (err) {
      console.error("Error al eliminar la sesión:", err.message);
      setError("Error al eliminar la sesión.");
    }
  };

  // Navegar al componente anterior
  const handleBackToPatient = () => {
    navigate(-1); // Navega hacia atrás
  };

  if (loading) {
    return (
      <div className="patient-history-container">
        <h1>Cargando historial...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="patient-history-container">
        <h1>{error}</h1>
      </div>
    );
  }

  if (!sessions && sessions.length === 0) {
    return (
      <div className="patient-history-container">
        <h1>No hay historial disponible para este paciente.</h1>
      </div>
    );
  }

  return (
    <div className="patient-history-container">
      <button className="btn-back1" onClick={handleBackToPatient}>
        Regresar
      </button>
      <h1>Historial del Paciente: {patient.nombre} {patient.apellido}</h1>
      <table className="patient-history-table">
        <thead>
          <tr>
            <th>Intento</th>
            <th>Fecha</th>
            <th>Duración</th>
            <th>Puntaje</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session.id_intento}>
              <td>{session.id_intento}</td>
              <td>{session.fecha}</td>
              <td>{session.duracion}</td>
              <td>{session.puntaje}</td>
              <td>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteSession(session.id_intento)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PatientHistory;
