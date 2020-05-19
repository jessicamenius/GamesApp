//sizes and time limits for each level
var defaults = {
  easy: {
    gridSize: 3,
    timeout: 1500,
  },
  medium: {
    gridSize: 4,
    timeout: 1300,
  },
  hard: {
    gridSize: 5,
    timeout: 1000,
  },
};
// variables for local storage
var playgame = "Reaction";
window.localStorage.setItem("playgame", playgame);

//variables for game
var intensity;
var time;

var score = 0;
var gameTimeout = 0;
var timeout = 0;
var correct = false;
var lastRandomRow = 0;
var lastRandomCell = 0;
var apiKey = "ne5Joz1LAIF9FLe8LEIb6bMrrVfVxST7";
var reactionTimes = [];

//timer to count down to take you to the highscores page
var timer = "";
function highScores() {
  timer = setTimeout(function () {
    window.location.href = "./../highscores/highscores.html";
  }, 5000);
}

$(document).ready(function () {
  clearCells();

  $("td").click(function () {
    clearTimeout(gameTimeout);
    correct = $(this).hasClass("cellselect");
    if (correct) {
      reactionTimes.push(parseInt((new Date().getTime() - time).toFixed(3)));
      score += 1;
      game(false);
    } else {
      endGame();
    }
  });

  $("#restart").on("click", function (e) {
    e.preventDefault();
    restart();
    clearTimeout(timer);
  });
});

function prepare(level) {
  countdown();
  intensity = level;
  switch (level) {
    case "easy":
      setTimeout(function () {
        start();
      }, 3000);
      break;
    case "medium":
      setTimeout(function () {
        start();
      }, 3000);
      break;
    case "hard":
      setTimeout(function () {
        start();
      }, 3000);
      break;
  }
}

function countdown() {
  var timer = 3;
  $(".level").hide();
  $(".countdown").show();
  $(".countdown").text(timer);

  setInterval(function () {
    if (timer > 1) {
      timer = timer - 1;
      $(".countdown").text(timer);
    }
  }, 900);
}

function start() {
  $("#selector").hide();
  var level = "#" + intensity;
  $(level).removeClass("hidden");
  $(level).addClass("selected");
  game(true);
}

function game(start) {
  clearCells();
  clearTimeout(gameTimeout);
  if (!correct && !start) endGame();
  else {
    correct = false;
    gameTimeout = 0;
    var level = defaults[intensity];
    timeout = level.timeout - score * level.gridSize;
    var randomRow = getRandom(level, lastRandomRow);
    lastRandomRow = randomRow;
    var randomCell = getRandom(level, lastRandomCell);
    lastRandomCell = randomCell;
    var row = $("#" + intensity + " tr").eq(randomRow - 1);
    $(row[0].cells[randomCell - 1]).addClass("cellselect");
    time = new Date().getTime();
    gameTimeout = setTimeout(function () {
      game(false);
    }, timeout);
  }
}

function getRandom(level, number) {
  var random = Math.floor(Math.random() * level.gridSize + 1);
  if (random === number) return getRandom(level, number);
  else return random;
}

function clearCells() {
  $("td").removeClass("cellselect");
}

function endGame() {
  $("#" + intensity).addClass("hidden");
  $("#" + intensity).removeClass("selected");
  $("#gameover .score").text(score);
  window.localStorage.setItem("score", score);
  $("#gameover .average").text(getAverage() + " seconds");
  $("#gameover").show();
  fastReaction();
  highScores();
}

//gets average reaction time
function getAverage() {
  var count = 0;
  $.each(reactionTimes, function (index, value) {
    count = count + value;
  });

  if (reactionTimes.length > 0)
    return (count / reactionTimes.length / 1000).toFixed(2);
  else return 0;
}
// restarts the game
function restart() {
  intensity = null;
  correct = false;
  timeout = 0;
  score = 0;
  lastRandomCell = 0;
  lastRandomCell = 0;
  time = 0;
  reactionTimes = [];
  $("#gameover").hide();
  $(".level").show();
  $(".countdown").hide();
  $("#selector").show();
}
//function to show giphy at the end of game
function fastReaction() {
  $.ajax({
    type: "GET",
    url: `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=slow`,
    dataType: "JSON",
  }).then(function (res) {
    console.log(res);
    var gif =
      res.data[Math.floor(Math.random() * res.data.length)].images.original.url;
    $("#giphy").html(`<img class="gif"  data-gif=${gif} src=${gif}></img>`);
  });
}
