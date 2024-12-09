import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../../GameScene.css'; // Asegúrate de tener el archivo CSS correcto

const GameScene = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const patient = location.state?.patient; // Verifica si el paciente existe en el estado

  // Lista de dibujos con sus imágenes
  const drawingImages = [
    { name: "Círculo", src: "/Assets/Dibujos/circulo.png" },
    { name: "Rosa", src: "/Assets/Dibujos/rosa.png" },
    { name: "Estrella", src: "/Assets/Dibujos/estrella.png" },
    { name: "Búho", src: "/Assets/Dibujos/buho.png" },
  ];

  return (
    <div className="session-container">
      <h2>Selecciona un dibujo para pintar</h2>

      {/* Mostrar las imágenes de los dibujos */}
      <div className="drawing-grid">
        {drawingImages.map((drawing, index) => (
          <div key={index} className="drawing-item">
            <h3>{drawing.name}</h3>
            <div className="drawing-canvas">
              <img
                src={drawing.src}
                alt={drawing.name}
                loading="lazy" // Mejora el rendimiento al cargar imágenes
              />
            </div>
            <button className="start-painting-btn">
              Iniciar Pintura
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameScene;