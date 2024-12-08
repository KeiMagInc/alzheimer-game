import Phaser from 'phaser'
//import {matrixFill2} from '../Utils/DrawMatrixCircle' 
//import {matrixFill2} from '../Utils/DrawMatrixRose' 
//import {matrixFill2} from '../Utils/DrawMatrixStar' 
import {matrixFill2} from '../Utils/DrawMatrixBuho' 
import { RestartButton } from '../../Button/restart-button.js';
import { scaleImage, wrapResizeFn }  from '../Utils/Resize';

 class PuzzleScene extends Phaser.Scene {
    constructor() {
        super('Game');
        this.restartButton = new RestartButton(this);
        this.score = 0; // variable para obtener el puntaje
    }
    init(data) {
        this.score = 0
        this.UserTime = data.time;
        if (this.UserTime === undefined) {
            this.UserTime = 0
        }
        this.countDown = data.countDown;
        if (this.countDown === undefined) {
            this.countDown = 600
        }
        console.log(this.game.data)
    }
    preload() {
        this.load.image('terminarButton', '/Assets/Button/terminar.png');
        this.load.image('puzzlescenebk', '/Assets/GameScenes/PuzzleSbkEnBlanco.png')
        console.log("paso de cuenta abajo 1 " + this.countDown)
        this.load.image('red', '/Assets/New/1.png')
        this.load.image('blue', '/Assets/New/8.png')
        this.load.image('green', '/Assets/New/4.png')
        this.load.image('border','/Assets/New/Borde.png')
        this.load.image('darkBlue', '/Assets/New/7.png')
        this.load.image('lightGreen', '/Assets/New/5.png')
        this.load.image('pink', '/Assets/New/12.png')
        this.load.image('yellow', '/Assets/New/3.png')
        this.load.image('orange', '/Assets/New/2.png')
        this.load.image('black','/Assets/New/0.png')
        this.load.image('brown','/Assets/New/17.png')
        this.load.image('transparente', '/Assets/New/Transparente.png')


        //Cubos
        this.load.image('redC', '/Assets/Cubos/1.png')
        this.load.image('blueC', '/Assets/Cubos/8.png')
        this.load.image('greenC', '/Assets/Cubos/4.png')
        this.load.image('borderC','/Assets/Cubos/Borde.png')
        this.load.image('darkBlueC', '/Assets/Cubos/7.png')
        this.load.image('lightGreenC', '/Assets/Cubos/5.png')
        this.load.image('pinkC', '/Assets/Cubos/12.png')
        this.load.image('yellowC', '/Assets/Cubos/3.png')
        this.load.image('blackC', '/Assets/Cubos/0.png')
        this.load.image('orangeC', '/Assets/Cubos/2.png')
        this.load.image('brownC', '/Assets/Cubos/17.png')

    }
    create() {
        this.correctCount = 0;
        const puzzlePage = this.add.image(0, 0, 'puzzlescenebk').setOrigin(0, 0);
        puzzlePage.displayWidth = this.sys.canvas.width;
        puzzlePage.displayHeight = this.sys.canvas.height;
        this.text = this.add.text(0, 0,
            "Complete la figura seleccionando\nlos colores deseados", {
            color: '#000000',   
            
        });
        this.restartButton = this.add.image(this.scale.width - 115, this.scale.height - 60, 'terminarButton');
        this.restartButton.setInteractive();


        // Configura el botón "terminar" para que verifique el progreso y cambie de escena
        this.restartButton.on('pointerdown', () => {
        this.checkCompletion();
        });
        
        // Variable que guarda el color seleccionado
        this.selectedColor = "red";
        this.selectedColor = "yellow";
        this.selectedColor = "green";
        this.selectedColor = "lightGreen";
        this.selectedColor = "darkBlue";
        this.selectedColor = "blue";
        this.selectedColor = "pink";
        this.selectedColor = "orange";
        this.selectedColor = "black";
        this.selectedColor = "brown";
        this.selectedColor = "trasnparente";

        // Configurar los botones para actualizar `selectedColor`

        this.redButton = this.add.image(0, 0, 'redC').setInteractive({ useHandCursor: true });
        this.yellowButton = this.add.image(0, 0, 'yellowC').setInteractive({ useHandCursor: true });
        this.greenButton = this.add.image(0, 0, 'greenC').setInteractive({ useHandCursor: true });
        this.lightGreenButton = this.add.image(0, 0, 'lightGreenC').setInteractive({ useHandCursor: true });
        this.darkBlueButton = this.add.image(0, 0, 'darkBlueC').setInteractive({ useHandCursor: true });
        this.blueButton = this.add.image(0, 0, 'blueC').setInteractive({ useHandCursor: true });
        this.pinkButton = this.add.image(0, 0, 'pinkC').setInteractive({ useHandCursor: true });

        this.blackButton = this.add.image(0, 0, 'blackC').setInteractive({ useHandCursor: true });
        this.orangeButton = this.add.image(0, 0, 'orangeC').setInteractive({ useHandCursor: true });
        this.brownButton = this.add.image(0, 0, 'brownC').setInteractive({ useHandCursor: true });

        this.redButton.on('pointerdown', () => this.selectedColor = "red");
        this.yellowButton.on('pointerdown', () => this.selectedColor = "yellow");
        this.greenButton.on('pointerdown', () => this.selectedColor = "green");
        this.lightGreenButton.on('pointerdown', () => this.selectedColor = "lightGreen");
        this.darkBlueButton.on('pointerdown', () => this.selectedColor = "darkBlue");
        this.blueButton.on('pointerdown', () => this.selectedColor = "blue");
        this.pinkButton.on('pointerdown', () => this.selectedColor = "pink");
        this.blackButton.on('pointerdown', () => this.selectedColor = "black");
        this.orangeButton.on('pointerdown', () => this.selectedColor = "orange");
        this.brownButton.on('pointerdown', () => this.selectedColor = "brown");
        
        matrixFill2(this)

        //Resize
        wrapResizeFn(this);
            
    }

    checkCompletion() {
        this.score = 0; // Asegura que el puntaje esté en 0 al inicio de la verificación
    
        this.imges.forEach((row) => {
            row.forEach((square) => {
                if (square.isEditable && square.getIsCorrectSelected()) {
                    this.score++; // Incrementa el puntaje solo si el cuadro es correcto
                }
            });
        });
    
        // Cambia a SummaryScene y asegura que el puntaje sea 0 si no hay aciertos
        this.scene.start('SummaryScene', {
            score: this.score || 0, // Usa 0 si `this.score` está `undefined`
        });
    }
    
    //Funcion de resize a landscape de la scena
    resizeLandscape(width, height) {
        const halfWidth = width / 11.5;
        const xOffset= width/3;
        const halfHeight = height / 5;
        const yOffSet= height/20

        const { text, imges,redButton,yellowButton,greenButton,lightGreenButton,darkBlueButton,blueButton, pinkButton, blackButton, orangeButton, brownButton } = this;
        text.setFontSize(`${halfHeight * 0.2}px`);
        
        for (var j = 0; j < imges.length; j++) {
            imges[j].forEach(img => img.resize(width * 0.08, height * 0.08, 34, 1.00))//ajusta el tamano de los bloques
            // eslint-disable-next-line 
            //                                                                    0.27     
            imges[j].forEach((img, index) => img.setPosition(xOffset+ halfWidth * 0.255 * (index + 10), yOffSet+(halfHeight/4 * (j + 2))))//ajustar en funcion de la posicion...
        }

        text.setPosition(width / 20, height * 0.02);
        text.setWordWrapWidth(width * 0.8);


        //seleccion del objeto cuadro
        redButton.setPosition(width / 7, height * 0.2);
        scaleImage(redButton, width / 8, height / 2, 100, 2)

        yellowButton.setPosition(width / 3.8, height * 0.2);
        scaleImage(yellowButton, width / 8, height / 2, 100, 2)

        greenButton.setPosition(width / 7, height * 0.38);
        scaleImage(greenButton, width / 8, height / 2, 100, 2)
        
        darkBlueButton.setPosition(width / 3.8, height * 0.38);
        scaleImage(darkBlueButton, width / 8, height / 2, 100, 2)
        
        orangeButton.setPosition(width / 7, height * 0.56);
        scaleImage(orangeButton, width / 8, height / 2, 100, 2)

        pinkButton.setPosition(width / 3.8, height * 0.56);
        scaleImage(pinkButton, width / 8, height / 2, 100, 2)

        blueButton.setPosition(width / 7, height * 0.74);
        scaleImage(blueButton, width / 8, height / 2, 100, 2)
        
        brownButton.setPosition(width / 3.8, height * 0.74);
        scaleImage(brownButton, width / 8, height / 2, 100, 2)
        
        blackButton.setPosition(width / 7, height * 0.92);
        scaleImage(blackButton, width / 8, height / 2, 100, 2)
        
        lightGreenButton.setPosition(width / 3.8, height * 0.92);
        scaleImage(lightGreenButton, width / 8, height / 2, 100, 2)
        
        scaleImage(this.restartButton, this.scale.width / 5, this.scale.height / 5, 100, 2.3); // Ajusta el tamaño con escala


    }
}

export default PuzzleScene;