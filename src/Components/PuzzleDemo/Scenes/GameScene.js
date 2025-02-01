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
    this.load.image('salirButton', '/Assets/Button/salir.png');
  }

  create() {
    // Ajustar el fondo al tamaño de la pantalla
    this.add.image(this.scale.width / 2, this.scale.height / 2, 'background')
      .setOrigin(0.5, 0.5)
      .setDisplaySize(this.scale.width, this.scale.height);

    // Agregar botón de salir en la esquina superior izquierda
    const exitButton = this.add.image(50, 50, 'salirButton')
      .setScale(0.5)
      .setOrigin(0.5)
      .setInteractive();

    exitButton.on('pointerdown', () => {
      console.log('Saliendo a StartScene');
      this.scene.start('StartScene');
    });

    // Definir las imágenes y botones
    const drawings = [
      { name: 'Círculo', key: 'circle', buttonKey: 'buttonCirculo', scene: 'PuzzleScene' },
      { name: 'Rosa', key: 'rose', buttonKey: 'buttonRosa', scene: 'PuzzleSceneRosa' },
      { name: 'Estrella', key: 'star', buttonKey: 'buttonEstrella', scene: 'PuzzleSceneEstrella' },
      { name: 'Búho', key: 'owl', buttonKey: 'buttonBuho', scene: 'PuzzleSceneBuho' },
    ];

    // Configurar cuadrícula (2 columnas)
    const cols = 2;
    const gridSpacingX = this.scale.width * 0.4; // Espaciado horizontal
    const gridSpacingY = this.scale.height * 0.45; // Espaciado vertical
    const startX = this.scale.width * 0.3;
    const startY = this.scale.height * 0.2;

    drawings.forEach((drawing, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      const x = startX + col * gridSpacingX;
      const y = startY + row * gridSpacingY;

      // Agregar imagen
      const image = this.add.image(x, y, drawing.key).setScale(0.6).setOrigin(0.5).setInteractive();

      // Crear el botón debajo del texto
      const button = this.add.image(x, y + 150, drawing.buttonKey).setScale(0.5).setOrigin(0.5).setInteractive();

      // Acción al hacer clic en el botón
      button.on('pointerdown', () => {
        console.log(`Redirigiendo a: ${drawing.scene}`);
        this.scene.start(drawing.scene);
      });
    });
  }
}

export default GameScene;
