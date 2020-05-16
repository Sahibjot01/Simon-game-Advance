var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed")
  setTimeout(function(){$("#"+currentColor).removeClass("pressed");},100);
}

$(".btn").click(function(event){
  var userChosenColor = event.target.id;
  animatePress(userChosenColor);
  playSound(userChosenColor);
  userClickedPattern.push(userChosenColor);
  CheckAnswer(userClickedPattern.length);

})



function nextSequence(){
  level ++;

  $("#level-title").text("Level "+level);

  var randomNumber = Math.round(Math.random()*3);
  var randomChosenColour = buttonColors[randomNumber];

  gamePattern.push(randomChosenColour);
  $("#"+ randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);



}

function CheckAnswer(currentLevel){
  currentLevel --;
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    // console.log("success");
    if(gamePattern.length === userClickedPattern.length){
    setTimeout(function(){
      nextSequence();
      userClickedPattern = [];
    },1000)
  }

  }
  else{
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key or Click Me to Restart");
    gameStarted = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
  }

}


$("body").keypress(function(event){
  if(!gameStarted){
    $("#level-title").text("Level "+level);
    nextSequence();
    gameStarted = true;
    }
})

$("#level-title").click(function(event){
  if(!gameStarted){
    $("#level-title").text("Level "+level);
    nextSequence();
    gameStarted = true;
    }
})
