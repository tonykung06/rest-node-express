var bookController = function(Book) {
	var post = function(req, res) {
		if (!req.body.title) {
			res.status(400);
			res.send('Title is required');
			return;
		}

		var book = new Book(req.body);

		book.save();

		res.status(201);
		res.send(book);
	};

	var get = function(req, res) {
		var queryWhiteList = ['genre'];
		var query = {};

		if (req.query) {
			query = Object.keys(req.query).filter(function(item) {
				return queryWhiteList.indexOf(item) > -1;
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

			var returnBooks = books.map(function(item) {
				var newBook = item.toJSON();

				newBook.links = {
					self: 'http://' + req.headers.host + '/api/books/' + newBook._id
				};

				return newBook;
			});

			res.json(returnBooks);
		});
	};

	return {
		get: get,
		post: post
	};
};

module.exports = bookController;