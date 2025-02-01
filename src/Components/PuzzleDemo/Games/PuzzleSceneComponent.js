import React, { Component } from "react";
import Phaser from "phaser";
import PuzzleScene from "../Scenes/PuzzleScene";
import SummaryScene from "./SummaryScene";
import StartScene from "../Scenes/StartScene";
import { withRouter } from "../../../withRouter";

class PuzzleSceneComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: true,
            currentScene: 'PuzzleScene', // Escena actual
            patientId: null, // Inicializa como null
        }
    }

    componentDidMount() {

        // Extraer `patientId` de `location.state`
        const { location } = this.props;
        const patientId = location.state?.patientId || null;

        console.log("✅ Paciente ID recibido en PuzzleSceneComponent:", patientId);


        const DPR = window.devicePixelRatio;
        const config = {
            backgroundColor: '#c39ed7',
            type: Phaser.AUTO,
            scene:
                [PuzzleScene, StartScene, SummaryScene],
            scale: {
                parent: 'phaser-game',
                mode: Phaser.Scale.NONE,
                height: document.documentElement.clientHeight * DPR,
                width: document.documentElement.clientWidth * DPR,
                zoom: 1 / DPR
            }
        };
        this.game = new Phaser.Game(config)
        const gameDiv = document.getElementById('phaser-game');
        this.resizeGame = resizeGame(this.game, gameDiv);
        window.addEventListener('resize', this.resizeGame);
        // 🔥 Asegurar que `this.game.data` existe antes de asignar el ID
        setTimeout(() => {
            if (this.game) {
                if (!this.game.data) {
                    this.game.data = {}; // 🚀 Inicializar `data` si no existe
                }
                this.game.data.player_id = patientId;
                console.log("🎯 Paciente ID asignado en Phaser:", this.game.data.player_id);
            } else {
                console.error("⚠️ No se pudo asignar patientId porque `this.game` es undefined");
            }
        }, 500);



    }
    handleClose = () => {
        this.setState({ modalOpen: true });
        this.props.history.push(`/`);
    }

    handleOpen = () => this.setState({ modalOpen: true });

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeGame);
        this.game.destroy(true);
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {

        return (
            <div id="phaser-game" style={{ width: '100vw', height: '100vh', backgroundColor: "black", display: 'flex' }}>
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
    position: 'absolute',
    bottom: '20px', // Lo coloca cerca de la parte inferior
    left: '50%', // Lo coloca horizontalmente en el centro
    transform: 'translateX(-50%)', // Ajuste para centrar perfectamente
    zIndex: 1000, // Asegura que el botón esté por encima del juego
};

// Estilo para el botón
const buttonStyle = {
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
};

const resizeGame = (game, container) => () => {
    const DPR = window.devicePixelRatio * 1;
    const { clientWidth, clientHeight } = document.documentElement;
    container.style.width = `${window.innerWidth}px`;
    container.style.height = `${window.innerHeight}px`;
    game.scale.resize(clientWidth * DPR, clientHeight * DPR);
};
export default withRouter(PuzzleSceneComponent);