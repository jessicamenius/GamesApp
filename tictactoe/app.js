function clickButton(event) {
  $(".item").click(function (event) {
    var thingClicked = this.innerHTML;
    console.log("0. this is: ", this);
    console.log("0. you clicked: ", thingClicked);
    var playerOne = getPlayerOne();
    if (playerOne === "X") {
      $(this).addClass("blue"); //playerOne is always blue
      $(this).html("X");
    }
    if (playerOne === "O") {
      $(this).addClass("blue"); //playerOne is always blue
      $(this).html("O");
    }
    playGame(); //call playGame after every click, to check for winner & whose turn
  });
}
clickButton(event);

function checkWhoseTurn() {
  //for this game, playerOne goes first
  var currentTurn;
  var redCount = getRedCount();
  console.log("checkWhoseTurn, redCount: ", redCount);
  var blueCount = getBlueCount();
  console.log("checkWhoseTurn, blueCount: ", blueCount);
  var playerOneTurn =
    !blueCount || redCount > blueCount || (blueCount && redCount == blueCount);
  var computerTurn = redCount < blueCount;
  if (playerOneTurn) {
    console.log("checkWhoseTurn: it is playerOne's turn");
    var notBlueOrRed = document.querySelectorAll(
      "div.item:not(.blue):not(.red)"
    );
    $(notBlueOrRed).removeClass("unclickable");
    $("#compTurn").removeClass("yellow blackText");
    $("#yourTurn").addClass("yellow blackText");
    currentTurn = "playerOneTurn";
    return currentTurn;
  }
  if (computerTurn) {
    console.log("checkWhoseTurn: it is computer's turn");
    //at the start of computer's turn...
    var allItems = document.querySelectorAll("div.item");
    $(allItems).addClass("unclickable"); //need to remove this on playerOne's turn
    $("#yourTurn").removeClass("yellow blackText");
    $("#compTurn").addClass("yellow blackText");
    setTimeout(computerTakeTurn, 1000); //call after 1 second...
    currentTurn = "computerTurn";
    return currentTurn;
  }
}

function computerTakeTurn() {
  var computer = getComputer();
  console.log("computerTakeTurn: computer is: ", computer);
  //see what items don't have blue or red
  var notBlueOrRed = document.querySelectorAll("div.item:not(.blue):not(.red)");
  console.log("computerTakeTurn: notBlueOrRed: ", notBlueOrRed);
  //choose one at random
  var randomItem =
    notBlueOrRed[Math.floor(Math.random() * notBlueOrRed.length)];
  console.log("computerTakeTurn: randomItem is: ", randomItem);
  //addClass red to that random item and show computer chose it
  $(randomItem).addClass("red unclickable");
  $(randomItem).html(computer);
  console.log("computerTakeTurn: computer clicked: ", randomItem);
  //after computer takes turn, call playGame...
  playGame(); //---------------this may cause infinite loop...
  //return randomItem //need to return something?
}

function setPlayerOne() {
  $("#playerForm input").on("change", function () {
    var playerOne = $("input[name='radio']:checked", "#playerForm").val();
    console.log(`player selected: ${playerOne}`);
    $("#playerForm").addClass("displayNone");
    $("#playerOne").html(
      `You are: <span id="playerOneSpan" class="yellow">${playerOne}</span>`
    );
    $("#gameInfo").removeClass("displayNone");
    $("#resetButton").removeClass("displayNone");
    $("#gameGrid").removeClass("displayNone");
  });
}
setPlayerOne();

function getPlayerOne() {
  if (document.getElementById("playerOneSpan") != null) {
    var playerOne = document.getElementById("playerOneSpan").innerHTML;
    console.log("getPlayerOne, playerOne is: ", playerOne);
    return playerOne;
  }
}

function getComputer() {
  var playerOne = getPlayerOne();
  if (playerOne === "X") {
    var computer = "O";
  } else {
    var computer = "X";
  }
  return computer;
}

function hardResetOnclick(event) {
  $("#resetButton").click(function (event) {
    console.log("hardResetOnclick: resetting game...");
    $("#playerForm").removeClass("displayNone");
    //console.log("reset: removing displayNone from playerForm")
    document.getElementById("playerForm").reset();
    //console.log("reset: resetting playerForm")
    //console.log("reset: replacing playerOne,gameResult,congratsOrSorry w/ empty")
    $("#playerOne, #gameResult, #congratsOrSorry").html("");
    //console.log("reset: adding class displayNone")
    $("#gameInfo, #gameGrid, #congratsOrSorry").addClass("displayNone");
    //console.log("reset: remove classes blue red gray unclickable")
    $(".item").removeClass("blue red gray unclickable");
    $(".item").html("X/O");
  });
}
hardResetOnclick();

function reset() {
  console.log("reset: resetting game, for new game...");
  $("#gameInfo").removeClass("displayNone");
  $("#gameResult, #congratsOrSorry").addClass("displayNone");
  $(".item").removeClass("blue red gray unclickable");
  $(".item").html("X/O");
}

function getRedCount() {
  var redCount = $("#gameGrid .red").length;
  return redCount;
}

function getBlueCount() {
  var blueCount = $("#gameGrid .blue").length;
  return blueCount;
}

function checkForWinner() {
  console.log("checking for winner...");
  var winner;
  var playerOne = getPlayerOne(); //playerOne is always blue!
  //console.log('checkForWinner, playerOne is: ', playerOne)

  var computer = playerOne === "X" ? "O" : "X";

  //there are 8 winningCombos:
  //three rows, three columns, two diagonals
  //refactor below.... this is not DRY!
  var blueWin1 = $("#one.blue, #two.blue, #three.blue").length === 3;
  var blueWin2 = $("#four.blue, #five.blue, #six.blue").length === 3;
  var blueWin3 = $("#seven.blue, #eight.blue, #nine.blue").length === 3;
  var blueWin4 = $("#one.blue, #four.blue, #seven.blue").length === 3;
  var blueWin5 = $("#two.blue, #five.blue, #eight.blue").length === 3;
  var blueWin6 = $("#three.blue, #six.blue, #nine.blue").length === 3;
  var blueWin7 = $("#one.blue, #five.blue, #nine.blue").length === 3;
  var blueWin8 = $("#seven.blue, #five.blue, #three.blue").length === 3;

  var redWin1 = $("#one.red, #two.red, #three.red").length === 3;
  var redWin2 = $("#four.red, #five.red, #six.red").length === 3;
  var redWin3 = $("#seven.red, #eight.red, #nine.red").length === 3;
  var redWin4 = $("#one.red, #four.red, #seven.red").length === 3;
  var redWin5 = $("#two.red, #five.red, #eight.red").length === 3;
  var redWin6 = $("#three.red, #six.red, #nine.red").length === 3;
  var redWin7 = $("#one.red, #five.red, #nine.red").length === 3;
  var redWin8 = $("#seven.red, #five.red, #three.red").length === 3;

  //var winningCombos = [x]
  //refactor below too... not DRY at all!!!
  //note: playerOne is always blue
  var blueWins =
    blueWin1 ||
    blueWin2 ||
    blueWin3 ||
    blueWin4 ||
    blueWin5 ||
    blueWin6 ||
    blueWin7 ||
    blueWin8;

  var redWins =
    redWin1 ||
    redWin2 ||
    redWin3 ||
    redWin4 ||
    redWin5 ||
    redWin6 ||
    redWin7 ||
    redWin8;

  var redCount = getRedCount();
  //console.log('redCount is: ', redCount)
  var blueCount = getBlueCount();
  //console.log('blueCount is: ', blueCount)
  var fullGrid = redCount + blueCount;
  console.log("fullGrid is: ", fullGrid);

  var draw = fullGrid === 9 && !blueWins && !redWins;

  if (blueWins) {
    //playerOne is always blue
    winner = blueWins;
    console.log(`${playerOne} wins!`);
    $("#gameResult, #congratsOrSorry").removeClass("displayNone");
    $("#gameResult").html(`<span class='yellowBig'>${playerOne} wins!</span>`);
    $("#congratsOrSorry").html(
      "<span class='yellow'>Congratulations! You won!</span>"
    );
    $("#gameInfo").addClass("displayNone");
    disableRemainingItems();
    return winner;
  }
  if (redWins) {
    //red is computer
    winner = redWins;
    console.log(`${computer} wins!`);
    $("#gameResult, #congratsOrSorry").removeClass("displayNone");
    $("#gameResult").html(`<span class='redBig'>${computer} wins!</span>`);
    $("#congratsOrSorry").html("<span class='red'>Sorry, you lost.</span>");
    $("#gameInfo").addClass("displayNone");
    disableRemainingItems();
    return winner;
  }
  if (draw) {
    winner = draw;
    console.log("Draw game!");
    $("#gameResult, #congratsOrSorry").removeClass("displayNone");
    $("#gameResult").html(`<span class='redBig'>Game is a draw.</span>`);
    $("#congratsOrSorry").html("<span>Game ended in a draw.</span>");
    $("#gameInfo").addClass("displayNone");
    disableRemainingItems();
    return winner;
  } else {
    console.log("game on...");
  }
}

function disableRemainingItems() {
  var notBlueOrRed = document.querySelectorAll("div.item:not(.blue):not(.red)");
  $(notBlueOrRed).addClass("gray");
  $(notBlueOrRed).html("¯\\_(ツ)_/¯");
  $(notBlueOrRed).addClass("unclickable");
  return;
}

function playGame() {
  console.log("play game!");
  var winner = checkForWinner();
  if (!winner) {
    console.log("no winner yet...");
    checkWhoseTurn();
  }
  if (winner) {
    console.log("game over, resetting game");
    setTimeout(reset, 3000); //call reset after 3 seconds...
  }
}
playGame();
