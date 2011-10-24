var mongoose = require('mongoose'),
	util = require('util');

// TODO: setup user provider and setup model here

exports.index = function(req, res){
	switch(req.format){
		case 'json':
			res.json({success: true, users: [
				{id: 1, name: 'Ed', email: 'ed@sencha.com'},
				{id: 2, name: 'Tommy', email: 'tommy@sencha.com'}
			]});
			break;
		
		case 'xml':
			res.send('XML unavailable', 500);
			break;
		
		default:
			res.render('users', {
				locals: {
					title: 'Users'
				}
			});

	}
};

// PUT /users/:id
exports.update = function(req, res){
	res.json('success', true);
};