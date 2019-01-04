// create a new scene
let loadingScene = new Phaser.Scene('Loading');

loadingScene.preload = function() {

	//can show logo here beceause preloaded it in boot screen
	//appears preload function just means function done before everything else
	//and used to preload but if preloaded in previous scene can do anything in it
	//show Logo
	let welcome = this.add.sprite(0, 0, 'welcome').setOrigin(0,0);

	//listen to the progress eevent
	this.load.on('complete', function(){

		let hiUnicorn = this.add.sprite(this.sys.game.config.width - 200, this.sys.game.config.height - 200, 'hiUnicorn').setScale(0.9);


		//let hiUnicorn = this.add.sprite(this.sys.game.config.width + 100, this.sys.game.config.height + 100, 'hiUnicorn').setScale(0.5).setInteractive();


		//NOT WORKING TO DO ???? 
		/*
		//pet movement (tween)
	  let unicornTween = this.tweens.add({
	    targets: this.hiUnicorn,
	    duration: 500,
	    x: 109,
	    y: 349,
	    paused: false,
	    callbackScope: this
	}, this);
	*/
	}, this);

	//Meme Wars Game Assets
	this.load.image('background', 'assets/memewars/background.png');
  	this.load.image('downVote', 'assets/memewars/downVote.png');
  	this.load.image('upVote', 'assets/memewars/upVote.png');
  	this.load.image('yayResult', 'assets/memewars/yayResult.png');
  	this.load.image('sadResult', 'assets/memewars/sadResult.png');
  	this.load.image('leaderboard', 'assets/memewars/TopScores.png');

  	
  	//Memes Spritesheet TO DO figure out better way of doing this
  	//load spritesheet
    this.load.spritesheet('memes', 'assets/memewars/memes.png', {
        frameWidth: 414,
        frameHeight: 477,
        margin: 1,
        spacing: 1
    });


  
  // TO DO REMOVE OLD ASSETS load assets
  this.load.image('backyard', 'assets/images/backyard.png');
  this.load.image('apple', 'assets/images/apple.png');
  this.load.image('candy', 'assets/images/candy.png');
  this.load.image('rotate', 'assets/images/rotate.png');
  this.load.image('toy', 'assets/images/rubber_duck.png');
    
    //load spritesheet
    this.load.spritesheet('pet', 'assets/images/pet.png', {
        frameWidth: 97,
        frameHeight: 83,
        margin: 1,
        spacing: 1
    });

/*
    //FOR TESTING ONLY
    for(let i = 0; i < 100; i++){
    	this.load.image('test' + i, 'assets/images/candy.png');
    }
    */
};

loadingScene.create = function() {

	//Animations can be GLOBAL put them in loading create function and then accessble
	//all across game in any scene
	//animation
    this.anims.create({
      key: 'funnyfaces',
      frames: this.anims.generateFrameNames('pet', {frames: [1, 2, 3]}),
        frameRate: 7,
        yoyo: true,
        repeate: 0 //to repeat forever: -1
    });

    this.scene.start('Game');
/*
//keep game on then move on
  this.time.addEvent({
      delay: 1000,
      repeat: 0, //it will repeat forever
      callback: function(){

      	//TO DO change to move to home scene to add in onboarding
        this.scene.start('Game');

      },
      callbackScope: this
    });
    */
};