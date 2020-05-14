$(document).ready(function () {
  console.log("hello");
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

  newJoke();
// function to create random dad joke in the footer
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
// eventListener to create new dad joke on click
  $("#joke").on("click", function (e) {
    e.preventDefault();
    newJoke();
  });
});
