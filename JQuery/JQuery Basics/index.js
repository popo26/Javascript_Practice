
// line 3 to check if jquery ready so where to put jquery cdn doesnt matter
// $(document).ready(function(){
//   $("h1").css("color", 'red');
// })



// // To get CSS value
// $("h1").css("color");
//
// // To set CSS value
// $("h1").css("color", 'red');

// Best to keep CSS style and Javascript behaviour separate so instead of above, do below

// $("h1").addClass("big-title margin-50");


// $("h1").text("Bye");

// $("button").text("Don't Click Me");

// $("button").html("<em>Hey</em>");

$("button").text("Hey Yo");

// get attribute

console.log($("img").attr("src"));

// set attribute

$("a").attr("href", "https://www.yahoo.com");

// $("h1").click(function() {
//   $("h1").css("color", "purple");
// });

$("button").click(function() {
  $("h1").css("color", "purple");
});

// Detect keystroke

$("input").keypress(function(event) {
  console.log(event.key);
});

// To capture all keystroke

$("body").keypress(function(event) {
  console.log(event.key);
});

// or

$(document).keypress(function(event) {
  console.log(event.key);
});

// To display key on html

$(document).keypress(function(event) {
  $("h1").text(event.key);
});

$("h1").on("mouseover", function() {
  $("h1").css("color", "red");
});

// Without changing html, add a new html element

$("h1").before("<button>New</button>");

// Without changing html, add a new html element

$("h1").after("<button>New</button>");

// Prepend
$("h1").prepend("<button>New</button>");

// Append
$("h1").append("<button>New</button>");

// Remove
$('button').remove();

// Animation

$('button').on("click", function() {
  $("h1").hide();
});

// To show

// $("h1").show();

// TO show and hide forever

// $("input").on("click", function() {
//   $("h1").toggle();
// });

// Fadeout

// $("input").on("click", function() {
//   $("h1").fadeOut();
// });

// fadIn

// $("input").fadeIn();

// fadetoggle

// $("input").on("click", function() {
//   $("h1").fadeToggle();
// });

// slideup and slide down

// $("input").on("click", function() {
//   $("h1").slideUp();
// });
//
// $("input").on("click", function() {
//   $("h1").slideDown();
// });

// SlideToggle

// $("input").on("click", function() {
//   $("h1").slideToggle();
// });

// Custom CSS for Animation
// You can put css value that has numeric value

// $("input").on("click", function() {
//   $("h1").animate({opacity: 0.5});
// });

// Chaining
$("input").on("click", function() {
  $("h1").slideUp().slideDown().animate({opacity: 0.5});
});
