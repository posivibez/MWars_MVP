// create a new scene
let bootScene = new Phaser.Scene('Boot');

bootScene.preload = function() {
	this.load.image('welcome', 'assets/memewars/bootScene/welcome.png');
	this.load.image('hiUnicorn', 'assets/memewars/bootScene/hiUnicorn.png');

};

bootScene.create = function(){
	this.scene.start('Loading');
}

