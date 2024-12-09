import React, { Component } from "react";
import Phaser from "phaser";
import PuzzleSceneRosa from "../Scenes/PuzzleSceneRosa";
import SummaryScene from "./SummarySceneRosa";
import StartScene from "../Scenes/StartScene";

class PuzzleSceneRosaComponent extends Component {
    constructor() {
        super();
        this.state = {
            modalOpen: true,
            currentScene: 'PuzzleSceneRosa' // Escena actual
        }
    }

    componentDidMount() {
        const DPR = window.devicePixelRatio;
        const config = {
            backgroundColor: '#c39ed7',
            type: Phaser.AUTO,
            scene:
                [PuzzleSceneRosa, StartScene, SummaryScene],
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
    handleOpen = () => this.setState({ modalOpen: true })

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
const resizeGame = (game, container) => () => {
    const DPR = window.devicePixelRatio * 1;
    const { clientWidth, clientHeight } = document.documentElement;
    container.style.width = `${window.innerWidth}px`;
    container.style.height = `${window.innerHeight}px`;
    game.scale.resize(clientWidth * DPR, clientHeight * DPR);
};

export default PuzzleSceneRosaComponent;