var mode = "lightMode";

$(document).ready(function () {
  var playgame = "trivia";
  window.localStorage.setItem("playgame", playgame);

  var questions = [];
  var currentQuestion = 0;
  var answers = [];
  var correctAnswer = [];
  var score = 0;

  $("#score").text(`Score: ${score}`);
  window.localStorage.setItem("score", score);

  $("#submitBtn").on("click", function () {
    $("#submitBtn").hide();
    $("#quiz").append(
      `<div class="card">
        <div class="card-body">
          <div id="question" class="center"></div>
        <div id="answers" class="list-group"></div>
        </div>
        </div>
      </div>`
    );

    $.ajax({
      type: "GET",
      url: `https://opentdb.com/api.php?amount=10&category=9&type=multiple`,
    }).then(function (res) {
      console.log(res);
      for (var i = 0; i < res.results.length; i++) {
        questions.push({
          question: res.results[i].question,
          answers: [
            ...res.results[i].incorrect_answers,
            res.results[i].correct_answer,
          ],
          correctAnswer: res.results[i].correct_answer,
        });
        shuffleChoices(questions[i].answers);
      }

      function displayQuestions() {
        $("#question").html("");
        $("#answers").html("");

        $("#question").html(questions[currentQuestion].question);

        for (var i = 0; i < questions[currentQuestion].answers.length; i++) {
          $("#answers").append(
            '<button onclick="verifyAnswer()" value="' +
              questions[currentQuestion].answers[i] +
              '">' +
              questions[currentQuestion].answers[i] +
              "</button>"
          );
        }
      }
      displayQuestions();

      function verifyAnswer() {
        var userAnswer = event.target.value;
        var correctAnswer = questions[currentQuestion].correct_answer;

        if (userAnswer === correctAnswer) {
          window.score++;
          document.getElementById("score").innerHTML = "Score: " + window.score;

          currentQuestion++;
        }
        console.log(userAnswer);
      }

      $("#answer").on("click", function () {
        for (var i = 0; i < 10; i++) {
          displayQuestions();
        }
      });

      verifyAnswer();
    });
  });
});

function shuffleChoices(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

function endGame() {
  $(".container").html("");
  window.localStorage.setItem("score", score);
  getGiphy("gameover");
  setTimeout(function () {
    window.location.href = "./../highscores/highscores.html";
  }, 5000);
}

function getGiphy(str) {
  var apiKey = "WEBIEMxP2gpqmX8BNbn1G6i6BYEtlVML";
  $.ajax({
    type: "GET",
    url: `http://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${str}`,
    dataType: "JSON",
  }).then(function (res) {
    var gif = res.data[randNumber(res.data.length)].images.original.url;
    $(".container").prepend(
      `<img src=${gif} class="img-fluid rounded mx-auto d-block mt-5"/>`
    );
  });
}
