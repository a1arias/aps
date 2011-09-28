exports.index = function(req, res){
  //res.send('index index');
  res.render('index', {
    locals: {
        title: 'Welcome'
    }
  });
};

/*
exports.load = function(id, fn){
  process.nextTick(function(){
    fn(null, { title: 'Ferrets' });
  });
};
*/

