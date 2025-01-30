import Phaser from 'phaser';
import { RestartButton } from '../../Button/restart-button.js';

class StartScene extends Phaser.Scene {
    constructor() {
        super({ key: 'StartScene' });
        this.restartButton = new RestartButton(this);
    }

    preload() {
        this.load.image('startpage', '/Assets/GameScenes/StartPage.png');
        this.load.image('startButton', '/Assets/Button/button.png');
        this.load.image('logInButton', '/Assets/Button/loginBTN.png');
        this.restartButton.preload();
    }

    create() {
        // Fondo ajustado al tamaño de la pantalla
        const startPage = this.add.image(this.scale.width / 2, this.scale.height / 2, 'startpage')
            .setOrigin(0.5, 0.5)
            .setDisplaySize(this.scale.width, this.scale.height);

        // Crear el contenedor de botones
        this.createButtons();
    }

    createButtons() {
        // Crear el contenedor para ambos botones
        const buttonContainer = document.createElement('div');
        buttonContainer.style.position = 'absolute';
        buttonContainer.style.left = '50%';
        buttonContainer.style.top = '80%'; // Ajusta el porcentaje si es necesario
        buttonContainer.style.transform = 'translate(-50%, -50%)'; // Centrado perfecto
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '20px'; // Espaciado entre botones
        buttonContainer.style.zIndex = '1000';

        // Crear botón de jugar
        const playButton = document.createElement('button');
        playButton.style.backgroundImage = 'url("Assets/Button/button.png")';
        playButton.style.backgroundSize = 'contain';
        playButton.style.backgroundRepeat = 'no-repeat';
        playButton.style.backgroundPosition = 'center';
        playButton.style.width = '155px';
        playButton.style.height = '70px';
        playButton.style.border = 'none';
        playButton.style.cursor = 'pointer';
        playButton.style.color = 'transparent';

        // Evento de clic para jugar
        playButton.addEventListener('click', () => {
            this.scene.start('GameScene'); // Cambia a GameScene
        });

        // Crear botón de login
        const loginButton = document.createElement('button');
        loginButton.style.backgroundImage = 'url("Assets/Button/loginBTN.png")';
        loginButton.style.backgroundSize = 'contain';
        loginButton.style.backgroundRepeat = 'no-repeat';
        loginButton.style.backgroundPosition = 'center';
        loginButton.style.width = '155px';
        loginButton.style.height = '70px';
        loginButton.style.border = 'none';
        loginButton.style.cursor = 'pointer';
        loginButton.style.color = 'transparent';

        // Evento de clic para login
        loginButton.addEventListener('click', () => {
            window.location.href = "/login"; // Redirigir al login
        });

        // Añadir botones al contenedor
        buttonContainer.appendChild(playButton);
        buttonContainer.appendChild(loginButton);

        // Añadir contenedor al body
        document.body.appendChild(buttonContainer);

        // Eliminar los botones al cambiar de escena
        this.events.once('shutdown', () => {
            buttonContainer.remove();
        });
    }
}

export default StartScene;
