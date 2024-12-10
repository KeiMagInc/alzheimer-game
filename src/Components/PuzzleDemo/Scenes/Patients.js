import React ,  { useState, useEffect }from "react";
import { useLocation, useNavigate } from "react-router-dom";
import '../../../Patients.css';  // Importa los estilos CSS
import PatientService from '../../../Services/PatientService';  // Importa el servicio para obtener los pacientes

// Componente principal para manejar la vista de pacientes
const Patients = () => {
  // Obtener información de la ubicación actual y el estado (therapist) de la navegación
  const location = useLocation();
  const navigate = useNavigate();
  const [patients, setPatients] = useState([]);  // Estado para almacenar la lista de pacientes

  // Extrae el objeto 'therapist' de la ubicación, si está presente
  const { therapist } = location.state || {};

  // useEffect se usa para obtener los pacientes cuando el componente se monta
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await PatientService.getPatients(therapist.id);  // Llama al servicio para obtener los pacientes
        console.log(response.data);  // Muestra los datos de la respuesta en la consola
        if (response && response.data) {
          setPatients(response.data);  // Si se obtienen datos, actualiza el estado con los pacientes
        } else {
          console.log('No se encontraron pacientes.');  // Si no hay pacientes, muestra un mensaje en consola
        }
      } catch (err) {
        console.log(err);  // En caso de error, lo muestra en la consola
      }
    };

    fetchPatients();  // Llama a la función para obtener los pacientes
    console.log('s'+patients);  // Muestra el estado de pacientes en la consola (esto podría no reflejar los cambios debido a la naturaleza asincrónica de useState)
  }, []);  // El array vacío indica que el efecto solo se ejecuta una vez, cuando el componente se monta

  // Si no se encuentra el 'therapist', muestra un mensaje pidiendo iniciar sesión
  if (!therapist) {
    return <p>Por favor, inicia sesión para ver esta página.</p>;
  }

  // Función que maneja la navegación hacia la página para registrar un nuevo paciente
  const handleRegistrarPaciente = () => {
    navigate(`/register-patient`, { state: { therapist } });  // Navega a la ruta de registro de paciente, pasando el terapeuta
  };

  // Función que maneja la navegación hacia la página de historial del paciente
  const handleHistorial = (patient) => {
    navigate(`/patient-history`, { state: { patient } });  // Navega a la ruta de historial, pasando el paciente
  };

  // Función que maneja la navegación hacia la página para iniciar sesión con un paciente
  const handleIniciarSesion = (patient) => {
    navigate(`/start-session`, { state: { patient, therapist } });  // Navega a la ruta para iniciar sesión, pasando tanto el paciente como el terapeuta
  };

  // Función que maneja la navegación hacia la página de login
  const handleBackToLogin = () => {
    navigate('/login');  // Navega hacia la página de login
  };

  return (
    <div className="patients-container">
      {/* Botón para regresar al login */}
      <button className="btn-back" onClick={handleBackToLogin}>
        Regresar
      </button>

      {/* Muestra un mensaje de bienvenida con el nombre y apellido del terapeuta */}
      <h1>Bienvenido {therapist.nombre} {therapist.apellido}</h1>
      <div className="therapist-details">
        <p><strong>ID Terapeuta:</strong> {therapist.id}</p>  {/* Muestra el ID del terapeuta */}
        <p><strong>NUI:</strong> {therapist.nui}</p>  {/* Muestra el NUI del terapeuta */}
        <p><strong>Especialidad:</strong> {therapist.especialidad}</p>  {/* Muestra la especialidad del terapeuta */}
      </div>

      {/* Botón para registrar un nuevo paciente */}
      <button 
        className="btn-registrar-paciente"
        onClick={handleRegistrarPaciente}
      >
        Registrar Paciente
      </button>

      <h2>Pacientes Asignados</h2>
      {/* Tabla que muestra la lista de pacientes asignados al terapeuta */}
      <table className="patient-table">
        <thead>
          <tr>
            {/* Encabezados de la tabla */}
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
          {/* Mapea los pacientes y muestra una fila por cada paciente */}
          {patients.map((patient, index) => (
            <tr key={index}>
              {/* Muestra los datos de cada paciente */}
              <td>{patient.id}</td>
              <td>{patient.nui}</td>
              <td>{patient.nombre}</td>
              <td>{patient.apellido}</td>
              <td>{patient.edad}</td>
              <td>{patient.direccion}</td>
              <td>
                {/* Botón para ver el historial del paciente */}
                <button
                  onClick={() => handleHistorial(patient)}
                  className="btn-historial"
                >
                  Ver Historial
                </button>
              </td>
              <td>
                {/* Botón para iniciar una nueva sesión con el paciente */}
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

export default Patients;  // Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
