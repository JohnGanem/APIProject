var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    res.send('Get a random website');
})
router.post('/', function (req, res) {
    res.send('Add a website');
})
router.put('/', function (req, res) {
    res.send('Update a website');
});

module.exports = router;