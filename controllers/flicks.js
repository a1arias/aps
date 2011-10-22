var mongoose = require('mongoose'),

util = require('util'),

//db = mongoose.connect('mongodb://127.0.0.1/flicks'),

//create the movie Model using the 'movies' collection as a data-source
movieModel = mongoose.model('movies', new mongoose.Schema({
    title: String,
    year: Number
}));

exports.index = function(req, res) {
    switch (req.format) {
        case 'json':
            debugger;
            //res.send(util.inspect(doc));
            movieModel.find({}, function(err, movies) {
                debugger;
                //res.writeHead(200, {'Content-Type': 'application/json'});
                console.log(util.inspect(movies, false, 3));
                res.send({
                    success: true,
                    data: movies
                });
            });
            break;

        case 'xml':
            res.send({
                test: 'xml requested'
            });
            break;

        default:
            //res.send(articles);
            res.render('flicks', {
                locals: {
                    title: 'Flicks',
                }
            });
    }
};