class Game 
{
  constructor() 
  {

  }

  getState() //This function reads the gameState variable's value from the database
  {
    var gamestateRef = db.ref("gameState");
    gamestateRef.on("value", function(data){gameState = data.val();});
  }

  updateState(state) //This function writes playerCount variable's value into the database
  {
    db.ref("/").update({gameState: state});
  }

  start() 
  {
    form = new Form();
    form.display();
    
    player = new Player();

    playerCount = player.getCount();
    
    car1 = createSprite(width/2 - 50, height - 100);
    car1.addImage(car1Img);
    car1.scale = 0.07;

    car2 = createSprite(width/2 + 50, height - 100);
    car2.addImage(car2Img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements()
  {
    form.hideForm();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect"); 
  }

  play()
  {
    this.handleElements();
    Player.getPlayersInfo();

    if(allPlayers !== undefined)
    {
      image(trackImg, 0, -height*5, width, height*6);
      
      var index = 0;
      for(var plr in allPlayers) //for-in loop extracts the value from the javascript object
      {
        index = index + 1;
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;
        cars[index - 1].position.x = x; //To give x-position to the car when game is in play state
        cars[index - 1].position.y = y; //To give y-position to the car when game is in play state

        if(index === player.index)
        {
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          camera.position.x = cars[index - 1].position.x;
          camera.position.y = cars[index - 1].position.y;
        }
      }
      this.handlePlayerControls();
      drawSprites();
    }
  }

  handlePlayerControls()
  {
    if(keyIsDown(UP_ARROW))
    {
      player.positionY = player.positionY + 10;
      player.updatePosition();
    }
  }
};
