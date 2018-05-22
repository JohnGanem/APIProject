var express = require('express');
var router = express.Router();
var BDD = require('./connexionMongoDB');
var MongoClient = require("mongodb").MongoClient;
var host = "mongodb://localhost:27017";

router.get('/categorie/:inputText', function (req, res) {
    res.send('');
});
router.get('/site/:inputText', function (req, res, next) {
    let retourBDD = BDD.rechercheSite(MongoClient, host, req.params.inputText);
    console.log(retourBDD);
    if (typeof retourBDD != undefined || retourBDD != "") {
        res.send("Retour : " + retourBDD);
        console.log(retourBDD);
    } else {

        res.send("Retour : {}");
    }
});

router.all('/*', function (req, res) {
  res.render('index', { title: 'API SNIFF' });
});

module.exports = router;
