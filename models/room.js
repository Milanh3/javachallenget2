var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Reservation = require('./reservation');
var Price = require('./price');

var schema = new Schema({
    name: {type: String, required: true},
    length: {type: Number, required: false},
    width: {type: Number, required: false},
    capacity: {type: Number, required: true},
    facilities: [{type: String, required: true}],
    location: {type: String, required: true},
    reservations: [{type: Schema.Types.ObjectId, ref:'Reservation'}],
    prices: [{type: Schema.Types.ObjectId, ref:'Price'}],
    linkedRooms: [{type: Schema.Types.ObjectId, ref: 'Room'}],
    linkedRoomsRequired: [{type: Boolean}],
});

schema.post('remove', function(room){
    room.reservations.forEach(function(item) {
        Reservation.findById(item, function(err, reservation) {
            reservation.remove();
        })
    });

    room.prices.forEach(function(item) {
        Price.findById(item, function(err, price) {
            price.remove();
        })
    });
});

module.exports = mongoose.model('Room', schema);