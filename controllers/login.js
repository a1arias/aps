exports.index = function(req, res){
  if(req.loggedIn){
    res.redirect('/');
  } else {
    res.render('login', {
        title: 'Login'
    });
  }
},

exports.post = function(req, res){

}
