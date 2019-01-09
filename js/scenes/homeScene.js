// create a new scene
let homeScene = new Phaser.Scene('Home');

homeScene.create = function(){
	
    //INTRO SCREENS BEFORE 
    let intro1 = this.add.sprite(0,0,'intro1').setInteractive();
    intro1.setOrigin(0,0);



    intro1.on('pointerdown', function(){
      
      let intro2 = this.add.sprite(0,0,'intro2').setInteractive();
      intro2.setOrigin(0,0);

      intro2.on('pointerdown', function(){
        this.scene.start('Game')
      }, this);

    }, this);


};