import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../../StartSession.css';  // Asegúrate de tener el archivo CSS

const StartSession = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { patient } = location.state || {}; // Asegúrate de que el paciente está en el estado

  const [selectedDrawing, setSelectedDrawing] = useState(null);

  // Vinculación de los dibujos con sus imágenes
  const drawingImages = {
    "Círculo": "/Assets/Dibujos/circulo.png",
    "Rosa": "/Assets/Dibujos/rosa.png",
    "Estrella": "/Assets/Dibujos/estrella.png",
    "Búho": "/Assets/Dibujos/buho.png"
  };

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
    const drawingRoutes = {
        "Círculo": "/circle-scene",
        "Rosa": "/rosa-scene",
        "Estrella": "/estrella-scene",
        "Búho": "/buho-scene"
    };

    if (selectedDrawing) {
        const route = drawingRoutes[selectedDrawing];
        if (route) {
          if (patient?.id) {
            console.log("🚀 Navegando a", route, "con ID de paciente:", patient.id);
        } else {
            console.warn("El ID del paciente no está definido.");
        }
          navigate(route, { state: { patientId: patient.id } }); // Pasar información del paciente si es necesario
        } else {
            console.error("Ruta no encontrada para el dibujo seleccionado.");
        }
    } else {
        alert("Por favor selecciona un dibujo antes de iniciar la pintura.");
    }
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
        </div>
      </div>

      {/* Vista previa del dibujo seleccionado */}
      {selectedDrawing && (
        <div className="drawing-preview">
          <h3>Dibujo Seleccionado: {selectedDrawing}</h3>
          <div className="drawing-canvas">
            <img 
              src={drawingImages[selectedDrawing]} 
              alt={selectedDrawing} 
              
            />
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
