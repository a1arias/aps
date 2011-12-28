var util = require('util');

var Articles = require('../models/blog').Articles;

var ArticleProvider = require('../models/blog').ArticleProvider;

var ObjectId = require('mongoose').Types.ObjectId;

//var Canvas = require('canvas');

// GET /blog
exports.index = function(req, res) {

	articles = Articles.find({}, function(err, doc) {
		if (err) {

			console.log('Error: ' + "\n" + util.inspect(err, true, 3) + "\n");
			return err;

		} else {

			//console.log('Document: '+"\n"+util.inspect(doc, true, 3)+"\n");
			switch (req.format) {

			case 'json':
				res.json(doc);
				break;

			case 'xml':
				res.send('<article>' + articles.map(function(article) {
					return '<article_title>' + article.title + '</article_title>';
				}).join('') + '</article>');
				break;

			default:
				//res.send(articles);
				res.render('blog', {
					locals: {
						title: 'Blog',
						articles: doc
					}
				});

			}

		}

	});
};

// GET /blog/new
exports.new = function(req, res) {
	//res.send('new blog');
	res.render('blog_new', {
		locals: {
			title: 'New Blog Post'
		}
	});
};

// POST /blog
exports.create = function(req, res) {
	//res.send(req.body.article);
	post = new Articles(req.body.article);
	post.save(function(err) {
		if (!err) console.log('Success!');
	});

	res.redirect('/blog');
};

// GET /blog/:id
exports.show = function(req, res) {
	//res.send('show blog ' + req.blog.title);
	//console.log("req.params: \n"+util.inspect(req.params.blog, true, 3)+"\n");
	blogId = new ObjectId(req.params.blog);

	// get record using req.params.id
	Articles.findById({
		_id: blogId
	}, function(err, doc) {
		if (err) {
			//console.log("err: \n"+util.inspect(err, true, null)+"\n");
			req.flash('error', 'The document could not be found');
			res.render('blog_show', {
				title: 'Unknown Article'
			});
		} else {
			switch (req.format) {

			case 'json':
				res.json(doc);
				break;

			case 'xml':
				res.send('poop in xml format');
				break;

			default:
				//console.log("doc: \n"+util.inspect(doc, true, 3)+"\n");
				res.render('blog_show', {
					title: doc.title,
					date: doc.date,
					content: doc.content
				});

			}
		}
	});
};

// GET /blog/:id/edit
exports.edit = function(req, res) {
	//res.send(util.inspect(everyauth, true, null));
	//console.log(util.inspect(req, true, null));
	if (!req.loggedIn) {
		req.session.redirectUrl = req.originalUrl;
		res.redirect('/login');
	} else {
		blogId = new ObjectId(req.params.blog);

		Articles.findById({
			_id: blogId
		}, function(err, doc) {
			if (err) {
				//console.log("err: \n"+util.inspect(err, true, null)+"\n");
				req.flash('error', 'The document could not be found');
				res.render('blog_show', {
					title: 'Unknown Article'
				});
			} else {
				//console.log("doc: \n"+util.inspect(doc, true, 3)+"\n");
				res.render('blog_edit', {
					id: doc._id,
					title: doc.title,
					content: doc.content
				});
			}
		});
	}
};

// PUT /blog/:id
exports.update = function(req, res) {
	//res.send('update blog ' + req.params);
	if (!req.loggedIn) {
		res.redirect('back');
	} else {

		//console.log("\nArticleProvider: \n"+util.inspect(ArticleProvider, true, 3)+"\n\n");
		if (req.body) {
			ArticleProvider.methods.updateById(req.params.blog, req.body, function(err, doc) {
				if (err) {
					res.flash('error', JSON.stringify(err));
				} else {
					res.redirect('/blog/' + req.params.blog + '/edit');
				}
			});
		} else {
			res.redirect('/blog/' + req.params.blog);
		}
	}
};

// DELETE /blog/:id
exports.destroy = function(req, res) {
	//res.send('destroy blog ' + req.blog.title);
	// TODO: Implement Role check. If not admin do not allow user to delete.
	//debugger;
	if (!req.loggedIn) {
		res.redirect('back');
	} else {
		ArticleProvider.methods.deleteById(req.params.blog, function(err, doc) {
			if (err) {
				res.flash('error', 'Unable to delete item.');
			} else {
				res.redirect('/blog');
			}
		});
	}
};

exports.load = function(id, fn) {
	process.nextTick(function() {
		fn(null, {
			title: 'Blog'
		});
	});
};