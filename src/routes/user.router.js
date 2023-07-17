const express = require('express');
const user_Model = require('../DAO/models/user.model');
const User_Manager = require('../services/user.service');
const userRouter = express.Router();
const user_manager = new User_Manager;

userRouter.post('/', async (req, res) => {
    console.log(req.body);
    let user = await user_manager.createUser(req.body)
    res.send(JSON.stringify(user, null, 2));
})


module.exports = userRouter;