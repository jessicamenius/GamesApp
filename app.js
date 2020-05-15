$(document).ready(function () {
  $("#toggleBtn").on("click", function () {
    if ($("#toggleDisplay").attr("class") === "toggle toggleFalse") {
      darkMode();
    } else {
      lightMode();
    }
  });

  if (window.localStorage.getItem("mode") === "light-mode") {
    lightMode();
  }
  if (window.localStorage.getItem("mode") === "dark-mode") {
    darkMode();
  }

  function darkMode() {
    window.localStorage.setItem("mode", "dark-mode");
    $(".navbar").attr(
      "class",
      "navbar navbar-expand-lg navbar-dark bg-dark dark-mode fixed-top"
    );
    $("body").attr("class", "dark-mode");
    $("#toggleDisplay").attr("class", "toggle toggleTrue");
    $(".card").attr("class", "card dark-mode border-white mt-5");
    $("#footer").attr("style", `background-color: #343A40; color: white;`);
  }

  function lightMode() {
    window.localStorage.setItem("mode", "light-mode");
    $(".navbar").attr(
      "class",
      "navbar navbar-expand-lg navbar-light light-mode fixed-top"
    );
    $(".card").attr("class", "card light-mode mt-5");
    $("body").attr("class", "light-mode");
    $("#toggleDisplay").attr("class", "toggle toggleFalse");
    $("#footer").attr("style", `background-color: #a641c9; color: black`);
  }
  newJoke();
  // function to create random dad joke
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
  // event listener to create new dad joke
  $("#joke").on("click", function (e) {
    e.preventDefault();
    newJoke();
  });
});
