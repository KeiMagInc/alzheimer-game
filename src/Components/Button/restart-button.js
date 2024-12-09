export class RestartButton {

    constructor(scene) {             
        this.relatedScene = scene; // Guardar la escena relacionada
    }

    preload () {
        // Cargar el spritesheet del botón
        this.relatedScene.load.spritesheet('button', '/Assets/Button/Button.png', { frameWidth: 270, frameHeight: 122 });	
    }

    create(x = null, y = null) {
        const { width, height } = this.relatedScene.sys.game.canvas;

        // Usar las posiciones proporcionadas o valores por defecto
        const posX = x !== null ? x : width / 2;
        const posY = y !== null ? y : height - 150;

        // Crear el sprite del botón y hacerlo interactivo
        this.startButton = this.relatedScene.add.sprite(posX, posY, 'button').setInteractive();

        // Eventos del botón
        this.startButton.on('pointerover', () => {
            this.startButton.setFrame(1); // Cambiar el frame al pasar el cursor sobre el botón
        });
        this.startButton.on('pointerout', () => {
            this.startButton.setFrame(0); // Cambiar el frame al quitar el cursor del botón
        });
        this.startButton.on('pointerdown', () => {
            this.relatedScene.scene.start('Game'); // Cambiar a la escena 'Game' al hacer clic en el botón
        });
    }

    setPosition(x, y) {
        if (this.startButton) {
            this.startButton.setPosition(x, y); // Establecer la posición del botón si existe
        }
    }

}