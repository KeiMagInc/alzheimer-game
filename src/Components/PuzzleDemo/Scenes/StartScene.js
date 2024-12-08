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
        this.restartButton.create();
        this.restartButton.setPosition(800, 700);

        this.createLoginButton();


        // this.logInButton = this.add.image(this.scale.width / 2, this.scale.height * 0.95, 'logInButton').setInteractive(); // Más abajo
        // this.logInButton.displayWidth = 199; // Ancho deseado en píxeles
        // this.logInButton.displayHeight = 90; // Alto deseado en píxeles

        // this.logInButton.on('pointerover', () => {
        //     this.logInButton.setTint(0x91FF); 
        // });
        // this.logInButton.on('pointerout', () => {
        //     this.logInButton.clearTint(); 
        // });

        // // Acción del botón de "Log In" (Redirige a la escena 'LogInScene')
        // this.logInButton.on('pointerdown', () => {
        //     this.scene.start('/login');  // Cambia a la escena 'LogInScene'
        // }); 
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
        buttonContainer.style.left = '720px'; //Posicion en x, desde la izquierda
        buttonContainer.style.top = '502px'; //Posicion en y, desde arriba
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