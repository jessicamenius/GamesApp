$(document).ready(function () {
  var highScore = JSON.parse(window.localStorage.getItem("highScore")) || [];
  score = window.localStorage.getItem("score");
  playgame = window.localStorage.getItem("playgame");
  var mode = "lightMode";
  enterInitials();
  $("#toggleBtn").on("click", function () {
    if ($("#toggleDisplay").attr("class") === "toggle toggleFalse") {
      darkMode();
    } else {
      lightMode();
    }
  });

  if (window.localStorage.getItem("mode") === "light-mode") {
    lightMode();
  }
  if (window.localStorage.getItem("mode") === "dark-mode") {
    darkMode();
  }

  function darkMode() {
    window.localStorage.setItem("mode", "dark-mode");
    $(".navbar").attr(
      "class",
      "navbar navbar-expand-lg navbar-dark bg-dark dark-mode fixed-top"
    );
    $("body").attr("class", "dark-mode");
    $("#toggleDisplay").attr("class", "toggle toggleTrue");
    $(".card").attr("class", "card dark-mode border-white mt-5");
    $("#footer").attr("style", `background-color: #343A40; color: white;`);
    $("#war").attr("src", "./assets/warDark.png");
    $("#memory").attr("src", "./assets/memoryDark.png");
    $("#trivia").attr("src", "./assets/triviaDark.png");
    $("#snake").attr("src", "./assets/snakeDark.png");
    $("#reaction").attr("src", "./assets/reactionDark.png");
    $("#tictactoe").attr("src", "./assets/tictactoeDark.png");
    $(".dropdwon-menu").attr("class");
  }

  function lightMode() {
    window.localStorage.setItem("mode", "light-mode");
    $(".navbar").attr(
      "class",
      "navbar navbar-expand-lg navbar-light light-mode fixed-top"
    );
    $(".card").attr("class", "card light-mode mt-5");
    $("body").attr("class", "light-mode");
    $("#toggleDisplay").attr("class", "toggle toggleFalse");
    $("#footer").attr("style", `background-color: #a641c9; color: black`);
    $("#war").attr("src", "./assets/war.png");
    $("#memory").attr("src", "./assets/memory.png");
    $("#trivia").attr("src", "./assets/trivia.png");
    $("#snake").attr("src", "./assets/snake.png");
    $("#reaction").attr("src", "./assets/reaction.png");
    $("#tictactoe").attr("src", "./assets/tictactoe.png");
  }
  newJoke();

  function newJoke() {
    $.ajax({
      type: "GET",
      url: "https://icanhazdadjoke.com/",
      dataType: "json",
    }).then(function (res) {
      console.log(res);
      var joke = res.joke;
      $("#joke").html(joke);
    });
  }

  $("#joke").on("click", function (e) {
    e.preventDefault();
    newJoke();
  });

  function enterInitials() {
    $("#showQuestion").text(`Your final score is ${score}`);
    $("#showOptions").append(`<div>Enter your name here</div>`);
    $("#showOptions").append("<form id='form'></form>");
    $("#form").append(
      "<input id='name' autofocus type='text' class='mr-3' placeholder='enter name here'></input>"
    );
    $("#form").append(
      "<input id='btnSubmit' type='submit' value='Submit' class='btn easy'></input>"
    );
    $(document).on("click", "#btnSubmit", function (e) {
      e.preventDefault();
      var $name = $("#name").val();

      if (!$name) {
        showPopup("Please enter a valid name", "info", score);
      } else {
        $("#name").val("");
        highScore.push({ $name, score, playgame });
        window.localStorage.setItem("highScore", JSON.stringify(highScore));
        showHighScore();
      }
    });
  }

  function showHighScore() {
    $("#showOptions").hide();
    $(document).on("click", "#resetHighScore", function () {
      window.localStorage.removeItem("highScore");
      highScore = null;
      insertHighScoreTable();
    });
    if (highScore !== null) {
      highScore.sort(function (a, b) {
        return b.score - a.score;
      });
    }
    insertHighScoreTable();
  }

  function insertHighScoreTable() {
    $("#showQuestion").html(
      `<div class='d-inline highScore'>HighScore</div>
      <div class='d-inline float-right btn' id='resetHighScore'>RESET Score</div>
      <table class='table'>
      <thead>
      <th scope='col'>Game</th>
      <th scope='col'>Name</th>
      <th scope='col'>Score</th>
      </thead>
      <tbody id='tbody'></tbody>
      </table>`
    );
    var showCount = 7;
    if (highScore !== null) {
      if (highScore.length < showCount) {
        showCount = highScore.length;
      }
      for (var i = 0; i < showCount; i++) {
        $("#tbody").append(
          `<tr id='tr${i}'></tr>
          <th scope='row'>${highScore[i].playgame}</th>
          <th>${highScore[i].$name}</th>
          <th>${highScore[i].score}</th>`
        );
      }
    }
  }
  var apiKey = "ne5Joz1LAIF9FLe8LEIb6bMrrVfVxST7";
  $.ajax({
    type: "GET",
    url: `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${playgame}`,
    dataType: "JSON",
  }).then(function (res) {
    console.log(res);
    var gif =
      res.data[Math.floor(Math.random() * res.data.length)].images.original.url;
    $("#giphy").html(`<img class="gif"  data-gif=${gif} src=${gif}></img>`);
  });
});
