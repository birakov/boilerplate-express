let express = require('express');

require('dotenv').config();

let app = express();

//console.log("Hello World");

//app.get('/', (req, res) => {
//  res.send('Hello Express');
//});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  res.json({ "message": "Hello json" });
});

app.get("/json", (req, res) => {
  let message = "Hello json";

  res.json({ message: message });
});

 module.exports = app;
