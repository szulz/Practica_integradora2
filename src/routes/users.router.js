const express = require('express');
const usersRouter = express.Router();
const userModel = require('../DAO/models/users.model');
const UserManagerMongoose = require('../services/users.service');
const userManagerMongoose = new UserManagerMongoose;

usersRouter.post('/', async (req, res) => {
    let user = await userManagerMongoose.createUser(req.body)
    res.send(JSON.stringify(user, null, 2));
})


usersRouter.get('/', async (req, res) => {
    res.send(JSON.stringify(await userManagerMongoose.getUsers()));
})

module.exports = usersRouter;