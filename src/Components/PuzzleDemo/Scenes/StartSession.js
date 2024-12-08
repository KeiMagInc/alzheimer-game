import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../../StartSession.css';  // Asegúrate de tener el archivo CSS

const StartSession = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { patient } = location.state || {}; // Asegúrate de que el paciente está en el estado

  const [selectedDrawing, setSelectedDrawing] = useState(null);

  useEffect(() => {
    // Si no hay paciente, redirigir al listado de pacientes
    if (!patient) {
      navigate("/patients");
    }
  }, [patient, navigate]);

  const handleDrawingSelection = (drawing) => {
    setSelectedDrawing(drawing);
  };

  const handleStartPainting = () => {
    // Aquí iría la lógica para comenzar a pintar con el dibujo seleccionado.
    console.log(`Iniciando pintura con el dibujo: ${selectedDrawing}`);
  };

  const handleBackToPatient = () => {
    navigate(-1); // Redirige al login
  };

  return (
    <div className="session-container">
      {/* Botón de regresar */}
      <button className="btn-back1" onClick={handleBackToPatient}>
        Regresar
      </button>
      <h1>Comienza la Sesión</h1>
      <h2>Selecciona un dibujo para pintar</h2>

      {/* Selección de dibujos */}
      <div className="drawing-selection">
        <div className="drawing-options">
          <button onClick={() => handleDrawingSelection("Círculo")}>Dibujo 1: Círculo</button>
          <button onClick={() => handleDrawingSelection("Rosa")}>Dibujo 2: Rosa</button>
          <button onClick={() => handleDrawingSelection("Estrella")}>Dibujo 3: Estrella</button>
          <button onClick={() => handleDrawingSelection("Búho")}>Dibujo 4: Búho</button>
          <button onClick={() => handleDrawingSelection("Flor")}>Dibujo 5: Flor</button>
        </div>
      </div>

      {/* Vista previa del dibujo seleccionado */}
      {selectedDrawing && (
        <div className="drawing-preview">
          <h3>Dibujo Seleccionado: {selectedDrawing}</h3>
          <div className="drawing-canvas">
            {/* Aquí se debe renderizar el dibujo seleccionado en el canvas */}
            <p>{selectedDrawing} estará disponible para pintar aquí.</p>
          </div>
          <button className="start-painting-btn" onClick={handleStartPainting}>
            Iniciar Pintura
          </button>
        </div>
      )}
    </div>
  );
};

export default StartSession;
