var express = require('express');
var router = express.Router();
const UserService = require('../service/user');

router.post('/', function (req, res, next) {
    UserService.addUser(req, res, next);
});

router.post('/signin', function (req, res, next) {
    UserService.userSignIn(req, res, next);
});

router.get('/', function (req, res, next) {
    UserService.findAllUsers(req, res, next);
});

// Get user by id
router.get('/:id', function(req, res, next) {
    UserService.getUserById(req, res, next);
});

router.patch('/:id', function(req, res, next){
    UserService.patchUser(req, res, next);
});

router.delete('/:id', function(req, res, next){
    UserService.deleteUser(req, res, next);
});

module.exports = router;