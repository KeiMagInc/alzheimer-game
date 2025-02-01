import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/PuzzleDemo/Scenes/Login"; // Asegúrate de que el path del componente de Login sea correcto
import PuzzleDemo from "./Components/PuzzleDemo/PuzzleDemo";
import Patients from "./Components/PuzzleDemo/Scenes/Patients"; // Importa la lista de pacientes
import PatientHistory from "./Components/PuzzleDemo/Scenes/PatientHistory"; // Importa el historial del paciente
import RegisterPatient from "./Components/PuzzleDemo/Scenes/RegisterPatient"; // Importa el registro de pacientes
import StartSession from "./Components/PuzzleDemo/Scenes/StartSession"; // Importa la sesión de juego

import PuzzleScene from "./Components/PuzzleDemo/Games/PuzzleSceneComponent";
import PuzzleSceneEstrella from "./Components/PuzzleDemo/Games/PuzzleSceneEstrellaComponent";
import PuzzleSceneRosa from "./Components/PuzzleDemo/Games/PuzzleSceneRosaComponent";
import PuzzleSceneBuho from "./Components/PuzzleDemo/Games/PuzzleSceneBuhoComponent";

const AppRoutes = (props) => {
    return (
        <Router>
            <Routes>
                {/* Ruta para la página de login */}
                <Route path="/login" element={<Login />} /> {/* Página de Login */}

                {/* Ruta para la página de pacientes */}
                <Route path="/patients" element={<Patients />} /> {/* Página de pacientes */}

                {/* Ruta para el historial del paciente */}
                <Route path="/patient-history" element={<PatientHistory />} />

                <Route path="/register-patient" element={<RegisterPatient />} />

                <Route path="/start-session" element={<StartSession />} />

                {/* Ruta para el juego principal */}
                <Route path="/" element={<PuzzleDemo {...props} />} /> {/* Página de inicio del juego (opcional) */}
                {/* Rutas para las escenas del juego */}
                {/* 🔥 Asegurar que las escenas reciben las `props` de React Router */}
                <Route path="/circle-scene" element={<PuzzleScene {...props} />} />
                <Route path="/rosa-scene" element={<PuzzleSceneRosa {...props} />} />
                <Route path="/estrella-scene" element={<PuzzleSceneEstrella {...props} />} />
                <Route path="/buho-scene" element={<PuzzleSceneBuho {...props} />} />

            </Routes>
        </Router>
    );
};

export default AppRoutes;
