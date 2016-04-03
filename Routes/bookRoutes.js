var express =require('express');

var routes = function(Book) {
	var bookRouter = express.Router();
	var bookController =require('../controllers/bookController')(Book);

	bookRouter.route('/').get(bookController.get).post(bookController.post);

	bookRouter.use('/:bookId', function(req, res, next) {
		Book.findById(req.params.bookId, function(err, book) {
			if (err) {
				res.status(500).send(err);
				return;
			}

			if (!book) {
				res.status(404).send("no book found");
				return;
			}

			req.book = book;
			next();
		});
	});

	bookRouter.route('/:bookId').get(function(req, res) {
		res.json(req.book);
	}).put(function(req, res) {
		req.book.title = req.body.title;
		req.book.author = req.body.author;
		req.book.genre = req.body.genre;
		req.book.read = req.body.read;
		req.book.save(function(err) {
			if (err) {
				res.status(500).send(err);
				return;
			}

			res.json(req.book);
		});
	}).patch(function(req, res) {
		var key;

		if (req.body._id) {
			delete req.body._id;
		}

		for (key in req.body) {
			req.book[key] = req.body[key];
		}

		req.book.save(function(err) {
			if (err) {
				res.status(500).send(err);
				return;
			}

			res.json(req.book);
		});
	}).delete(function(req, res) {
		req.book.remove(function(err) {
			if (err) {
				res.status(500).send(err);
				return;
			}

			res.status(204).send('Book is removed');
		});
	});

	return bookRouter;
};

module.exports = routes;