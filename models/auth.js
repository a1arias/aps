var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , mongooseAuth = require('mongoose-auth');

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
    }
});

mongoose.model('User', UserSchema);

User = mongoose.model('User');

exports.User;
