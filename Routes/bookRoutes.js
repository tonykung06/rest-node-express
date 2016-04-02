var express =require('express');

var routes = function(Book) {
	var bookRouter = express.Router();

	bookRouter.route('/').get(function(req, res) {
		var queryWhiteList = ['genre'];
		var query = {};

		if (req.query) {
			query = Object.keys(req.query).filter(function(item) {
				return queryWhiteList.includes(item);
			}).reduce(function(prev, current) {
				prev[current] = req.query[current];

				return prev;
			}, {});
		}

		Book.find(query, function(err, books) {
			if (err) {
				res.status(500).send(err);
				return;
			}

			res.json(books);
		});
	}).post(function(req, res) {
		var book = new Book(req.body);

		book.save();

		res.status(201).send(book);
	});

	bookRouter.route('/:bookId').get(function(req, res) {
		Book.findById(req.params.bookId, function(err, book) {
			if (err) {
				res.status(500).send(err);
				return;
			}

			res.json(book);
		});
	});

	return bookRouter;
};

module.exports = routes;