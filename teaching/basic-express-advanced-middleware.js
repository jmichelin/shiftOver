var express = require('express');
var http = require('http');
var open = require('open');

var app = express();

// middleware is just a function that does it's thing and passes the results down the 
// request-respons cycle
app.use(function (req, res, next) {
  console.log('Time:', Date.now())
  next()
});


// This example shows a middleware function mounted on the /user/:id path.
// The function is executed for any type of HTTP request on the /user/:id path.

app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method)
  next()
});


// This example shows a route and its handler function (middleware system).
// The function handles GET requests to the /user/:id path.

app.get('/user/:id', function (req, res, next) {
  res.send('USER')
});


// Here is an example of loading a series of middleware functions at a mount point,
// with a mount path. It illustrates a middleware sub-stack that prints request
// info for any type of HTTP request to the /user/:id path.

app.use('/user/:id', function (req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next()
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next()
});



// Route handlers enable you to define multiple routes for a path.
// The example below defines two routes for GET requests to the /user/:id path.
// The second route will not cause any problems, but it will never get called because
// the first route ends the request-response cycle.

//This example shows a middleware sub-stack that handles GET requests to the /user/:id path.

app.get('/user/:id', function (req, res, next) {
  console.log('ID:', req.params.id)
  next()
}, function (req, res, next) {

});

// handler for the /user/:id path, which prints the user ID
app.get('/user/:id', function (req, res, next) {
  res.end(req.params.id)
});

// To skip the rest of the middleware functions from a router middleware stack,
// call next('route') to pass control to the next route.
// NOTE: next('route') will work only in middleware functions that were loaded by
// using the app.METHOD() or router.METHOD() functions.

// This example shows a middleware sub-stack that handles GET requests to the /user/:id path.
app.set('view engine', 'ejs');
app.get('/user/:id', function (req, res, next) {
  // if the user ID is 0, skip to the next route
  if (req.params.id === '0') next('route');
  // otherwise pass the control to the next middleware function in this stack
  else next()
}, function (req, res, next) {
  // render a regular page
  res.render('regular')
});

// handler for the /user/:id path, which renders a special page
app.get('/user/:id', function (req, res, next) {
  res.render('special')
});

http.createServer(app).listen(1337);
console.log('Express server is listening on port 1337');
open('http://localhost:1337');