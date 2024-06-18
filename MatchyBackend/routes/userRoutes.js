const express = require('express');
const router = express.Router();

module.exports = function (db) {
    const User = require('../models/user');
    const UserService = require('../services/userService');
    const UserController = require('../controllers/userController');

    const userModel = new User(db);
    const userService = new UserService(userModel);
    const userController = new UserController(userService);

    router.post('/users/register', (req, res) => userController.createUser(req, res));
    router.get('/users', (req, res) => userController.getAllUsers(req, res));
    router.get('/users/:gender', (req, res) => userController.getAllUsersByGender(req, res));
    router.get('/users/:id', (req, res) => userController.getUserById(req, res));
    router.put('/users/:id', (req, res) => userController.updateUser(req, res));
    router.delete('/users/:id', (req, res) => userController.deleteUser(req, res));

    return router;
};
