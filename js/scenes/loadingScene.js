// create a new scene
let loadingScene = new Phaser.Scene('Loading');

loadingScene.preload = function() {

	//can show logo here beceause preloaded it in boot screen
	//appears preload function just means function done before everything else
	//and used to preload but if preloaded in previous scene can do anything in it
	//show Logo
	let welcome = this.add.sprite(0, 0, 'welcome').setOrigin(0,0);

    //progress bar background
  let bgBar = this.add.graphics();
  let barW = 150;
  let barH = 30;
  bgBar.setPosition(this.sys.game.config.width/2 - barW/2, this.sys.game.config.height/2 - barH/2);
  bgBar.fillStyle(0xF5F5F5, 1);
  bgBar.fillRect(0, 0, barW, barH);

  //progress bar
  let progressBar = this.add.graphics();
  progressBar.setPosition(this.sys.game.config.width/2 - barW/2, this.sys.game.config.height/2 - barH/2);
  //progressBar.fillStyle(0xF5F5F5, 1);
  //progressBar.fillRect(0, 0, barW, barH);

  //listen to the progress eevent
  this.load.on('progress', function(value){
    //clearing progress bar (so can draw again)
    progressBar.clear();

    //set style
    progressBar.fillStyle(0x9AD98D, 1);

    //draw rectangle
    progressBar.fillRect(0, 0, value * barW, barH)
  }, this);

	//listen to the progress eevent
	this.load.on('complete', function(){

    progressBar.visible = !progressBar.visible;
    bgBar.visible = !bgBar.visible;

		let hiUnicorn = this.add.sprite(this.sys.game.config.width - 200, this.sys.game.config.height - 200, 'hiUnicorn').setScale(0.9);


		//let hiUnicorn = this.add.sprite(this.sys.game.config.width + 100, this.sys.game.config.height + 100, 'hiUnicorn').setScale(0.5).setInteractive();


		//NOT WORKING TO DO ???? Want to animate unicorn
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
    this.load.image('leaderboardBtn', 'assets/memewars/leaderboardBtn.png');
    this.load.image('leaderboardBtn', 'assets/memewars/intro1.png');
    this.load.image('leaderboardBtn', 'assets/memewars/intro2.png');

  	
  	//Memes Spritesheet TO DO figure out better way of doing this
  	//load spritesheet
    this.load.spritesheet('memes', 'assets/memewars/memes.png', {
        frameWidth: 414,
        frameHeight: 477,
        margin: 1,
        spacing: 1
    });

};

loadingScene.create = function() {



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
    
};