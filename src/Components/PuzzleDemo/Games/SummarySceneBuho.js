import Phaser from 'phaser';
import { RestartButton } from '../../Button/restart-button.js';

class SummaryScene extends Phaser.Scene {
    constructor() {
        super({ key: 'SummaryScene' });
        this.restartButton = new RestartButton(this);
    }

    preload() {
        this.load.image('summarypage', '/Assets/GameScenes/SummaryScene.png');
        this.load.image('restartButton', '/Assets/Button/Restart.png');
        this.load.image('salirButton', '/Assets/Button/salir.png');
    }

    create(data) {
        const score = data.score || 0;

        const summaryPage = this.add.image(0, 0, 'summarypage').setOrigin(0, 0);
        summaryPage.displayWidth = this.sys.canvas.width;
        summaryPage.displayHeight = this.sys.canvas.height;

        // Muestra el mensaje de juego finalizado
        this.add.text(this.scale.width / 2 - 130, this.scale.height / 2 - 200, 
            'Juego Finalizado', { fontSize: '40px', fill: '#000', fontStyle: 'bold' });

        // Muestra el puntaje actual
        this.add.text(this.scale.width / 2 - 105, this.scale.height / 2 - 150, 
            `Puntaje: ${score}`, { fontSize: '32px', fill: '#000' });

        // Botón de reinicio (ir a la escena "PuzzleSceneBuho")
        this.restartButton = this.add.image(this.scale.width / 2 + 199, this.scale.height - 125, 'restartButton');
        this.restartButton.setInteractive();
        this.restartButton.on('pointerdown', () => {
            this.scene.start('PuzzleSceneBuho');
        });

        // Botón de salir (redirigir a "/start-session")
        this.restartButton = this.add.image(this.scale.width / 2 - 199, this.scale.height - 125, 'salirButton');
        this.restartButton.setInteractive();
        this.restartButton.on('pointerdown', () => {
            window.location.href = "/start-session"; 
        });
    }
}

export default SummaryScene;
