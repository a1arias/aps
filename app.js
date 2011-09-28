//var profiler = require('v8-profiler');
//profiler.startProfiling('startup');

var util = require('util');

/**
 * Module dependencies.
 */

var express = require('express')
    , RedisStore = require('connect-redis')(express)
    , resource = require('express-resource')
    , mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , mongooseAuth = require('mongoose-auth')
    , app = module.exports = express.createServer();


var UserSchema = new Schema({})
    , User;

UserSchema.plugin(mongooseAuth, {
    everymodule: {
      everyauth: {
        User: function(){
          return User;
        }
      }
    },

    facebook: {
      everyauth: {
          myHostname: 'http://local.host:3000'
        , appId: '252166594823442'
        , appSecret: '86eef34f1dd727a8407ad0e011b08863'
        , redirectPath: '/'
      }
    }, 

    twitter: {
      everyauth: {
          myHostname: 'http://local.host:3000'
        , consumerKey: 'HP2i3vAAOkOVElhIlgkrsw'
        , consumerSecret: '2FxDQKGEejIU26paMqFYb1lSfMTk0JOhsDVIDJFCt6Q'
        , redirectPath: '/'
      }
    }
});

mongoose.model('User', UserSchema);

// General Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'HelloJ3lloOhY34', store: new RedisStore({pass: 'PushStrangeWorld'}) }));
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(mongooseAuth.middleware());
  app.dynamicHelpers({
    session: function(req, res){
      return req.session;
    },
    scripts: function(req, res){
      return ['jquery.js'];
    },
    messages: require('express-messages')
  });
  //app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

// Testing ENV only
app.configure('testing', function(){
  app.set('db-uri', 'mongodb://localhost/aps-test');
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  app.use(express.logger());
});

// development ENV only
app.configure('development', function(){
  app.set('db-uri', 'mongodb://localhost/aps-dev');
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
  app.use(express.logger());
});

// production ENV only
app.configure('production', function(){
  app.set('db-uri', 'mongodb://localhost/aps');
  app.use(express.errorHandler()); 
});

//console.log(util.inspect(app.set('db-uri'));
mongoose.connect(app.set('db-uri'));

User = mongoose.model('User');

var route_rules = require('./config/routing.conf.js').rules;
// Routes handler

route_rules.forEach(function(e){
    if(e.rule == '/'){
        app.resource(require('./controllers/index'));
    } else {
        app.resource(e.module, require('./controllers/'+e.module));
    }
});

mongooseAuth.helpExpress(app);

// works with spark2 and node
if(!module.parent){
  app.listen(3000);
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}

