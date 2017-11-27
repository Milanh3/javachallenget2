var jwt=require('jsonwebtoken');
const Room = require('../models/room');
const User = require('../models/user');

exports.getAllRooms = function(req, res, next) {
    Room.find()
        .exec(function (err, rooms) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: rooms
            });
        });
};

exports.getRoomById = function (req, res, next) {
    Room.findById(req.params.id, function(err, room){
        if(err){
            return res.status(500).json({
                title: 'Er deed zich een fout voor',
                error: err
            });
        }
        if(!room){
            return res.status(500).json({
                title: 'Zaal niet gevonden',
                error: {message: 'Zaal niet gevonden'}
            });
        }
        res.status(200).json({
            message: 'Zaal gevonden!',
            obj: room
        });
    });
};

exports.addRoom = function(req, res, next) {
    const decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user){
        if (err || !user.isAdmin) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        const room = new Room({
            name: req.body.name,
            length: req.body.length,
            width: req.body.width,
            capacity: req.body.capacity,
            facilities: req.body.facilities,
            location: req.body.location,
            linkedRooms: req.body.linkedRooms,
            linkedRoomsRequired: req.body.linkedRoomsRequired,
            reservations: req.body.reservations
        });
        room.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Zaal toegevoegd!',
                obj: result
            });
        });
    })
};

exports.putRoom = function(req, res, next) {
    const decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user) {
        if (err || !user.isAdmin) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        Room.findById(req.params.id, function(err, room){
            if(err){
                return res.status(500).json({
                    title: 'Er deed zich een fout voor',
                    error: err
                });
            }
            if(!room){
                return res.status(500).json({
                    title: 'Zaal niet gevonden',
                    error: {message: 'Zaal niet gevonden'}
                });
            }
            room.name = req.body.name;
            room.length = req.body.length;
            room.width = req.body.width;
            room.capacity = req.body.capacity;
            room.facilities = req.body.facilities;
            room.location = req.body.location;
            room.linkedRooms = req.body.linkedRooms;
            room.linkedRoomsRequired = req.body.linkedRoomsRequired;
            room.save(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'Zaal aangepast!',
                    obj: result
                });
            });
        })
    })
};

exports.patchRoom = function (req, res, next) {
    const decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user) {
        if (err || !user.isAdmin) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        Room.findById(req.params.id, function(err, room){
            if(err){
                return res.status(500).json({
                    title: 'Er deed zich een fout voor',
                    error: err
                });
            }
            if(!room){
                return res.status(500).json({
                    title: 'Zaal niet gevonden',
                    error: {message: 'Zaal niet gevonden'}
                });
            }
            console.log(req.body);
            room.name = req.body.name ? req.body.name : room.name;
            room.length = req.body.length ? req.body.length : room.length;
            room.width = req.body.width ? req.body.width : room.width;
            room.capacity = req.body.capacity ? req.body.capacity : room.capacity;
            room.facilities = req.body.facilities ? req.body.facilities : room.facilities;
            room.location = req.body.location ? req.body.location : room.location;
            room.linkedRooms = req.body.linkedRooms ? req.body.linkedRooms : room.linkedRooms;
            room.linkedRoomsRequired = req.body.linkedRoomsRequired ? req.body.linkedRoomsRequired : room.linkedRoomsRequired;
            room.save(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(201).json({
                    message: 'Zaal aangepast!',
                    obj: result
                });
            });
        })
    })
};

exports.deleteRoom = function (req, res, next) {
    const decoded = jwt.decode(req.query.token);
    User.findById(decoded.user.id, function(err, user) {
        if (err || !user.isAdmin) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            })
        }

        Room.findById(req.params.id, function(err, room){
            if(err){
                return res.status(500).json({
                    title: 'Er deed zich een fout voor',
                    error: err
                });
            }
            if(!room){
                return res.status(500).json({
                    title: 'Zaal niet gevonden',
                    error: {message: 'Zaal niet gevonden'}
                });
            }
            room.remove(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Zaal verwijderd!',
                    obj: result
                });
            });
        })
    })
}