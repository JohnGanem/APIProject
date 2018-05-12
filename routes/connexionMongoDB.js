var MongoClient = require("mongodb").MongoClient;
var host = "mongodb://localhost:27017";

function connexionMongo() {}
//affichage pour un site défini
function rechercheSite(urlSite) {
  MongoClient.connect(host, {
    useNewUrlParser: true
  }, function(error, db) {
    if (error) throw error;
    var dbo = db.db('stiff');
    var query = {
      URL: urlSite + "/"
    };
    dbo.collection('sites').find(query).toArray(function(error, results) {
      if (error) throw error;
      results.forEach(function(obj, i) {
        console.log(
          'URL : ' + obj.URL +
          " Rank: " + obj.Rank
        );
        db.close();
      });
    });
  });
}
//affichage du rank et de l'url
function showRankUrl() {
  MongoClient.connect(host, {
    useNewUrlParser: true
  }, function(error, db) {
    if (error) throw error;
    var dbo = db.db('stiff');
    dbo.collection('sites').find().toArray(function(error, results) {
      if (error) throw error;
      results.forEach(function(obj, i) {
        console.log(
          'URL : ' + obj.URL +
          " Rank: " + obj.Rank+
          'technologie: ' +obj.Technologie
        );
        db.close();
      });
    });
  });
}

function insertSite(rank, url, lrd, el, mozR, mozT,technoParam) {
  MongoClient.connect(host, {
    useNewUrlParser: true
  }, function(error, db) {
    if (error) throw error;
    var dbo = db.db('stiff');
    var objNew = {
      Rank: rank, URL: url , LinkingRootDomains: lrd , ExternalLinks: el , MozRank: mozR , MozTrust: mozT, Technologie: technoParam
    };
    dbo.collection("sites").insert(objNew, null, function(error, results) {
      if (error) throw error;
      console.log("Le document a bien été inséré");
    });
  });
}

function updateSite(site,technoParam) {}

function deleteSite(site) {}

function addTechnoSite(site, technoParam) {
  MongoClient.connect(host, {
    useNewUrlParser: true
  }, function(error, db) {
    if (error) throw error;
    var dbo = db.db('stiff');
    SiteSlash = site;
    dbo.collection("sites").update(
      {
        URL: SiteSlash
      },
      {
        $set: {
          Technologie: technoParam
        }
      }
    );
      console.log('ok');
    });
}
//récupération de la donnée via formulaire a la place de url en brute
//var url = "facebook.com";
//appel fonction test
// showRankUrl();
// rechercheSite(url);
//insertSite(501,'test2.com/',300,300,2,2,'test');
var site = 'test2.com/';
updateSite(site,'linux');
