require('dotenv').config()
let bodyParser = require('body-parser')
let express = require('express');
let app = express();

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: false}))
app.get("/", hello);
app.get("/json",json_func)
app.get("/:word/echo",echo_func)
app.get("/name",name_func)
app.post("/name",post_name_func)

app.get('/now', function(req, res, next) {
   req.time = new Date().toString()
    next();
  }, function(req, res) {
    res.json({time: req.time});
  });

function hello(req, res) {
    res.sendFile(__dirname + '/views/index.html');
  }

function json_func(req, res) {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({"message": "HELLO JSON"})
    } else {
        res.json({"message": "Hello json"})
    } 
}

function echo_func(req, res) {
    res.json({echo: req.params.word})
}

function name_func(req, res) {
    res.json({name: req.query.first+" "+req.query.last})
}

function post_name_func(req, res) {
    res.json({name: req.body.first+" "+req.body.last})
}

module.exports = app;
