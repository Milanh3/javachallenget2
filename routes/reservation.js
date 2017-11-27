var express = require('express');
var router = express.Router();
var jwt=require('jsonwebtoken');
const ReservationService = require('../service/reservation');

router.get('/', function (req, res, next) {
    ReservationService.getAllReservations(req, res, next);
});

router.get('/:offset/:count', function (req, res, next) {
    ReservationService.getAllReservations(req, res, next, req.params.offset, req.params.count);
});

router.get('/:id', function (req, res, next) {
    ReservationService.getReservationById(req, res, next);
});

router.post('/', function (req, res, next) {
    ReservationService.addReservation(req, res, next);
});

router.put('/:id', function(req, res, next){
    ReservationService.putReservation(req, res, next);
});

router.patch('/:id', function(req, res, next){
    ReservationService.patchReservation(req, res, next);
});

router.delete('/:id', function(req, res, next){
    ReservationService.deleteReservation(req, res, next);
});

module.exports = router;
