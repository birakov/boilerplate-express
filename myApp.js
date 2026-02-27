let express = require('express');
require('dotenv').config();

const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
  let message = "Hello json";

  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }

  res.json({ message: message });
});

app.get('/:word/echo', (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
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

//app.get("/name", (req, res) => {
//  const first = req.query.first;
//  const last  = req.query.last;
// res.json({ name: `${first} ${last}` });
//});

app.post("/name", function(req, res) {
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});

module.exports = app;