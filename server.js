
/**
 * Uncomment to enable profiling
 */
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

// TODO: create authorization module for use within resource controllers

// TODO: move to lib
// 404 error handler
function NotFound(msg){
  this.name = 'NotFound';
  Error.call(this, msg);
  Error.captureStackTrace(this, arguments.callee);
}
NotFound.prototype.__proto__ = Error.prototype;

// everyauth / mongoogeauth setup
UserSchema.plugin(mongooseAuth, {
    everymodule: {
      everyauth: {
        User: function(){
          return User;
        }
      }
    },

    //TODO: Move vaues to configuration file

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
  app.set('view options', { layout: false });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'HelloJ3lloOhY34', store: new RedisStore({pass: 'PushStrangeWorld'}) }));
  app.use(express.favicon());
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
  //app.use(express.directory(__dirname + '/public'));
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

mongooseAuth.helpExpress(app);

app.error(function(err, req, res, next){
  if(err instanceof NotFound){
    res.render('404', {locals: {
      title: '404 - Not Found',
      desc: 'The requested resource could not be found',
      // analyticsId: 'XXXXXXX',
      error: err
    }, status: 404});
  } else {
    console.log(util.inspect(err));
    debugger;
    res.render('500', {locals: {
      title: '500 - Internal Server Error',
      desc: 'Unable to process the request',
      // analyticsId: 'XXXXXXX',
      error: err
    }, status: 500});
  }
});

app.get('/404', function(req, res){
  throw new NotFound;
});

app.get('/500', function(req, res){
  throw new Error('Unable to process request.');
});

var route_rules = require('./config/routing.conf.js').rules;
// Routes handler

route_rules.forEach(function(e){
    if(e.rule == '/'){
        app.resource(require('./controllers/index'));
    } else {
        app.resource(e.module, require('./controllers/'+e.module));
    }
});

app.get('*', function(req, res){
  throw new NotFound;
});

// works with spark2 and node
if(!module.parent){
  app.listen(3000);
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}

