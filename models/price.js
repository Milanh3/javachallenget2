var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');
const Room = require('./room');

var schema = new Schema({
    priceCategory: {type: String, required: true},
    price: {type: Number, required: true},
    room: {type: Schema.Types.ObjectId, ref:'Room', required: true},
});

schema.post('remove', function(price){
    Room.findById(price.room, function(err, room) {
        room.prices.pull(price._id);
        room.save();
    });
});

module.exports = mongoose.model('Price', schema);