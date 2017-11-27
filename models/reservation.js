var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const Room = require('./room');
const User = require('./user');

var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref:'User', required: true},
    room: {type: Schema.Types.ObjectId, ref:'Room', required: true},
    start: {type: Date, required: true},
    end: { type: Date, required: true},
    reason: { type: String, required: true},
    accepted: { type: Boolean, required: true},
    paid: { type: Boolean, required: true},
});

schema.post('remove', function(reservation){
    console.log('remove ' + reservation);
    User.findById(reservation.user)
        .exec(function(err, res){
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.reservations.pull(reservation._id);
            res.save();
        });
    console.log(Room);
    Room.findById(reservation.room)
        .exec(function(err, res){
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.reservations.pull(reservation._id);
            res.save();
        });
});

module.exports = mongoose.model('Reservation', schema);