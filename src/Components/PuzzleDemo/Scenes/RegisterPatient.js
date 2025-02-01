import React, { useState } from "react";  
import { useNavigate, useLocation } from "react-router-dom";  
import { FaArrowLeft } from "react-icons/fa";  
import '../../../RegisterPatient.css';  
import PatientService from '../../../Services/PatientService';  

const RegisterPatient = () => {  
  const navigate = useNavigate();  
  const location = useLocation();  
  const { therapist } = location.state || {};  

  const [formData, setFormData] = useState({  
    nui: "",  
    nombre: "",  
    apellido: "",  
    edad: "",  
    direccion: ""  
  });  

  const [errors, setErrors] = useState({});  
  const [successMessage, setSuccessMessage] = useState("");  

  const handleInputChange = (e) => {  
    const { name, value } = e.target;  

    if (name === "nui") {  
      // Permite solo 10 dígitos numéricos y corta el exceso  
      if (/^\d*$/.test(value) && value.length <= 10) {  
        setFormData({ ...formData, [name]: value });  
      }  
    } else {  
      setFormData({ ...formData, [name]: value });  
    }  
  };  

  const handleBackToPatients = () => {  
    navigate("/patients", { state: { therapist } });  
  };  

  const validateForm = () => {  
    let newErrors = {};  

    if (!formData.nui.trim()) {  
      newErrors.nui = "El NUI es obligatorio.";  
    } else if (formData.nui.length !== 10) {  
      newErrors.nui = "El NUI debe contener exactamente 10 dígitos.";  
    }  

    if (!formData.nombre.trim()) {  
      newErrors.nombre = "El nombre es obligatorio.";  
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(formData.nombre)) {  
      newErrors.nombre = "El nombre solo debe contener letras.";  
    }  

    if (!formData.apellido.trim()) {  
      newErrors.apellido = "El apellido es obligatorio.";  
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(formData.apellido)) {  
      newErrors.apellido = "El apellido solo debe contener letras.";  
    }  

    if (!formData.edad.trim() || isNaN(formData.edad) || formData.edad < 1 || formData.edad > 120) {  
      newErrors.edad = "Ingrese un número entre 1 y 120.";  
    }  

    if (!formData.direccion.trim()) {  
      newErrors.direccion = "La dirección es obligatoria.";  
    } else if (formData.direccion.length < 5) {  
      newErrors.direccion = "Debe tener al menos 5 caracteres.";  
    }  

    setErrors(newErrors);  
    return Object.keys(newErrors).length === 0;  
  };  

  const handleSubmit = async (e) => {  
    e.preventDefault();  

    if (!validateForm()) {  
      return;  
    }  

    const newPatient = {  
      id_terapeuta: therapist.id,  
      ...formData  
    };  

    try {  
      newPatient.edad = parseInt(newPatient.edad, 10) || 0;  
      console.log(newPatient);  

      const response = await PatientService.addPaciente(newPatient);  
      if (response.status === 200) {  
        setErrors({});  
        setSuccessMessage("Paciente registrado satisfactoriamente.");  

        // Limpiar formulario  
        setFormData({  
          nui: "",  
          nombre: "",  
          apellido: "",  
          edad: "",  
          direccion: ""  
        });  

        // Esperar 2 segundos antes de redirigir  
        setTimeout(() => {  
          navigate("/patients", { state: { therapist } });  
        }, 2000);  
      }  
    } catch (error) {  
      setErrors({ general: error.response?.data?.message || "Error al agregar el paciente." });  
    }  
  };  

  return (  
    <div className="register-patient-container">  
      {/* Botón de regresar en la parte superior izquierda */}  
      <button className="btn-back" onClick={handleBackToPatients}>  
        <FaArrowLeft className="icono-regresar" /> Regresar  
      </button>  

      <h1>Registrar Nuevo Paciente</h1>  

      {successMessage && <p className="success-message">{successMessage}</p>}  
      {errors.general && <p className="error-message">{errors.general}</p>}  

      <form onSubmit={handleSubmit} className="register-patient-form">  
        <label>  
          NUI:  
          <input  
            type="text"  
            name="nui"  
            value={formData.nui}  
            onChange={handleInputChange}  
            placeholder="Ingrese el NUI (10 dígitos)"  
            maxLength="10"  
          />  
          {errors.nui && <span className="tooltip">{errors.nui}</span>}  
        </label>  

        <label>  
          Nombre:  
          <input  
            type="text"  
            name="nombre"  
            value={formData.nombre}  
            onChange={handleInputChange}  
            placeholder="Ingrese el nombre"  
          />  
          {errors.nombre && <span className="tooltip">{errors.nombre}</span>}  
        </label>  

        <label>  
          Apellido:  
          <input  
            type="text"  
            name="apellido"  
            value={formData.apellido}  
            onChange={handleInputChange}  
            placeholder="Ingrese el apellido"  
          />  
          {errors.apellido && <span className="tooltip">{errors.apellido}</span>}  
        </label>  

        <label>  
          Edad:  
          <input  
            type="number"  
            name="edad"  
            value={formData.edad}  
            onChange={handleInputChange}  
            placeholder="Ingrese la edad"  
          />  
          {errors.edad && <span className="tooltip">{errors.edad}</span>}  
        </label>  

        <label>  
          Dirección:  
          <input  
            type="text"  
            name="direccion"  
            value={formData.direccion}  
            onChange={handleInputChange}  
            placeholder="Ingrese la dirección"  
          />  
          {errors.direccion && <span className="tooltip">{errors.direccion}</span>}  
        </label>  

        {/* Botón de registrar paciente en color verde */}  
        <button type="submit" className="btn-submit">Registrar</button>  
      </form>  
    </div>  
  );  
};  

export default RegisterPatient;
