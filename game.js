var gamePattern = []
var userClickedPattern = []
var buttonColors = ["red", "blue", "green", "yellow"]
var blue_audio = new Audio("sounds/blue.mp3")
var green_audio = new Audio("sounds/green.mp3")
var red_audio = new Audio("sounds/red.mp3")
var yellow_audio = new Audio("sounds/yellow.mp3")
var wrong_audio = new Audio("sounds/wrong.mp3")
var level =0

function playSound(whichButton) {
  switch (whichButton) {
    case "blue":
      blue_audio.play();
      break;
    case "green":
      green_audio.play();
      break;
    case "red":
      red_audio.play();
      break;
    case "yellow":
      yellow_audio.play();
      break;

  }

}

function nextSequence() {
  level++;
  $("h1").text("Level "+level)
  var randomNumber = Math.floor(Math.random() * 4)
  var randonChoosenColor = buttonColors[randomNumber]
  gamePattern.push(randonChoosenColor)
  playSound(randonChoosenColor)
  $("#" + randonChoosenColor).fadeOut(100).fadeIn(100)
}


$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour)
  playSound(userChosenColour)
  animatePress(userChosenColour)
  checkAnswer(userClickedPattern.length -1)
})

function animatePress(currentColour){

  $("#"+currentColour).addClass("pressed")
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100)

}
var firstOrNot = 0
$(document).keypress(function (){
  if(firstOrNot == 0){
    firstOrNot =1
    level =0
    nextSequence()


  }

})
function startOver(){
  level = 0
  firstOrNot =0
  gamePattern =[]
  userClickedPattern =[]
}
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
    console.log(1)
    if(currentLevel == gamePattern.length -1){
      userClickedPattern =[]
      setTimeout(nextSequence , 1000)
      //nextSequence()
    }
  }
  else{
    wrong_audio.play()
    console.log(0)
    $("body").addClass("game-over")
    setTimeout(function(){
      $("body").removeClass("game-over")
    },200)
    startOver()
    $("h1").text("Game Over, Press Any Key to Restart")

  }

}
