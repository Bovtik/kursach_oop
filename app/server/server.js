var http = require('http'),
 express = require('express'),
 fs = require('fs'),
 path = require('path');

var server = express();

server.use('/browser', 
  express.static(
    path.join(
      path.join(__dirname, '..'), 'browser')));

server.get('/', function(req, res) {
  var layout = fs.readFileSync('../browser/index.html', 'utf8');
  res.send(layout);
});

server.listen(1337, function () {
  console.log('Listening on port 1337');
});

