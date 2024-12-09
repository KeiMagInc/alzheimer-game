import Phaser from 'phaser';
import { scaleImage } from '../Utils/Resize';
export default class SquareElement extends Phaser.GameObjects.Container {


    constructor(scene, x, y, image, isEditable, imgSelected, trueValue) {
        super(scene, x, y)

        //Inicializacion Imagen inicial
        this.image = null

        //Colores Asset interno
        this.red=null
        this.yellow=null
        this.green=null
        this.lightGreen=null
        this.darkBlue=null
        this.blue=null
        this.pink=null
        this.black=null
        this.orange=null
        this.brown=null
        this.white=null



        //es interactuable el cuadrado?
        this.isEditable = isEditable
        
        //Que opción esta activa
        this.imgSelected = imgSelected //Debe ser una variable global de la escena
        
        
        //Variables para detectar que esta correcto
        this.memorySelection=null
        this.isCorrect = null
        this.trueValue= trueValue
        
        this.scene = scene
        this.generated(scene, x, y, image)

    }
    
    generated(scene, x, y, image) {
        this.image = new Phaser.GameObjects.Image(scene, x, y, image)
        //Valores de escala hay que ajustar en función del sprite
        this.red = new Phaser.GameObjects.Image(scene, x, y, 'red').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925)
        this.yellow = new Phaser.GameObjects.Image(scene, x, y, 'yellow').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925)
        this.green = new Phaser.GameObjects.Image(scene, x, y, 'green').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925)
        this.lightGreen = new Phaser.GameObjects.Image(scene, x, y, 'lightGreen').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925)
        this.darkBlue = new Phaser.GameObjects.Image(scene, x, y, 'darkBlue').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925)
        this.blue = new Phaser.GameObjects.Image(scene, x, y, 'blue').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925)
        this.pink = new Phaser.GameObjects.Image(scene, x, y, 'pink').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925)
        this.black = new Phaser.GameObjects.Image(scene, x, y, 'black').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925)
        this.orange = new Phaser.GameObjects.Image(scene, x, y, 'orange').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925)
        this.brown = new Phaser.GameObjects.Image(scene, x, y, 'brown').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925)
        this.white = new Phaser.GameObjects.Image(scene, x, y, 'white').setOrigin(0.5, 0.5).setVisible(false).setScale(0.925)

        if(this.isEditable){
            this.image.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
                this.setSpriteActive(this.scene.selectedColor)
                
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
    
            })
        }
        
        this.add([this.image, this.red, this.yellow, this.green, this.lightGreen, this.darkBlue, this.blue, this.pink, this.black, this.orange, this.brown, this.white]);

        // Añadir SquareElement a la escena
        scene.add.existing(this);


    }
    resize(availableSpaceWidth, availableSpaceHeight, padding, scaleMultiplier) {
        scaleImage(this.image, availableSpaceWidth, availableSpaceHeight, padding, scaleMultiplier);
        this.red.setScale(this.image.scale)
        this.yellow.setScale(this.image.scale)
        this.green.setScale(this.image.scale)
        this.lightGreen.setScale(this.image.scale)
        this.darkBlue.setScale(this.image.scale)
        this.blue.setScale(this.image.scale)
        this.pink.setScale(this.image.scale)
        this.black.setScale(this.image.scale)
        this.orange.setScale(this.image.scale)
        this.brown.setScale(this.image.scale)
        this.white.setScale(this.image.scale)
    }
    getIsCorrectSelected() {
        const isCorrect = this.isEditable && (this.memorySelection === this.trueValue);
        console.log(
            `Editable: ${this.isEditable}, Memoria: ${this.memorySelection}, Correcto: ${this.trueValue}, Resultado: ${isCorrect}`
        );
        return isCorrect;
    }
    
    setSpriteActive(imgSelected){
        this.memorySelection = imgSelected
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
    }
}