var mode = "lightMode";

$(document).ready(function () {
  var questions = [];
  var currentQuestion = 0;
  var score = 0;
  var timer = 100;

  var playgame = "War";
  window.localStorage.setItem("playgame", playgame);

  var playgame = "War";
  window.localStorage.setItem("playgame", playgame);

  function shuffleChoices(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  $("#submitBtn").click(function () {
    $("#submitBtn").hide();
    startTimer();


    function doAjax(){
      $.ajax({
        method: "GET",
        url: "https://opentdb.com/api.php?amount=10&category=9&type=multiple",
      }).then(function (res) {
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

      function verifyAnswer(event) {
        // compare the answer
        var userAnswer = event.target.value;
        var correctAnswer = questions[currentQuestion].correctAnswer;
        currentQuestion++;

        if (userAnswer == correctAnswer) {
          window.score++;
          $("#score").append("Score: " + window.score);
        }
      }
    }
    );
  });
});
