var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var User = require('../models/user');

exports.addUser = function (req, res, next) {
    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password,10),
        email: req.body.email,
        telephone: req.body.telephone,
        isAdmin: req.body.isAdmin,
        priceCategory: req.body.priceCategory
    });

    user.save(function (err, result) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
};

exports.userSignIn = function (req, res, next) {
    User.findOne({email: req.body.email}, function(err, user){
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        if (!user){
            return res.status(401).json({
                title: 'Login mislukt',
                error: {message: 'Invalid login credentials'}
            });
        }

        if (!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title: 'Login mislukt',
                error: {message: 'Invalid login credentials'}
            });
        }

        var token = jwt.sign({user: user}, 'secret', {expiresIn:7200});

        res.status(200).json({
            message: 'Successfully logged in',
            token: token,
            userId: user._id
        })
    });
};

exports.findAllUsers = function (req, res, next) {
    User.find()
        .populate('user', 'firstName')
        .exec(function (err, users) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            if(users.length ===0)
            {
                return res.status(500).json({
                    title:'No users found!'
                })
            }
            res.status(200).json({
                message: 'Success',
                obj: users
            });
        });
};

exports.getUserById = function (req, res, next) {
    User.findById(req.params.id, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'Er deed zich een fout voor',
                error: err
            });
        }
        if(!user){
            return res.status(500).json({
                title: 'Zaal niet gevonden',
                error: {message: 'User niet gevonden'}
            });
        }
        res.status(200).json({
            message: 'User gevonden!',
            obj: user
        });
    });
};

exports.patchUser = function (req, res, next) {
    Reservation.findById(req.params.id, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'Er deed zich een fout voor',
                error: err
            });
        }
        if(!user){
            return res.status(500).json({
                title: 'User niet gevonden',
                error: {message: 'User niet gevonden'}
            });
        }
        user.content = req.body.content;
        user.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'user aangepast!',
                obj: result
            });
        });
    })
};

exports.deleteUser = function (req, res, next) {
    User.findById(req.params.id, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'Er deed zich een fout voor',
                error: err
            });
        }
        if(!user){
            return res.status(500).json({
                title: 'User niet gevonden',
                error: {message: 'User niet gevonden'}
            });
        }

        user.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'user verwijderd!',
                obj: result
            });
        });
    })
};