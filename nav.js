$(document).ready(function () {
  $(".navbar").html(`    
  <a class="navbar-brand" href=".././Index/index.html">Games App</a>
<button
  class="navbar-toggler"
  type="button"
  data-toggle="collapse"
  data-target="#navbarSupportedContent"
  aria-controls="navbarSupportedContent"
  aria-expanded="false"
  aria-label="Toggle navigation"
>
  <span class="navbar-toggler-icon"></span>
</button>

<div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav mr-auto">
    <li class="nav-item active">
      <a class="nav-link" href=".././Index/index.html"
        >Home <span class="sr-only"></span></a
      >
    </li>
    <li class="nav-item dropdown">
      <a
        class="nav-link dropdown-toggle"
        href="#"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Games
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <a class="dropdown-item" href="../warcardgame/war.html">War</a>
        <a class="dropdown-item" href="../memorygame/memorygame.html"
          >Memory</a
        >
        <a class="dropdown-item" href="../trivia/trivia.html">Trivia</a>
        <a class="dropdown-item" href="../Snake/snake.html">Snake</a>
        <a class="dropdown-item" href="../reactiongame/reaction.html"
          >Reaction</a
        >
        <a class="dropdown-item" href="../tictactoe/tictactoe.html"
          >Tic Tac Toe</a
        >
      </div>
    </li>
    <li class="nav-item">
      <a class="nav-link" href=".././highscores/highscores.html">Highscores</a>
    </li>
  </ul>
</div>
<div id="toggleBtn" class="toggler">
  <div id="toggleDisplay" class="toggle toggleFalse"></div>
</div>`);

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
  if (window.localStorage.getItem("mode") === null) {
    lightMode();
  }

  function darkMode() {
    window.localStorage.setItem("mode", "dark-mode");
    $(".navbar").attr(
      "class",
      "navbar navbar-expand-lg navbar-dark bg-dark dark-mode"
    );
    $("body").attr("class", "dark-mode");
    $("#toggleDisplay").attr("class", "toggle toggleTrue");
    $(".card").attr("class", "card dark-mode border-white mt-5");
    $("#footer").attr("style", `background-color: #343A40; color: white;`);
    $("#war").attr("src", "./assets/warDark.png");
    $("#memory").attr("src", "./assets/memoryDark.png");
    $("#trivia").attr("src", "./assets/triviaDark.png");
    $("#snake").attr("src", "./assets/snakeDark.png");
    $("#reaction").attr("src", "./assets/reactionDark.png");
    $("#tictactoe").attr("src", "./assets/tictactoeDark.png");
    $(".dropdown-menu").attr("style", "background-color: #343A40;");
    $("table").attr("class", "table dark-mode");
  }

  function lightMode() {
    window.localStorage.setItem("mode", "light-mode");
    $(".navbar").attr(
      "class",
      "navbar navbar-expand-lg navbar-light light-mode"
    );
    $(".card").attr("class", "card light-mode mt-5");
    $("body").attr("class", "light-mode");
    $("#toggleDisplay").attr("class", "toggle toggleFalse");
    $("#footer").attr("style", `background-color: #a641c9; color: black`);
    $("#war").attr("src", "./assets/war.png");
    $("#memory").attr("src", "./assets/memory.png");
    $("#trivia").attr("src", "./assets/trivia.png");
    $("#snake").attr("src", "./assets/snake.png");
    $("#reaction").attr("src", "./assets/reaction.png");
    $("#tictactoe").attr("src", "./assets/tictactoe.png");
    $(".dropdown-menu").attr("style", "background-color: #a641c9;");
    $("table").attr("class", "table light-mode");
  }
});
