$(document).ready(function () {
  //   console.log("hello");

  $("#submitBtn").on("click", function (e) {
    // console.log("hello");
    e.preventDefault();
  });

  //   $(".hide").click(function () {
  //     $("#submitBtn").hide();
  //   });

  $.ajax({
    type: "GET",
    url: `https://opentdb.com/api.php?amount=10`,
    dataType: "json",
  }).then(function (res) {
    console.log(res);
    console.log(res.results);

    var array =res.results

    for(var i = 0, i < )

    $("#questions").append(`<p>${res.results}</p>`);
  });
});
