var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator');

var schema = new Schema({
    firstName: {type:String, required: true},
    lastName: {type:String, required: true},
    password: {type:String, required: true},
    email: {type: String, required: true, unique: true},
    telephone: {type: String, required: true},
    reservations:[{type: Schema.Types.ObjectId, ref:'Reservation'}],
    isAdmin: {type: Boolean, required: true},
    priceCategory: {type: String, required: false},
});

module.exports = mongoose.model('User', schema);