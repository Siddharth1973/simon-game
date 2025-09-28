var buttonColorArray = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function(){
    //start the game
    //game starts only when started is false
    //after the game starts change the value of started to true
    //so that the game does not restart on every keypress
    if(!started){
    nextSequence();
    started = true;
    }
});

function nextSequence() {
//generate a random number between 0-3
        var randomNumber = Math.floor(Math.random() * 4);
        //add the random color to the game pattern
        var randomChosenColor = buttonColorArray[randomNumber];
        gamePattern.push(randomChosenColor);
        //animate the buttun
        animatePress(randomChosenColor);
        //play sound of random color
        playSound(randomChosenColor);
        //change the level title
        $("#level-title").text("Level " + (level + 1));
        level++;
       
   //nextSequence(); 

        
    }







        $(".btn").click(function () {
            //game starts only when started is true
            if(started===true){
            //get the id of the button clicked
            var userChosenColor = $(this).attr("id");
            //add the color to the userClickedPattern
            userClickedPattern.push(userChosenColor);
            animatePress(userChosenColor);
            playSound(userChosenColor);
            //call checkAnswer function after user has clicked and chosen thheir answer 
            checkAnswer(userClickedPattern.length-1);
            }
        });


function checkAnswer(currentLevel) {
   
   //check if the value of userClickedPattern at index currentLevel is equal to the value of gamePattern at index currentLevel
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel])
             {
      //check if the length of userClickedPattern is equal to the length of gamePattern
            if (userClickedPattern.length === gamePattern.length) {
                //reset the userClickedPattern to an empty array
                userClickedPattern.length = 0;
                //call nextSequence after 1 second
                setTimeout(function () {
                    nextSequence();
                }, 1000);
               
            }
           

        } else {
            //it triggered when the user gets the answer wrong
            // console.log(userClickedPattern);
            // console.log(gamePattern);

            $(".btn").off("click");
            //add the game-over class to the body
            $("body").addClass("game-over");

            //remove the game-over class after 1 second
            setTimeout(function () {
                $("body").removeClass("game-over");
            }, 1000);
            //change the h1 to "Game Over, Press enter Any Key to Restart"
            $("#level-title").text("Game Over, Press enter Any Key to Restart");
            //play the sounds/wrong.mp3 sound
            playSound("wrong");
            level = 0;
            //reset the gamePattern and userClickedPattern to empty arrays
            gamePattern.length = 0;
            userClickedPattern.length = 0;
            started = false;
            
        }
        
        
    }

  














function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}


function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

