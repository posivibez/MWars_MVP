// create a new scene
let gameScene = new Phaser.Scene('Game');

// some parameters for our scene
gameScene.init = function() {
    //game stats
    this.stats = {
        coins: 500,
        time: 60
    };

    //decay parameters

    this.decayRates = {
      time: -1
    };

    //variable to track which meme 
    this.memeCount = 0;

    //array containing the vote record
    this.memeStats = [-1, -1, -1, -1, -1, -2, -2, -3, -3, -3, -3, -3];
    
};

// executed once, after assets were loaded
gameScene.create = function() {
    
    let bg = this.add.sprite(0,0,'background');
    bg.setOrigin(0,0);

    //event listener for bg
    
    this.meme = this.add.sprite(this.sys.game.config.width/2, (this.sys.game.config.height/2) - 50, 'memes', 0).setInteractive();

    //TO DO ADD SWIPE EFFECT HERE
    //when meme clicked changeMeme
    //this.meme.on('pointerdown', this.changeMeme, this);
    
    //make pet draggable
    this.input.setDraggable(this.meme);
    
    //follow pointer (mouse or finger)
    //applicable to any gameobject?
    this.input.on('drag',function(pointer, gameObject, dragX, dragY){
        //make sprite located at coordinates of dragging
        gameObject.x = dragX;
        gameObject.y = dragY;
        
    })
    
    //create ui
    this.createUi();

    //show stats to the user
    this.createHud();

    //update text in HUD
    this.refreshHud();

    //decay of health and fun over time
    this.timedEventStats = this.time.addEvent({
      delay: 1000,
      repeat: -1, //it will repeat forever
      callback: function(){

        //update stats
        this.updateStats(this.decayRates);

      },
      callbackScope: this
    });
    
};

gameScene.createUi = function() {
    
    //meme wars buttons

    //DOWNVOTE
    this.downVote = this.add.sprite((this.sys.game.config.width/2) - 50, 600, 'downVote').setInteractive();
    
    //DELETE IF WORKING
    //this.downVote.customStats = {coins: 100};
    
    this.downVote.on('pointerdown', this.pickBtn);

    
    //UPVOTE
    this.upVote = this.add.sprite((this.sys.game.config.width/2) + 50, 600, 'upVote').setInteractive();
    
    //DELETE IF WORKING
    //this.upVote.customStats = {coins: -100};
    
    this.upVote.on('pointerdown', this.pickBtn);

    //array with all buttons

    this.buttons = [this.downVote, this.upVote];
    
    //ui is not blocked
    this.uiBlocked = false;

    //refresh ui
    this.uiReady();
};


//PickBtn Function after up/down vote pressed checks that the UI is available and then changes to transparent
gameScene.pickBtn = function() {

  //the ui can't be blocked
  if(this.scene.uiBlocked) return;

  //make sure the ui is ready
  this.scene.uiReady();

  //select item (PUTTING sprite into scene so can use anywhere)
  this.scene.selectedBtn = this;

  //TO DO make both buttons dimmed out not just one you clicked on
  this.alpha = 0.5;
  this.scene.uiBlocked = true;

  this.scene.changeMeme();
};

//set UI to ready
gameScene.uiReady = function() {
  //nothing is being selected
  this.selectedBtn = null;

  //set all buttons to alpha 1
  for(let i = 0; i < this.buttons.length; i++){
    this.buttons[i].alpha = 1;
  }

  //scene must be unblocked
  this.uiBlocked = false;
};



gameScene.changeMeme = function(pointer, localX, localY) {

  //check that an item was selected
  if(!this.selectedBtn) return;

  if(this.selectedBtn.texture.key == 'downVote'){
      //meme movement off screen (tween)
      let memeTween = this.tweens.add({
        targets: this.meme,
        duration: 500,
        x: -500,
        y: 318,
        paused: false,
        callbackScope: this,
        onComplete: function(tween, sprites){
          this.showResult();

          }
        });
    } else {
      //meme movement off screen (tween)
      let memeTween = this.tweens.add({
        targets: this.meme,
        duration: 500,
        x: 700,
        y: 318,
        paused: false,
        callbackScope: this,
        onComplete: function(tween, sprites){

          this.showResult();
        }

      });
    }



  

};



//display the result of the players vote to them
gameScene.showResult = function(){

  //new variable to check if voted successful (1) or not (0);
  let result;


  if(this.selectedBtn.texture.key == 'downVote' && this.memeStats[this.memeCount] < 0){
    result = 1;
  } else if(this.selectedBtn.texture.key == 'downVote' && this.memeStats[this.memeCount] >= 0){
    result = 0;
  } else if(this.selectedBtn.texture.key == 'upVote' && this.memeStats[this.memeCount] < 0){
    result = 0;
  } else if(this.selectedBtn.texture.key == 'downVote' && this.memeStats[this.memeCount] >= 0){
    result = 1;
  }

  if(result == 1){

      //+100 coins if player voted right
      this.selectedBtn.customStats = {
        coins: 100
      };
      
      //adding yayResult
      this.yayResult = this.add.sprite(this.sys.game.config.width/2, this.sys.game.config.height/2 + 600, 'yayResult');

      //make everything else not visible      
      this.toggleHudVisibility();
      
      
      //adding yay animation
      let yayTween = this.tweens.add({
        targets: this.yayResult,
        duration: 300,
        x: 200,
        y: 338,
        paused: false,
        callbackScope: this,
        onComplete: function(tween, sprites){
            this.time.addEvent({
              delay: 1000,
              repeat: 0, //it will repeat forever
              callback: function(){
                this.yayResult.destroy();
                
                this.toggleHudVisibility();

                console.log(this.selectedBtn.customStats);
                //update stats
                this.updateStats(this.selectedBtn.customStats);
                this.uiReady();
                this.nextMeme();
        
              },
              callbackScope: this
            });
          }
        });

    } else {

      //-100 coins if player voted wrong
      this.selectedBtn.customStats = {
        coins: -100
      };
      

      this.sadResult = this.add.sprite(this.sys.game.config.width/2, -600, 'sadResult');

      //make everything else not visible
      
      this.toggleHudVisibility();

      //adding sad animation

      let sadTween = this.tweens.add({
        targets: this.sadResult,
        duration: 300,
        x: 200,
        y: 368,
        paused: false,
        callbackScope: this,
        onComplete: function(tween, sprites){
            this.time.addEvent({
              delay: 1000,
              repeat: 0, //it will repeat forever
              callback: function(){
                this.sadResult.destroy();
                
                this.toggleHudVisibility();

                console.log(this.selectedBtn.customStats);
                //update stats
                this.updateStats(this.selectedBtn.customStats);
                this.uiReady();
                this.nextMeme();
        
              },
              callbackScope: this
            });
          }
        });

    }



};

gameScene.toggleHudVisibility = function(){
      this.downVote.visible = !this.downVote.visible;
      this.upVote.visible = !this.upVote.visible;
      this.meme.visible = !this.meme.visible;
      this.coinsText.visible = !this.coinsText.visible;
};



//load in the next meme
gameScene.nextMeme = function(){
  
  this.memeCount++;


  //TO DO add that h/w of game itself
  //TO DO why is last frame not loading in spritesheet??
  //set to new meme
  this.meme.setFrame(this.memeCount);
  this.meme.setPosition(207,318);

  //clear UI
  this.uiReady();

};


//create the text elements that will show stats

gameScene.createHud = function(){


  //TO DO centering this text by hardcoding the text width couldnt figure out how to change origin point argh
  //# of coins player has
  this.coinsText = this.add.text(this.sys.game.config.width/2 - (115/2), this.sys.game.config.height - 50, 'Coins: 500', {
    font: '24px Karla',
    fill: '#ffffff'
  });


//time player has left
  this.timeText = this.add.text(this.sys.game.config.width/2 - (92/2), 20, '60', {
    font: '72px Karla',
    fill: '#ffffff'   
  });


};

//show current value of health and fun
gameScene.refreshHud = function(){
  this.coinsText.setText('Coins: ' + this.stats.coins);
  this.timeText.setText(this.stats.time);
};

//stat updater
gameScene.updateStats = function(statDiff){

  //flag see if game over
  let isGameOver = false;
  console.log(statDiff);

//cycling through the stats, updating them and checking if either is zero
//if coins or time is at zero then gameOver
  for(stat in statDiff){
          if(statDiff.hasOwnProperty(stat)) {
            this.stats[stat] += statDiff[stat];

            if(this.stats[stat] <= 0) {
              isGameOver = true;
              this.stats[stat] = 0;

            }

          }
        }

  //update HUD
  this.refreshHud();

  //check if gameover
  if(isGameOver) this.gameOver();



};

gameScene.gameOver = function() {
  console.log('game over');
  
  //block ui
  this.uiBlocked = true;

  //clear screen
  this.toggleHudVisibility();
  this.timeText.visible = false;
  this.meme.destroy();

  //LEADERBOARD

    let leaderboard = this.add.sprite(0,0,'leaderboard').setInteractive();
    leaderboard.setOrigin(0,0);

    leaderboard.on('pointerdown', function(){
      this.scene.start('Game');
    }, this);

};