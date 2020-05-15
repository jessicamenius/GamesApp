$(document).ready(function () {
  $("#toggleBtn").on("click", function () {
    if ($("#toggleDisplay").attr("class") === "toggle toggleFalse") {
      $(".navbar").attr(
        "class",
        "navbar navbar-expand-lg navbar-dark bg-dark dark-mode"
      );
      $("body").attr("class", "dark-mode");
      $("#toggleDisplay").attr("class", "toggle toggleTrue");
      $(".card").attr("class", "card dark-mode border-white");
    } else {
      $(".navbar").attr(
        "class",
        "navbar navbar-expand-lg navbar-light light-mode"
      );
      $(".card").attr("class", "card light-mode");
      $("body").attr("class", "light-mode");
      $("#toggleDisplay").attr("class", "toggle toggleFalse");
    }
  });

  var game = "trivia";
  window.localStorage.setItem("playGame", game);
  var score = 0;

  var question = "";
  var choices = "";
  var answer = "";

  $("#submitBtn").on("click", function () {
    displayQuestion();
  });

  function doAjax(i) {
    $.ajax({
      type: "GET",
      url: `https://opentdb.com/api.php?amount=10&category=9&type=multiple`,
      dataType: "json",
    }).then(function (res) {
      console.log(res);

      question = res.results[i].question;
      choices = res.results[i].incorrect_answers;
      choices.push(res.results[i].correct_answer);
      answer = res.results[i].correct_answer;
      shuffleChoices(choices);
    });
  }

  function shuffleChoices(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  function displayQuestion() {
    for (var i = 0; i < 10; i++) {
      doAjax(i);
      $("#question").text(`${question}`);
      var button = document.createElement("button");
      button.type = "button";
      button.value = i;
      button.innerHTML = choices;
      button.addEventListener("click", function (event) {
        var buttonValue = event.target.value;
        if (buttonValue == answer) {
          window.score++;
          document.getElementById("score").innerHTML = "Score: " + window.score;
        }

        // move onto next question
        document.getElementById("answers").innerHTML = "";
      });
    }
  }
});
