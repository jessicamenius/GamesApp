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
      $(".navbar").attr(
        "class",
        "navbar navbar-expand-lg navbar-light light-mode"
      );
      $(".card").attr("class", "card light-mode");
      $("body").attr("class", "light-mode");
      $("#toggleDisplay").attr("class", "toggle toggleFalse");
    }
  });