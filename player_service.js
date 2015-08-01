var player = require('./player');
var express = require('express');
var fs = require('fs');
var path = require('path');

var app = express();

app.use(express.json());
app.use(express.urlencoded());

var SUFFIX = '.game_state.json';

app.get('/', function(req, res) {
  fs.readdir('.', function (err, files) {
    if (!err) {
      var links = '';
      files.filter(function (name) { return name.indexOf(SUFFIX, name.length - SUFFIX.length) !== -1; }).
          forEach(function (name) { links += '<a href="' + name + '">' + name + '</a><br/>'; });
      res.send(200, '<html><body>' + links + '</body></html>')
    } else {
      res.send(200, 'OK')
    }
  });
});

app.get(/\.game_state\.json$/, function(req, res) {
  fs.readFile(path.basename(req.path), function (err, data) {
    if (err) {
      res.send(500, err);
    } else {
      res.set('Content-Type', 'text/json');
      res.send(200, data);
    }
  });
});

app.post('/', function(req, res) {
  if(req.body.action == 'bet_request') {
    res.send(200, player.bet_request(JSON.parse(req.body.game_state)).toString());
  } else if(req.body.action == 'showdown') {
    player.showdown(JSON.parse(req.body.game_state));
    res.send(200, 'OK');
  } else if(req.body.action == 'version') {
    res.send(200, player.VERSION);
  } else {
    res.send(200, 'OK')
  }

});

port = parseInt(process.env['PORT'] || 1337);
host = "0.0.0.0";
app.listen(port, host);
console.log('Listening at http://' + host + ':' + port)
