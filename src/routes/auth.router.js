const express = require('express');
const userModel = require('../DAO/models/users.model');
const authRouter = express.Router();
const UserManagerMongoose = require('../services/users.service');
const userManagerMongoose = new UserManagerMongoose

//logout 
authRouter.get('/logOut', async (req, res) => {
    if (req.session) {
        req.session.destroy()
    }
    return res.redirect('/auth/login')
})

// perfil user
authRouter.get('/perfil', async (req, res) => {
    const user = await req.session.user
    return res.render('profile', { user })
})


// pantalla de log in
authRouter.get('/login', async (req, res) => {
    return res.render('login', {})
})

//  logeo user
authRouter.post('/login', async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email })
    if (user && user.pass == await req.body.pass) {
        req.session.user = user
        req.session.isAdmin = user.isAdmin
        console.log(req.session);
        return res.redirect('/auth/perfil')
    } else {
        return res.send('error')
    }
})

// pantalla registro
authRouter.get('/register', async (req, res) => {
    return res.render('register', {})
})

// registrado de user
authRouter.post('/register', async (req, res) => {
    if (req.body.email == 'test@test.com') {
        req.body.isAdmin = true
    } else {
        req.body.isAdmin = false
    }
    await userManagerMongoose.createUser(req.body)
    return res.render('welcome', {})
})

module.exports = authRouter;