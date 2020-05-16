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
      
          var button = document.createElement("button");
          button.type = "button";
          button.value = i;
          button.innerHTML = questions[currentQuestion].answers[i];
          button.addEventListener("click", function (event) {
            var userAnswer = event.target.value;
            var correctAnswer = questions[currentQuestion].correct_answer;

            if (userAnswer == correctAnswer) {
              // the answer is correct
              // add to their score here
              window.score += 1;
              document.getElementById("score").innerHTML = "Score: " + window.score;
            } else {
              // the answer is wrong
              displayQuestions();
            }
          }

function shuffleChoices(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
  
);
      };
    };
  });
});
