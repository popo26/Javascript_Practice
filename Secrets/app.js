//jshint esversion:6

require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// const encrypt = require("mongoose-encryption");
// const md5 = require("md5");
// const bcrypt = require("bcrypt");
// const saltRounds = 10;
///////////////////////for using passport//////////////////////////////
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate");

app=express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));

//make sure to write this code before mongoose.connect
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

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
  password: String,
  googleId: String
});

//for mongoose plugin for passportLocalMongoose
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

//create a new mongoose model
const User = new mongoose.model("User", userSchema);

//for passportLocalMongoose
passport.use(User.createStrategy());

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    done(err, user);
  });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth:google/secrets",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

app.get("/", function(req, res){
  res.render("home");
});

app.get("/auth/google",
  passport.authenticate("google", {scope: ['profile']})
);

app.get("/auth:google/secrets",
passport.authenticate("google", {failureREdirect: "/login"}),
function(req, res){
  res.redirect("/secrets");
});


app.get("/login", function(req, res){
  res.render("login");
});


app.get("/register", function(req, res){
  res.render("register");
});

app.get("/secrets", function(req, res){
  if (req.isAuthenticated()){
    res.render("secrets");
  }else {
    res.redirect("/login");
  }
});

app.get("/logout", function(req, res, next){
  req.logout(function(err){
    if (err){return next(err);
    }
    res.redirect("/");
  });
});

app.post("/register", function(req, res){

  User.register({username:req.body.username}, req.body.password, function(err, user){
    if (err) {
      console.log(err);
      res.redirect("/register");
    }else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("/secrets");
      });
    }
  })

  });




app.post("/login", function(req, res){

  const user = new User({
    username:req.body.username,
    password:req.body.password
  });
  req.login(user, function(err){
    if (err){
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, function(){
        res.redirect("secrets");
      })
    }
  })
});




app.listen(3000, function(req, res){
  console.log("Server is running on port 3000.");
});
