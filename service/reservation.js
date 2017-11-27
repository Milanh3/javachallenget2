var jwt=require('jsonwebtoken');
const User = require('../models/user');
const Reservation = require('../models/reservation');
const Room = require('../models/room');

exports.getAllReservations = function(req, res, next, offset=0, count=0) {
        Reservation.find()
            .populate('user')
            .populate('room')
            .exec(function (err, reservations) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                if (count!=0) reservations = reservations.slice(offset,offset+count);
                res.status(200).json({
                    message: 'Success',
                    obj: reservations
                });
            });
};

exports.getReservationById = function(req, res, next) {
    Reservation.findById(req.params.id)
        .populate('user')
        .populate('room')
        .exec(function (err, reservation) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: reservation
            });
        });
};

exports.addReservation = function(req, res, next) {
    var reservation = new Reservation({
        user: req.body.user,
        room: req.body.room,
        start: req.body.start,
        end: req.body.end,
        reason: req.body.reason,
        accepted: req.body.accepted,
        paid: req.body.paid
    });
    reservation.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        Room.findById(reservation.room, function(err, room){
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            room.reservations.push(reservation);
            room.save()
        });
        User.findById(reservation.user, function(err, user){
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            user.reservations.push(reservation);
            user.save()
        });
        res.status(201).json({
            message: 'Reservation created',
            obj: result
        });
    });
};

exports.putReservation = function(req, res, next) {
    Reservation.findById(req.params.id, function(err, reservation){
        if(err){
            return res.status(500).json({
                title: 'Er deed zich een fout voor',
                error: err
            });
        }
        if(!reservation){
            return res.status(500).json({
                title: 'Reservation niet gevonden',
                error: {message: 'Reservation niet gevonden'}
            });
        }
        reservation.content = req.body.content;
        reservation.user= req.body.user;
        reservation.room= req.body.room;
        reservation.start= req.body.start;
        reservation.end= req.body.end;
        reservation.reason= req.body.reason;
        reservation.accepted= req.body.accepted;
        reservation.paid= req.body.paid;
        reservation.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'reservation aangepast!',
                obj: result
            });
        });
    })
};

exports.patchReservation = function(req, res, next) {
    console.log("patchReservation");    
    Reservation.findById(req.params.id, function(err, reservation){
        if(err){
            return res.status(500).json({
                title: 'Er deed zich een fout voor',
                error: err
            });
        }
        if(!reservation){
            return res.status(500).json({
                title: 'Reservatie niet gevonden',
                error: {message: 'Reservatie niet gevonden'}
            });
        }
        reservation.user= req.body.user ? req.body.user : reservation.user;
        reservation.room= req.body.room ? req.body.room : reservation.room;
        reservation.start= req.body.start ? req.body.start  :reservation.start;
        reservation.end= req.body.end ? req.body.end : reservation.end;
        reservation.reason= req.body.reason ? req.body.reason : reservation.reason;
        if (req.body.accepted != null) reservation.accepted = req.body.accepted;
        if (req.body.paid != null) reservation.paid = req.body.paid;       
        reservation.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            console.log("reservatie aangepast");
            res.status(201).json({
                message: 'Reservatie aangepast!',
                obj: result
            });
        });
    })
};

exports.deleteReservation = function(req, res, next) {
    const decoded = jwt.decode(req.query.token);
    Reservation.findById(req.params.id, function(err, reservation){
        if(err){
            return res.status(500).json({
                title: 'Er deed zich een fout voor',
                error: err
            });
        }
        if(!reservation){
            return res.status(500).json({
                title: 'reservation niet gevonden',
                error: {message: 'reservation niet gevonden'}
            });
        }
        User.findById(reservation.user, function(err, user) {
            if(err || !user){
                return res.status(500).json({
                    title: 'Er deed zich een fout voor',
                    error: err
                });
            }
            if(reservation.user != decoded.user._id && !user.isAdmin){
                return res.status(401).json({
                    title: 'Not authenticated',
                    error: {message: 'reservation do not match'}
                });
            }
            reservation.remove(function (err, result) {
                if (err) {
                    return res.status(500).json({
                        title: 'An error occurred',
                        error: err
                    });
                }
                res.status(200).json({
                    message: 'Reservatie verwijderd!',
                    obj: result
                });
            });
        });
    })
};