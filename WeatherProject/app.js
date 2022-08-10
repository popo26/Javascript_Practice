const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");//necessary for parsing body of post request
require("dotenv").config();

const app = express();

app.use(bodyParser.urlencoded({extended: true}));//necessary for parsing body of post request

app.get("/", function(req, res){
 res.sendFile(__dirname + "/index.html");


  //     const object = {
  //       name:"Ai",
  //       favouriteFood:"Wine",
  //     }
  //     console.log(JSON.stringify(object));
  //   })
  // })

});

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = process.env.API_KEY;
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      //console.log(data); //hexadecimal
      const weatherData=JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const weatherIcon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
      console.log(weatherDescription);
      res.write("<p>The weather is currently " + weatherDescription + "</p>");
      res.write("<img src=" + imageURL + ">");
      res.write("<h1>The temperature in " + query + " is " + temp + "degrees Celcius.</h1>");
      res.send();

    });
  });


})





app.listen(5000, function(){
  console.log("Server is running on port 3000.");
})
