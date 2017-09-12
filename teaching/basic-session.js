var express = require("express");
var session = require("express-session"); // require sessions from express middleware
var http = require("http");
var open = require("open");

var app = express();

app.use(
  session({
    name: "hackreactor",
    secret: "this-is-a-secret-token",
    cookie: {
      maxAge: 60000
    }
  })
); // tell express app to use session
//give us access to request.session

// Access the session as req.session
app.get("/", function(req, res, next) {
  var sessData = req.session;
  sessData.someAttribute = "anything we want";
  sessData = {
    someAttribute: "anything we want",
    otherAttribute: "something else"
  }
  res.send("Returning with some text");
});

app.get("/bar", function(req, res, next) {
  req: {
    session: {
      someAttribute: "anything we want"
    }
  }
  var someAttribute = req.session.someAttribute;
  res.send(`This will print the attribute I set earlier: ${someAttribute}`);
});

http.createServer(app).listen(1337);
console.log("Express server is listening on port 1337");
open("http://localhost:1337");
