// server.js
// where your node app starts

// Init project
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// http://expressjs.com/en/starter/static-files.html
app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/tutor', function(req, res){
  res.sendFile(__dirname + '/views/tutor.html');
});

app.get('/screen', function(req, res){
  res.sendFile(__dirname + '/views/screen.html');
});

app.get('/clear', function(req, res){
  res.sendFile(__dirname + '/views/clear.html');
});

app.get('/cleared', function(req, res){
  clearQueue();
  printQueue();
  res.sendFile(__dirname + '/views/cleared.html');
});

app.get('/style.css', function(req, res){
  res.sendFile(__dirname + '/public/style.css');
});

app.get('/screen.js', function(req, res){
  res.sendFile(__dirname + '/public/screen.js');
});

app.get('/tutor.js', function(req, res){
  res.sendFile(__dirname + '/public/tutor.js');
});

app.get('/submit.html', function(req, res){
  res.sendFile(__dirname + '/views/submit.html');
  var std = [req.query.stdname.substring(0,30), req.query.compNum.substring(0,10)];
  queue.push(std);
  printQueue();
  io.emit('updateQueue', queue);
});

io.on('connection', function(socket){
  console.log('a tutor connected: ' + socket.id);
  socket.emit('updateQueue', queue);
  
  socket.on('next', function(){
    queue.shift();
    printQueue();
    io.emit('updateQueue', queue);
  });
});

// Node.js listen
var listener = http.listen(process.env.PORT, function(){
  console.log('Your app is listening on port ' + listener.address().port);
});

var queue = [];
var screenUsers = [];
var tutorUsers = [];

function printQueue() {
  console.log('Queue:');
  var i = 0;
  for (i = 0; i < queue.length; i++) {
    console.log(queue[i]);
  }
  console.log()
}

function clearQueue() {
  while (queue.length > 0) {
    queue.shift();
  }
  
  io.emit('updateQueue', queue);
}