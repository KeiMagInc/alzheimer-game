import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../../../Patients.css';

const Patients = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { therapist } = location.state || {};

  if (!therapist) {
    return <p>Por favor, inicia sesión para ver esta página.</p>;
  }

  const handleRegistrarPaciente = () => {
    navigate(`/register-patient`, { state: { therapist } });
  };

  const handleHistorial = (patient) => {
    navigate(`/patient-history`, { state: { patient } });
  };

  const handleIniciarSesion = (patient) => {
    navigate(`/start-session`, { state: { patient, therapist } }); // Pasamos ambos, paciente y terapeuta
  };

  const handleBackToLogin = () => {
    navigate('/login'); // Redirige al login
  };

  return (
    <div className="patients-container">
      {/* Botón de regresar */}
      <button className="btn-back" onClick={handleBackToLogin}>
        Regresar
      </button>

      <h1>Bienvenido {therapist.name} {therapist.lastName}</h1>
      <div className="therapist-details">
        <p><strong>ID Terapeuta:</strong> {therapist.id}</p>
        <p><strong>NUI:</strong> {therapist.NUI}</p>
        <p><strong>Especialidad:</strong> {therapist.specialty}</p>
      </div>

      <button 
        className="btn-registrar-paciente"
        onClick={handleRegistrarPaciente}
      >
        Registrar Paciente
      </button>

      <h2>Pacientes Asignados</h2>
      <table className="patient-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>NUI</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Edad</th>
            <th>Dirección</th>
            <th>Historial</th>
            <th>Iniciar Sesión</th>
          </tr>
        </thead>
        <tbody>
          {therapist.patients.map((patient, index) => (
            <tr key={index}>
              <td>{patient.id}</td>
              <td>{patient.NUI}</td>
              <td>{patient.nombre}</td>
              <td>{patient.apellido}</td>
              <td>{patient.edad}</td>
              <td>{patient.direccion}</td>
              <td>
                <button
                  onClick={() => handleHistorial(patient)}
                  className="btn-historial"
                >
                  Ver Historial
                </button>
              </td>
              <td>
                <button
                  onClick={() => handleIniciarSesion(patient)}
                  className="btn-iniciar-sesion"
                >
                  Iniciar Nueva Sesión
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Patients;
