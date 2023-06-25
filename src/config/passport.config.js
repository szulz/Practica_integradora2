const passport = require('passport')
const local = require('passport-local')
const { isValidPassword, createHash } = require("../utils.js");
const UserModel = require("../DAO/models/users.model.js");
const userModel = new UserModel;
const LocalStrategy = local.Strategy;
const GitHubStrategy = require('passport-github2')

async function startPassport() {

    passport.use(
        'github',
        new GitHubStrategy(
            {
                clientID: 'Iv1.5ac7e46194b1934b',
                clientSecret: 'db2a529ef55ff5f08af0e95f0a2836c7f4ac5de6',
                callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
            },
            async (accessTocken, _, profile, done) => {
                try {
                    //usé  profile._json.email por que me capturaba mas sencillo el mail
                    //no sé si hay diferencia entre usar primero el .email que el ._json
                    //de cualquier manera lo puedo resolver usando la expresion del clg comentado abajo
                    //console.log(profile.emails[0].value);
                    let user = await UserModel.findOne({ email: profile._json.email });
                    if (!user) {
                        const newUser = {
                            email: profile._json.email,
                            firstName: profile.username || profile._json.login || 'noname',
                            lastName: profile.displayName || 'nolast',
                            isAdmin: false,
                            password: 'nopass',
                        };
                        let userCreated = await UserModel.create(newUser);
                        console.log('user registered');
                        return done(null, userCreated);
                    } else {
                        console.log('user already exist');
                        return done(null, user);
                    }
                } catch (e) {
                    console.log('error en github');
                    console.log(e);
                    return done(e)
                }
            }
        )
    )

    passport.use(
        'login',
        new LocalStrategy({ usernameField: 'email' }, async (username, password, done) => {
            try {
                const user = await UserModel.findOne({ email: username });
                if (!user) {
                    console.log('no user');
                    return done(null, false)
                }
                if (!isValidPassword(password, user.password)) {
                    console.log('pass incorrecto');
                    return done(null, false)
                }
                return done(null, user)
            } catch (err) {
                return done(err)
            }
        })
    );
    passport.use(
        'register',
        new LocalStrategy(
            {
                passReqToCallback: true,
                usernameField: 'email',
            },
            async (req, username, password, done) => {
                try {
                    const newUser = req.body;
                    let existingUser = await UserModel.findOne({ email: username })
                    if (existingUser) {
                        console.log('user already exist');
                        return done(null, false);
                    }
                    newUser.isAdmin = false
                    newUser.password = createHash(newUser.password)
                    let userCreated = await UserModel.create(newUser);
                    console.log(userCreated);
                    return done(null, userCreated)
                } catch (err) {
                    console.log(err);
                    return done(err)
                }
            }
        )
    )
    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    passport.deserializeUser(async (id, done) => {
        let user = await UserModel.findById(id);
        done(null, user);
    })
}

module.exports = startPassport;
