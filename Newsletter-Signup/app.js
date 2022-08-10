const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
require("dotenv").config();

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status:"subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const listID = process.env.LIST_ID;
  const apiKey = process.env.API_KEY;

  const url = "https://us12.api.mailchimp.com/3.0/lists/" + listID

  const options = {
    method: "POST",
    auth:"popo26:" + apiKey,
  }

  const request = https.get(url, options, function(response) {
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

  console.log(firstName, lastName, email);
});

// app.listen(3000, function(){
app.listen(process.env.PORT || 3000, function(){
  console.log("The server is running on port 3000.");
});
