var express = require('express');
var app = express();
var jwt = require('express-jwt');
var cors = require('cors');

app.use(cors());
app.use(express.static(__dirname + '/public'));

app.set('port', (process.env.PORT || 5000));

var authCheck = jwt({
  secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

var allFruit = [
  { id: 1, name: 'Apple'},
  { id: 2, name: 'Banana'},
  { id: 3, name: 'Canteloupe'}
];

app.get('/api/allFruit', authCheck, function(req, res) {
  res.json(allFruit);
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
