var express = require('express');
var mongoose =require('mongoose');
var db;
var Book = require('./models/bookModel');
var bookRouter =require('./Routes/bookRoutes')(Book);
var bodyParser =require('body-parser');

if (process.env.ENV === 'test') {
	db = mongoose.connect('mongodb://localhost/restNodeExpress_test');
} else {
	db = mongoose.connect('mongodb://localhost/restNodeExpress');
}

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
	extend: true
}));
app.use(bodyParser.json());

app.use('/api/books', bookRouter);

app.get('/', function(req, res) {
	res.send('welcome to the API');
});

app.listen(port, function() {
	console.log('running on port: ' + port);
});

module.exports = app;