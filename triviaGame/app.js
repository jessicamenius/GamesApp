$(document).ready(function () {
  //   console.log("hello");

  $("#submitBtn").on("click", function (e) {
    // console.log("hello");
    e.preventDefault();
    $("#button").html("");
  });

  $.ajax({
    type: "GET",
    url: `https://opentdb.com/api.php?amount=10`,
    dataType: "json",
  }).then(function (res) {
    console.log(res);
    console.log(res.results[0].question);
  });
});

// counter;

// window.timer = 100;
// var start = document.getElementById("start");

// start.addEventListener("click", function () {
//   displayTimer();
//   displayQuestion();
//   start.parentNode.removeChild(start);
// });

// function displayTimer() {
//   window.createTimer = setInterval(function () {
//     window.timer -= 1;
//     document.getElementById("timer").innerHTML =
//       "Time Remaning: " + window.timer;
//     if (window.timer === 0) {
//       endQuiz();
//     }
//   }, 1000);
// }
