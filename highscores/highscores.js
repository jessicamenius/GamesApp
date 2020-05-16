$(document).ready(function () {
  var mode = "light-mode";
  window.localStorage.setItem("mode", mode);
  var highScore = JSON.parse(window.localStorage.getItem("highScore")) || [];
  score = window.localStorage.getItem("score");
  playgame = window.localStorage.getItem("playgame");
  enterInitials();

  function enterInitials() {
    $("#showQuestion").text(`Your final score is ${score}`);
    $("#showOptions").append(`<div></div>`);
    $("#showOptions").append("<form id='form'></form>");
    $("#form").append(
      "<input id='name' autofocus type='text' class='mr-3' placeholder='Enter name here'></input>"
    );
    $("#form").append(
      "<input id='btnSubmit' type='submit' value='Submit' class='easy'></input>"
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
      <div class='d-inline float-right btn easy mb-2' id='resetHighScore'>RESET Score</div>
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
    $("#giphy").html(
      `<img class="gif mb-4 img-fluid" style="max-height: 300px; max-width: auto" data-gif=${gif} src=${gif}></img>`
    );
  });
});
