import React, { Component } from "react";
import Phaser from "phaser";
import PuzzleSceneEstrella from "../Scenes/PuzzleSceneEstrella";
import SummaryScene from "./SummarySceneEstrella";
import StartScene from "../Scenes/StartScene";


class PuzzleSceneEstrellaComponent extends Component {
    constructor() {
        super();
        this.state = { 
            modalOpen: true,
            currentScene: 'PuzzleSceneEstrella' // Escena actual
        }
    }

    componentDidMount() {
        const DPR = window.devicePixelRatio;
        const config = {
            backgroundColor: '#c39ed7',
            type: Phaser.AUTO,
            scene:
                [PuzzleSceneEstrella, StartScene, SummaryScene],
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
        //aqui estan quemados los datos
        console.log(1)
        this.game.data = {
            player_id: 1
        }



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
            <div id="phaser-game" style={{ width:'100vw' , height: '100vh', backgroundColor: "black" , display: 'flex'}}>
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

export default PuzzleSceneEstrellaComponent;