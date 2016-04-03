var should = require('should');
var request = require('supertest');
var app = require('../app.js');
var mongoose = require('mongoose');
var Book = mongoose.model('Book'); //app.js has already init and register this model
var agent = request.agent(app);

describe('Book CRUD Tests', function() {
	afterEach(function(done) {
		Book.remove({}, function() {
			done();
		});
	});

	it('should allow a book to be posted and return a read and _id', function(done) {
		var bookPost = {
			title: 'new book',
			author: 'Tony',
			genre: 'Fiction'
		};

		agent.post('/api/books').send(bookPost).expect(200).end(function(err, results) {
			results.body.read.should.equal(false);
			results.body.should.have.property('_id');
			done();
		});
	});
});