const fs = require('fs');
const express = require('express');
const { json } = require('express');
const handlebars = require('express-handlebars')
const productsRouter = require('./routes/product.router.js');
const cartsRouter = require('./routes/carts.router.js');
const viewsRouter = require('./routes/views.router.js')
const passport = require('passport')
const startPassport = require('./config/passport.config.js');
const sessionRouter = require('./routes/sessions.github.router.js');



//--------login----------
const cartsViewsRouter = require('./routes/carts.views.router.js')
const usersRouter = require('./routes/users.router.js');
const authRouter = require('./routes/auth.router.js');
const session = require('express-session')
const MongoStore = require('connect-mongo');
//*************************

const myModules = require('./utils.js')
const path = require('path');
const userRouter = require('./routes/user.router.js');

const app = express();
const port = 8080;

// --------CONNECT TO MONGO--------

myModules.mongo()

// --------HANDLEBARS--------
app.engine('handlebars', handlebars.engine())
app.set("view engine", "handlebars")
app.set("views", path.join(__dirname, "views"))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

// --------RUTAS--------

//*MONGOCOOKIES*
app.use(session({
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://ezeszulz:test@coder.phqbv0m.mongodb.net/E-commerce?retryWrites=true&w=majority', ttl: 7200 }),
  secret: 'secreto ashu',
  resave: true,
  saveUninitialized: true
}));
//*fin cookies*

//*PASSPORT*
startPassport();
app.use(passport.initialize())
app.use(passport.session())

//*fin passport*

app.get('/session', (req, res) => {
  res.send(req.session)
})

app.use('/api/sessions', sessionRouter);
app.use('/test/test', userRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/products', viewsRouter);
app.use('/carts', cartsViewsRouter);
app.use('/users', usersRouter)
app.use('/auth', authRouter)


// --------SOCKETS--------

const httpServer = app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
});

myModules.socket(httpServer)


