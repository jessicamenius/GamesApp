var defaults = {
  easy: {
    gridSize: 3,
    timeout: 1800,
  },
  medium: {
    gridSize: 4,
    timeout: 1500,
  },
  hard: {
    gridSize: 5,
    timeout: 1200,
  },
};

var intensity;
var time;

var score = 0;
var highscore = 0;
var gameTimeout = 0;
var timeout = 0;
var correct = false;
var lastRandomRow = 0;
var lastRandomCell = 0;
var reactionTimes = [];

$(function () {
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

  $("svg").click(function () {
    if ($("#selector").is(":hidden")) {
      $("#selector").show();
      $("#howtoplay").hide();
    } else {
      $("#selector").hide();
      $("#howtoplay").show();
    }
  });
});

function prepare(level) {
  $("svg").hide();
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

function highlight(count) {
  unhighlight();
  $(".levelicon").each(function (index) {
    var itemCount = index + 1;
    var backgroundColour = getBackgroundColour(count);
    if (itemCount <= count) $(this).css("background-color", backgroundColour);
  });
}

function unhighlight() {
  $(".levelicon").each(function () {
    $(this).css("background-color", "#555555");
  });
}

function getBackgroundColour(count) {
  switch (count) {
    case 1:
      return "#59DB28";
    case 2:
      return "#F6B921";
    case 3:
      return "#CA0424";
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
  }, 1000);
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
  if (score > highscore) {
    highscore = score;
  }
  $("#" + intensity).addClass("hidden");
  $("#" + intensity).removeClass("selected");
  $("#gameover .score").text(score);
  $("#gameover .average").text(getAverage() + " seconds");
  $("#gameover .highscore").text(highscore);
  $("#gameover").show();
}

function getAverage() {
  var count = 0;
  $.each(reactionTimes, function (index, value) {
    count = count + value;
  });

  if (reactionTimes.length > 0)
    return (count / reactionTimes.length / 1000).toFixed(2);
  else return 0;
}

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
  $("svg").show();
  $(".level").show();
  $(".countdown").hide();
  $("#selector").show();
}
