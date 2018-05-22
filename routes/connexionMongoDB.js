
module.exports = {
    //connexionMongo: function () {},
    //affichage pour un site défini
    rechercheSite: function (MongoClient, host, urlSite) {
        MongoClient.connect(host, {
            useNewUrlParser: true
        }, function (error, db) {
            if (error)
                throw error;
            var dbo = db.db('stiff');
            var query = {
                URL: urlSite
            };
            var retour = "{";
            dbo.collection('sites').find(query).toArray(function (error, results) {
                if (error)
                    throw error;
                results.forEach(function (obj, i) {
                    retour += (
                            '["URL" : ' + obj.URL +
                            ', "Rank": ' + obj.Rank +
                            '],'
                            )
                });
            });
            db.close();
            return retour.substr(0, -1) + "}";
        });
    },
    //affichage du rank et de l'url
    showRankUrl: function () {
        MongoClient.connect(host, {
            useNewUrlParser: true
        }, function (error, db) {
            if (error)
                throw error;
            var dbo = db.db('stiff');
            dbo.collection('sites').find().toArray(function (error, results) {
                if (error)
                    throw error;
                results.forEach(function (obj, i) {
                    console.log(
                            'URL : ' + obj.URL +
                            " Rank: " + obj.Rank +
                            ' technologie: ' + obj.Technologie
                            );
                    db.close();
                });
            });
        });
    },
    insertSite: function (rank, url, lrd, el, mozR, mozT, technoParam) {
        MongoClient.connect(host, {
            useNewUrlParser: true
        }, function (error, db) {
            if (error)
                throw error;
            var dbo = db.db('stiff');
            var objNew = {
                Rank: rank, URL: url, LinkingRootDomains: lrd, ExternalLinks: el, MozRank: mozR, MozTrust: mozT, Technologie: technoParam
            };
            dbo.collection("sites").insert(objNew, null, function (error, results) {
                if (error)
                    throw error;
                console.log("Le document a bien été inséré");
            });
        });
    },
    updateSite: function (site, rank, lrd, el, mozR, mozT, technoParam) {
        MongoClient.connect(host, {
            useNewUrlParser: true
        }, function (error, db) {
            if (error)
                throw error;
            var dbo = db.db('stiff');
            dbo.collection("sites").update(
                    {URL: site},
                    {$set: {Rank: rank, LinkingRootDomains: lrd, ExternalLinks: el, MozRank: mozR, MozTrust: mozT, Technologie: technoParam}}
            )
        });
    },
    deleteSite: function (site) {
        MongoClient.connect(host, {
            useNewUrlParser: true
        }, function (error, db) {
            if (error)
                throw error;
            var dbo = db.db('stiff');
            query = {URL: site};
            dbo.collection("sites").deleteOne(query, function (err, obj) {
                if (err)
                    throw err;
                console.log('1 document deleted');
                db.close();
            });
        });
    },
    addTechnoSite: function (site, technoParam) {
        MongoClient.connect(host, {
            useNewUrlParser: true
        }, function (error, db) {
            if (error)
                throw error;
            var dbo = db.db('stiff');
            dbo.collection("sites").update(
                    {URL: site},
                    {$set: {Technologie: technoParam}}
            )
        });
    }
//récupération de la donnée via formulaire a la place de url en brute
//var url = "facebook.com";
//appel fonction test
//showRankUrl();
//rechercheSite(url);
//insertSite(501,'test2.com',null,null,null,null,'test');
//var site = 'test2.com';
//updateSite(site,'linux');
//addTechnoSite(site,"linux");
//deleteSite(site);

}
