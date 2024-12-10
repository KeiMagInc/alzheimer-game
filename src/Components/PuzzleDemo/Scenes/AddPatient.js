import React, { useState } from 'react';
import PatientService from '../../../Services/PatientService'; // Asegúrate de ajustar la ruta según tu estructura de proyecto


// Componente AddPatient que permite agregar un nuevo paciente
const AddPatient = () => {
  // Estado inicial del paciente con campos vacíos, excepto 'estado' que es 'Activo' por defecto
  const [newPatient, setNewPatient] = useState({
    id_terapeuta: '', // ID del terapeuta
    nui: '',          // Número único de identificación
    nombre: '',       // Nombre
    apellido: '',     // Apellido
    edad: '',         // Edad
    direccion: ''     // Dirección
});

// Función para manejar los cambios en los campos del formulario
const handleChange = (e) => {
  const { name, value } = e.target;
  setNewPatient({
      ...newPatient,
      [name]: value,
  });
};

const validateForm = () => {
  return (
      newPatient.nui?.trim().length > 0 &&
      newPatient.nombre?.trim().length > 0 &&
      newPatient.apellido?.trim().length > 0 &&
      !isNaN(newPatient.edad) &&
      newPatient.direccion?.trim().length > 0 &&
      newPatient.id_terapeuta?.trim().length > 0
  );
};


// Función para manejar el envío del formulario
const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    setErrorMessage('Por favor, completa todos los campos correctamente.');
    return;
}


  try {
      console.log(newPatient)
      const response = await PatientService.addPaciente(newPatient); // Aquí no se incluye `estado`
      if (response.status === 200) {
          setSuccessMessage('Paciente agregado correctamente.');
          setErrorMessage('');
          setNewPatient({
              id_terapeuta: '',
              nui: '',
              nombre: '',
              apellido: '',
              edad: '',
              direccion: ''
          });
      }
  } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Error al agregar el paciente.');
      setSuccessMessage('');
  }
};


  return (
    <div style={{ padding: '2rem' }}>
      <h1>Añadir Nuevo Paciente</h1>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nui"
        value={newPatient.nui}
        onChange={handleChange}
        placeholder="NUI"
        required
    />
    <input
        type="text"
        name="nombre"
        value={newPatient.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
    />
    <input
        type="text"
        name="apellido"
        value={newPatient.apellido}
        onChange={handleChange}
        placeholder="Apellido"
        required
    />
    <input
        type="number"
        name="edad"
        value={newPatient.edad}
        onChange={handleChange}
        placeholder="Edad"
        required
    />
    <input
        type="text"
        name="direccion"
        value={newPatient.direccion}
        onChange={handleChange}
        placeholder="Dirección"
        required
    />
    <input
        type="text"
        name="id_terapeuta"
        value={newPatient.id_terapeuta}
        onChange={handleChange}
        placeholder="ID Terapeuta"
        required
    />
    <button type="submit">Agregar Paciente</button>
</form>

    </div>
  );
};

export default AddPatient;  // Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
