const passport = require('passport')
const express = require('express')
const sessionRouter = express.Router();

sessionRouter.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

sessionRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    req.session.user = req.user
    console.log(req.user);
    res.redirect('/auth/profile')
});

sessionRouter.get('/', (req, res) => {
    let user = req.session.user
    res.send({ payload: user })
});

module.exports = sessionRouter