//hsint esversion:6

module.exports.getDate = function() {
  const today = new Date();

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  return today.toLocaleDateString("en-US", options);
  };


module.exports.getDay = function() {
  const today = new Date();

  const options = {
    weekday: "long",
  };
  return today.toLocaleDateString("en-US", options);
};





// function getDate() {
// let today = new Date();
//
// let options = {
//   weekday: "long",
//   day: "numeric",
//   month: "long"
// };
//
// return today.toLocaleDateString("en-US", options);
// };



//using switch()
//   switch (currentDay) {
//     case 0:
//     day = "Sunday";
//     break;
//     case 1:
//     day = "Monday";
//     break;
//     case 2:
//     day = "Tuesday";
//     break;
//     case 3:
//     day = "Wednesday";
//     break;
//     case 4:
//     day = "Thursday";
//     break;
//     case 5:
//     day = "Friday";
//     break;
//     case 6:
//     day = "Saturday";
//     break;
//     console.log("Error: current day is equal to " + currentDay);
// }
