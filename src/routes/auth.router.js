const express = require('express');
const userModel = require('../DAO/models/users.model');
const Auth = require('../middlewares/auth.js');
const auth = new Auth;
const authRouter = express.Router();
const UserManagerMongoose = require('../services/users.service');
const { createHash, isValidPassword } = require('../utils');
const passport = require('passport');
const userManagerMongoose = new UserManagerMongoose

//admin view 
authRouter.get('/admin', auth.isAdmin, async (req, res) => {
    let users = await userManagerMongoose.getUsers()
    const userProperties = users.map(user => {
        return {
            email: user.email,
            password: user.password
        };
    });
    return res.render('admin', { userProperties })
})


//logout 
authRouter.get('/logOut', async (req, res) => {
    if (req.session) {
        req.session.destroy()
    }
    return res.redirect('/auth/login')
})

// profile user
authRouter.get('/profile', auth.connectionCheck, async (req, res) => {
    const user = await req.session.user
    return res.render('profile', { user })
})


// pantalla de log in
authRouter.get('/login', auth.currentSession, async (req, res) => {
    return res.render('login', {})
})

//  logeo user
authRouter.post('/login', passport.authenticate('login', { failureRedirect: '/auth/fail' }), async (req, res) => {
    req.session.user = {
        _id: req.user._id,
        email: req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        cart: req.user.cart,
        role: req.user.role
    }
    return res.redirect('/products')
})

// pantalla registro
authRouter.get('/register', auth.currentSession, async (req, res) => {
    return res.render('register', {})
})

authRouter.post('/register', passport.authenticate('register', { failureRedirect: '/auth/fail' }), async (req, res) => {
    req.session.user = {
        _id: req.user._id,
        email: req.user.email,
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        cart: req.user.cart,
        role: req.user.role
    }
    return res.redirect('/products')
})

authRouter.get('/fail', async (req, res) => {
    return res.send(JSON.stringify('something went wrong'))
})

module.exports = authRouter;