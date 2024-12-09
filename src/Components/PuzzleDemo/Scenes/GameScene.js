import Phaser from 'phaser';

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Carga de la imagen del fondo
    this.load.image('background', '/Assets/GameScenes/PuzzleSbk.png');

    // Carga de las imágenes de los dibujos
    this.load.image('circle', '/Assets/Dibujos/circulo.png');
    this.load.image('rose', '/Assets/Dibujos/rosa.png');
    this.load.image('star', '/Assets/Dibujos/estrella.png');
    this.load.image('owl', '/Assets/Dibujos/buho.png');
    this.load.image('buttonBuho', '/Assets/Button/btnBuho.png');
    this.load.image('buttonCirculo', '/Assets/Button/btnCirculo.png');
    this.load.image('buttonEstrella', '/Assets/Button/btnEstrella.png');
    this.load.image('buttonRosa', '/Assets/Button/btnRosa.png');


    

  }

  create() {
    const background = this.add.image(0, 0, 'background').setOrigin(0, 0);
    background.displayWidth = this.sys.game.config.width; // Ajusta al ancho del canvas
    background.displayHeight = this.sys.game.config.height; // Ajusta al alto del canvas

    // Dimensiones del canvas
    const canvasWidth = this.sys.game.config.width;
    const canvasHeight = this.sys.game.config.height;

    const drawings = [
      { name: 'Círculo', key: 'circle' },
      { name: 'Rosa', key: 'rose' },
      { name: 'Estrella', key: 'star' },
      { name: 'Búho', key: 'owl' },
    ];

    const gridSpacing = canvasWidth / 4; // Ajusta el espaciado en función del ancho
    const startX = canvasWidth / 2.5; // Espaciado desde la izquierda
    const startY = canvasHeight / 4; // Espaciado desde la parte superior

    drawings.forEach((drawing, index) => {
      const x = startX + (index % 2) * gridSpacing;
      const y = startY + Math.floor(index / 2) * gridSpacing;

      const image = this.add.image(x, y, drawing.key).setInteractive();
      image.setScale(1); // Ajusta el tamaño de las imágenes

      // Ajusta la posición del texto
      const textYOffset = 200; // Cambia este valor para mover el texto
      this.add.text(x, y + textYOffset, drawing.name, { font: '30px Arial', color: '#000' }).setOrigin(0.5);

      // Evento al seleccionar
      image.on('pointerdown', () => {
        console.log(`Seleccionaste: ${drawing.name}`);
      });
    });

    this.createRedirectButton(1250, 915, 'buttonBuho', 'PuzzleSceneBuho'); 
    this.createRedirectButton(770, 430, 'buttonCirculo', 'PuzzleScene'); 
    this.createRedirectButton(1250, 430, 'buttonRosa', 'PuzzleSceneRosa'); 
    this.createRedirectButton(770, 915, 'buttonEstrella', 'PuzzleSceneEstrella'); 
  }

  
  createRedirectButton(x, y, buttonKey, sceneKey) {
    const button = this.add.image(x, y, buttonKey).setInteractive();
    button.setScale(0.5); // Ajusta el tamaño del botón

  
    button.setPosition(x, y);

    button.on('pointerdown', () => {
      console.log(`Redirigiendo a: ${sceneKey}`);
      this.scene.start(sceneKey); 
    });
  }


}

export default GameScene;
