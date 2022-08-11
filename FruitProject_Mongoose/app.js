//MongoDB with Mongoose

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/frutsDB");

//Insert Data

const fruitSchema = new mongoose.Schema ({
  name: {
    type:String,
    required:[true, "Please check your data entry, no name specified!"]
  },
  rating: {
    type:Number,
    min:1,
    max:10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema); //add in singular form

const fruit = new Fruit ({
  name:"Peach",
  rating:9,
  review:"Yummiest Peach ever."
});

fruit.save();

const personSchema = new mongoose.Schema({
  name:String,
  age: Number,
  favouriteFruit: fruitSchema

});

const Person = mongoose.model("Person", personSchema);

const pineapple = new Fruit({
  name: "Pineapple",
  score: 9,
  review: "Great fruit."
});

pineapple.save();

const person = new Person({
  name:"Amy",
  age:12,
  favouriteFruit: pineapple
});

person.save();

const kiwi = new Fruit({
  name:"Kiwi",
  score:10,
  review:"The best fruit"
});

const dragon_fruit = new Fruit({
  name:"Dragon Fruit",
  score:7,
  review:"Weird fruit"
});

// Fruit.insertMany([kiwi, dragon_fruit], function(err) {
//   if (err) {
//     console.log(err);
//   }else {
//     console.log("Successfully saved all the fruits to fruitsDB(test?)");
//   }
// });



Fruit.find(function(err, fruits) {
  if(err) {
    console.log(err);
  }else {
    mongoose.connection.close();
    fruits.forEach(function(fruit) {
      console.log(fruit.name);

    });
  }
});

// Fruit.updateOne({_id:"62f45f767e41be5dc632a1af"}, {name:"Giant Orange"}, function(err) {
// if (err) {
//   console.log(err);
// } else {
//   console.log("Successfully updated the documents.");
// }
// });

// Fruit.deleteOne({name:"Peach"}, function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted the document");
//   }
// });

Fruit.deleteMany({name:"Apple"}, function(err){
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully deleted the document");
  }
});
