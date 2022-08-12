//jshint esversion:6

const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const ejs = require("ejs");
require("dotenv").config();

const app = express();

app.set("view engine", 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

//DBname
mongoose.connect("mongodb://localhost:27017/wikiDB");

//Mongoose Schema
const articleSchema = {
  title: String,
  content: String
};

//Mongoose Model - Collections
const Article = mongoose.model("Article", articleSchema);

//Chained routes

////////Request Targeting All Articles//////////////////////
app.route("/articles")
.get(
  function(req, res){
    Article.find(function(err, foundArticles){
      if(!err){
          res.send(foundArticles);
      } else {
        res.send(err);
      }

    });
  })
.post(
  function(req, res){
    const newArticle = new Article ({
      title:req.body.title,
      content:req.body.content
    });
  newArticle.save(function(err){
    if (!err){
      res.send("Successfully added a new article.");
    } else {
      res.send(err);
    }
  });
  })

.delete(
  function(req, res){
    Article.deleteMany(function(err){
      if(!err){
        res.send("Successfully deleted all articles.");
      }else {
        res.send(err);
      }
    });
  });

////////Request Targeting A Specific Articles//////////////////////
app.route('/articles/:articleTitle')

.get(function(req, res){
  Article.findOne({
    title:req.params.articleTitle}, function(err, foundArticle){
    if (foundArticle){
      res.send(foundArticle);
    } else {
      res.send("No match!");
    }
  });
})

.put(function(req, res){
  Article.findOneAndUpdate(
    //which article to update(condition)
    {title:req.params.articleTitle},
    {title:req.body.title, content:req.body.content},
    {overwrite:true},

    // //actual update
    // {title:req.body.title, content: req.body.content},
    // //By default it overwrite by MongoDB, BUT by Mongoose, you need to add below
    // {overwrite:true},
    function(err){
      if(!err){
        res.send("Successfully updated article.");
      }
    }
  );
})

.patch(function(req, res){
  Article.updateOne(
    {title: req.params.articleTitle},
    {$set: req.body},
    function(err){
      if(!err){
        res.send("Successfully patched the article.");
      }else {
        res.send(err);
      }
    }
  );
})

.delete(function(req, res){
  Article.deleteOne(
    {title:req.params.articleTitle}, function(err){
      if(!err){
        res.send("Successfully deleted the particular article.")
      }else {
        res.send(err);
      }
    })
});



app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
