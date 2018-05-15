var express = require('express');
var router = express.Router();
var BDD = require('./connexionMongoDB');


router.get('/category/:inputText', function (req, res) {
    res.send('');
})
router.get('/site/:inputText', function (req, res, next) {
    let retourBDD = BDD.rechercheSite(req.params.inputText);
    if (typeof retourBDD == undefined) {
        res.send("Retour : {}");
    } else {
        res.send("Retour : " + retourBDD);
    }
});

router.get('/:inputText', function (req, res, next) {
    res.send(req.params.inputText + " n'est pas une ressource de l'API !");
});
router.get('/', function (req, res) {
    res.send('Get a random website');
})

module.exports = router;
