var MongoClient = require("mongodb").MongoClient;
// affichage du rank et URL
MongoClient.connect("mongodb://localhost:27017",{useNewUrlParser: true}, function(error, db) {
  if (error) throw error;
var dbo=db.db('stiff');
// var query = {URL : "www.facebook.com"};
  dbo.collection('sites').find({}).toArray(function(error, results) {
    if (error) throw error;

    results.forEach(function(i, obj) {
      console.log(
        'URL : ' + obj.URL +
        " Rank: " + obj.Rank
      );
      // console.log(results);
      db.close();
    });
  });
});
