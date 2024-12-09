import React, { useState } from "react";  // Importa React y el hook useState
import { useNavigate, useLocation } from "react-router-dom";  // Importa useNavigate y useLocation para la navegación y obtener información de la ruta
import '../../../RegisterPatient.css';  // Importa el archivo CSS para el estilo del componente

// Componente RegisterPatient para registrar un nuevo paciente
const RegisterPatient = () => {
  // Inicializa la función de navegación
  const navigate = useNavigate();
  
  // Obtiene la ubicación actual y la información del terapeuta desde el estado de la ruta
  const location = useLocation();
  const { therapist } = location.state || {};  // Obtiene el terapeuta desde location.state, si existe

  // Estado para los datos del formulario
  const [formData, setFormData] = useState({
    NUI: "",        // Número Único de Identificación del paciente
    nombre: "",     // Nombre del paciente
    apellido: "",   // Apellido del paciente
    edad: "",       // Edad del paciente
    direccion: ""   // Dirección del paciente
  });

  // Estado para el mensaje de error
  const [errorMessage, setErrorMessage] = useState("");

  // Función que maneja los cambios en los campos del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;  // Desestructuración de 'name' y 'value' del campo
    setFormData({ ...formData, [name]: value });  // Actualiza el estado con los nuevos valores del formulario
  };

  // Función que maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();  // Previene el comportamiento por defecto (recarga de página)

    // Validación de los campos del formulario
    if (
      !formData.NUI ||
      !formData.nombre ||
      !formData.apellido ||
      !formData.edad ||
      !formData.direccion
    ) {
      setErrorMessage("Todos los campos son obligatorios.");  // Muestra un mensaje de error si hay campos vacíos
      return;
    }

    if (isNaN(formData.edad) || formData.edad <= 0) {
      setErrorMessage("La edad debe ser un número mayor que cero.");  // Muestra un mensaje de error si la edad no es válida
      return;
    }

    // Simula la creación de un nuevo paciente y lo agrega a la lista de pacientes del terapeuta
    const newPatient = {
      id: therapist.patients.length + 1,  // El ID del paciente es uno más que la longitud de la lista de pacientes
      ...formData  // Copia los datos del formulario en el nuevo objeto de paciente
    };

    therapist.patients.push(newPatient);  // Agrega el nuevo paciente a la lista del terapeuta

    // Navega hacia la página de pacientes, pasando el terapeuta actualizado como estado
    navigate("/patients", { state: { therapist } });
  };

  return (
    <div className="register-patient-container">
      <h1>Registrar Nuevo Paciente</h1>
      {/* Muestra un mensaje de error si existe */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      
      {/* Formulario para registrar un nuevo paciente */}
      <form onSubmit={handleSubmit} className="register-patient-form">
        <label>
          NUI:
          {/* Campo para ingresar el NUI del paciente */}
          <input
            type="text"
            name="NUI"
            value={formData.NUI}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Nombre:
          {/* Campo para ingresar el nombre del paciente */}
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Apellido:
          {/* Campo para ingresar el apellido del paciente */}
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Edad:
          {/* Campo para ingresar la edad del paciente */}
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Dirección:
          {/* Campo para ingresar la dirección del paciente */}
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
          />
        </label>
        
        {/* Botón para enviar el formulario */}
        <button type="submit" className="btn-submit">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterPatient;  // Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
