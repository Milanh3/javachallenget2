var express = require('express');
var router = express.Router();

const RoomService = require('../service/room');


// Get all rooms
router.get('/', function (req, res, next) {
    RoomService.getAllRooms(req, res, next);
});

// Get room by id
router.get('/:id', function(req, res, next) {
    RoomService.getRoomById(req, res, next);
});

// Add room
router.post('/', function (req, res, next) {
    RoomService.addRoom(req, res, next);
});


// Update room
router.patch('/:id', function(req, res, next){
    RoomService.patchRoom(req, res, next);
});


// Update room
router.put('/:id', function(req, res, next){
    RoomService.putRoom(req, res, next);
});

// Delete room
router.delete('/:id', function(req, res, next){
    RoomService.deleteRoom(req, res, next);
});

module.exports = router;