$(document).ready(function () {
  var questions = [];
  var currentQuestion = 0;
  var playgame = "Memory";
  window.localStorage.setItem("playgame", playgame);

​
  function shuffleChoices(array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
​
  function verifyAnswer(event) {
    // compare the answer
    var userAnswer = event.target.value;
    var correctAnswer = questions[currentQuestion].correctAnswer;
    if (userAnswer == correctAnswer) {
      window.score += 1;
      document.getElementById("score").innerHTML = "Score: " + window.score;
    }
    currentQuestion++;
    if (currentQuestion === questions.length - 1) {
      endGame("genius");
    } else {
      currentQuestion ++;
      displayQuestions();
    }
    function endGame() {
      $(".container").html("");
      window.localStorage.setItem("score", score);
      getGiphy("genius");
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
  }
​
  function displayQuestions() {
    $("#question").html("");
    $("#answers").html("");
    $("#question").html(questions[currentQuestion].question);
    for (var i = 0; i < questions[currentQuestion].answers.length; i++) {
      $("#answers").append(
        '<button class="btn-option"  value="' +
          questions[currentQuestion].answers[i] +
          '">' +
          questions[currentQuestion].answers[i] +
          "</button>"
      );
    }
  }
  
  $(document).on("click", ".btn-option", function(e){
    verifyAnswer(e)
  });
​
  $("#submitBtn").click(function () {
    $("#submitBtn").hide();
    $("#quiz").append(` <div class="card text-center">
    <div class="card-body" id="prompt_display">
    <div id="question"></div>
    <br>
    <ul id="answers" class="list-group">
    </ul>
    <p class="card-text"></p>
    <div id="alert"></div>
  </div>`);

    $("score").html(`Score: ${score}`);
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
      
      displayQuestions();
 
    });
    
  });
​
});
