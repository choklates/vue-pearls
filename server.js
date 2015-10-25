var express  = require('express');
var app      = express();
var http     = require('http').Server(app);

var port = process.env.PORT || 5000;

app.set('port', port);

app.use(express.static('dist'));

app.get('/', function(req, res) {
  res.sendFile('/index.html');
});

http.listen(port, function() {
  console.log('listening on', port);
});
