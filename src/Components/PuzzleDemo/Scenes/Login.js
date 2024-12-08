import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir a otra página
import '../../../Login.css';  // Importación ajustada para el archivo CSS
import Authservice from '../../../Services/Authservice'

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Estado para mensaje de error
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault()
    let auth = {
      nui:username
    }
    await Authservice.postUser(auth).then((json)=> {
      if (json.data){
          console.log(json.data)
          if (username === json.data.nui && password === json.data.contrasena) {
            // Redirigir a la página de pacientes y pasar los datos del terapeuta
            navigate("/patients", {
              state: { therapist: json.data }
            });
          } else {
            // Si las credenciales son incorrectas, mostramos el mensaje de error
            setErrorMessage("Usuario o contraseña incorrectos. Intenta nuevamente.");
          }
      }
    })
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
        <button 
          type="submit" 
          style={{
            backgroundImage: 'url("Assets/Button/loginBTN.png")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            width: '155px', // Ajusta el tamaño del botón
            height: '70px', // Ajusta el tamaño del botón
            border: 'none', // Elimina el borde
            cursor: 'pointer', // Cambia el cursor al pasar sobre el botón
            color: 'transparent ', // Oculta el texto si no deseas que se vea
          }}
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
