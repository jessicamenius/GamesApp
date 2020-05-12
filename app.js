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
