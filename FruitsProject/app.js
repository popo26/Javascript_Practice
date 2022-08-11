//MongoDB withut Mongoose

const MongoClient = require("mongodb").MongoClient;
const assert = require("assert"); //if assert, to do with testing

const url = "mongodb://localhost:27017";

const dbName = process.env.DB_NAME;

const client = new MongoClient(url, {useNewUrlParser: true});

client.connect(function(err){
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  insertDocuments(db, function() {
    client.close();
  });

  // findDocuments(db, function() {
  //   client.close();
  // });

});

const insertDocuments = function(db, callback){
  const collection = db.collection("fruits");
  collection.insertMany([
    {
     name:"Apple",
     score:8,
     review:"Great fruit"
    },
    {
      name:"Orange",
      score:6,
      review:"Kinda sour"
    },
    {
      name:"Banana",
      score:9,
      review:"Great stuff!"
    }
  ], function(err, result){
    //validation
    assert.equal(err, null);
    // assert.equal(3, result.result.n);
    // assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}
