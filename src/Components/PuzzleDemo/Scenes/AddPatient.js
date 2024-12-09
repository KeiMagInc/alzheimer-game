import React, { useState } from 'react';

// Componente AddPatient que permite agregar un nuevo paciente
const AddPatient = () => {
  // Estado inicial del paciente con campos vacíos, excepto 'estado' que es 'Activo' por defecto
  const [newPatient, setNewPatient] = useState({
    NUI: '',            // Número Único de Identificación del paciente
    nombre: '',         // Nombre del paciente
    apellido: '',       // Apellido del paciente
    edad: '',           // Edad del paciente
    direccion: '',      // Dirección del paciente
    id_terapeuta: '',   // ID del terapeuta asignado al paciente
    estado: 'Activo'    // Estado del paciente (Activo o Inactivo), por defecto es 'Activo'
  });

  // Función que maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;  // Desestructuración de name y value del campo
    // Actualiza el estado con los nuevos valores del formulario
    setNewPatient({ ...newPatient, [name]: value });
  };

  // Función que maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();  // Previene el comportamiento por defecto del formulario (recarga de página)
    // Aquí iría la lógica para guardar el paciente, por ejemplo, en una base de datos
    console.log('Paciente agregado:', newPatient);  // Muestra el objeto newPatient en la consola
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Añadir Nuevo Paciente</h1>
      <form onSubmit={handleSubmit}>
        {/* Formulario con los campos para agregar un nuevo paciente */}
        <input
          type="text"
          name="NUI"
          value={newPatient.NUI}
          onChange={handleChange}
          placeholder="NUI"
          required  // El campo es obligatorio
        />
        <input
          type="text"
          name="nombre"
          value={newPatient.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          required  // El campo es obligatorio
        />
        <input
          type="text"
          name="apellido"
          value={newPatient.apellido}
          onChange={handleChange}
          placeholder="Apellido"
          required  // El campo es obligatorio
        />
        <input
          type="number"
          name="edad"
          value={newPatient.edad}
          onChange={handleChange}
          placeholder="Edad"
          required  // El campo es obligatorio
        />
        <input
          type="text"
          name="direccion"
          value={newPatient.direccion}
          onChange={handleChange}
          placeholder="Dirección"
          required  // El campo es obligatorio
        />
        <input
          type="text"
          name="id_terapeuta"
          value={newPatient.id_terapeuta}
          onChange={handleChange}
          placeholder="ID Terapeuta"
          required  // El campo es obligatorio
        />
        {/* Selección del estado del paciente (Activo o Inactivo) */}
        <select
          name="estado"
          value={newPatient.estado}
          onChange={handleChange}
        >
          <option value="Activo">Activo</option>
          <option value="Inactivo">Inactivo</option>
        </select>
        <button type="submit">Agregar Paciente</button>
      </form>
    </div>
  );
};

export default AddPatient;  // Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
