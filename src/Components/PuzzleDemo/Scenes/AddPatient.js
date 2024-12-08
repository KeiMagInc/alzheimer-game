import React, { useState } from 'react';

const AddPatient = () => {
  const [newPatient, setNewPatient] = useState({
    NUI: '',
    nombre: '',
    apellido: '',
    edad: '',
    direccion: '',
    id_terapeuta: '',
    estado: 'Activo'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPatient({ ...newPatient, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar el paciente, por ejemplo, en una base de datos o estado
    console.log('Paciente agregado:', newPatient);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Añadir Nuevo Paciente</h1>
      <form onSubmit={handleSubmit}>
        {/* Formulario para agregar paciente */}
        <input
          type="text"
          name="NUI"
          value={newPatient.NUI}
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

export default AddPatient;
