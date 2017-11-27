var express = require('express');
var router = express.Router();

const PriceRoutes = require('../service/price');

router.get('/', function (req, res, next) {
    PriceRoutes.getAllPrices(req, res, next);
});

router.get('/:id', function (req, res, next) {
    PriceRoutes.getPriceById(req, res, next);
});

router.post('/', function (req, res, next) {
    PriceRoutes.addPrice(req, res, next);
});

router.put('/:id', function(req, res, next){
    PriceRoutes.putPrice(req, res, next);
});

router.patch('/:id', function(req, res, next){
    PriceRoutes.patchPrice(req, res, next);
});

router.delete('/:id', function(req, res, next){
    PriceRoutes.deletePrice(req, res, next);
});

module.exports = router;