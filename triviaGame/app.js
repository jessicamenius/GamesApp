$(document).ready(function () {
  var game = "trivia";
  window.localStorage.setItem("playGame", game);
  var score = 0;
  window.localStorage.setItem("score", score);
  setTimeout(function () {
    window.location.href = "./../highscores/highscores.html";
  }, 10000);


  var currentQuestion = 0;
  window.score = 0;

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

  $("#submitBtn").on("click", function (e) {
    e.preventDefault();
    $("#submitBtn").html("");
  });

  $.ajax({
    type: "GET",
    url: `https://opentdb.com/api.php?amount=10&category=9&type=multiple`,
    dataType: "json",
  }).then(function (res) {
    console.log(res);
    // console.log(res.results[0].question);

    var question = res.results[i].question

    var choices = res.results[i].incorrect_answers;
    choices.push(res.results[i].correct_answer);

    console.log(choices);

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

    shuffleChoices(choices);
    console.log(choices);

    function displayQuestion() {
      document.getElementById("question").innerHTML =
        question[currentQuestion].title;
      for (var i = 0; i < question[currentQuestion].choices.length; i += 1) {
        var button = document.createElement("button");
        button.type = "button";
        button.value = i;
        button.innerHTML = questions[currentQuestion].choices[i];
        button.addEventListener("click", function (event) {
          var buttonValue = event.target.value;
    
          if (buttonValue == questions[currentQuestion].answer) {
            // the answer is correct
            // add to their score here
            window.score += 1;
            document.getElementById("score").innerHTML = "Score: " + window.score;
          } else {
            // the answer is wrong
            window.timer -= 10;
            showAlert();
          }
    
          // move onto next question
          document.getElementById("answers").innerHTML = "";
        });
        };
  };
});
