$(document).ready(function () {
  var playgame = "War";
  window.localStorage.setItem("playgame", playgame);
  var cardDeck = [
    "14C.jpg",
    "2C.jpg",
    "3C.jpg",
    "4C.jpg",
    "5C.jpg",
    "6C.jpg",
    "7C.jpg",
    "8C.jpg",
    "9C.jpg",
    "10C.jpg",
    "11C.jpg",
    "12C.jpg",
    "13C.jpg",
    "14D.jpg",
    "2D.jpg",
    "3D.jpg",
    "4D.jpg",
    "5D.jpg",
    "6D.jpg",
    "7D.jpg",
    "8D.jpg",
    "9D.jpg",
    "10D.jpg",
    "11D.jpg",
    "12D.jpg",
    "13D.jpg",
    "14H.jpg",
    "2H.jpg",
    "3H.jpg",
    "4H.jpg",
    "5H.jpg",
    "6H.jpg",
    "7H.jpg",
    "8H.jpg",
    "9H.jpg",
    "10H.jpg",
    "11H.jpg",
    "12H.jpg",
    "13H.jpg",
    "14S.jpg",
    "2S.jpg",
    "3S.jpg",
    "4S.jpg",
    "5S.jpg",
    "6S.jpg",
    "7S.jpg",
    "8S.jpg",
    "9S.jpg",
    "10S.jpg",
    "11S.jpg",
    "12S.jpg",
    "13S.jpg",
  ];
  var randNum = 0;
  var userDeck = [];
  var userSideDeck = [];
  var compDeck = [];
  var compSideDeck = [];
  var score = 0;
  var war = false;
  var warCard = 0;
  var gif = "";
  var apiKey = "WEBIEMxP2gpqmX8BNbn1G6i6BYEtlVML";
  $("#score").text(`Score: ${score}`);
  window.localStorage.setItem("score", score);

  function randNumber(num) {
    randNum = Math.floor(Math.random() * num);
    return randNum;
  }

  function shuffleCards(array) {
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

  function hideAlert() {
    $("#alert").attr("class", `alert`);
    $("#alert").text("");
  }

  function alert(str, type) {
    $("#alert").attr("class", `alert alert-${type}`);
    $("#alert").text(str);
    window.setTimeout(function () {
      hideAlert();
    }, 3000);
    $("#alert").on("click", function () {
      hideAlert();
    });
  }

  function startGame() {
    shuffleCards(cardDeck);
    // compDeck = [
    //   "11C.jpg",
    //   "12C.jpg",
    //   "13C.jpg",
    //   "13C.jpg",
    //   "13S.jpg",
    //   "13C.jpg",
    // ];
    // userDeck = ["11S.jpg", "2C.jpg", "3C.jpg", "3C.jpg", "3C.jpg", "3C.jpg"];
    compDeck = cardDeck.splice(26);
    userDeck = cardDeck.splice(0, 26);
    for (var i = 0; i < 6; i++) {
      $("#canvas").append(`<div class="col-md-2" id="col${i + 1}"></div>`);
    }
    $("#col2").html(
      `<div><img src="./assets/00.png" class="choice img-fluid rounded" id="compDeck"/></div><div><img class="img-fluid rounded" id="compWon"/></div>`
    );
    $("#col5").html(
      `<div><img src="./assets/00.png" class="choice img-fluid rounded" id="userDeck"/></div><div><img class="img-fluid rounded" id="userWon"/></div>`
    );
    $("#col3").html(
      `<img src="" class="choice img-fluid rounded" id="compPlaySide"/>`
    );
    $("#col4").html(
      `<img src="" class="choice img-fluid rounded" id="userPlaySide"/>`
    );
    $("#col1").html(
      `<img src="./assets/robot.png" class="img-fluid pt-3"/><h2 class="text-left font-weight-bold pl-2">Comp</h2>`
    );
    $("#col6").html(
      `<img src="./assets/human.svg" class="img-fluid pt-3"/><h2 class="text-center pr-3 font-weight-bold">You</h2>`
    );
  }

  function checkWhoWon() {
    if (!war) {
      if (parseInt(compDeck[0]) > parseInt(userDeck[0])) {
        window.setTimeout(function () {
          alert("You Lose", "info");
          $("#compWon").attr("src", `./assets/${userDeck[0]}`);
          $("#compPlaySide").attr("src", "");
          $("#userPlaySide").attr("src", "");
          compSideDeck.push(userDeck[0]);
          compSideDeck.push(compDeck[0]);
          userDeck.splice(0, 1);
          compDeck.splice(0, 1);
          score--;
          $("#score").text(`Score: ${score}`);
        }, 2000);
      }
      if (parseInt(compDeck[0]) < parseInt(userDeck[0])) {
        window.setTimeout(function () {
          alert("You Win", "success");
          $("#userWon").attr("src", `./assets/${compDeck[0]}`);
          $("#compPlaySide").attr("src", "");
          $("#userPlaySide").attr("src", "");
          userSideDeck.push(compDeck[0]);
          userSideDeck.push(userDeck[0]);
          compDeck.splice(0, 1);
          userDeck.splice(0, 1);
          score++;
          $("#score").text(`Score: ${score}`);
        }, 2000);
      }
      if (parseInt(compDeck[0]) === parseInt(userDeck[0])) {
        war = true;
        warCard = 0;
        $("#alert").text("It's a War. Play 4 Cards");
        $("#alert").attr("class", `alert alert-danger`);
        checkEndGame();
      }
    }
    if (war && warCard === 5) {
      if (parseInt(compDeck[3]) > parseInt(userDeck[3])) {
        alert("You Lose THE WAR!!!", "danger");
        window.setTimeout(function () {
          $("#compWon").attr("src", `./assets/${userDeck[3]}`);
          $("#compPlaySide").attr("src", "");
          $("#userPlaySide").attr("src", "");
          compSideDeck.push(userDeck[0], userDeck[1], userDeck[2], userDeck[3]);
          compSideDeck.push(compDeck[0], compDeck[1], compDeck[2], compDeck[3]);
          compDeck.splice(0, 4);
          userDeck.splice(0, 4);
          war = false;
          warCard = 0;
          score -= 4;
          $("#score").text(`Score: ${score}`);
        }, 2000);
      }
      if (parseInt(compDeck[3]) < parseInt(userDeck[3])) {
        alert("You Win THE WAR", "success");
        window.setTimeout(function () {
          $("#userWon").attr("src", `./assets/${compDeck[3]}`);
          $("#compPlaySide").attr("src", "");
          $("#userPlaySide").attr("src", "");
          userSideDeck.push(userDeck[0], userDeck[1], userDeck[2], userDeck[3]);
          userSideDeck.push(compDeck[0], compDeck[1], compDeck[2], compDeck[3]);
          compDeck.splice(0, 4);
          userDeck.splice(0, 4);
          war = false;
          warCard = 0;
          score += 4;
          $("#score").text(`Score: ${score}`);
        }, 2000);
      }
      if (parseInt(compDeck[3]) === parseInt(userDeck[3])) {
        war = true;
        warCard = 0;
        $("#alert").text("!!!!!!!!WAR ON WAR!!!!!!!!!");
        $("#alert").attr("class", `alert alert-danger`);
        checkEndGame();
      }
    }
  }

  function checkEndGame() {
    if (
      (userDeck.length === 0 && userSideDeck.length === 0) ||
      (userDeck === [] && userSideDeck === []) ||
      (userDeck === null && userSideDeck === null)
    ) {
      endGame("lose");
    }
    if (
      (compDeck.length === 0 && compSideDeck.length === 0) ||
      (compDeck === [] && compSideDeck === []) ||
      (compDeck === null && compSideDeck === null)
    ) {
      endGame("won");
    }
  }
  function endGame(str) {
    $(".container").html("");
    window.localStorage.setItem("score", score);
    getGiphy(`${str}`);
    setTimeout(function () {
      window.location.href = "./../highscores/highscores.html";
    }, 5000);
  }

  function getGiphy(str) {
    var apiKey = "WEBIEMxP2gpqmX8BNbn1G6i6BYEtlVML";
    $.ajax({
      type: "GET",
      url: `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${str}`,
      dataType: "JSON",
    }).then(function (res) {
      var gif = res.data[randNumber(res.data.length)].images.original.url;
      $(".container").html(
        `<img src=${gif} class="img-fluid rounded mx-auto d-block mt-5"/>`
      );
    });
  }

  function checkLastCard() {
    if (compDeck.length === 2) {
      $("#compDeck").attr("src", "./assets/0.jpg");
    }
    if (userDeck.length === 2) {
      $("#userDeck").attr("src", "./assets/0.jpg");
    }
    if ($("#compDeck").attr("src") === "./assets/Misc/Blank_back.png") {
      compDeck.push(compSideDeck);
      compSideDeck = [];
      compDeck = compDeck.flat();
      $("#compDeck").attr("src", `./assets/00.png`);
      $("#compWon").attr("src", ``);
    }
    if (compDeck.length === 1) {
      $("#compDeck").attr("src", "./assets/Misc/Blank_back.png");
    }
    if (userDeck.length === 1) {
      $("#userDeck").attr("src", "./assets/Misc/Blank_back.png");
    }
  }

  $(document).on("click", "#userDeck", function () {
    checkEndGame();
    if ($("#userDeck").attr("src") === "./assets/Misc/Blank_back.png") {
      userDeck.push(userSideDeck);
      userSideDeck = [];
      userDeck = userDeck.flat();
      $("#userDeck").attr("src", `./assets/00.png`);
      $("#userWon").attr("src", ``);
    } else {
      checkLastCard();
      if (war) {
        if (warCard < 3) {
          window.setTimeout(function () {
            $("#compPlaySide").attr("src", "./assets/00.png");
          }, 500);
          $("#userPlaySide").attr("src", "./assets/00.png");
          warCard++;
          $("#alert").text(`It's a War. Play ${4 - warCard} more Cards`);
        } else {
          window.setTimeout(function () {
            $("#compPlaySide").attr("src", `./assets/${compDeck[3]}`);
          }, 500);
          $("#userPlaySide").attr("src", `./assets/${userDeck[3]}`);
          warCard = 5;
          checkWhoWon();
        }
      }
      if (!war) {
        window.setTimeout(function () {
          $("#compPlaySide").attr("src", `./assets/${compDeck[0]}`);
        }, 500);
        $("#userPlaySide").attr("src", `./assets/${userDeck[0]}`);
        checkWhoWon();
      }
    }
  });

  $("#startGame").on("click", function () {
    startGame();
    hideAlert();
  });

  $("#endGame").on("click", function () {
    endGame("abandon");
  });
});
