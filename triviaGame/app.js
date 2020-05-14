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
      $(".navbar").attr("class", "navbar navbar-expand-lg light-mode");
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
    console.log(res.results[0].question);

    for (i = 0; i < 11; i++) {
      $("#triviaGame").append(
        `<div class="card-header center">
        ${res.results[i].question}
      </div>
      <br>
      <ul class="list-group center">
        <li class="list-group-item">Answer 1</li>
        <br />
        <li class="list-group-item">Answer 2</li>
        <br />
        <li class="list-group-item">Answer 3</li>
        <br />
        <li class="list-group-item">Answer 4</li>
        <br>
      </ul>`
      );
    }
  });
});

function shuffleAnswers(array) {
  var i = array.length;
  var tempVal;
  var randI;
  while (0 !== i) {
    randI = randNumber(i);
    i -= 1;
    tempVal = array[i];
    array[i] = array[randI];
    array[randI] = tempVal;
  }
  return array;
}
