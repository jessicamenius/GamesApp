var toggleBtn = document.querySelector("#toggleBtn");
var toggleDisplay = document.querySelector("#toggleDisplay");
var toggleStatus;
toggleBtn.addEventListener("click", function () {
  toggleStatus = toggleDisplay.getAttribute("class");
  if (toggleStatus === "toggle toggleFalse") {
    document.body.setAttribute("class", "dark-mode");
    toggleDisplay.setAttribute("class", "toggle toggleTrue");
  } else {
    toggleDisplay.setAttribute("class", "toggle toggleFalse");
    document.body.setAttribute("class", "light-mode");
  }
});

$(document).ready(function () {
  console.log("hello");
  $("#toggleBtn").on("click", function () {
    if (toggleStatus === "toggle toggleFalse") {
      $(".navbar").attr(
        "class",
        "navbar navbar-expand-lg navbar-dark bg-dark dark-mode"
      );
      $(".card").attr("class", "card dark-mode border-white");
    } else {
      $(".navbar").attr(
        "class",
        "navbar navbar-expand-lg navbar-light light-mode"
      );
      $(".card").attr("class", "card light-mode");
    }
  });

  newJoke();

  function newJoke() {
    $.ajax({
      type: "GET",
      url: "https://icanhazdadjoke.com/",
      dataType: "json",
    }).then(function (res) {
      console.log(res);
      var joke = res.joke;
      $("#joke").html(joke);
    });
  }

  $("#joke").on("click", function (e) {
    e.preventDefault();
    newJoke();
  });
});
