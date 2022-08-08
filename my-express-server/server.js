//jshint esversion:6

const express = require('express');

const app = express();

app.get("/", function(req, res){
  res.send("Hello");
});

app.get("/contact", function(req, res) {
  res.send("Contact me at: angela@gmail.com");
});

app.get("/about", function(req, res) {
  res.send("BIO: practice page created by Ai.");
});

app.get("/hobbies", function(req, res) {
  res.send("Hobby page.");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
