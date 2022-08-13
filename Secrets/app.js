//jshint esversion:6

require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
const bcrypt = require("bcrypt");
const saltRounds = 10;


app=express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/userDB");

////////////////////////mongoose-encryption/////////////////////////////////////////////////////
// //for mongoose encryption
// const userSchema = new mongoose.Schema ({
//   email: String,
//   password: String
// });
//
// //make sure to create below two lines before creating mongoose model
// const secret = process.env.SECRET;
// //*to only encrypt certain field(password)
// userSchema.plugin(encrypt, {secret:secret, encryptedFields: ["password"] });


//////////////////////////////////for md5//////////////////////////////////////////////////////
const userSchema = new mongoose.Schema ({
  email: String,
  password: String
});


const User = new mongoose.model("User", userSchema);



app.get("/", function(req, res){
  res.render("home");
});

app.get("/login", function(req, res){
  res.render("login");
});


app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){
  //////////////bcrypt//////////////////////////////////////////
  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {

    const newUser = new User({
      email: req.body.username,
      password: hash
    });
    newUser.save(function(err){
      if(err){
        console.log(err);
      } else {
        res.render("secrets");
      }
    });
  });

  });


app.post("/login", function(req, res){
  const username = req.body.username;
  const password = req.body.password;
  /////for md5///////////
  // const password = md5(req.body.password);

  User.findOne({email:username}, function(err, foundUser){
    if(err){
      console.log(err);
    } else {
      if (foundUser) {
        // if (foundUser.password === password) {
        bcrypt.compare(password, foundUser.password, function(err,result){
          if (result == true){
            res.render("secrets");
          }
        });
      }
    }
  });
});



app.listen(3000, function(req, res){
  console.log("Server is running on port 3000.");
});
