let express = require('express');
require('dotenv').config();

let app = express();

app.use((req, res, next) => {
  const method = req.method;
  const path = req.path;            
  const ip = req.ip;              

  console.log(`${method} ${path} - ${ip}`);

  next();
});

app.get('/now',

  function(req, res, next) {
    req.time = new Date().toString();
    next();
  },

  function(req, res) {
    res.json({ time: req.time });
  }
);

//console.log("Hello World");

//app.get('/', (req, res) => {
//  res.send('Hello Express');
//});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
  let message = "Hello json";

  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({ message: message });
});

module.exports = app;
