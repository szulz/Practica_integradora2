const passport = require('passport')
const express = require('express')
const sessionRouter = express.Router();

sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

sessionRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user
    console.log(req.user);
    res.redirect('/auth/profile')
});

sessionRouter.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

sessionRouter.get('/facebookcallback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user
    console.log(req.user);
    res.redirect('/auth/profile')
});

sessionRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email', 'openid'], accessType: 'offline', prompt: 'select_account' }))

sessionRouter.get('/googlecallback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user
    console.log(req.user);
    res.redirect('/auth/profile')
});


sessionRouter.get('/login', (req, res) => {
    let user = req.session.user
    res.send({ payload: user })
});

sessionRouter.get('/', (req, res) => {
    let user = req.session.user
    res.send({ payload: user })
});

module.exports = sessionRouter