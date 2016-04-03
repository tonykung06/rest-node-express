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
	};

	return {
		get: get,
		post: post
	};
};

module.exports = bookController;