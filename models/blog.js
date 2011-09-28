var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var util = require('util');

var ArticleSchema = new Schema({
    title           : { type: String, index: true }
  , content         : { type: String }
  , date_created    : { type: Date, default: new Date() }
  , date_modified   : { type: Date, default: new Date() }
  , _id             : { type: ObjectId, index: true  }
  //, comments      : [Comment]
});

var ArticleModel = mongoose.model('Article', ArticleSchema);

//exports.Article = mongoose.model('Article', ArticleSchema);
exports.Articles = ArticleModel;

ArticleProvider = ArticleSchema;

ArticleProvider.methods.updateById = function(id, data, callback){
 article = ArticleModel.findById(id, function(err, doc){
    if(!err){
      doc.title = data.title;
      doc.content = data.content;
      doc.date_modified = new Date();
      doc.save();
      //debugger;
      //console.log("\narticle in model: \n"+util.inspect(article, true, 3)+"\n\n");
      callback(null, doc);
    } else {
      callback(err, null);
    }
  });
};

ArticleProvider.methods.deleteById = function(id, callback){
  ArticleModel.remove({ _id: id }, function(err, doc){
    if(err){
      //debugger;
      callback(err, null);
    } else {
      //debugger;
      callback(null, doc);
    }
  });
};

exports.ArticleProvider = ArticleProvider;
