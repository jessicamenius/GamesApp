var mode = "lightMode";

$(document).ready(function () {
  var playgame = "trivia";
  window.localStorage.setItem("playgame", playgame);

  var questions = [];
  var currentQuestion = 0;
  var answers = [];
  var correctAnswer = [];
  var score = 0;

  $("#submitBtn").on("click", function () {
    $("#submitBtn").hide();

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
          // 3 dots opens up array items and puts in a new array
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
            `<button> ${questions[currentQuestion].answers[i]} </button>`
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

//   function displayQuestion() {
//     $("#question").text(question);
//     console.log(choices);
//     for (var i = 0; i < 10; i++) {
//       var button = document.createElement("button");
//       button.type = "button";
//       button.value = i;
//       button.innerHTML = choices[i];
//       button.addEventListener("click", function (event) {
//         var buttonValue = event.target.value;

//         if (buttonValue == answer) {
//           // the answer is correct
//           // add to their score here
//           window.score++;
//           // document.getElementById("score").innerHTML = "Score: " + window.score;
//         }

//         // move onto next question
//         $("#answer").html("");

//         // last question
//         if (currentQuestion === question.length - 1) {
//           endQuiz();
//         } else {
//           currentQuestion += 1;
//           displayQuestion();
//         }
//       });
//       document.getElementById("answers").append(button);
//     }
//   }

//   function endQuiz() {
//     // clear the question
//     // save the score in localStorage
//     clearInterval(window.createTimer);
//     document.getElementById("question").innerHTML = "";
//     handleEndQuiz();
//   }
// });
