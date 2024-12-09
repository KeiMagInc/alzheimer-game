import React, { Component } from "react"; // Importa React y Component de la biblioteca react
import Phaser from "phaser"; // Importa Phaser, un framework de juegos en 2D
import PuzzleScene from "./Scenes/PuzzleScene"; // Importa la escena del puzzle
import PuzzleSceneRosa from "./Scenes/PuzzleSceneRosa"; // Importa la escena del puzzle rosa
import PuzzleSceneBuho from "./Scenes/PuzzleSceneBuho"; // Importa la escena del puzzle del búho
import PuzzleSceneEstrella from "./Scenes/PuzzleSceneEstrella"; // Importa la escena del puzzle de la estrella

import StartScene from "./Scenes/StartScene"; // Importa la escena de inicio
import SummaryScene from "./Scenes/SummaryScene"; // Importa la escena de resumen
import { Link } from "react-router-dom"; // Importa Link para la navegación
import GameScene from "./Scenes/GameScene"; // Importa la escena del juego

class PuzzleDemo extends Component { // Define la clase PuzzleDemo que extiende Component
    constructor() { // Constructor de la clase
        super(); // Llama al constructor de la clase padre
        this.state = { // Define el estado inicial del componente
            modalOpen: true, // Estado del modal
            currentScene: 'StartScene' // Escena actual
        };
    }

    componentDidMount() { // Método que se ejecuta después de que el componente se monta
        const DPR = window.devicePixelRatio; // Obtiene la relación de píxeles del dispositivo
        const config = { // Configuración del juego Phaser
            backgroundColor: '#c39ed7', // Color de fondo del juego
            type: Phaser.AUTO, // Tipo de renderizado (automático)
            scene: [StartScene, GameScene, PuzzleScene, SummaryScene, PuzzleSceneRosa, PuzzleSceneBuho, PuzzleSceneEstrella], // Escenas del juego
            scale: { // Configuración de escala
                parent: 'phaser-game', // Elemento padre del juego
                mode: Phaser.Scale.NONE, // Modo de escala
                height: document.documentElement.clientHeight * DPR, // Altura del juego
                width: document.documentElement.clientWidth * DPR, // Anchura del juego
                zoom: 1 / DPR // Zoom del juego
            },
            data: {
   
            }
        };

        this.game = new Phaser.Game(config); // Crea una nueva instancia del juego Phaser con la configuración
        const gameDiv = document.getElementById('phaser-game'); // Obtiene el elemento del DOM con id 'phaser-game'
        this.resizeGame = resizeGame(this.game, gameDiv); // Asigna la función de redimensionar el juego
        window.addEventListener('resize', this.resizeGame); // Añade un listener para el evento de redimensionar la ventana
        console.log(1); // Imprime 1 en la consola (datos temporales para la prueba)
        this.game.data = { // Añade datos al juego
            game_id: 1 // ID del jugador
        };
    }

    handleClose = () => { // Método para manejar el cierre del modal
        this.setState({ modalOpen: true }); // Cambia el estado del modal a abierto
        this.props.history.push(`/`); // Redirige a la ruta raíz
    }

    handleOpen = () => this.setState({ modalOpen: true }); // Método para manejar la apertura del modal

    componentWillUnmount() { // Método que se ejecuta antes de que el componente se desmonte
        window.removeEventListener('resize', this.resizeGame); // Elimina el listener del evento de redimensionar la ventana
        this.game.destroy(true); // Destruye la instancia del juego Phaser
    }

    shouldComponentUpdate() { // Método que determina si el componente debe actualizarse
        return true; // Devuelve true para permitir la actualización del componente
    }

    render() { // Método para renderizar el componente

        return ( // Retorna el JSX del componente
            <div id="phaser-game" style={{ width:'100vw' , height: '100vh', backgroundColor: "black" , display: 'flex'}}> 
                {/* Contenedor del juego Phaser con estilos */}
                {/* Botón de redirección al login */}
                {/* <div style={buttonContainerStyle}>
                    <Link to="/login">
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
                    </button>
                    </Link>
                </div> */}
            </div>
        );
    }
}

// Estilo para el contenedor del botón (centrado abajo)
const buttonContainerStyle = {
    position: 'absolute', // Posición absoluta
    bottom: '20px', // Lo coloca cerca de la parte inferior
    left: '50%', // Lo coloca horizontalmente en el centro
    transform: 'translateX(-50%)', // Ajuste para centrar perfectamente
    zIndex: 1000, // Asegura que el botón esté por encima del juego
};

// Estilo para el botón
const buttonStyle = {
    backgroundColor: '#007BFF', // Color de fondo del botón
    color: 'white', // Color del texto del botón
    border: 'none', // Sin borde
    padding: '10px 20px', // Relleno del botón
    fontSize: '16px', // Tamaño de la fuente del botón
    borderRadius: '5px', // Radio del borde del botón
    cursor: 'pointer', // Cambia el cursor al pasar sobre el botón
    transition: 'background-color 0.3s', // Transición del color de fondo
};

const resizeGame = (game, container) => () => { // Función para redimensionar el juego
    const DPR = window.devicePixelRatio * 1; // Obtiene la relación de píxeles del dispositivo
    const { clientWidth, clientHeight } = document.documentElement; // Obtiene el ancho y alto del documento
    container.style.width = `${window.innerWidth}px`; // Ajusta el ancho del contenedor
    container.style.height = `${window.innerHeight}px`; // Ajusta el alto del contenedor
    game.scale.resize(clientWidth * DPR, clientHeight * DPR); // Redimensiona el juego
};

export default PuzzleDemo; // Exporta la clase PuzzleDemo como el componente por defecto
