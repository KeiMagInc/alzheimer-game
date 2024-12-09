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
        const startPage = this.add.image(0, 0, 'startpage').setOrigin(0, 0);
        startPage.displayWidth = this.sys.canvas.width;
        startPage.displayHeight = this.sys.canvas.height;
        // Botón para iniciar el juego
        const startButton = this.add.image(this.scale.width / 2, this.scale.height / 2, 'startButton');
        startButton.setInteractive();
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene'); // Cambia a GameScene
        });

        this.createLoginButton();

    }

    createLoginButton() {
        // Crear el botón como un elemento HTML
        const buttonContainer = document.createElement('div');
        const loginButton = document.createElement('button');

        // Estilo del contenedor del botón
        buttonContainer.style.position = 'absolute';
        buttonContainer.style.width = '100vw';
        buttonContainer.style.height = '100vh';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.justifyContent = 'center'; // Centra horizontalmente
        buttonContainer.style.alignItems = 'center'; // Centra verticalmente
        buttonContainer.style.transform = 'translateY(30%)'; // Baja el contenedor un 20% del alto total

        buttonContainer.style.zIndex = '1000'; // Asegura que el botón esté sobre el canvas

        // Estilo del botón
        loginButton.style.backgroundImage = 'url("Assets/Button/loginBTN.png")';
        loginButton.style.backgroundSize = 'contain';
        loginButton.style.backgroundRepeat = 'no-repeat';
        loginButton.style.backgroundPosition = 'center';
        loginButton.style.width = '155px';
        loginButton.style.height = '70px';
        loginButton.style.border = 'none';
        loginButton.style.cursor = 'pointer';
        loginButton.style.color = 'transparent';

        // Evento de clic
        loginButton.addEventListener('click', () => {
            window.location.href = "/login"; // Redirigir al login
        });

        // Añadir el botón al contenedor y luego al cuerpo del documento
        buttonContainer.appendChild(loginButton);
        document.body.appendChild(buttonContainer);

        // Eliminar el botón al cambiar de escena
        this.events.once('shutdown', () => {
            buttonContainer.remove();
        });
    }
}

export default StartScene;