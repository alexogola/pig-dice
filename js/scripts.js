/// Bussiness logic
var whoIsPlaying = []
var turnRollArray = []

function Player(playerName, score) {
  this.playerName= playerName;
  this.score = score;
  whoIsPlaying.push(this);
}


Array.prototype.sum = function() {
  return this.reduce(function(a,b) {return a + b});
}



// UI logic
$(document).ready(function() {
  // Player name submit button
  $("#signupForm").submit(function(event) {
    event.preventDefault();
    // debugger;
    var player1Name = $("#player1Name").val();
    var player2Name = $("#player2Name").val();
    var player1 = new Player(player1Name, 0);
    var player2 = new Player(player2Name, 0);
    $("#playerOnePlays").text(whoIsPlaying[0].playerName + "'s turn").show();
    showNamesAndScores();
    $("#signupForm").hide();
    $(".gameInterface").show();
    document.getElementById("newGameButton").style.visibility = "visible";
  });

  $("#roll").click(function(event) {
    $( "#dice" ).remove();
    event.preventDefault();
    $("#rollPoints").show();
    $(".showtotalRollScore").show();
    var randomRoll = (1 + Math.floor(Math.random() * 6));
    $("#rollPoints").text(randomRoll);
    if (randomRoll >= 2) {
      turnRollArray.push(randomRoll);
      $("#totalRollScore").text(turnRollArray.sum());
    } else {
      rollOneChangePlayers();
    }
  });

// player 1
  $("#hold").click(function(event){
    changePlayers();
    if (whoIsPlaying[0].score >= 100){
      alert(whoIsPlaying[0].playerName + " wins!!");
      document.location.reload(true);
    } else if (whoIsPlaying[1].score >= 100) {
      alert(whoIsPlaying[1].playerName + " wins!!");
      document.location.reload(true);
  }
  });

  function showNamesAndScores() {
    $("#playerOneName").text(whoIsPlaying[0].playerName);
    $("#playerTwoName").text(whoIsPlaying[1].playerName);
    $("#playerOneTotalScore").text(whoIsPlaying[0].score);
    $("#playerTwoTotalScore").text(whoIsPlaying[1].score);
  }

  function rollOneChangePlayers() {
      if ($("#playerOnePlays").is(":visible")) {
        $('#highlights').show();
        turnRollArray = [0];
        $("#totalRollScore").text(turnRollArray);
        setTimeout(function() { $("#highlights").html("YOU ROLLED A 1- NO POINTS!!"); }, 50 );
        $('#highlights').fadeOut(4000);
        setTimeout(function() {$("#playerTwoPlays").text(whoIsPlaying[1].playerName + "'s turn").show();}, 100 );
        $("#playerOnePlays").hide();
        showNamesAndScores();
          }
      else if ($("#playerTwoPlays").is(":visible")){
        $('#highlights').show();
        turnRollArray = [0];
        $("#totalRollScore").text(turnRollArray);
        setTimeout(function() { $("#highlights").html("YOU ROLLED A 1- NO POINTS!!"); }, 50 );
        $('#highlights').fadeOut(10);
        setTimeout(function() {$("#playerOnePlays").text(whoIsPlaying[0].playerName + "'s turn").show();}, 100 );
        $("#playerTwoPlays").hide();
        showNamesAndScores();
      }
    }

  function changePlayers() {
    if ($("#playerOnePlays").is(":visible")) {
      $('#highlights').show();
      whoIsPlaying[0].score = (whoIsPlaying[0].score += turnRollArray.sum());
      $("#highlights").html("Congrats, " + whoIsPlaying[0].playerName + ", you got " + turnRollArray.sum() +  " points!");
      $('#highlights').fadeOut(4000);
      turnRollArray = [0];
      $("#totalRollScore").text(turnRollArray)
      $("#playerOnePlays").hide();
      $("#playerTwoPlays").text(whoIsPlaying[1].playerName + "'s turn").show();
      console.log(whoIsPlaying[0].score);
      showNamesAndScores();
    } else {
      $('#highlights').show();
      $("#highlights").html("Congrats, " + whoIsPlaying[1].playerName + ", you got " + turnRollArray.sum() +  " points!");
      $('#highlights').fadeOut(4000);
      whoIsPlaying[1].score = (whoIsPlaying[1].score += turnRollArray.sum());
      turnRollArray = [0];
      $("#totalRollScore").text(turnRollArray)
      $("#playerTwoPlays").hide();
      $("#playerOnePlays").text(whoIsPlaying[0].playerName + "'s turn").show();
      showNamesAndScores();
      console.log(whoIsPlaying[1].score);
      }
    }
});
