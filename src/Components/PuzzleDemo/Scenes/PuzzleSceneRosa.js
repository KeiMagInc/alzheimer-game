import Phaser from 'phaser'
//import {matrixFill2} from '../Utils/DrawMatrixCircle' 
import { matrixFill2 } from '../Utils/DrawMatrixRose'
//import {matrixFill2} from '../Utils/DrawMatrixStar' 
//import {matrixFill2} from '../Utils/DrawMatrixBuho' 
import { RestartButton } from '../../Button/restart-button.js';
import { scaleImage, wrapResizeFn } from '../Utils/Resize';
import SesionService from '../../../Services/SesionService';

class PuzzleSceneRosa extends Phaser.Scene {
    constructor() {
        super({ key: 'PuzzleSceneRosa' });
        this.restartButton = new RestartButton(this);
        this.score = 0; // variable para obtener el puntaje
        this.isPuzzleCompleted = false;
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
        // 🔥 Esperar hasta que `this.game.data` esté disponible
        setTimeout(() => {
            if (this.game && this.game.data) {
                this.patientId = this.game.data.player_id || null;
                console.log("✅ Paciente ID en Phaser PuzzleScene:", this.patientId);
            } else {
                console.error("⚠️ No se pudo obtener `this.game.data.player_id` en PuzzleScene");
            }
        }, 1000);
    }
    preload() {
        this.load.image('terminarButton', '/Assets/Button/terminar.png');
        this.load.image('puzzlescenebk', '/Assets/GameScenes/PuzzleSbkEnBlanco.png')
        console.log("paso de cuenta abajo 1 " + this.countDown)
        //Colores de los cuadrados
        this.load.image('black', '/Assets/New/0.png')
        this.load.image('red', '/Assets/New/1.png')
        this.load.image('orange', '/Assets/New/2.png')
        this.load.image('yellow', '/Assets/New/3.png')
        this.load.image('green', '/Assets/New/4.png')
        this.load.image('lightGreen', '/Assets/New/5.png')
        this.load.image('darkBlue', '/Assets/New/6.png')
        this.load.image('blue', '/Assets/New/7.png')
        this.load.image('pink', '/Assets/New/8.png')
        this.load.image('brown', '/Assets/New/9.png')
        this.load.image('border', '/Assets/New/Borde.png')
        this.load.image('transparente', '/Assets/New/Transparente.png')

        //Cubos de Pintura
        this.load.image('blackC', '/Assets/Cubos/0.png')
        this.load.image('redC', '/Assets/Cubos/1.png')
        this.load.image('orangeC', '/Assets/Cubos/2.png')
        this.load.image('yellowC', '/Assets/Cubos/3.png')
        this.load.image('greenC', '/Assets/Cubos/4.png')
        this.load.image('lightGreenC', '/Assets/Cubos/5.png')
        this.load.image('darkBlueC', '/Assets/Cubos/6.png')
        this.load.image('blueC', '/Assets/Cubos/7.png')
        this.load.image('pinkC', '/Assets/Cubos/8.png')
        this.load.image('brownC', '/Assets/Cubos/9.png')
        this.load.image('borderC', '/Assets/Cubos/Borde.png')

    }
    create() {
        this.createStartButton();
        this.scene.pause();

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
        this.restartButton.setVisible(false);

        // Configura el botón "terminar" para que verifique el progreso y cambie de escena
        this.restartButton.on('pointerdown', () => {
            this.checkCompletion();
        });

        this.createPauseButton();

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

        // Llamar a la verificación después de asignar colores
        this.redButton.on('pointerdown', () => { this.selectedColor = "red"; this.checkPuzzleCompletion(); });
        this.yellowButton.on('pointerdown', () => { this.selectedColor = "yellow"; this.checkPuzzleCompletion(); });
        this.greenButton.on('pointerdown', () => { this.selectedColor = "green"; this.checkPuzzleCompletion(); });
        this.lightGreenButton.on('pointerdown', () => { this.selectedColor = "lightGreen"; this.checkPuzzleCompletion(); });
        this.darkBlueButton.on('pointerdown', () => { this.selectedColor = "darkBlue"; this.checkPuzzleCompletion(); });
        this.blueButton.on('pointerdown', () => { this.selectedColor = "blue"; this.checkPuzzleCompletion(); });
        this.pinkButton.on('pointerdown', () => { this.selectedColor = "pink"; this.checkPuzzleCompletion(); });
        this.blackButton.on('pointerdown', () => { this.selectedColor = "black"; this.checkPuzzleCompletion(); });
        this.orangeButton.on('pointerdown', () => { this.selectedColor = "orange"; this.checkPuzzleCompletion(); });
        this.brownButton.on('pointerdown', () => { this.selectedColor = "brown"; this.checkPuzzleCompletion(); });

        matrixFill2(this)

        //Resize
        wrapResizeFn(this);

    }

    async checkCompletion() {
        // Calcular puntaje, aciertos y errores
        this.score = 0;
        let aciertos = 0;
        let errores = 0;

        this.imges.forEach(row => {
            row.forEach(square => {
                if (square.isEditable) {
                    if (square.getIsCorrectSelected()) {
                        aciertos++; // Si la selección es correcta, incrementar aciertos
                    } else {
                        errores++; // Si la selección es incorrecta, incrementar errores
                    }
                }
            });
        });

        this.score = aciertos; // Puntaje basado en aciertos
        // 🔥 Validar si el paciente tiene un ID asignado
        if (this.patientId === undefined || this.patientId === null) {
            console.warn("⚠️ ID de paciente no encontrado. Redirigiendo al login...");
            this.scene.start('SummaryScene', { score: this.score });
            return;
        }

        // Datos de la sesión
        const sessionData = {
            id_paciente: this.patientId, // Reemplázalo por el ID real del paciente
            fecha: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
            duracion: this.calculateDuration(), // Método para calcular la duración
            puntaje: this.score || 0, // Puntaje basado en aciertos
            aciertos: aciertos, // Número de aciertos
            errores: errores // Número de errores
        };

        console.log("Enviando datos de la sesión:", sessionData);

        try {
            // Llamar a la API para guardar los datos
            const response = await SesionService.addSesion(sessionData);
            console.log('Datos guardados exitosamente:', response);

            // Cambiar a la escena de resumen
            this.scene.start('SummaryScene', { score: this.score, aciertos: aciertos, errores: errores });
        } catch (error) {
            console.error('Error al guardar los datos:', error);
        }
    }

    calculateDuration() {
        // Calcula la duración basada en el tiempo inicial y el tiempo actual
        const elapsedTime = this.countDown - this.UserTime; // Diferencia entre cuenta regresiva inicial y actual
        const minutes = Math.floor(elapsedTime / 60);
        const seconds = elapsedTime % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    }

    createStartButton() {
        const buttonContainer = document.createElement('div');
        const startButton = document.createElement('button');
    
        // Estilo del contenedor del botón
        buttonContainer.style.position = 'absolute';
        buttonContainer.style.bottom = '20px'; // Siempre en la parte inferior
        buttonContainer.style.left = '20px'; // Desde la esquina izquierda
        buttonContainer.style.zIndex = '1000'; 
        buttonContainer.style.pointerEvents = 'auto';
    
        // Estilo del botón de inicio
        startButton.style.backgroundImage = 'url("Assets/Button/Iniciar.png")';
        startButton.style.backgroundSize = '100% 100%';
        startButton.style.backgroundRepeat = 'no-repeat';
        startButton.style.backgroundPosition = 'center';
        startButton.style.width = '155px';
        startButton.style.height = '70px';
        startButton.style.border = 'none';
        startButton.style.cursor = 'pointer';
        startButton.style.color = 'transparent';
    
        startButton.addEventListener('click', () => {
            this.scene.resume();
            buttonContainer.remove();
        });
    
        buttonContainer.appendChild(startButton);
        document.body.appendChild(buttonContainer);
    
        this.events.once('shutdown', () => {
            buttonContainer.remove();
        });
    }
    
    createPauseButton() {
        const buttonContainer = document.createElement('div');
        const pauseButton = document.createElement('button');
    
        // Estilo del contenedor del botón
        buttonContainer.style.position = 'absolute';
        buttonContainer.style.bottom = '20px'; // Siempre en la parte inferior
        buttonContainer.style.left = '200px'; // Espaciado desde el botón de inicio
        buttonContainer.style.zIndex = '1000';
        buttonContainer.style.pointerEvents = 'auto';
    
        // Estilo del botón de pausa
        pauseButton.style.backgroundImage = 'url("Assets/Button/Pausar.png")';
        pauseButton.style.backgroundSize = 'contain';
        pauseButton.style.backgroundRepeat = 'no-repeat';
        pauseButton.style.backgroundPosition = 'center';
        pauseButton.style.width = '155px';
        pauseButton.style.height = '70px';
        pauseButton.style.border = 'none';
        pauseButton.style.cursor = 'pointer';
        pauseButton.style.color = 'transparent';
    
        pauseButton.addEventListener('click', () => {
            this.scene.pause();
            this.showPauseMenu();
        });
    
        buttonContainer.appendChild(pauseButton);
        document.body.appendChild(buttonContainer);
    
        this.events.once('shutdown', () => {
            buttonContainer.remove();
        });
    }
    

    showPauseMenu() {
        // Crear un contenedor para el menú de pausa
        const pauseMenuContainer = document.createElement('div');
        pauseMenuContainer.style.position = 'absolute';
        pauseMenuContainer.style.top = '0';
        pauseMenuContainer.style.left = '0';
        pauseMenuContainer.style.width = '100vw';
        pauseMenuContainer.style.height = '100vh';
        pauseMenuContainer.style.display = 'flex';
        pauseMenuContainer.style.flexDirection = 'column';
        pauseMenuContainer.style.justifyContent = 'center';
        pauseMenuContainer.style.alignItems = 'center';
        pauseMenuContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        pauseMenuContainer.style.zIndex = '2000'; // Asegura que esté encima del canvas

        // Mensaje de pausa
        const pauseMessage = document.createElement('p');
        pauseMessage.innerText = "El juego está en pausa. Puedes reanudar o reiniciar.";
        pauseMessage.style.color = 'white';
        pauseMessage.style.fontSize = '50px';
        pauseMessage.style.fontWeight = 'bold';
        pauseMessage.style.textAlign = 'center';
        pauseMessage.style.marginBottom = '20px';
        pauseMessage.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        pauseMessage.style.padding = '10px';
        pauseMessage.style.borderRadius = '10px';

        // Botón de reanudar
        const resumeButton = document.createElement('button');
        resumeButton.style.backgroundImage = 'url("Assets/Button/Reanudar.png")';
        resumeButton.style.backgroundSize = '100% 100%';
        resumeButton.style.backgroundRepeat = 'no-repeat';
        resumeButton.style.backgroundPosition = 'center';
        resumeButton.style.width = '155px';
        resumeButton.style.height = '70px';
        resumeButton.style.border = 'none';
        resumeButton.style.cursor = 'pointer';
        resumeButton.style.color = 'transparent';
        resumeButton.style.marginBottom = '10px'; // Espaciado entre botones

        // Botón de reiniciar
        const restartButton = document.createElement('button');
        restartButton.style.backgroundImage = 'url("Assets/Button/Restart.png")';
        restartButton.style.backgroundSize = '100% 100%';
        restartButton.style.backgroundRepeat = 'no-repeat';
        restartButton.style.backgroundPosition = 'center';
        restartButton.style.width = '155px';
        restartButton.style.height = '70px';
        restartButton.style.border = 'none';
        restartButton.style.cursor = 'pointer';

        // Evento de clic para reanudar el juego
        resumeButton.addEventListener('click', () => {
            this.scene.resume(); // Reanudar la escena
            pauseMenuContainer.remove(); // Eliminar el menú de pausa
        });

        // Evento de clic para reiniciar el juego
        restartButton.addEventListener('click', () => {
            this.scene.restart(); // Reiniciar la escena
            pauseMenuContainer.remove(); // Eliminar el menú de pausa
        });

        // Añadir el mensaje y los botones al contenedor del menú
        pauseMenuContainer.appendChild(pauseMessage);
        pauseMenuContainer.appendChild(resumeButton);
        pauseMenuContainer.appendChild(restartButton);

        // Añadir el menú al cuerpo del documento
        document.body.appendChild(pauseMenuContainer);
    }



    colorCell() {
        // Asumiendo que tienes una lógica que obtiene el cuadro que debe ser coloreado
        // Ejemplo: this.selectedSquare = el cuadro seleccionado por el usuario
        if (this.selectedSquare && this.selectedSquare.isEditable) {
            this.selectedSquare.memorySelection = this.selectedColor; // Asignamos el color al cuadro
            console.log(`Cuadro seleccionado: ${this.selectedSquare.memorySelection}`);
        }
    }


    checkPuzzleCompletion() {
        let allSelected = true;

        this.imges.forEach(row => {
            row.forEach(square => {
                if (square.isEditable) {
                    const hasSelection = square.memorySelection !== null; // Verifica si hay un color seleccionado
                    console.log(`Cuadro editable: ${square.isEditable}, Seleccionado: ${hasSelection}`);
                    if (!hasSelection) {
                        allSelected = false;
                    }
                }
            });
        });

        this.isPuzzleCompleted = allSelected; // Actualiza el estado del rompecabezas (todos seleccionados)
        console.log("Estado del rompecabezas (todo seleccionado):", this.isPuzzleCompleted);

        this.updateFinishButtonVisibility(); // Actualiza la visibilidad del botón
    }


    updateFinishButtonVisibility() {
        if (this.isPuzzleCompleted) {
            console.log("Mostrando el botón 'terminar'...");
            this.restartButton.setVisible(true); // Muestra el botón si todos los cuadros editables están seleccionados
        } else {
            console.log("Ocultando el botón 'terminar'...");
            this.restartButton.setVisible(false); // Oculta el botón si hay cuadros sin seleccionar
        }
    }




    //Funcion de resize a landscape de la scena
    resizeLandscape(width, height) {
        const halfWidth = width / 11.5;
        const xOffset = width / 3;
        const halfHeight = height / 5;
        const yOffSet = height / 20

        const { text, imges, redButton, yellowButton, greenButton, lightGreenButton, darkBlueButton, blueButton, pinkButton, blackButton, orangeButton, brownButton } = this;
        text.setFontSize(`${halfHeight * 0.4}px`);

        for (var j = 0; j < imges.length; j++) {
            imges[j].forEach(img => img.resize(width * 0.08, height * 0.08, 34, 1.00))//ajusta el tamano de los bloques
            // eslint-disable-next-line 
            //                                                                    0.27     
            imges[j].forEach((img, index) => img.setPosition(xOffset + halfWidth * 0.25 * (index + 13), yOffSet + (halfHeight / 3.8 * (j + 2))))//ajustar en funcion de la posicion...
        }


        text.setPosition(width / 20, height * 0.02);
        text.setWordWrapWidth(width * 0.8);


        // Tamaño dinámico para los cubos basado en el ancho y alto de la pantalla
        const cubeSize = Math.min(width, height) * 0.11; // Tamaño relativo

        // Función para configurar botones con márgenes consistentes
        const configureButton = (button, xFactor, yFactor) => {
            const buttonWidth = cubeSize * 1.5; // Escala proporcional a los cubos
            const buttonHeight = cubeSize * 1.5;
            button.setPosition(width * xFactor, height * yFactor);
            scaleImage(button, buttonWidth, buttonHeight, 10, 1.3); // Ajustar tamaño del botón
        };

        // Posicionar los botones de colores de forma dinámica

        configureButton(redButton, 0.05, 0.35);
        configureButton(greenButton, 0.14, 0.35);
        configureButton(yellowButton, 0.23, 0.35);
        configureButton(darkBlueButton, 0.32, 0.35);
        configureButton(lightGreenButton, 0.41, 0.35);


        configureButton(blueButton, 0.05, 0.65);
        configureButton(brownButton, 0.14, 0.65);
        configureButton(pinkButton, 0.23, 0.65);
        configureButton(blackButton, 0.32, 0.65);
        configureButton(orangeButton, 0.41, 0.65);

        scaleImage(this.restartButton, this.scale.width / 9, this.scale.height / 9, 100, 2.3);
        this.restartButton.setPosition(this.scale.width - 300, this.scale.height - 70);


    }
}

export default PuzzleSceneRosa;