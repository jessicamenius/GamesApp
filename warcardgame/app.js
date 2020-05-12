$(document).ready(function () {
  var cardDeck = [
    "14C.jpg",
    "4C.jpg",
    "7C.jpg",
    "8C.jpg",
    "9C.jpg",
    "8D.jpg",
    "2H.jpg",
    "5H.jpg",
    "12H.jpg",
    "13H.jpg",
    "14S.jpg",
    "2S.jpg",
    "3S.jpg",
    "4S.jpg",
  ];
  // var cardDeck = [
  //   "14C.jpg",
  //   "2C.jpg",
  //   "3C.jpg",
  //   "4C.jpg",
  //   "5C.jpg",
  //   "6C.jpg",
  //   "7C.jpg",
  //   "8C.jpg",
  //   "9C.jpg",
  //   "10C.jpg",
  //   "11C.jpg",
  //   "12C.jpg",
  //   "13C.jpg",
  //   "14D.jpg",
  //   "2D.jpg",
  //   "3D.jpg",
  //   "4D.jpg",
  //   "5D.jpg",
  //   "6D.jpg",
  //   "7D.jpg",
  //   "8D.jpg",
  //   "9D.jpg",
  //   "10D.jpg",
  //   "11D.jpg",
  //   "12D.jpg",
  //   "13D.jpg",
  //   "14H.jpg",
  //   "2H.jpg",
  //   "3H.jpg",
  //   "4H.jpg",
  //   "5H.jpg",
  //   "6H.jpg",
  //   "7H.jpg",
  //   "8H.jpg",
  //   "9H.jpg",
  //   "10H.jpg",
  //   "11H.jpg",
  //   "12H.jpg",
  //   "13H.jpg",
  //   "14S.jpg",
  //   "2S.jpg",
  //   "3S.jpg",
  //   "4S.jpg",
  //   "5S.jpg",
  //   "6S.jpg",
  //   "7S.jpg",
  //   "8S.jpg",
  //   "9S.jpg",
  //   "10S.jpg",
  //   "11S.jpg",
  //   "12S.jpg",
  //   "13S.jpg",
  // ];
  var randNum = 0;
  // var cards = [];
  // var revealCard = 2;
  // var gameType = 0;
  // var choiceOne = "";
  // var choiceTwo = "";
  // var counterOne = 0;
  // var counterTwo = 0;
  var userDeck = [];
  var userSideDeck = [];
  var compDeck = [];
  var compSideDeck = [];
  var score = 0;
  var war = false;
  $("#score").text(`Score: ${score}`);

  function randNumber(num) {
    randNum = Math.floor(Math.random() * num);
    return randNum;
  }

  // function drawCards(num) {
  //   for (var j = 0; j < num; j++) {
  //     cards.push("");
  //   }
  //   for (var i = 0; i < num / 2; i++) {
  //     cards.splice(i, 1, cardDeck[randNumber(52)]);
  //     if (cards.length > 1) {
  //       for (var k = 0; k < cards.length - 1; k++) {
  //         if (cards[i] === cards[k]) {
  //           cards.splice(i, 1, cardDeck[randNumber(52)]);
  //         }
  //       }
  //     }
  //     cards.splice(i + num / 2, 1, cards[i]);
  //   }
  // }

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

  // function showCards(num) {
  //   var counter = 0;
  //   drawCards(num * num);
  //   shuffleCards(cards);
  //   var num2 = 12 / num;
  //   $(".container").html("");
  //   for (var j = 0; j < num; j++) {
  //     $(".container").append(`<div class="row" id=${j}></div>`);
  //     for (var i = 0; i < num; i++) {
  //       $(`#${j}`).append(`<div class="col-md-${num2} mb-3">
  //     <img src="${cards[counter]}" class="choice img-fluid rounded" data-id="${counter}"/></div>`);
  //       counter++;
  //     }
  //   }
  // }

  // function hideCards(num) {
  //   var counter = 0;
  //   var num2 = 12 / num;
  //   $(".container").html("");
  //   for (var j = 0; j < num; j++) {
  //     $(".container").append(`<div class="row" id=${j}></div>`);
  //     for (var i = 0; i < num; i++) {
  //       $(`#${j}`).append(`<div class="col-md-${num2} mb-3" id="d${counter}">
  //     <img src="./assets/0.jpg" class="choice img-fluid rounded" data-id="${counter}"/></div>`);
  //       counter++;
  //     }
  //   }
  //   revealCard = 0;
  // }

  // function loadGame(num) {
  //   showCards(num);
  //   window.setTimeout(function () {
  //     hideCards(num);
  //   }, 5000);
  // }
  function startGame() {
    shuffleCards(cardDeck);
    compDeck = cardDeck.splice(7);
    userDeck = cardDeck.splice(0, 7);
    for (var i = 0; i < 6; i++) {
      $("#canvas").append(`<div class="col-md-2" id="col${i + 1}"></div>`);
    }
    $("#col2").html(
      `<div><img src="./assets/0.jpg" class="choice img-fluid rounded" id="compDeck"/></div><div><img class="img-fluid rounded" id="compWon"/></div>`
    );
    $("#col5").html(
      `<div><img src="./assets/0.jpg" class="choice img-fluid rounded" id="userDeck"/></div><div><img class="img-fluid rounded" id="userWon"/></div>`
    );
    $("#col3").html(
      `<img src="" class="choice img-fluid rounded" id="compPlaySide"/>`
    );
    $("#col4").html(
      `<img src="" class="choice img-fluid rounded" id="userPlaySide"/>`
    );
  }

  function checkWhoWon() {
    if (!war) {
      if (parseInt(compDeck[0]) > parseInt(userDeck[0])) {
        alert("You Lose", "info");
        window.setTimeout(function () {
          $("#compWon").attr("src", `./assets/${userDeck[0]}`);
          $("#compPlaySide").attr("src", "");
          $("#userPlaySide").attr("src", "");
          compSideDeck.push(userDeck[0]);
          compSideDeck.push(compDeck[0]);
          userDeck.splice(0, 1);
          compDeck.splice(0, 1);
          console.log(compDeck);
          console.log(userDeck);
          console.log(compSideDeck);
          console.log(userSideDeck);
        }, 2000);
      }
      if (parseInt(compDeck[0]) < parseInt(userDeck[0])) {
        alert("You Win", "success");
        window.setTimeout(function () {
          $("#userWon").attr("src", `./assets/${compDeck[0]}`);
          $("#compPlaySide").attr("src", "");
          $("#userPlaySide").attr("src", "");
          userSideDeck.push(compDeck[0]);
          userSideDeck.push(userDeck[0]);
          compDeck.splice(0, 1);
          userDeck.splice(0, 1);
          console.log(compDeck);
          console.log(userDeck);
          console.log(compSideDeck);
          console.log(userSideDeck);
        }, 2000);
      }
      if (parseInt(compDeck[0]) === parseInt(userDeck[0])) {
        $("#alert").text("It's a War. Play 4 Cards");
        $("#alert").attr("class", `alert alert-danger`);
        playWar();
      }
    }
    if (war) {
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
          console.log(compDeck);
          console.log(userDeck);
          console.log(compSideDeck);
          console.log(userSideDeck);
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
          console.log(compDeck);
          console.log(userDeck);
          console.log(compSideDeck);
          console.log(userSideDeck);
        }, 2000);
      }
      if (parseInt(compDeck[0]) === parseInt(userDeck[0])) {
        $("#alert").text("!!!!!!!!WAR ON WAR!!!!!!!!!");
        $("#alert").attr("class", `alert alert-danger`);
        playWar();
      }
    }
  }

  function playWar() {
    $(document).on("click", "#userDeck", function () {
      $("#compPlaySide").attr("src", "./assets/0.jpg");
      $("#userPlaySide").attr("src", "./assets/0.jpg");
      $("#alert").text("It's a War. Play 3 more Cards");
      $(document).on("click", "#userDeck", function () {
        $("#alert").text("It's a War. Play 2 more Cards");
      });
      $(document).on("click", "#userDeck", function () {
        $("#alert").text("It's a War. Play 1 more Card");
      });
      $(document).on("click", "#userDeck", function () {
        war = true;
        continueGame();
      });
    });
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
  $("#startGame").on("click", function () {
    startGame();
    hideAlert();
    continueGame();
  });

  function continueGame() {
    $(document).on("click", "#userDeck", function () {
      $("#compPlaySide").attr("src", `./assets/${compDeck[0]}`);
      $("#userPlaySide").attr("src", `./assets/${userDeck[0]}`);
      checkWhoWon();
      if (compDeck.length === 1 || userDeck.length === 1) {
        if (compDeck === []) {
          $("#compDeck").attr("src", "");
        }
        if (userDeck === []) {
          $("#userDeck").attr("src", "");
        }
        compDeck.push(compSideDeck);
        compSideDeck = [];
        compDeck = compDeck.flat();
        userDeck.push(userSideDeck);
        userSideDeck = [];
        userDeck = userDeck.flat();
        $("#compWon").attr("src", "");
        $("#userWon").attr("src", "");
      }
    });
  }

  // $(document).on("click", ".choice", function () {
  //   if (revealCard === 0) {
  //     counterOne = $(this).attr("data-id");
  //     $(this).attr("src", `${cards[counterOne]}`);
  //     choiceOne = cards[counterOne];
  //     console.log(choiceOne);
  //     window.setTimeout(function () {
  //       revealCard = 1;
  //     }, 10);
  //   }
  //   if (revealCard === 1) {
  //     counterTwo = $(this).attr("data-id");
  //     $(this).attr("src", `${cards[counterTwo]}`);
  //     revealCard = 2;
  //     choiceTwo = cards[counterTwo];
  //     console.log(choiceTwo);
  //     if (choiceOne === choiceTwo) {
  //       score++;
  //       $("#score").text(`Score: ${score}`);
  //       revealCard = 0;
  //     } else {
  //       window.setTimeout(function () {
  //         $(`#d${counterOne}`).html(
  //           `<img src="./assets/0.jpg" class="choice img-fluid rounded" data-id="${counterOne}"/>`
  //         );
  //         $(`#d${counterTwo}`).html(
  //           `<img src="./assets/0.jpg" class="choice img-fluid rounded" data-id="${counterTwo}"/>`
  //         );
  //         revealCard = 0;
  //       }, 3000);
  //     }
  //   }
  // });

  // $("#easyGame").on("click", function () {
  //   gameType = 2;
  //   loadGame(gameType);
  // });
  // $("#mediumGame").on("click", function () {
  //   gameType = 4;
  //   loadGame(gameType);
  // });
  // $("#hardGame").on("click", function () {
  //   gameType = 6;
  //   loadGame(gameType);
  // });
});
