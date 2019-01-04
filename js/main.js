// our game's configuration
let config = {
  type: Phaser.AUTO,
  width: 414,
  height: 736,
  scene: [bootScene, loadingScene, homeScene, gameScene],
  title: 'Virtual Pet',
  pixelArt: false,
  backgroundColor: 'ffffff'
};

// create the game, and pass it the configuration
let game = new Phaser.Game(config);
