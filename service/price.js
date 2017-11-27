const Price = require('../models/price');

exports.getAllPrices = function(req, res, next) {
    Price.find()
        .exec(function (err, prices) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: prices
            });
        });
};

exports.getPriceById = function(req, res, next) {
    Price.findById(req.params.id)
        .exec(function (err, price) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Success',
                obj: price
            });
        });
};

exports.addPrice = function(req, res, next) {
    const decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id, function(err, user){
        if (err || !user.isAdmin) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }

        const price = new Price({
            priceCategory: req.body.priceCategory,
            price: req.body.price,
            room: req.body.roomId
        });
        price.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Prijs toegevoegd!',
                obj: result
            });
        });
    })
};

exports.putPrice = function(req, res, next) {
    Price.findById(req.params.id, function(err, price){
        if(err){
            return res.status(500).json({
                title: 'Er deed zich een fout voor',
                error: err
            });
        }
        if(!price){
            return res.status(500).json({
                title: 'Reservatie niet gevonden',
                error: {message: 'Reservatie niet gevonden'}
            });
        }
        price.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Price aangepast!',
                obj: result
            });
        });
    })
};

exports.patchPrice = function(req, res, next) {
    Price.findById(req.params.id, function(err, price){
        if(err){
            return res.status(500).json({
                title: 'Er deed zich een fout voor',
                error: err
            });
        }
        if(!price){
            return res.status(500).json({
                title: 'Prijs niet gevonden',
                error: {message: 'Prijs niet gevonden'}
            });
        }
        price.save(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Prijs aangepast!',
                obj: result
            });
        });
    })
};

exports.deletePrice = function(req, res, next) {
    Price.findById(req.params.id, function(err, reservation){
        if(err){
            return res.status(500).json({
                title: 'Er deed zich een fout voor',
                error: err
            });
        }
        if(!price){
            return res.status(500).json({
                title: 'Prijs niet gevonden',
                error: {message: 'Prijs niet gevonden'}
            });
        }

        price.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Prijs verwijderd!',
                obj: result
            });
        });
    })
}