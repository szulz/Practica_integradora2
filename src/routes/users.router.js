const fs = require('fs');
const express = require('express');
const UserModel = require('../models/users.model');
const usersRouter = express.Router()



usersRouter.get("/", async (req, res) => {
    try {
        let usuarios = await UserModel.find({});
        console.log(usuarios);
        return res.status(200).json({
            status: "success",
            msg: 'lista de usuarios',
            data: usuarios
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            msg: "error"
        })
    }
})

usersRouter.post("/", async (req, res) => {
    try {
        const { firstName, lastName, email } = req.body
        if (!firstName || !lastName || !email) {
            throw new Error();
        }
        let user = await UserModel.create({ firstName, lastName, email })
        console.log(user);
        res.json({ data: { user } })
    } catch (e) {
        res.status(400).send({
            msg: 'error'
        })
    }
})


module.exports = usersRouter;