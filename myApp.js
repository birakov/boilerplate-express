let express = require('express');
require('dotenv').config();

const bodyParser = require('body-parser');

let app = express();

// body-parser — САМЫЙ ПЕРВЫЙ middleware
app.use(bodyParser.urlencoded({ extended: false }));

// Логгер запросов
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

// Статические файлы
app.use("/public", express.static(__dirname + "/public"));

// Главная страница
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// JSON с uppercase
app.get("/json", (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message: message });
});

// Эхо
app.get('/:word/echo', (req, res) => {
  res.json({ echo: req.params.word });
});

// Временной сервер
app.get('/now',
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => res.json({ time: req.time })
);

// ← ТОЛЬКО POST /name (GET-версия удалена!)
app.post("/name", (req, res) => {
  const first = req.body.first;
  const last  = req.body.last;
  res.json({ name: `${first} ${last}` });
});

module.exports = app;