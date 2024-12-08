import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import '../../../RegisterPatient.css';

const RegisterPatient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { therapist } = location.state || {};

  const [formData, setFormData] = useState({
    NUI: "",
    nombre: "",
    apellido: "",
    edad: "",
    direccion: ""
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos
    if (
      !formData.NUI ||
      !formData.nombre ||
      !formData.apellido ||
      !formData.edad ||
      !formData.direccion
    ) {
      setErrorMessage("Todos los campos son obligatorios.");
      return;
    }

    if (isNaN(formData.edad) || formData.edad <= 0) {
      setErrorMessage("La edad debe ser un número mayor que cero.");
      return;
    }

    // Simula guardar los datos en la lista del terapeuta
    const newPatient = {
      id: therapist.patients.length + 1,
      ...formData
    };

    therapist.patients.push(newPatient);
    navigate("/patients", { state: { therapist } });
  };

  return (
    <div className="register-patient-container">
      <h1>Registrar Nuevo Paciente</h1>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="register-patient-form">
        <label>
          NUI:
          <input
            type="text"
            name="NUI"
            value={formData.NUI}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Nombre:
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Apellido:
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Edad:
          <input
            type="number"
            name="edad"
            value={formData.edad}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Dirección:
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit" className="btn-submit">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default RegisterPatient;
