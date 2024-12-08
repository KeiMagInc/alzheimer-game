import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir a otra página
import '../../../Login.css';  // Importación ajustada para el archivo CSS

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensaje de error
  const navigate = useNavigate();

  // Datos de ejemplo para validación (deberían venir de un servidor real)
  const validCredentials = {
    username: "therapist1", // Nombre de usuario
    password: "password123", // Contraseña
    id: "T001", // ID del terapeuta
    NUI: "12345", // NUI
    name: "Carlos", // Nombre
    lastName: "Martinez", // Apellido
    specialty: "Terapia Cognitiva", // Especialidad
    patients: [ // Lista de pacientes del terapeuta
      { NUI: "0102089012", nombre: "Juan", apellido: "Perez", edad: 65, direccion: "Calle Falsa 123" },
      { NUI: "0102090123", nombre: "Maria", apellido: "Gomez", edad: 72, direccion: "Avenida Siempre Viva 742" }
    ]
  };

  const handleLogin = (e) => {
    e.preventDefault();

    // Verificamos las credenciales
    if (username === validCredentials.username && password === validCredentials.password) {
      // Redirigir a la página de pacientes y pasar los datos del terapeuta
      navigate("/patients", {
        state: { therapist: validCredentials }
      });
    } else {
      // Si las credenciales son incorrectas, mostramos el mensaje de error
      setErrorMessage("Usuario o contraseña incorrectos. Intenta nuevamente.");
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Usuario:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
