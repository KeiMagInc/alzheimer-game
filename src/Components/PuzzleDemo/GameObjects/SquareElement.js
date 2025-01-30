import Phaser from 'phaser';
import { scaleImage } from '../Utils/Resize';
/**
 * Clase que representa un elemento cuadrado en el juego.
 * @extends Phaser.GameObjects.Container
 */
export default class SquareElement extends Phaser.GameObjects.Container {

    /**
     * Constructor de la clase SquareElement.
     * @param {Phaser.Scene} scene - La escena a la que pertenece este objeto.
     * @param {number} x - La posición x del objeto.
     * @param {number} y - La posición y del objeto.
     * @param {string} image - La imagen del objeto.
     * @param {boolean} isEditable - Indica si el objeto es editable.
     * @param {string} imgSelected - La imagen seleccionada.
     * @param {string} trueValue - El valor verdadero para la validación.
     */
    constructor(scene, x, y, image, isEditable, imgSelected, trueValue) {
        super(scene, x, y);

        // Inicialización de la imagen inicial
        this.image = null;

        // Colores del asset interno
        this.red = null;
        this.yellow = null;
        this.green = null;
        this.lightGreen = null;
        this.darkBlue = null;
        this.blue = null;
        this.pink = null;
        this.black = null;
        this.orange = null;
        this.brown = null;
        this.white = null;

        // Indica si el cuadrado es interactuable
        this.isEditable = isEditable;

        // Opción activa
        this.imgSelected = imgSelected; // Debe ser una variable global de la escena

        // Variables para detectar si está correcto
        this.memorySelection = null;
        this.isCorrect = null;
        this.trueValue = trueValue;

        this.scene = scene;
        this.generated(scene, x, y, image);
    }

    /**
     * Genera los elementos gráficos del objeto.
     * @param {Phaser.Scene} scene - La escena a la que pertenece este objeto.
     * @param {number} x - La posición x del objeto.
     * @param {number} y - La posición y del objeto.
     * @param {string} image - La imagen del objeto.
     */
    generated(scene, x, y, image) {
        this.image = new Phaser.GameObjects.Image(scene, x, y, image);
        // Valores de escala ajustados en función del sprite
        this.red = new Phaser.GameObjects.Image(scene, x, y, 'red').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925);
        this.yellow = new Phaser.GameObjects.Image(scene, x, y, 'yellow').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925);
        this.green = new Phaser.GameObjects.Image(scene, x, y, 'green').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925);
        this.lightGreen = new Phaser.GameObjects.Image(scene, x, y, 'lightGreen').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925);
        this.darkBlue = new Phaser.GameObjects.Image(scene, x, y, 'darkBlue').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925);
        this.blue = new Phaser.GameObjects.Image(scene, x, y, 'blue').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925);
        this.pink = new Phaser.GameObjects.Image(scene, x, y, 'pink').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925);
        this.black = new Phaser.GameObjects.Image(scene, x, y, 'black').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925);
        this.orange = new Phaser.GameObjects.Image(scene, x, y, 'orange').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925);
        this.brown = new Phaser.GameObjects.Image(scene, x, y, 'brown').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925);
        this.white = new Phaser.GameObjects.Image(scene, x, y, 'white').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925);

        if (this.isEditable) {
            this.image.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
                this.setSpriteActive(this.scene.selectedColor);
            }).on('pointerover', () => {
                scene.tweens.add({
                    targets: this,
                    scale: 1.1,
                    ease: 'Power3',
                    duration: 150,
                    delay: 0,
                    repeat: 0,
                });
            }).on('pointerout', () => {
                scene.tweens.add({
                    targets: this,
                    scale: 1,
                    ease: 'Power3',
                    duration: 150,
                    delay: 0,
                    repeat: 0,
                });
            });
        }

        this.add([this.image, this.red, this.yellow, this.green, this.lightGreen, this.darkBlue, this.blue, this.pink, this.black, this.orange, this.brown, this.white]);

        // Añadir SquareElement a la escena
        scene.add.existing(this);
    }

    /**
     * Ajusta el tamaño del objeto según el espacio disponible.
     * @param {number} availableSpaceWidth - El ancho del espacio disponible.
     * @param {number} availableSpaceHeight - La altura del espacio disponible.
     * @param {number} padding - El relleno alrededor del objeto.
     * @param {number} scaleMultiplier - El multiplicador de escala.
     */
    resize(availableSpaceWidth, availableSpaceHeight, padding, scaleMultiplier) {
        scaleImage(this.image, availableSpaceWidth, availableSpaceHeight, padding, scaleMultiplier);
        this.red.setScale(this.image.scale);
        this.yellow.setScale(this.image.scale);
        this.green.setScale(this.image.scale);
        this.lightGreen.setScale(this.image.scale);
        this.darkBlue.setScale(this.image.scale);
        this.blue.setScale(this.image.scale);
        this.pink.setScale(this.image.scale);
        this.black.setScale(this.image.scale);
        this.orange.setScale(this.image.scale);
        this.brown.setScale(this.image.scale);
        this.white.setScale(this.image.scale);
    }

    /**
     * Verifica si la selección actual es correcta.
     * @returns {boolean} - Verdadero si la selección es correcta, falso en caso contrario.
     */
    getIsCorrectSelected() {
        const isCorrect = this.isEditable && (this.memorySelection === this.trueValue);
        console.log(
            `Editable: ${this.isEditable}, Memoria: ${this.memorySelection}, Correcto: ${this.trueValue}, Resultado: ${isCorrect}`
        );
        return isCorrect;
    }

    /**
     * Activa el sprite correspondiente al color seleccionado.
     * @param {string} imgSelected - El color seleccionado.
     */
    setSpriteActive(imgSelected) {
        this.memorySelection = imgSelected;
        switch (imgSelected) {
            case "red":
                this.red.setVisible(true);
                this.yellow.setVisible(false);
                this.green.setVisible(false);
                this.lightGreen.setVisible(false);
                this.darkBlue.setVisible(false);
                this.blue.setVisible(false);
                this.pink.setVisible(false);
                this.black.setVisible(false);
                this.orange.setVisible(false);
                this.brown.setVisible(false);
                this.white.setVisible(false);
                break;
            case "yellow":
                this.red.setVisible(false);
                this.yellow.setVisible(true);
                this.green.setVisible(false);
                this.lightGreen.setVisible(false);
                this.darkBlue.setVisible(false);
                this.blue.setVisible(false);
                this.pink.setVisible(false);
                this.black.setVisible(false);
                this.orange.setVisible(false);
                this.brown.setVisible(false);
                this.white.setVisible(false);
                break;
            case "green":
                this.red.setVisible(false);
                this.yellow.setVisible(false);
                this.green.setVisible(true);
                this.lightGreen.setVisible(false);
                this.darkBlue.setVisible(false);
                this.blue.setVisible(false);
                this.pink.setVisible(false);
                this.black.setVisible(false);
                this.orange.setVisible(false);
                this.brown.setVisible(false);
                this.white.setVisible(false);
                break;
            case "lightGreen":
                this.red.setVisible(false);
                this.yellow.setVisible(false);
                this.green.setVisible(false);
                this.lightGreen.setVisible(true);
                this.darkBlue.setVisible(false);
                this.blue.setVisible(false);
                this.pink.setVisible(false);
                this.black.setVisible(false);
                this.orange.setVisible(false);
                this.brown.setVisible(false);
                this.white.setVisible(false);
                break;
            case "darkBlue":
                this.red.setVisible(false);
                this.yellow.setVisible(false);
                this.green.setVisible(false);
                this.lightGreen.setVisible(false);
                this.darkBlue.setVisible(true);
                this.blue.setVisible(false);
                this.pink.setVisible(false);
                this.black.setVisible(false);
                this.orange.setVisible(false);
                this.brown.setVisible(false);
                this.white.setVisible(false);
                break;
            case "blue":
                this.red.setVisible(false);
                this.yellow.setVisible(false);
                this.green.setVisible(false);
                this.lightGreen.setVisible(false);
                this.darkBlue.setVisible(false);
                this.blue.setVisible(true);
                this.pink.setVisible(false);
                this.black.setVisible(false);
                this.orange.setVisible(false);
                this.brown.setVisible(false);
                this.white.setVisible(false);
                break;
            case "pink":
                this.red.setVisible(false);
                this.yellow.setVisible(false);
                this.green.setVisible(false);
                this.lightGreen.setVisible(false);
                this.darkBlue.setVisible(false);
                this.blue.setVisible(false);
                this.pink.setVisible(true);
                this.black.setVisible(false);
                this.orange.setVisible(false);
                this.brown.setVisible(false);
                this.white.setVisible(false);
                break;
            case "black":
                this.red.setVisible(false);
                this.yellow.setVisible(false);
                this.green.setVisible(false);
                this.lightGreen.setVisible(false);
                this.darkBlue.setVisible(false);
                this.blue.setVisible(false);
                this.pink.setVisible(false);
                this.black.setVisible(true);
                this.orange.setVisible(false);
                this.brown.setVisible(false);
                this.white.setVisible(false);
                break;
            case "orange":
                this.red.setVisible(false);
                this.yellow.setVisible(false);
                this.green.setVisible(false);
                this.lightGreen.setVisible(false);
                this.darkBlue.setVisible(false);
                this.blue.setVisible(false);
                this.pink.setVisible(false);
                this.black.setVisible(false);
                this.orange.setVisible(true);
                this.brown.setVisible(false);
                this.white.setVisible(false);
                break;
            case "brown":
                this.red.setVisible(false);
                this.yellow.setVisible(false);
                this.green.setVisible(false);
                this.lightGreen.setVisible(false);
                this.darkBlue.setVisible(false);
                this.blue.setVisible(false);
                this.pink.setVisible(false);
                this.black.setVisible(false);
                this.orange.setVisible(false);
                this.brown.setVisible(true);
                this.white.setVisible(false);
                break;
            case "white":
                this.red.setVisible(false);
                this.yellow.setVisible(false);
                this.green.setVisible(false);
                this.lightGreen.setVisible(false);
                this.darkBlue.setVisible(false);
                this.blue.setVisible(false);
                this.pink.setVisible(false);
                this.black.setVisible(false);
                this.orange.setVisible(false);
                this.brown.setVisible(false);
                this.white.setVisible(true);
                break;
            default:
                console.log("Color no reconocido.");
                break;
        }
        this.scene.checkPuzzleCompletion(); 
    }
}