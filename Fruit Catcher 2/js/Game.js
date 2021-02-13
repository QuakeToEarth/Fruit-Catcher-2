class Game{
    constructor(){

    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }
    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);
    players=[player1,player2];

        }
    
    play(){
        
        form.hide();

        Player.getPlayerInfo();
        image(back_img, 0, 0, 1000, 800);
        var x =100;
        var y=200;
        var index =0;
        drawSprites();
        var v = 50
        for(var plr in allPlayers){
        
            index = index+1;
            x = 500-allPlayers[plr].distance;
            y=500;
            
            players[index -1].x = x;
            players[index - 1].y = y;
             textSize(25)
            text(allPlayers[plr].name,x-40,y+30)
            text(allPlayers[plr].name + " : "+ allPlayers[plr].score,50,v)
            v = v + 50
        }


      if(keyIsDown(RIGHT_ARROW))
      {
          player.distance = player.distance - 10
          player.update()
      }
      if(keyIsDown(LEFT_ARROW))
      {
          player.distance = player.distance + 10
          player.update()
      }
        if (frameCount % 20 == 0)
        {

        
        fruits = createSprite(random(20,980),0.50,50)
        fruits.velocityY = 3
        var a  = Math.round(random(1,5))
        switch(a)
        {
            case 1:fruits.addImage(fruit1_img)
            break
            case 2:fruits.addImage(fruit2_img)
            break
            case 3:fruits.addImage(fruit3_img)
            break
            case 4:fruits.addImage(fruit4_img)
            break
            case 5:fruits.addImage(fruit5_img)
            break
        }
        fruits.lifetime = 250
        fruitGroup.add(fruits)
        }
        console.log(fruitGroup.length)
        for(var i  = 0 ; i < fruitGroup.length; i = i+1)
        {
            var s = fruitGroup.get (i)
            if(s.isTouching(players))
            {
                fruitGroup.get(i).destroy()
                player.score = player.score + 1
                player.update()
            }
        }
    }
    
    end(){
       console.log("Game Ended");
    }
}